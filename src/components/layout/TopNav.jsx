import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Search,
  Calendar,
  Clock,
  User,
  Shield,
  ChevronDown,
  Check,
  CheckCheck,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';
import { useNavigate } from 'react-router-dom';

export const TopNav = () => {
  const {
    globalSearch,
    setGlobalSearch,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    settings
  } = useInvestigation();

  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle clicking outside popovers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate(`/transactions?search=${encodeURIComponent(globalSearch.trim())}`);
    }
  };

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTimeUtc = currentTime.toISOString().substring(11, 19) + ' UTC';

  return (
    <header className="h-16 bg-[#090e1a]/95 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar */}
      <div className="w-96 max-w-md">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search transactions, accounts, SWIFT, cases..."
            className="w-full bg-[#0d1424] border border-slate-700/70 hover:border-slate-600 rounded-lg pl-10 pr-16 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
              Enter
            </kbd>
          </div>
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Date and Live Clock */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#0d1424] border border-slate-800 text-xs text-slate-300 font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>{formattedDate}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>{formattedTimeUtc}</span>
          </div>
        </div>

        {/* Threat Level indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[11px] font-semibold text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>ELEVATED THREAT</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm shadow-red-500/50">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0c1322] border border-slate-700/80 rounded-xl shadow-2xl shadow-black/80 overflow-hidden z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0e1728]">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">System Alerts</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {notifications.map((notif) => {
                  const levelColors = {
                    critical: "text-red-400 bg-red-500/10 border-red-500/30",
                    high: "text-orange-400 bg-orange-500/10 border-orange-500/30",
                    info: "text-blue-400 bg-blue-500/10 border-blue-500/30",
                    success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                  };
                  return (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-3.5 hover:bg-slate-800/40 cursor-pointer transition-colors ${
                        notif.read ? 'opacity-60' : 'bg-slate-800/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded border ${levelColors[notif.level]}`}>
                            {notif.level}
                          </span>
                          <span className="text-xs font-semibold text-slate-200">{notif.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 font-mono">{notif.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 pl-0.5 leading-relaxed">{notif.message}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-2 border-t border-slate-800 bg-[#0a0f1d] text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/ai-investigation');
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  View in AI Investigation Center
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1.5 pr-2.5 rounded-lg hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-800 text-left"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                MV
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#090e1a] rounded-full" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-semibold text-slate-200 leading-tight">Marcus Vance</p>
                <span className="text-[9px] font-mono px-1 rounded bg-blue-500/20 text-sky-400 border border-sky-500/30">
                  L3
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">Lead AML Investigator</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#0c1322] border border-slate-700/80 rounded-xl shadow-2xl shadow-black/80 overflow-hidden z-50 animate-in fade-in zoom-in-95">
              <div className="p-4 border-b border-slate-800 bg-[#0e1728]">
                <p className="text-xs font-semibold text-white">{settings.analystName}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{settings.clearanceLevel}</p>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-mono">FINCEN CERTIFIED • ACTIVE</span>
                </div>
              </div>

              <div className="p-2 space-y-1 text-xs">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  System & Compliance Settings
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/reports');
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  My Assigned SAR Filings
                </button>
              </div>

              <div className="p-2 border-t border-slate-800 bg-[#080d17]">
                <div className="px-3 py-1.5 text-[10px] text-slate-400">
                  Jurisdiction: <span className="text-slate-200 font-medium">US FinCEN BSA</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
