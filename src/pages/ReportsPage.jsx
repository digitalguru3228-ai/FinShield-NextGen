import React, { useMemo, useState } from 'react';
import {
  FileCheck2,
  FilePlus,
  Search,
  Eye,
  AlertTriangle,
  Building2,
  RefreshCw,
  ShieldAlert,
  IndianRupee
} from 'lucide-react';

import { useInvestigation } from '../context/InvestigationContext';
import { RiskBadge } from '../components/common/RiskBadge';
import { ReportDetailModal } from '../components/reports/ReportDetailModal';
import { CreateReportModal } from '../components/reports/CreateReportModal';

export const ReportsPage = () => {
  const {
    transactions = [],
    transactionLoading,
    transactionError,
    refreshTransactions,
    reports = [],
    selectedReport,
    setSelectedReport
  } = useInvestigation();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Only retain reports created manually using the new prototype modal.
  // Old hardcoded demonstration reports are intentionally excluded.
  const manualReports = useMemo(() => {
    return reports.filter(
      report =>
        report.isDemo === true &&
        report.dataSource === 'Manually Created Demonstration Record'
    );
  }, [reports]);

  // Generate investigation reports from backend suspicious transactions.
  const backendReports = useMemo(() => {
    return transactions
      .filter(transaction => transaction.status === 'Suspicious')
      .map(transaction => {
        const reasons = Array.isArray(transaction.amlTriggers)
          ? transaction.amlTriggers
          : [];

        const riskLevel = transaction.riskLevel || 'Medium';

        const riskScore = Number(transaction.riskScore || 0);

        const priority =
          riskLevel === 'Critical' || riskScore >= 85
            ? 'Critical'
            : riskLevel === 'High' || riskScore >= 65
              ? 'High'
              : 'Medium';

        const transactionId = transaction.id || 'UNKNOWN';

        return {
          id: `INV-${transactionId}`,

          title: `Suspicious Transaction Investigation - ${transactionId}`,

          suspectEntity:
            `${transaction.sender?.account || 'Unknown'} → ${transaction.receiver?.account || 'Unknown'}`,

          primaryOffense:
            reasons.length > 0
              ? reasons.join(', ')
              : 'Rule-Based Transaction Anomaly',

          filingStatus: 'Under Review',

          filingDate: transaction.timestamp
            ? String(transaction.timestamp).slice(0, 10)
            : new Date().toISOString().slice(0, 10),

          priority,

          riskScore,

          amountExposed: Number(transaction.amount || 0),

          leadInvestigator: 'Investigation Analyst',

          aiConfidence: null,

          jurisdictions: ['India'],

          narrative:
            `Transaction ${transactionId} was flagged by FinShield's experimental rule-based anomaly detection system.\n\n` +
            `Sender Account: ${transaction.sender?.account || 'Not available'}\n` +
            `Receiver Account: ${transaction.receiver?.account || 'Not available'}\n` +
            `Transaction Amount: ₹${Number(transaction.amount || 0).toLocaleString('en-IN')}\n` +
            `Transaction Type: ${transaction.transactionType || 'Not available'}\n` +
            `Risk Level: ${riskLevel}\n\n` +
            `Detected Indicators:\n${reasons.length ? reasons.map(reason => `• ${reason}`).join('\n') : 'No additional reason available.'}\n\n` +
            `This is a prototype investigation record. The detected pattern is not confirmation of fraud and requires human analyst verification.`,

          timeline: [
            {
              time: transaction.timestamp || 'Not available',
              event: `Transaction ${transactionId} received from the backend and flagged for analyst review.`
            }
          ],

          violations: reasons,

          exhibits: [
            {
              name: `Transaction ${transactionId}`,
              type: 'Backend Transaction Record',
              size: 'Database Record'
            }
          ],

          recommendation:
            'Review the transaction details, verify the sender and receiver accounts, and examine related transaction patterns before making any decision.',

          dataSource: 'SQLite Backend',

          currency: 'INR',

          isDemo: true
        };
      });
  }, [transactions]);

  // Combine backend-generated reports with manually created reports.
  const allReports = useMemo(() => {
    const backendIds = new Set(backendReports.map(report => report.id));

    const uniqueManualReports = manualReports.filter(
      report => !backendIds.has(report.id)
    );

    return [...backendReports, ...uniqueManualReports];
  }, [backendReports, manualReports]);

  // Search and status filtering.
  const filteredReports = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return allReports.filter(report => {
      const searchableFields = [
        report.id,
        report.title,
        report.suspectEntity,
        report.primaryOffense
      ];

      const matchesSearch =
        !query ||
        searchableFields.some(value =>
          String(value || '').toLowerCase().includes(query)
        );

      const matchesStatus =
        statusFilter === 'ALL' ||
        String(report.filingStatus || '').toUpperCase() ===
          statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [allReports, searchTerm, statusFilter]);

  // Dashboard metrics.
  const totalAmountReviewed = allReports.reduce(
    (total, report) => total + Number(report.amountExposed || 0),
    0
  );

  const analystReviewCount = allReports.filter(
    report => report.filingStatus === 'Under Review'
  ).length;

  const formatCurrency = amount =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(amount || 0));

  const statusColors = {
    'Under Review':
      'bg-sky-500/20 text-sky-400 border-sky-500/30',

    Draft:
      'bg-slate-700/40 text-slate-300 border-slate-600',

    Closed:
      'bg-slate-800 text-slate-400 border-slate-700',

    'FinCEN Submitted':
      'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <div className="flex items-center gap-2 flex-wrap">

            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Investigation Reports & Case Dossiers
            </h1>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-sky-500/30">
              PROTOTYPE
            </span>

          </div>

          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review suspicious transactions, investigation summaries,
            risk indicators and supporting evidence.
          </p>
        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={refreshTransactions}
            disabled={transactionLoading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${transactionLoading ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30"
          >
            <FilePlus className="w-4 h-4" />
            Create Investigation Report
          </button>

        </div>

      </div>

      {/* DEMONSTRATION NOTICE */}
      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/30 flex items-start gap-3">

        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />

        <div>
          <p className="text-xs font-bold text-amber-400">
            Prototype Investigation Reports
          </p>

          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Reports are generated from backend transaction records flagged
            by experimental rule-based anomaly detection. They do not
            represent confirmed fraud or actual regulatory filings.
            Human analyst verification is required.
          </p>
        </div>

      </div>

      {/* BACKEND ERROR */}
      {transactionError && (
        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/30">
          <p className="text-sm font-semibold text-red-400">
            Unable to load backend transactions
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {transactionError}
          </p>

          <button
            onClick={refreshTransactions}
            className="mt-3 text-xs text-blue-400 hover:text-blue-300 font-semibold"
          >
            Retry connection
          </button>
        </div>
      )}

      {/* METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
          <span className="text-[10px] uppercase font-semibold text-slate-400">
            Total Reports
          </span>

          <p className="text-2xl font-bold font-mono text-white mt-1">
            {transactionLoading ? '...' : allReports.length}
          </p>

          <span className="text-[10px] text-slate-400">
            Backend + Manual Records
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
          <span className="text-[10px] uppercase font-semibold text-slate-400">
            Suspicious Transactions
          </span>

          <p className="text-2xl font-bold font-mono text-amber-400 mt-1">
            {transactionLoading
              ? '...'
              : backendReports.length}
          </p>

          <span className="text-[10px] text-slate-400">
            Flagged by backend rules
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
          <span className="text-[10px] uppercase font-semibold text-slate-400">
            Total Amount Reviewed
          </span>

          <p className="text-lg sm:text-xl font-bold font-mono text-cyan-400 mt-1 break-all">
            {formatCurrency(totalAmountReviewed)}
          </p>

          <span className="text-[10px] text-slate-400">
            Across displayed reports
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
          <span className="text-[10px] uppercase font-semibold text-slate-400">
            Analyst Review
          </span>

          <p className="text-xl font-bold font-mono text-blue-400 mt-1">
            {analystReviewCount} Required
          </p>

          <span className="text-[10px] text-amber-400">
            Human verification
          </span>
        </div>

      </div>

      {/* SEARCH AND FILTER */}
      <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">

        <div className="relative flex-1 max-w-md">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search reports by ID, account, title or indicator..."
            className="w-full bg-[#090e1a] border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />

        </div>

        <div className="flex items-center gap-2">

          <span className="text-xs text-slate-400">
            Report Status:
          </span>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-[#090e1a] border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">
              All Statuses ({allReports.length})
            </option>

            <option value="Under Review">Under Review</option>
            <option value="Draft">Draft</option>
            <option value="Closed">Closed</option>
          </select>

        </div>

      </div>

      {/* REPORT COUNT */}
      <div className="flex items-center justify-between">

        <p className="text-xs text-slate-400">
          Showing{' '}
          <span className="text-white font-semibold">
            {filteredReports.length}
          </span>{' '}
          of {allReports.length} reports
        </p>

        <span className="text-[10px] font-mono text-cyan-400">
          BACKEND-DERIVED DATA
        </span>

      </div>

      {/* LOADING */}
      {transactionLoading && (
        <div className="p-10 text-center bg-[#0d1424] border border-slate-800 rounded-xl">

          <RefreshCw className="w-6 h-6 text-blue-400 animate-spin mx-auto" />

          <p className="text-sm text-slate-400 mt-3">
            Loading backend transactions...
          </p>

        </div>
      )}

      {/* REPORT CARDS */}
      {!transactionLoading && !transactionError && (
        <>
          {filteredReports.length === 0 ? (

            <div className="p-12 text-center bg-[#0d1424] border border-slate-800 rounded-xl">

              <FileCheck2 className="w-10 h-10 text-slate-600 mx-auto" />

              <h3 className="text-sm font-bold text-slate-300 mt-3">
                No Investigation Reports Found
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                No reports match your search or status filter.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {filteredReports.map(report => (

                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800/80 hover:border-slate-600 cursor-pointer transition-all shadow-xl flex flex-col justify-between group space-y-4"
                >

                  <div>

                    {/* CARD HEADER */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">

                      <div className="flex items-center gap-2 flex-wrap">

                        <span className="font-mono text-xs font-bold text-white group-hover:text-blue-400">
                          {report.id}
                        </span>

                        <span
                          className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                            statusColors[report.filingStatus] ||
                            statusColors.Draft
                          }`}
                        >
                          {report.filingStatus || 'Draft'}
                        </span>

                      </div>

                      <RiskBadge
                        level={report.priority || 'Medium'}
                        score={report.riskScore || 0}
                        size="sm"
                      />

                    </div>

                    {/* TITLE */}
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-300 mt-3 leading-snug">
                      {report.title}
                    </h3>

                    {/* ENTITY AND OFFENSE */}
                    <div className="mt-3 space-y-2 text-xs text-slate-400">

                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />

                        <span className="truncate">
                          Account:{' '}
                          <strong className="text-slate-200">
                            {report.suspectEntity}
                          </strong>
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />

                        <span className="line-clamp-2">
                          Risk Indicator: {report.primaryOffense}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* CARD FOOTER */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">
                        Amount Reviewed
                      </span>

                      <span className="text-sm font-mono font-bold text-cyan-400">
                        {formatCurrency(report.amountExposed)}
                      </span>
                    </div>

                    <div className="text-right">

                      <span className="text-[10px] text-slate-400 uppercase block">
                        Review Status
                      </span>

                      <span className="text-xs font-mono font-bold text-amber-400">
                        Analyst Review
                      </span>

                    </div>

                    <button
                      onClick={event => {
                        event.stopPropagation();
                        setSelectedReport(report);
                      }}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Examine
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}
        </>
      )}

      {/* REPORT DETAIL MODAL */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}

      {/* CREATE REPORT MODAL */}
      <CreateReportModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

    </div>
  );
};