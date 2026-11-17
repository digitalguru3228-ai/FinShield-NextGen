import React from 'react';
import { Flag, Clock, CheckCircle2, Ban, AlertTriangle, SearchCode } from 'lucide-react';

export const StatusBadge = ({ status, size = "md" }) => {
  const normStatus = (status || 'Normal').toLowerCase().trim();

  const styles = {
    normal: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      icon: CheckCircle2,
      label: "Normal"
    },
    cleared: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      icon: CheckCircle2,
      label: "Normal"
    },
    suspicious: {
      bg: "bg-rose-500/10 border-rose-500/30 text-rose-300",
      icon: AlertTriangle,
      label: "Suspicious"
    },
    flagged: {
      bg: "bg-rose-500/10 border-rose-500/30 text-rose-300",
      icon: AlertTriangle,
      label: "Suspicious"
    },
    "under investigation": {
      bg: "bg-sky-500/10 border-sky-500/30 text-sky-300",
      icon: SearchCode,
      label: "Under Investigation"
    },
    "under review": {
      bg: "bg-sky-500/10 border-sky-500/30 text-sky-300",
      icon: SearchCode,
      label: "Under Investigation"
    },
    blocked: {
      bg: "bg-red-950/60 border-red-500/40 text-red-300",
      icon: Ban,
      label: "Blocked"
    }
  };

  const current = styles[normStatus] || styles.normal;
  const IconComponent = current.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2"
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-md border ${current.bg} ${sizeClasses[size] || sizeClasses.md}`}>
      <IconComponent className="w-3.5 h-3.5 shrink-0" />
      <span>{current.label}</span>
    </span>
  );
};
