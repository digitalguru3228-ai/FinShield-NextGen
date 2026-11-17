import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  GitFork,
  Cpu,
  FileCheck2,
  Settings,
  Shield,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const Sidebar = () => {
  const { transactions, reports, simState } = useInvestigation();

  const flaggedCount = transactions.filter(t => t.riskLevel === 'Critical' || t.status === 'Flagged').length;
  const pendingReportsCount = reports.filter(r => r.filingStatus !== 'Closed').length;

  const navItems = [
    {
      to: '/',
      name: 'Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/transactions',
      name: 'Transactions',
      icon: ArrowLeftRight,
      badge: flaggedCount > 0 ? { text: flaggedCount, color: 'bg-red-500/20 text-red-400 border border-red-500/30' } : null
    },
    {
      to: '/network',
      name: 'Network Investigation',
      icon: GitFork,
      badge: { text: 'Graph', color: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' }
    },
    {
      to: '/ai-investigation',
      name: 'AI Investigation Center',
      icon: Cpu,
      badge: simState.isRunning
        ? { text: 'Analyzing...', color: 'bg-blue-500 text-white animate-pulse' }
        : { text: '4 Agents', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' }
    },
    {
      to: '/reports',
      name: 'Investigation Reports',
      icon: FileCheck2,
      badge: pendingReportsCount > 0 ? { text: `${pendingReportsCount} SAR`, color: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' } : null
    },
    {
      to: '/settings',
      name: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-[#090e1a] border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div>
        <div className="px-5 py-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-900 shadow-md shadow-blue-500/20 border border-sky-400/30">
              <Shield className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#090e1a] rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider text-white">FINSHIELD</span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-500/20 text-sky-400 border border-sky-500/30">
                  NEXT-GEN
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-tight">AI Fraud Investigation Suite</p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          <div className="px-3 pt-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Investigation Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-900/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${item.badge.color}`}>
                        {item.badge.text}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* System Status Telemetry Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#070b14]/70">
        <div className="p-3 rounded-lg bg-[#0d1424] border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-slate-300">Live Surveillance</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/20">
              99.98%
            </span>
          </div>

          <div className="space-y-1 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
            <div className="flex justify-between items-center">
              <span>Threat Level</span>
              <span className="font-semibold text-amber-400 text-[10px] uppercase">DEFCON 2 (Elevated)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Agent Ensemble</span>
              <span className="font-mono text-sky-400 text-[10px]">4 Ready / 0 Offline</span>
            </div>
          </div>
        </div>

        <div className="mt-2 px-2 text-center">
          <p className="text-[10px] text-slate-400 font-mono">FINSHIELD v2.4.0 • ENTERPRISE</p>
        </div>
      </div>
    </aside>
  );
};
