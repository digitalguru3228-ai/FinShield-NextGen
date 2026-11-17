import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Sliders,
  Bell,
  Lock,
  Cpu,
  Check,
  RotateCcw,
  Globe,
  Key
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';

export const SettingsPage = () => {
  const { settings, setSettings } = useInvestigation();
  const [formData, setFormData] = useState({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    const defaults = {
      criticalThreshold: 85,
      highThreshold: 65,
      mediumThreshold: 40,
      ctrLimit: 10000,
      autoFreezeSanctions: true,
      torExitDetection: true,
      multiAgentConsensus: true,
      reportingJurisdiction: "FinCEN (US Treasury BSA)",
      alertWebhook: "https://compliance.finshield.internal/v1/alerts",
      analystName: "Special Agent Marcus Vance",
      clearanceLevel: "Level 3 - Top Secret (FinCEN Liaison)"
    };
    setFormData(defaults);
    setSettings(defaults);
  };

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-150">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Enterprise Compliance & Engine Settings
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Admin Configuration
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure risk scoring boundaries, AML surveillance thresholds, multi-agent consensus rules, and audit webhooks.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Configuration Saved Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Risk Engine Scoring Boundaries */}
        <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800/80 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <Sliders className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Risk Scoring Calibration & Heuristic Weights</h3>
              <p className="text-xs text-slate-400">Configure sensitivity thresholds for automated anomaly classification.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Critical Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-red-400 font-semibold">Critical Risk Threshold</span>
                <span className="font-mono text-white font-bold">{formData.criticalThreshold}+</span>
              </div>
              <input
                type="range"
                min="70"
                max="95"
                value={formData.criticalThreshold}
                onChange={(e) => handleChange('criticalThreshold', Number(e.target.value))}
                className="w-full accent-red-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">Automated interdiction triggered on transactions reaching this cutoff.</p>
            </div>

            {/* High Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-orange-400 font-semibold">High Risk Threshold</span>
                <span className="font-mono text-white font-bold">{formData.highThreshold}+</span>
              </div>
              <input
                type="range"
                min="50"
                max="80"
                value={formData.highThreshold}
                onChange={(e) => handleChange('highThreshold', Number(e.target.value))}
                className="w-full accent-orange-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">Requires mandatory Tier-2 manual analyst sign-off before settlement.</p>
            </div>

            {/* Medium Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-amber-400 font-semibold">Medium Risk Threshold</span>
                <span className="font-mono text-white font-bold">{formData.mediumThreshold}+</span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                value={formData.mediumThreshold}
                onChange={(e) => handleChange('mediumThreshold', Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">Queued for background heuristic evaluation by Transaction Agent.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                CTR Smurfing Detection Threshold (USD)
              </label>
              <input
                type="number"
                value={formData.ctrLimit}
                onChange={(e) => handleChange('ctrLimit', Number(e.target.value))}
                className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">FinCEN standard: $10,000 CTR statutory limit.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary Regulatory Filing Protocol
              </label>
              <select
                value={formData.reportingJurisdiction}
                onChange={(e) => handleChange('reportingJurisdiction', e.target.value)}
                className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="FinCEN (US Treasury BSA)">FinCEN (US Treasury BSA - Form 111)</option>
                <option value="FATF International Standard">FATF International (Cross-Border Standard)</option>
                <option value="EU 6AMLD Regulatory Standard">EU 6AMLD (European Anti-Money Laundering)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Autonomous AI Interdiction & Policies */}
        <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800/80 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Autonomous Agent Deliberation Policies</h3>
              <p className="text-xs text-slate-400">Control automated interdictions and multi-agent consensus checks.</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-xl bg-[#090e1a] border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={formData.autoFreezeSanctions}
                onChange={(e) => handleChange('autoFreezeSanctions', e.target.checked)}
                className="mt-0.5 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 w-4 h-4"
              />
              <div className="text-xs">
                <span className="font-semibold text-white block">Immediate Automated Freeze on OFAC SDN Hits</span>
                <span className="text-slate-400">If Evidence Verification Agent confirms &gt;95% confidence hit on OFAC SDN list, immediately intercept wire settlement.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-[#090e1a] border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={formData.torExitDetection}
                onChange={(e) => handleChange('torExitDetection', e.target.checked)}
                className="mt-0.5 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 w-4 h-4"
              />
              <div className="text-xs">
                <span className="font-semibold text-white block">Strict Tor Exit & Anonymizing Proxy Penalties</span>
                <span className="text-slate-400">Elevate transaction risk score by +40 points whenever originating IP originates from confirmed darknet/Tor relays.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-[#090e1a] border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={formData.multiAgentConsensus}
                onChange={(e) => handleChange('multiAgentConsensus', e.target.checked)}
                className="mt-0.5 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 w-4 h-4"
              />
              <div className="text-xs">
                <span className="font-semibold text-white block">Mandate Multi-Agent Consensus before SAR Pre-Filing</span>
                <span className="text-slate-400">Requires concurrence from Transaction, Network, and Evidence agents prior to assembling FinCEN Form 111.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Section 3: Analyst Profile & Webhooks */}
        <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800/80 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <Lock className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Analyst Credentials & Dispatch Webhook</h3>
              <p className="text-xs text-slate-400">Identity attached to electronic audit seals and FinCEN submissions.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Lead AML Investigator</label>
              <input
                type="text"
                value={formData.analystName}
                onChange={(e) => handleChange('analystName', e.target.value)}
                className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Security Clearance Profile</label>
              <input
                type="text"
                value={formData.clearanceLevel}
                onChange={(e) => handleChange('clearanceLevel', e.target.value)}
                className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-300 mb-1">Emergency Interdiction Webhook Endpoint</label>
              <input
                type="url"
                value={formData.alertWebhook}
                onChange={(e) => handleChange('alertWebhook', e.target.value)}
                className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Enterprise Defaults</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Configuration Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
