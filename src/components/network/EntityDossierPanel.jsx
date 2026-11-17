import React from 'react';

import {
  X,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Cpu,
  ShieldAlert,
  CheckCircle2,
  Ban,
  Database
} from 'lucide-react';

import { RiskBadge } from '../common/RiskBadge';
import { useInvestigation } from '../../context/InvestigationContext';
import { useNavigate } from 'react-router-dom';

export const EntityDossierPanel = ({ entity, onClose }) => {
  const { startSimulation } = useInvestigation();
  const navigate = useNavigate();

  if (!entity) return null;

  const data = entity.data || {};

  // Account information
  const label = data.label || entity.id || 'Unknown Account';
  const role = data.role || 'Transaction Account';
  const accountNumber = data.accountNumber || entity.id || 'Not available';

  // Financial information
  const balance = data.balance ?? 'Not available';
  const jurisdiction = data.jurisdiction || 'Not available';
  const inflow = data.inflow ?? 'Not available';
  const outflow = data.outflow ?? 'Not available';

  // Ownership and KYC information
  const ubo = data.ubo || 'Not available';
  const kycStatus = data.kycStatus || 'Not available';

  // Risk information
  const riskLevel = data.riskLevel || 'Low';
  const riskScore = Math.min(
    100,
    Math.max(0, Number(data.riskScore) || 0)
  );

  const tags = Array.isArray(data.tags) ? data.tags : [];

  // Launch demo AI investigation
  const handleLaunchScan = () => {
    startSimulation('SAR-2026-9041');
    navigate('/ai-investigation');
  };

  // Analyst review action
  const handleAnalystReview = () => {
    alert(
      `Account ${label} has been flagged for analyst review. No account freeze has been performed.`
    );
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'Critical':
        return 'bg-red-500';
      case 'High':
        return 'bg-orange-500';
      case 'Medium':
        return 'bg-yellow-500';
      default:
        return 'bg-emerald-500';
    }
  };

  return (
    <div className="w-80 sm:w-96 bg-[#0c1322] border-l border-slate-800 h-full flex flex-col shadow-2xl z-20">

      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-[#0e1627] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-400" />

          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Entity Dossier
          </h3>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          aria-label="Close entity dossier"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">

        {/* Main Entity Information */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-white leading-snug">
                {label}
              </h2>

              <p className="text-slate-400 text-xs mt-0.5">
                {role}
              </p>
            </div>

            <RiskBadge
              level={riskLevel}
              score={riskScore}
              size="sm"
            />
          </div>

          <p className="font-mono text-[11px] text-slate-400 mt-2 bg-[#090e1a] p-2 rounded border border-slate-800 select-all">
            {accountNumber}
          </p>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-2 gap-2">

          <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              Total Balance
            </span>

            <p className="text-sm font-bold font-mono text-cyan-400 mt-0.5">
              {balance}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              Jurisdiction
            </span>

            <p className="text-sm font-semibold text-slate-200 mt-0.5">
              {jurisdiction}
            </p>
          </div>

        </div>

        {/* Transaction Flow */}
        <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800 space-y-2">

          <span className="text-[10px] text-slate-400 uppercase font-semibold block">
            Transaction Flow
          </span>

          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-emerald-400">
              <ArrowDownRight className="w-3.5 h-3.5" />
              Inflow
            </span>

            <span className="font-mono text-slate-200 font-bold">
              {inflow}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
            <span className="flex items-center gap-1 text-rose-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              Outflow
            </span>

            <span className="font-mono text-slate-200 font-bold">
              {outflow}
            </span>
          </div>

        </div>

        {/* KYC Information */}
        <div className="space-y-2">

          <span className="text-[10px] text-slate-400 uppercase font-semibold block">
            Corporate Ownership & KYC
          </span>

          <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800 space-y-2 text-slate-300">

            <div>
              <span className="text-[11px] text-slate-400 block">
                Ultimate Beneficial Owner (UBO):
              </span>

              <span className="font-medium text-slate-100">
                {ubo}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block">
                KYC Status:
              </span>

              <span
                className={
                  riskLevel === 'Critical'
                    ? 'text-red-400 font-semibold'
                    : 'text-amber-400'
                }
              >
                {kycStatus}
              </span>
            </div>

          </div>
        </div>

        {/* Risk Information */}
        <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800">

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              Account Risk Score
            </span>

            <ShieldAlert className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="flex items-center gap-2 mt-2">

            <span className="text-xl font-bold font-mono text-white">
              {riskScore}
            </span>

            <span className="text-xs text-slate-400">
              / 100
            </span>

            <span className="ml-auto text-xs font-semibold text-slate-300">
              {riskLevel} Risk
            </span>

          </div>

          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${getRiskColor()}`}
              style={{ width: `${riskScore}%` }}
            />
          </div>

        </div>

        {/* Investigative Indicators */}
        <div className="space-y-1.5">

          <span className="text-[10px] text-slate-400 uppercase font-semibold block">
            Investigative Indicators
          </span>

          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 text-[10px] border border-slate-700 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-[11px]">
              No investigative indicators available.
            </p>
          )}

        </div>

        {/* Data Source Notice */}
        <div className="flex items-start gap-2 p-2 rounded-lg bg-blue-500/5 border border-blue-500/20">

          <Database className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />

          <p className="text-[10px] text-slate-400 leading-relaxed">
            Account and transaction flow details are loaded from the FinShield backend.
            Fields not available in the database are displayed as unavailable.
            Risk scores are experimental rule-based indicators, not confirmed fraud.
          </p>

        </div>

        {/* AI Simulation Notice */}
        <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/5 border border-amber-500/20">

          <Cpu className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />

          <p className="text-[10px] text-slate-400 leading-relaxed">
            AI investigation currently runs in demo simulation mode.
            Live AI agent integration is not yet connected.
          </p>

        </div>

      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-800 bg-[#0e1627] space-y-2">

        <button
          onClick={handleLaunchScan}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-600/30 transition-colors"
        >
          <Cpu className="w-3.5 h-3.5" />
          Launch Demo AI Investigation
        </button>

        <button
          onClick={handleAnalystReview}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
        >
          <Ban className="w-3.5 h-3.5" />
          Flag for Analyst Review
        </button>

      </div>

    </div>
  );
};