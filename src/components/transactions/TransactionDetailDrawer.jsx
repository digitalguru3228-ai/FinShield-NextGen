import React, { useState } from 'react';
import {
  X,
  Shield,
  ArrowRight,
  AlertTriangle,
  Globe,
  Smartphone,
  Cpu,
  Ban,
  CheckCircle2,
  Flag,
  FileText,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

import { RiskBadge } from '../common/RiskBadge';
import { StatusBadge } from '../common/StatusBadge';
import { useInvestigation } from '../../context/InvestigationContext';
import { InvestigationModal } from './InvestigationModal';

export const TransactionDetailDrawer = ({ transaction, onClose }) => {
  const { updateTransactionStatus } = useInvestigation();

  const [copiedAccount, setCopiedAccount] = useState(null);
  const [showInvestigationModal, setShowInvestigationModal] = useState(false);

  if (!transaction) return null;

  const sender = transaction.sender || {};
  const receiver = transaction.receiver || {};

  const amount = Number(transaction.amount) || 0;
  const currency = transaction.currency || 'INR';

  const riskScore = Number(transaction.riskScore) || 0;

  const transactionType = transaction.transactionType || 'Not available';

  const timestamp = transaction.timestamp
    ? String(transaction.timestamp).replace('T', ' ')
    : 'Not available';

  const dateParts = timestamp.split(' ');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const isSuspicious =
    transaction.status === 'Suspicious' ||
    transaction.status === 'Flagged';

  const isUnderInvestigation =
    transaction.status === 'Under Investigation' ||
    transaction.status === 'Under Review';

  const isHighRisk =
    transaction.riskLevel === 'Critical' ||
    transaction.riskLevel === 'High';

  const scoringType =
    transaction.scoringType || 'Experimental Rule-Based';

  const riskIndicators = Array.isArray(transaction.amlTriggers)
    ? transaction.amlTriggers
    : [];

  const handleCopy = async (text, field) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(String(text));
      setCopiedAccount(field);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch {
      console.error('Unable to copy account information.');
    }
  };

  const handleAnalystReview = () => {
    updateTransactionStatus(transaction.id, 'Under Investigation');
  };

  const handleMarkNormal = () => {
    updateTransactionStatus(transaction.id, 'Normal');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">

        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Drawer */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">

          <div className="w-screen max-w-xl bg-[#0a101d] border-l border-slate-800 shadow-2xl flex flex-col">

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 bg-[#0d1527] flex items-center justify-between">

              <div>
                <div className="flex flex-wrap items-center gap-2">

                  <span className="font-mono text-sm font-bold text-white tracking-wide">
                    {transaction.id}
                  </span>

                  <RiskBadge
                    level={transaction.riskLevel}
                    score={riskScore}
                    size="sm"
                  />

                  <StatusBadge
                    status={transaction.status}
                    size="sm"
                  />

                </div>

                <p className="text-xs text-slate-400 mt-1 font-mono">
                  {timestamp}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs text-slate-300">

              {/* Demo Notice */}
              <div className="px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11px] text-cyan-300 flex items-center gap-2">

                <Sparkles className="w-3.5 h-3.5 shrink-0 text-cyan-400" />

                <span>
                  Demo Transaction Record • SQLite Backend
                </span>

              </div>

              {/* Amount & Risk Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0f1b33] to-[#0d162a] border border-blue-500/20 flex items-center justify-between gap-3">

                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-400">
                    Total Transaction Amount
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                    {formatCurrency(amount)}
                  </h2>

                  <p className="text-[11px] text-cyan-400 mt-1">
                    Transaction Type: {transactionType}
                  </p>
                </div>

                <div className="text-right shrink-0">

                  <p className="text-[10px] uppercase font-semibold text-slate-400">
                    Risk Score
                  </p>

                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {riskScore}
                  </span>

                  <span className="text-xs text-slate-400">
                    /100
                  </span>

                  <p className="text-[10px] text-slate-500 mt-1">
                    Rule-Based
                  </p>

                </div>

              </div>

              {/* Risk Classification */}
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">

                <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">

                  <AlertTriangle className="w-4 h-4" />

                  <span>Risk Assessment</span>

                </div>

                <p className="text-sm font-semibold text-slate-200 mt-2">
                  {transaction.fraudCategory || 'No rule-based anomaly detected'}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[10px]">
                    Risk Level: {transaction.riskLevel || 'Low'}
                  </span>

                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[10px]">
                    {scoringType}
                  </span>

                </div>

                <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                  Risk indicators identify suspicious transaction patterns.
                  They do not confirm fraud.
                </p>

              </div>

              {/* Transaction Information */}
              <div className="space-y-3">

                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Transaction Information
                </h4>

                <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 space-y-3">

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-400">Transaction ID</span>
                    <span className="text-white font-mono text-right">
                      {transaction.id}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-400">Transaction Type</span>
                    <span className="text-white">
                      {transactionType}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-400">Date</span>
                    <span className="text-white font-mono">
                      {dateParts[0] || 'Not available'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-400">Time</span>
                    <span className="text-white font-mono">
                      {dateParts[1] || 'Not available'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-400">Data Source</span>
                    <span className="text-emerald-400">
                      {transaction.dataSource || 'SQLite Backend'}
                    </span>
                  </div>

                </div>
              </div>

              {/* Sender & Receiver */}
              <div className="space-y-3">

                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Counterparty Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {/* Sender */}
                  <div className="p-3.5 rounded-xl bg-[#0d1424] border border-slate-800 space-y-2">

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-white">
                        Originating Sender
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-white truncate">
                      {sender.name || 'Not available'}
                    </p>

                    <div className="text-xs font-mono text-slate-400 flex items-center justify-between bg-[#090e1a] p-1.5 rounded border border-slate-800">

                      <span className="truncate">
                        {sender.account || 'Not available'}
                      </span>

                      {sender.account && (
                        <button
                          onClick={() => handleCopy(sender.account, 'sender')}
                          className="hover:text-blue-400 p-0.5 ml-1"
                          title="Copy Account"
                        >
                          {copiedAccount === 'sender' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                    </div>

                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">

                      <p>
                        Country: {sender.country || 'Not available'}
                      </p>

                      <p className="mt-1">
                        Bank: {sender.bank || 'Not available'}
                      </p>

                      <p className="mt-1">
                        Account Type: {sender.type || 'Not available'}
                      </p>

                    </div>

                  </div>

                  {/* Receiver */}
                  <div className="p-3.5 rounded-xl bg-[#0d1424] border border-slate-800 space-y-2">

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-white">
                        Beneficiary Receiver
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-white truncate">
                      {receiver.name || 'Not available'}
                    </p>

                    <div className="text-xs font-mono text-slate-400 flex items-center justify-between bg-[#090e1a] p-1.5 rounded border border-slate-800">

                      <span className="truncate">
                        {receiver.account || 'Not available'}
                      </span>

                      {receiver.account && (
                        <button
                          onClick={() => handleCopy(receiver.account, 'receiver')}
                          className="hover:text-blue-400 p-0.5 ml-1"
                          title="Copy Account"
                        >
                          {copiedAccount === 'receiver' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                    </div>

                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">

                      <p>
                        Country: {receiver.country || 'Not available'}
                      </p>

                      <p className="mt-1">
                        Bank: {receiver.bank || 'Not available'}
                      </p>

                      <p className="mt-1">
                        Account Type: {receiver.type || 'Not available'}
                      </p>

                    </div>

                  </div>

                </div>
              </div>

              {/* Risk Indicators */}
              <div className="space-y-2.5">

                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Rule-Based Risk Indicators ({riskIndicators.length})
                </h4>

                <div className="space-y-2">

                  {riskIndicators.length > 0 ? (

                    riskIndicators.map((trigger, idx) => (

                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 flex items-start gap-2.5 text-xs text-slate-300"
                      >

                        <span className="text-red-400 shrink-0 mt-0.5 font-bold">
                          #{idx + 1}
                        </span>

                        <span className="leading-relaxed">
                          {trigger}
                        </span>

                      </div>

                    ))

                  ) : (

                    <p className="text-xs text-emerald-400 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
                      No rule-based anomaly indicators were detected for this transaction.
                    </p>

                  )}

                </div>
              </div>

              {/* Device Information */}
              {transaction.device && (
                <div className="space-y-2.5">

                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Forensic Device Information
                  </h4>

                  <div className="p-3.5 rounded-xl bg-[#0d1424] border border-slate-800 space-y-3 text-xs">

                    <div className="grid grid-cols-2 gap-3">

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          IP Address
                        </span>
                        <span className="font-mono">
                          {transaction.device.ip || 'Not available'}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Location
                        </span>
                        <span>
                          {transaction.device.location || 'Not available'}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Tor Exit Relay
                        </span>
                        <span>
                          {transaction.device.isTor ? 'Detected' : 'Not detected'}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Commercial VPN
                        </span>
                        <span>
                          {transaction.device.isVpn ? 'Active' : 'Not detected'}
                        </span>
                      </div>

                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0d1527] space-y-2.5">

              {/* Investigation Button */}
              {(isSuspicious || isUnderInvestigation || isHighRisk) && (

                <button
                  onClick={() => setShowInvestigationModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Investigate Suspicious Transaction</span>
                </button>

              )}

              {/* Analyst Review Actions */}
              <div className="grid grid-cols-2 gap-2">

                <button
                  onClick={handleAnalystReview}
                  disabled={isUnderInvestigation}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Flag className="w-3.5 h-3.5" />
                  Mark for Review
                </button>

                <button
                  onClick={handleMarkNormal}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mark as Normal
                </button>

              </div>

              <p className="text-[10px] text-slate-500 text-center">
                Analyst status changes are currently maintained in frontend state only.
              </p>

            </div>

          </div>
        </div>
      </div>

      {/* Investigation Modal */}
      {showInvestigationModal && (

        <InvestigationModal
          transaction={transaction}
          isOpen={showInvestigationModal}
          onClose={() => setShowInvestigationModal(false)}
        />

      )}

    </>
  );
};