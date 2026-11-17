import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Cpu,
  AlertTriangle,
  FileText,
  Activity,
  ShieldCheck,
  Network,
  Search
} from 'lucide-react';

import { RiskBadge } from '../common/RiskBadge';
import { StatusBadge } from '../common/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../context/InvestigationContext';

export const InvestigationModal = ({ transaction, isOpen, onClose }) => {
  const navigate = useNavigate();

  const {
    startSimulation,
    reports,
    setSelectedReport
  } = useInvestigation();

  const [workflowState, setWorkflowState] = useState({
    isRunning: false,
    currentStep: 0,
    progress: 0,
    isComplete: false,
    logs: []
  });

  const sender = transaction?.sender || {};
  const receiver = transaction?.receiver || {};

  const amount = Number(transaction?.amount || 0);
  const currency = transaction?.currency || 'INR';

  const formatCurrency = (value) => {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    } catch {
      return `₹${Number(value).toLocaleString('en-IN')}`;
    }
  };

  const timestamp = transaction?.timestamp || 'Not available';

  const transactionType =
    transaction?.transactionType || 'Not available';

  const riskIndicators = Array.isArray(transaction?.amlTriggers)
    ? transaction.amlTriggers
    : [];

  const anomalyDescription =
    transaction?.fraudCategory ||
    'No rule-based anomaly detected';

  const scoringType =
    transaction?.scoringType ||
    'Experimental Rule-Based';

  // Demonstration workflow steps
  const investigationSteps = [
    {
      agent: 'Transaction Investigation Agent',
      code: 'TIA-DEMO',
      title: 'Transaction Anomaly Analysis',
      detail: `Reviewing ${transaction?.id} using the available transaction amount, type and rule-based risk indicators.`,
      finding:
        riskIndicators.length > 0
          ? `Backend returned ${riskIndicators.length} risk indicator(s) for this transaction.`
          : 'No rule-based anomaly indicators were returned by the backend.'
    },
    {
      agent: 'Network Investigation Agent',
      code: 'NIA-DEMO',
      title: 'Counterparty Relationship Review',
      detail: `Reviewing the available sender account ${sender.account || 'Not available'} and receiver account ${receiver.account || 'Not available'}.`,
      finding:
        'Counterparty information reviewed. This demonstration does not perform live network traversal.'
    },
    {
      agent: 'Evidence Verification Agent',
      code: 'EVA-DEMO',
      title: 'Evidence Availability Review',
      detail:
        'Checking which transaction fields and risk indicators are available in the connected backend.',
      finding:
        'Only supplied backend fields are considered. No external sanctions, IP or device screening is connected.'
    },
    {
      agent: 'Report Generation Agent',
      code: 'RGA-DEMO',
      title: 'Investigation Summary Preparation',
      detail:
        'Preparing a demonstration investigation summary from the available transaction information.',
      finding:
        'Demonstration workflow completed. Analyst review is required before any compliance decision.'
    }
  ];

  // Reset workflow whenever modal opens or transaction changes
  useEffect(() => {
    if (isOpen) {
      setWorkflowState({
        isRunning: false,
        currentStep: 0,
        progress: 0,
        isComplete: false,
        logs: []
      });
    }
  }, [isOpen, transaction?.id]);

  if (!isOpen || !transaction) return null;

  const handleStartWorkflow = () => {
    const currentTime = new Date().toLocaleTimeString();

    setWorkflowState({
      isRunning: true,
      currentStep: 1,
      progress: 25,
      isComplete: false,
      logs: [
        `[${currentTime}] DEMO: Starting investigation workflow for ${transaction.id}.`,
        `[${currentTime}] TIA-DEMO: Reviewing backend transaction information.`
      ]
    });
  };

  // Simulated workflow progression
  useEffect(() => {
    if (!workflowState.isRunning || workflowState.isComplete) {
      return;
    }

    if (workflowState.currentStep < 4) {
      const timer = setTimeout(() => {
        setWorkflowState((previous) => {
          const nextStep = previous.currentStep + 1;
          const stepInfo = investigationSteps[nextStep - 1];

          return {
            ...previous,
            currentStep: nextStep,
            progress: nextStep * 25,
            logs: [
              ...previous.logs,
              `[${new Date().toLocaleTimeString()}] ${stepInfo.code}: ${stepInfo.title} completed.`,
              `[${new Date().toLocaleTimeString()}] RESULT: ${stepInfo.finding}`
            ]
          };
        });
      }, 1200);

      return () => clearTimeout(timer);
    }

    const finishTimer = setTimeout(() => {
      setWorkflowState((previous) => ({
        ...previous,
        isRunning: false,
        isComplete: true,
        progress: 100,
        logs: [
          ...previous.logs,
          `[${new Date().toLocaleTimeString()}] DEMO: Investigation demonstration completed.`,
          `[${new Date().toLocaleTimeString()}] NOTICE: No external screening or actual AI execution was performed.`
        ]
      }));
    }, 1200);

    return () => clearTimeout(finishTimer);
  }, [
    workflowState.isRunning,
    workflowState.currentStep,
    workflowState.isComplete
  ]);

  const handleViewInAICenter = () => {
    startSimulation(transaction.caseId || 'SAR-2026-9041');
    onClose();
    navigate(`/ai-investigation?txn=${transaction.id}`);
  };

  const handleViewSARReport = () => {
    const report =
      reports.find((item) => item.id === transaction.caseId) ||
      reports[0];

    if (report) {
      setSelectedReport(report);
    }

    onClose();
    navigate('/reports');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#0b1220] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-6 animate-in fade-in zoom-in-95">

        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0d1628] flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="p-2.5 rounded-xl bg-blue-500/20 text-cyan-400 border border-blue-500/30">
              <Cpu className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">

                <span className="font-mono text-sm font-bold text-white">
                  {transaction.id}
                </span>

                <RiskBadge
                  level={transaction.riskLevel}
                  score={transaction.riskScore}
                  size="sm"
                />

                <StatusBadge
                  status={transaction.status}
                  size="sm"
                />

                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                  Investigation Interface
                </span>

              </div>

              <p className="text-xs text-slate-400 mt-0.5">
                Transaction Anomaly Review & Evidence Summary
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Modal Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6 text-xs text-slate-300">

          {/* Demonstration Notice */}
          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">

            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />

            <div>
              <p className="font-semibold text-white text-xs">
                Demonstration Investigation Workflow
              </p>

              <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                This is a simulated multi-agent workflow using available
                backend transaction information. No live AI models,
                external sanctions databases, device intelligence APIs
                or paid services are connected in this phase.
              </p>
            </div>

          </div>

          {/* Selected Transaction Dossier */}
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 space-y-3">

            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">

              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Selected Transaction Dossier
              </span>

              <span className="font-mono text-slate-400 text-[11px]">
                {timestamp}
              </span>

            </div>

            {/* Transaction Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800">

                <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                  Transaction Amount
                </span>

                <span className="text-lg font-bold font-mono text-white block mt-0.5">
                  {formatCurrency(amount)}
                </span>

                <span className="text-[10px] text-cyan-400 font-mono">
                  {transactionType}
                </span>

              </div>

              <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800">

                <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                  Originating Sender
                </span>

                <span className="text-xs font-semibold text-slate-200 block truncate mt-0.5">
                  {sender.name || 'Not available'}
                </span>

                <span className="text-[10px] font-mono text-slate-400 truncate block">
                  Account: {sender.account || 'Not available'}
                </span>

                <span className="text-[10px] text-slate-500 block mt-1">
                  Country: {sender.country || 'Not available'}
                </span>

              </div>

              <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800">

                <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                  Beneficiary Receiver
                </span>

                <span className="text-xs font-semibold text-slate-200 block truncate mt-0.5">
                  {receiver.name || 'Not available'}
                </span>

                <span className="text-[10px] font-mono text-slate-400 truncate block">
                  Account: {receiver.account || 'Not available'}
                </span>

                <span className="text-[10px] text-slate-500 block mt-1">
                  Country: {receiver.country || 'Not available'}
                </span>

              </div>

            </div>

            {/* Risk Information */}
            <div className="pt-2 text-xs">

              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                Primary Risk Indicator
              </span>

              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 text-red-200 flex items-center gap-2">

                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />

                <span className="font-medium">
                  {anomalyDescription}
                </span>

              </div>

            </div>

            {/* Risk Scoring Information */}
            <div className="grid grid-cols-2 gap-3 pt-2">

              <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800">

                <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                  Risk Score
                </span>

                <span className="text-lg font-bold font-mono text-white mt-1 block">
                  {transaction.riskScore ?? 0}/100
                </span>

              </div>

              <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800">

                <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                  Scoring Method
                </span>

                <span className="text-xs font-semibold text-cyan-400 mt-2 block">
                  {scoringType}
                </span>

              </div>

            </div>

            {/* Risk Indicators */}
            <div className="space-y-1.5 pt-2">

              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Backend Risk Indicators ({riskIndicators.length})
              </span>

              {riskIndicators.length > 0 ? (

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">

                  {riskIndicators.map((indicator, index) => (

                    <div
                      key={index}
                      className="p-2 rounded bg-[#090e1a] border border-slate-800 text-[11px] text-slate-300 flex items-start gap-1.5"
                    >

                      <span className="text-red-400 font-bold shrink-0">
                        #{index + 1}
                      </span>

                      <span className="leading-tight">
                        {indicator}
                      </span>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                  No rule-based anomaly indicators were returned.
                </div>

              )}

            </div>

          </div>

          {/* Workflow Control */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#0d1627] to-[#0a101d] border border-slate-800 flex flex-wrap items-center justify-between gap-3">

            <div>

              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Multi-Agent Demonstration Workflow
              </h4>

              <p className="text-[11px] text-slate-400 mt-0.5">
                Simulate transaction review across four specialized stages.
              </p>

            </div>

            {!workflowState.isRunning && !workflowState.isComplete ? (

              <button
                onClick={handleStartWorkflow}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              >

                <Play className="w-3.5 h-3.5 fill-current" />

                <span>Start Demonstration Workflow</span>

              </button>

            ) : workflowState.isRunning ? (

              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-950/60 border border-blue-500/40 text-cyan-300 text-xs font-medium">

                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />

                <span>
                  Simulating Workflow ({workflowState.progress}%)
                </span>

              </div>

            ) : (

              <div className="flex items-center gap-2">

                <button
                  onClick={handleStartWorkflow}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >

                  <RotateCcw className="w-3 h-3" />

                  <span>Re-Run</span>

                </button>

                <button
                  onClick={handleViewSARReport}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
                >

                  <FileText className="w-3.5 h-3.5" />

                  <span>View SAR Dossier</span>

                </button>

              </div>

            )}

          </div>

          {/* Progress Bar */}
          {(workflowState.isRunning || workflowState.isComplete) && (

            <div className="space-y-2">

              <div className="flex items-center justify-between text-[10px] text-slate-400">

                <span className="uppercase font-semibold tracking-wider">
                  Demonstration Progress
                </span>

                <span className="font-mono text-cyan-400">
                  {workflowState.progress}%
                </span>

              </div>

              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">

                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${workflowState.progress}%` }}
                />

              </div>

            </div>

          )}

          {/* Agent Sequence */}
          <div className="space-y-2.5">

            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
              Multi-Agent Orchestration Sequence
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {investigationSteps.map((step, index) => {

                const isStepComplete =
                  workflowState.currentStep > index + 1 ||
                  workflowState.isComplete;

                const isStepRunning =
                  workflowState.isRunning &&
                  workflowState.currentStep === index + 1;

                return (

                  <div
                    key={index}
                    className={`p-3 rounded-xl border transition-all ${
                      isStepComplete
                        ? 'bg-[#0d1627] border-emerald-500/30 text-slate-200'
                        : isStepRunning
                        ? 'bg-[#0f1d38] border-cyan-500/60 ring-1 ring-cyan-500/30'
                        : 'bg-[#090e1a] border-slate-800/80 opacity-70'
                    }`}
                  >

                    <div className="flex items-start justify-between gap-2">

                      <div className="flex items-center gap-2">

                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                            isStepComplete
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : isStepRunning
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {isStepComplete ? '✓' : index + 1}
                        </span>

                        <div>

                          <p className="font-bold text-white text-xs leading-none">
                            {step.agent}
                          </p>

                          <span className="text-[9px] font-mono text-cyan-400">
                            {step.code}
                          </span>

                        </div>

                      </div>

                      <span className="text-[10px] font-mono text-slate-400">
                        {isStepComplete
                          ? 'COMPLETED'
                          : isStepRunning
                          ? 'RUNNING...'
                          : 'STANDBY'}
                      </span>

                    </div>

                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      {step.detail}
                    </p>

                    {isStepComplete && (

                      <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-emerald-300 flex items-start gap-1 font-sans">

                        <span className="text-emerald-400 font-bold">
                          •
                        </span>

                        <span>
                          {step.finding}
                        </span>

                      </div>

                    )}

                  </div>

                );
              })}

            </div>

          </div>

          {/* Terminal Logs */}
          {workflowState.logs.length > 0 && (

            <div className="p-3 rounded-xl bg-[#070b13] border border-slate-800 font-mono text-[11px] space-y-1 max-h-40 overflow-y-auto">

              <span className="text-slate-400 text-[10px] uppercase font-semibold block pb-1 border-b border-slate-800">
                Demonstration Workflow Logs
              </span>

              {workflowState.logs.map((log, index) => (

                <div
                  key={index}
                  className="text-slate-300 break-words"
                >
                  {log}
                </div>

              ))}

            </div>

          )}

          {/* Disclaimer */}
          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 flex items-start gap-2">

            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />

            <p className="text-[10px] text-amber-200/80 leading-relaxed">
              This workflow is a prototype demonstration. Risk indicators
              do not establish confirmed fraud. No actual sanctions
              screening, regulatory filing, account blocking or live
              autonomous AI execution is performed.
            </p>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d1628] flex items-center justify-between text-xs">

          <button
            onClick={handleViewInAICenter}
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 transition-colors"
          >

            <span>Open in Full AI Investigation Center</span>

            <ExternalLink className="w-3.5 h-3.5" />

          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};