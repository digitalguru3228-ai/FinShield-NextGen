import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Shield, Building2, User, Coins, Landmark, AlertTriangle } from 'lucide-react';

export const CustomAccountNode = memo(({ data, selected }) => {
  const isCritical = data.riskLevel === 'Critical';
  const isHigh = data.riskLevel === 'High';

  const getIcon = () => {
    if (data.role.includes('Shell')) return Building2;
    if (data.role.includes('Mule') || data.role.includes('Individual')) return User;
    if (data.role.includes('Crypto') || data.role.includes('Mixer')) return Coins;
    return Landmark;
  };

  const Icon = getIcon();

  const getBorderColor = () => {
    if (selected) return 'border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20';
    if (isCritical) return 'border-red-500/80 shadow-md shadow-red-500/20';
    if (isHigh) return 'border-orange-500/70';
    return 'border-slate-700/80';
  };

  return (
    <div
      className={`min-w-[220px] max-w-[260px] rounded-xl bg-[#0c1322] border-2 p-3 text-white transition-all select-none ${getBorderColor()}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-blue-400 !w-2.5 !h-2.5" />
      <Handle type="target" position={Position.Left} className="!bg-blue-400 !w-2.5 !h-2.5" />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isCritical ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold truncate text-slate-100">{data.label}</h4>
            <span className="text-[10px] text-slate-400 block truncate">{data.role}</span>
          </div>
        </div>
        <span
          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${
            isCritical
              ? 'bg-red-500/20 text-red-400 border-red-500/30'
              : isHigh
              ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
          }`}
        >
          {data.riskScore}
        </span>
      </div>

      {/* Body details */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1 text-[11px]">
        <div className="flex justify-between text-slate-400">
          <span>Jurisdiction:</span>
          <span className="text-slate-200 font-medium">{data.jurisdiction}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Total Balance:</span>
          <span className="font-mono text-cyan-400 font-semibold">{data.balance}</span>
        </div>
      </div>

      {/* Tags preview */}
      {data.tags && data.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {data.tags.slice(0, 2).map((t, idx) => (
            <span key={idx} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium">
              {t}
            </span>
          ))}
          {data.tags.length > 2 && (
            <span className="text-[9px] text-slate-400 font-mono">+{data.tags.length - 2}</span>
          )}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-cyan-400 !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Right} className="!bg-cyan-400 !w-2.5 !h-2.5" />
    </div>
  );
});
