import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive,
  subtext,
  icon: Icon,
  accent = "blue",
  onClick
}) => {
  const accentStyles = {
    blue: {
      borderHover: "hover:border-blue-500/40",
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      glow: "from-blue-600/10 via-transparent to-transparent"
    },
    red: {
      borderHover: "hover:border-red-500/40",
      iconBg: "bg-red-500/10 text-red-400 border-red-500/20",
      glow: "from-red-600/10 via-transparent to-transparent"
    },
    orange: {
      borderHover: "hover:border-orange-500/40",
      iconBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      glow: "from-orange-600/10 via-transparent to-transparent"
    },
    cyan: {
      borderHover: "hover:border-cyan-500/40",
      iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      glow: "from-cyan-600/10 via-transparent to-transparent"
    },
    green: {
      borderHover: "hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      glow: "from-emerald-600/10 via-transparent to-transparent"
    }
  };

  const style = accentStyles[accent] || accentStyles.blue;

  return (
    <div
      onClick={onClick}
      className={`relative group bg-[#0d1424] border border-slate-800/80 rounded-xl p-5 shadow-lg transition-all duration-200 overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      } ${style.borderHover}`}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.glow} opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white font-mono">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg border ${style.iconBg} transition-transform group-hover:scale-105`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-800/60">
        {change && (
          <div className="flex items-center gap-1 font-medium">
            {isPositive ? (
              <span className="inline-flex items-center text-emerald-400 gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {change}
              </span>
            ) : (
              <span className="inline-flex items-center text-rose-400 gap-0.5">
                <ArrowDownRight className="w-3.5 h-3.5" />
                {change}
              </span>
            )}
          </div>
        )}
        {subtext && <span className="text-slate-400 truncate ml-auto">{subtext}</span>}
      </div>
    </div>
  );
};
