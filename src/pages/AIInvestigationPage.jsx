import React from 'react';
import { AgentCard } from '../components/ai/AgentCard';
import { InvestigationConsole } from '../components/ai/InvestigationConsole';
import { useInvestigation } from '../context/InvestigationContext';
import {
  Cpu,
  Sparkles,
  Bot,
  Layers,
  ShieldCheck,
  Zap,
  Info,
  Activity
} from 'lucide-react';

export const AIInvestigationPage = () => {
  const { agents, simState } = useInvestigation();

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            AI Investigation Center
          </h1>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
            Agentic Core v2.4
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Autonomous multi-agent orchestration for fraud hypothesis formulation, graph traversal, sanctions verification, and FinCEN SAR drafting.
        </p>
      </div>

      {/* 4 Agent Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" />
            Specialized Autonomous Fraud Agents (4)
          </h2>
          <span className="text-[11px] font-mono text-emerald-400">
            All 4 Agents Operational
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isInvestigating={simState.isRunning}
              activeStepIndex={simState.currentStepIndex}
              agentIndex={index}
            />
          ))}
        </div>
      </div>

      {/* Multi-Agent Orchestration Simulation Console */}
      <InvestigationConsole />
    </div>
  );
};
