import React from 'react';
import {
  Activity,
  GitFork,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const AgentCard = ({ agent, isInvestigating, activeStepIndex, agentIndex }) => {
  const getIcon = () => {
    switch (agent.icon) {
      case 'Activity':
        return Activity;
      case 'Network':
        return GitFork;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'FileText':
        return FileText;
      default:
        return Cpu;
    }
  };

  const IconComponent = getIcon();

  const isCurrentActive = isInvestigating && activeStepIndex === agentIndex;
  const isCompleted = isInvestigating && activeStepIndex > agentIndex;

  const getStatusBadge = () => {
    if (isCurrentActive) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-cyan-400 border border-cyan-500/40 text-xs font-semibold animate-pulse">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          Analyzing Now...
        </span>
      );
    }
    if (isCompleted) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Deliberation Complete
        </span>
      );
    }
    if (agent.status === 'Active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Active / Scanning
        </span>
      );
    }
    if (agent.status === 'Analyzing') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          Analyzing
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-700/30 text-slate-400 border border-slate-700 text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
        Idle / Standby
      </span>
    );
  };

  const displayProgress = isInvestigating
    ? (isCompleted ? 100 : isCurrentActive ? 65 : 0)
    : agent.progress;

  return (
    <div
      className={`rounded-2xl bg-[#0d1424] border transition-all duration-300 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden group ${
        isCurrentActive
          ? 'border-cyan-500/70 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-500/40'
          : 'border-slate-800/80 hover:border-slate-700'
      }`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-600/5 to-transparent pointer-events-none rounded-bl-full" />

      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border transition-colors ${
              isCurrentActive
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            }`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  {agent.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/40 px-1.5 py-0.2 rounded border border-cyan-500/20">
                  {agent.code}
                </span>
                <span className="text-[11px] text-slate-400">{agent.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status indicator row */}
        <div className="mt-3.5 flex items-center justify-between">
          <div>{getStatusBadge()}</div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400">Confidence:</span>
            <span className="text-xs font-mono font-bold text-white ml-1.5">{agent.confidence}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
            <span>Progress / Heuristic Load</span>
            <span className="font-mono font-medium text-slate-300">{displayProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCurrentActive
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse'
                  : isCompleted
                  ? 'bg-emerald-500'
                  : 'bg-blue-600'
              }`}
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs text-slate-400 leading-relaxed">
          {agent.description}
        </p>

        {/* Specialties Badges */}
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Detection Heuristics:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {agent.specialties.map((spec, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded bg-[#090e1a] text-slate-300 border border-slate-800 font-sans"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs bg-[#090f1d] p-2.5 rounded-lg border border-slate-800/60">
        <div>
          <span className="text-[10px] text-slate-400 uppercase block">Cases</span>
          <span className="font-mono font-semibold text-slate-200 text-[11px]">{agent.casesProcessed}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase block">Avg Latency</span>
          <span className="font-mono font-semibold text-slate-200 text-[11px]">{agent.avgLatency}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase block">Accuracy</span>
          <span className="font-mono font-semibold text-emerald-400 text-[11px]">{agent.accuracyRate}</span>
        </div>
      </div>
    </div>
  );
};
