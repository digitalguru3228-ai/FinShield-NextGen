import React, { useRef, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Layers,
  Shield,
  ArrowRight,
  ArrowLeftRight,
  AlertTriangle,
  Building2,
  User,
  Globe
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';
import { simulationSteps } from '../../data/mockAgents';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RiskBadge } from '../common/RiskBadge';
import { StatusBadge } from '../common/StatusBadge';

export const InvestigationConsole = () => {
  const [searchParams] = useSearchParams();
  const txnIdParam = searchParams.get('txn');

  const {
    simState,
    startSimulation,
    resetSimulation,
    setSelectedReport,
    reports,
    transactions
  } = useInvestigation();

  const navigate = useNavigate();
  const terminalRef = useRef(null);

  // Look up transaction if passed via ?txn=
  const linkedTxn = txnIdParam
    ? transactions.find(t => t.id === txnIdParam)
    : null;

  // Auto scroll terminal to bottom when new logs arrive
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [simState.liveLogs]);

  const handleViewGeneratedReport = () => {
    const report = reports.find(r => r.id === simState.caseId) || reports[0];
    setSelectedReport(report);
    navigate('/reports');
  };

  const activeCaseTitle = linkedTxn
    ? `${linkedTxn.id} (${linkedTxn.sender.name} • $${(linkedTxn.amount / 1000).toFixed(0)}K USD)`
    : simState.caseId;

  return (
    <div className="space-y-6">
      {/* Simulation Banner Notice */}
      <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-blue-500/20 text-cyan-400 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            Multi-Agent Orchestration Simulation Environment
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
              Synthetic Demo Engine
            </span>
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            This module demonstrates autonomous collaborative deliberation between four specialized AI agents using realistic synthetic financial evidence. No paid third-party API is connected. The workflow engine will link to enterprise LLM endpoints in Phase 2.
          </p>
        </div>
      </div>

      {/* Target Transaction Highlight Banner (if linked via ?txn=) */}
      {linkedTxn && (
        <div className="p-4 rounded-2xl bg-[#0d1628] border border-cyan-500/40 shadow-xl space-y-3 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                Active Transaction Under Investigation:
              </span>
              <span className="font-mono text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {linkedTxn.id}
              </span>
              <RiskBadge level={linkedTxn.riskLevel} score={linkedTxn.riskScore} size="sm" />
              <StatusBadge status={linkedTxn.status} size="sm" />
            </div>
            <span className="font-mono text-xs text-slate-400">{linkedTxn.timestamp}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-[#090e1a] border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Amount</span>
              <span className="text-base font-bold font-mono text-white mt-0.5 block">
                ${linkedTxn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {linkedTxn.currency}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#090e1a] border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Sender</span>
              <span className="text-xs font-semibold text-slate-200 block truncate mt-0.5">
                {linkedTxn.sender.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 block truncate">
                {linkedTxn.sender.account} ({linkedTxn.sender.country})
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#090e1a] border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Beneficiary</span>
              <span className="text-xs font-semibold text-slate-200 block truncate mt-0.5">
                {linkedTxn.receiver.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 block truncate">
                {linkedTxn.receiver.account} ({linkedTxn.receiver.country})
              </span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-red-950/20 border border-red-500/20 text-xs text-red-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{linkedTxn.fraudCategory}</span>
          </div>
        </div>
      )}

      {/* Control Toolbar */}
      <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Case:</span>
            <select
              value={simState.caseId}
              onChange={(e) => startSimulation(e.target.value)}
              disabled={simState.isRunning}
              className="bg-[#090e1a] border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <option value="SAR-2026-9041">SAR-2026-9041 (Apex Global • $4.29M Layering Ring)</option>
              <option value="SAR-2026-8812">SAR-2026-8812 (Elena Rostova • $890K Mule Ring)</option>
              <option value="SAR-2026-8703">SAR-2026-8703 (Nexus Vault • $2.1M Mixer Evasion)</option>
            </select>
          </div>

          <div className="text-xs pl-3 border-l border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Primary Target:</span>
            <span className="font-semibold text-white">{linkedTxn ? linkedTxn.sender.name : simState.targetEntity}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {!simState.isRunning ? (
            <button
              onClick={() => startSimulation(linkedTxn?.caseId || simState.caseId)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>
                {simState.isFinished
                  ? 'Re-Run Demonstration Deliberation'
                  : 'Start Demonstration Investigation Workflow'}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/40 border border-blue-500/40 text-cyan-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Simulating Multi-Agent Deliberation ({simState.progress}%)...</span>
            </div>
          )}

          <button
            onClick={resetSimulation}
            disabled={simState.isRunning}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors disabled:opacity-50"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Steps & Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step-by-Step Deliberation Pipeline (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Autonomous Agent Execution Pipeline
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              {simState.completedSteps.length} of {simulationSteps.length} Agents Completed
            </span>
          </div>

          <div className="space-y-3">
            {simulationSteps.map((step, idx) => {
              const isDone = simState.completedSteps.some(s => s.step === step.step);
              const isCurrent = simState.isRunning && simState.currentStepIndex === idx;

              return (
                <div
                  key={step.step}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    isDone
                      ? 'bg-[#0d1627] border-emerald-500/30 shadow-md'
                      : isCurrent
                      ? 'bg-[#0e1a33] border-cyan-500/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                      : 'bg-[#0a0f1d] border-slate-800/80 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {isDone ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center animate-pulse">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center font-mono text-xs">
                            {step.step}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{step.agent}</span>
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-1.5 py-0.2 rounded border border-cyan-500/20">
                            {step.agentCode}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-200 mt-1">{step.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.detail}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {isDone ? step.duration : isCurrent ? 'Running...' : 'Queued'}
                    </span>
                  </div>

                  {/* Findings */}
                  {isDone && step.findings && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 pl-9 space-y-1">
                      <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                        Extracted Evidence Findings:
                      </span>
                      {step.findings.map((f, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* If Finished, Show Report CTA */}
          {simState.isFinished && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-blue-950/40 border border-emerald-500/30 flex items-center justify-between animate-in fade-in">
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Deliberation Succeeded</p>
                <p className="text-xs text-slate-200 mt-0.5">FinCEN Form 111 SAR Dossier generated with 98.4% consensus confidence.</p>
              </div>
              <button
                onClick={handleViewGeneratedReport}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                View Full SAR Dossier
              </button>
            </div>
          )}
        </div>

        {/* Live Terminal Telemetry Log (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Multi-Agent Orchestrator Feed
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
              STREAM READY
            </span>
          </div>

          <div
            ref={terminalRef}
            className="flex-1 min-h-[380px] max-h-[560px] bg-[#070b13] border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-y-auto space-y-2.5 shadow-2xl"
          >
            <div className="text-slate-400 pb-2 border-b border-slate-800/80 text-[11px]">
              FINSHIELD AGENTIC CORE v2.4.0 • AUTONOMOUS RUNTIME
              <br />
              Target: {linkedTxn?.id || simState.caseId} | Clearance: Level 3
            </div>

            {simState.liveLogs.length > 0 ? (
              simState.liveLogs.map((log, index) => (
                <div key={index} className="leading-relaxed animate-in fade-in duration-200">
                  <span className="text-slate-400 text-[10px] mr-2">[{log.timestamp}]</span>
                  <span className="text-cyan-400 font-semibold mr-2">{log.agent}:</span>
                  <span className="text-slate-200">{log.text}</span>
                </div>
              ))
            ) : (
              <div className="text-slate-400 py-16 text-center italic">
                Awaiting investigation trigger. Select target case and click "Start Demonstration Investigation Workflow" to view live deliberative traces.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
