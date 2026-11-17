import React from 'react';
import { AlertTriangle, AlertCircle, Info, ShieldCheck } from 'lucide-react';

export const RiskBadge = ({ level, score, showIcon = true, size = "md" }) => {
  const normLevel = (level || 'Low').toLowerCase();

  const styles = {
    critical: {
      bg: "bg-red-500/10 border-red-500/30 text-red-400",
      dot: "bg-red-500 shadow-sm shadow-red-500/50 animate-pulse",
      icon: AlertTriangle,
      label: "Critical"
    },
    high: {
      bg: "bg-orange-500/10 border-orange-500/30 text-orange-400",
      dot: "bg-orange-500",
      icon: AlertCircle,
      label: "High"
    },
    medium: {
      bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      dot: "bg-amber-500",
      icon: Info,
      label: "Medium"
    },
    low: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      dot: "bg-emerald-500",
      icon: ShieldCheck,
      label: "Low"
    }
  };

  const current = styles[normLevel] || styles.low;
  const IconComponent = current.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2"
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${current.bg} ${sizeClasses[size] || sizeClasses.md}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      {showIcon && <IconComponent className="w-3.5 h-3.5" />}
      <span>{current.label}</span>
      {score !== undefined && (
        <span className="font-mono text-[11px] opacity-80 border-l border-current/20 pl-1.5 ml-0.5">
          {score}
        </span>
      )}
    </span>
  );
};
