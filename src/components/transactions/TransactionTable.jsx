import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  Eye,
  Cpu,
  Download,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  Copy,
  Check,
  SlidersHorizontal,
  Calendar,
  AlertTriangle
} from 'lucide-react';

import { RiskBadge } from '../common/RiskBadge';
import { StatusBadge } from '../common/StatusBadge';
import { useInvestigation } from '../../context/InvestigationContext';
import { InvestigationModal } from './InvestigationModal';

export const TransactionTable = ({
  limit,
  showFilters = true,
  initialSearch = "",
  statusFilter = 'ALL'
}) => {
  const { transactions, setSelectedTransaction } = useInvestigation();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [searchField, setSearchField] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');

  // Modal for Investigation Action
  const [investigatingTxn, setInvestigatingTxn] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (e, text, id) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Currency Formatter
  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(amount) || 0);
  };

  // Date Formatter
  const formatDate = (timestamp) => {
    if (!timestamp) return { date: 'N/A', time: '' };

    const normalizedTimestamp = String(timestamp).replace('T', ' ');
    const parts = normalizedTimestamp.split(' ');

    return {
      date: parts[0] || 'N/A',
      time: parts[1] || ''
    };
  };

  // Comprehensive Filter & Sorting Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {

      // Fixed status filter supplied by parent page
      if (statusFilter !== 'ALL') {
        const statusNormalized = String(txn.status || '')
          .toUpperCase()
          .replace(/\s+/g, '_');

        if (
          statusFilter === 'SUSPICIOUS' &&
          !['SUSPICIOUS', 'FLAGGED'].includes(statusNormalized)
        ) {
          return false;
        }

        if (
          statusFilter === 'NORMAL' &&
          !['NORMAL', 'CLEARED'].includes(statusNormalized)
        ) {
          return false;
        }
      }

      // Search Logic
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();

        if (searchField === 'ID') {
          if (!txn.id.toLowerCase().includes(query)) return false;

        } else if (searchField === 'SENDER') {
          const matchesSenderName = txn.sender.name.toLowerCase().includes(query);
          const matchesSenderAcc = txn.sender.account.toLowerCase().includes(query);

          if (!matchesSenderName && !matchesSenderAcc) return false;

        } else if (searchField === 'RECEIVER') {
          const matchesReceiverName = txn.receiver.name.toLowerCase().includes(query);
          const matchesReceiverAcc = txn.receiver.account.toLowerCase().includes(query);

          if (!matchesReceiverName && !matchesReceiverAcc) return false;

        } else {
          const matchesId = txn.id.toLowerCase().includes(query);

          const matchesSender =
            txn.sender.name.toLowerCase().includes(query) ||
            txn.sender.account.toLowerCase().includes(query);

          const matchesReceiver =
            txn.receiver.name.toLowerCase().includes(query) ||
            txn.receiver.account.toLowerCase().includes(query);

          const matchesCategory = txn.fraudCategory?.toLowerCase().includes(query);

          const matchesCountry =
            txn.sender.country?.toLowerCase().includes(query) ||
            txn.receiver.country?.toLowerCase().includes(query);

          if (
            !matchesId &&
            !matchesSender &&
            !matchesReceiver &&
            !matchesCategory &&
            !matchesCountry
          ) {
            return false;
          }
        }
      }

      // Filter by Risk Level
      if (selectedRisk !== 'ALL') {
        if (txn.riskLevel.toUpperCase() !== selectedRisk) {
          return false;
        }
      }

      // Filter by Transaction Status
      if (selectedStatus !== 'ALL') {
        const statusNormalized = txn.status.toUpperCase().replace(/\s+/g, '_');

        if (
          selectedStatus === 'NORMAL' &&
          statusNormalized !== 'NORMAL' &&
          statusNormalized !== 'CLEARED'
        ) {
          return false;
        }

        if (
          selectedStatus === 'SUSPICIOUS' &&
          statusNormalized !== 'SUSPICIOUS' &&
          statusNormalized !== 'FLAGGED'
        ) {
          return false;
        }

        if (
          selectedStatus === 'UNDER_INVESTIGATION' &&
          statusNormalized !== 'UNDER_INVESTIGATION' &&
          statusNormalized !== 'UNDER_REVIEW'
        ) {
          return false;
        }

        if (
          selectedStatus === 'BLOCKED' &&
          statusNormalized !== 'BLOCKED'
        ) {
          return false;
        }
      }

      return true;

    }).sort((a, b) => {

      let comparison = 0;

      if (sortField === 'timestamp') {
        comparison =
          new Date(b.timestamp).getTime() -
          new Date(a.timestamp).getTime();

      } else if (sortField === 'amount') {
        comparison = b.amount - a.amount;

      } else if (sortField === 'riskScore') {
        comparison = b.riskScore - a.riskScore;

      } else if (sortField === 'id') {
        comparison = b.id.localeCompare(a.id);
      }

      return sortDirection === 'asc' ? -comparison : comparison;

    });

  }, [
    transactions,
    searchTerm,
    searchField,
    selectedRisk,
    selectedStatus,
    statusFilter,
    sortField,
    sortDirection
  ]);

  const displayedTransactions = limit
    ? filteredTransactions.slice(0, limit)
    : filteredTransactions;

  // Toggle Header Sort
  const handleHeaderSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSearchField('ALL');
    setSelectedRisk('ALL');
    setSelectedStatus('ALL');
    setSortField('timestamp');
    setSortDirection('desc');
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "Transaction ID",
      "Sender Name",
      "Sender Account",
      "Sender Country",
      "Receiver Name",
      "Receiver Account",
      "Receiver Country",
      "Amount",
      "Currency",
      "Transaction Type",
      "Date & Time",
      "Risk Score",
      "Risk Level",
      "Status",
      "Fraud Category"
    ];

    const rows = filteredTransactions.map(t => [
      `"${t.id}"`,
      `"${t.sender.name}"`,
      `"${t.sender.account}"`,
      `"${t.sender.country}"`,
      `"${t.receiver.name}"`,
      `"${t.receiver.account}"`,
      `"${t.receiver.country}"`,
      t.amount,
      `"${t.currency}"`,
      `"${t.transactionType || 'Transaction'}"`,
      `"${t.timestamp}"`,
      t.riskScore,
      `"${t.riskLevel}"`,
      `"${t.status}"`,
      `"${t.fraudCategory || ''}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `FinShield_Transactions_Export_${new Date().toISOString().slice(0, 10)}.csv`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isFiltered =
    searchTerm ||
    searchField !== 'ALL' ||
    selectedRisk !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    sortField !== 'timestamp';

  return (
    <div className="space-y-4">

      {/* Search and Filters Toolbar */}
      {showFilters && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1424] border border-slate-800/80 shadow-xl space-y-4">

          {/* Row 1: Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {/* Search Scope Selector */}
            <div className="md:col-span-3">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Search Scope
              </label>

              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="w-full bg-[#090e1a] border border-slate-700/80 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 font-sans transition-colors"
              >
                <option value="ALL">All Fields</option>
                <option value="ID">Search by Transaction ID</option>
                <option value="SENDER">Search by Sender Account</option>
                <option value="RECEIVER">Search by Receiver Account</option>
              </select>
            </div>

            {/* Search Query Input */}
            <div className="md:col-span-5">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Search Query
              </label>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={
                    searchField === 'ID'
                      ? "Enter Transaction ID (e.g. TXN-2026-8941)..."
                      : searchField === 'SENDER'
                      ? "Enter Sender Account or Name..."
                      : searchField === 'RECEIVER'
                      ? "Enter Receiver Account or Name..."
                      : "Search by ID, sender, receiver account, or country..."
                  }
                  className="w-full bg-[#090e1a] border border-slate-700/80 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-sans"
                />

                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Quick Sort By Dropdown */}
            <div className="md:col-span-4">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Sort Transactions
              </label>

              <select
                value={`${sortField}_${sortDirection}`}
                onChange={(e) => {
                  const [field, dir] = e.target.value.split('_');
                  setSortField(field);
                  setSortDirection(dir);
                }}
                className="w-full bg-[#090e1a] border border-slate-700/80 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 font-sans transition-colors"
              >
                <option value="amount_desc">Sort by Amount: High to Low</option>
                <option value="amount_asc">Sort by Amount: Low to High</option>
                <option value="riskScore_desc">Sort by Risk Score: High to Low</option>
                <option value="riskScore_asc">Sort by Risk Score: Low to High</option>
                <option value="timestamp_desc">Sort by Date & Time: Newest First</option>
                <option value="timestamp_asc">Sort by Date & Time: Oldest First</option>
                <option value="id_asc">Sort by Transaction ID</option>
              </select>
            </div>
          </div>

          {/* Row 2: Filter Pills & Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">

            <div className="flex flex-wrap items-center gap-3">

              {/* Risk Level Filter Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium">Risk Level:</span>

                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  className="bg-[#090e1a] border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">All Risk Levels</option>
                  <option value="CRITICAL">Critical Risk (&gt;85)</option>
                  <option value="HIGH">High Risk (65-84)</option>
                  <option value="MEDIUM">Medium Risk (40-64)</option>
                  <option value="LOW">Low Risk (&lt;40)</option>
                </select>
              </div>

              {/* Status Filter Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium">Status:</span>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#090e1a] border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NORMAL">Normal</option>
                  <option value="SUSPICIOUS">Suspicious</option>
                  <option value="UNDER_INVESTIGATION">Under Investigation</option>
                  <option value="BLOCKED">Blocked</option>
                </select>
              </div>
            </div>

            {/* Export and Reset Buttons */}
            <div className="flex items-center gap-2">

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                title="Export Filtered Transactions to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/40 text-red-300 text-xs font-medium border border-red-500/30 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span>
              Showing{' '}
              <strong className="text-white font-mono">
                {displayedTransactions.length}
              </strong>{' '}
              of{' '}
              <span className="font-mono">{transactions.length}</span>{' '}
              recorded demo transactions
            </span>

            <span className="text-[11px] font-mono text-cyan-400/80 hidden sm:inline">
              Click any row to open forensic detail drawer
            </span>
          </div>
        </div>
      )}

      {/* Main Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-[#0d1424] shadow-xl">

        <table className="w-full text-left text-xs border-collapse">

          <thead className="bg-[#090f1d] border-b border-slate-800 text-slate-400 uppercase font-semibold tracking-wider text-[11px] select-none">
            <tr>

              <th className="py-3.5 px-4 whitespace-nowrap">
                <button
                  onClick={() => handleHeaderSort('id')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Transaction ID</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>

              <th className="py-3.5 px-4 min-w-[190px]">
                <span>Sender Account</span>
              </th>

              <th className="py-3.5 px-4 min-w-[190px]">
                <span>Receiver Account</span>
              </th>

              <th className="py-3.5 px-4 whitespace-nowrap">
                <button
                  onClick={() => handleHeaderSort('amount')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Amount</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>

              <th className="py-3.5 px-4 whitespace-nowrap">
                <button
                  onClick={() => handleHeaderSort('timestamp')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Date & Time</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>

              <th className="py-3.5 px-4 whitespace-nowrap">
                <button
                  onClick={() => handleHeaderSort('riskScore')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Risk Score</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>

              <th className="py-3.5 px-4 whitespace-nowrap">
                <span>Risk Level</span>
              </th>

              <th className="py-3.5 px-4 whitespace-nowrap">
                <span>Status</span>
              </th>

              <th className="py-3.5 px-4 text-right whitespace-nowrap">
                <span>Action</span>
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60 font-sans">

            {displayedTransactions.length > 0 ? (

              displayedTransactions.map((txn) => {

                const isCriticalOrHigh =
                  txn.riskLevel === 'Critical' ||
                  txn.riskLevel === 'High';

                const isSuspicious =
                  txn.status === 'Suspicious' ||
                  txn.status === 'Flagged';

                const isUnderInvestigation =
                  txn.status === 'Under Investigation' ||
                  txn.status === 'Under Review';

                const transactionDate = formatDate(txn.timestamp);

                return (
                  <tr
                    key={txn.id}
                    onClick={() => setSelectedTransaction(txn)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                  >

                    {/* Transaction ID */}
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">

                      <div className="flex items-center gap-1.5">

                        <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {txn.id}
                        </span>

                        <button
                          onClick={(e) => handleCopy(e, txn.id, txn.id)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-blue-300 transition-opacity"
                          title="Copy Transaction ID"
                        >
                          {copiedId === txn.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>

                      </div>

                      <span className="text-[10px] text-slate-400 block font-sans">
                        {txn.transactionType || 'Transaction'}
                      </span>

                    </td>

                    {/* Sender Account */}
                    <td className="py-3.5 px-4 max-w-[210px]">

                      <div
                        className="font-medium text-slate-100 truncate"
                        title={txn.sender.name}
                      >
                        {txn.sender.name}
                      </div>

                      <div
                        className="text-[10px] text-slate-400 font-mono truncate"
                        title={txn.sender.account}
                      >
                        {txn.sender.account}
                      </div>

                      <span className="text-[10px] text-slate-400 inline-block font-sans">
                        {txn.sender.country}
                      </span>

                    </td>

                    {/* Receiver Account */}
                    <td className="py-3.5 px-4 max-w-[210px]">

                      <div
                        className="font-medium text-slate-100 truncate"
                        title={txn.receiver.name}
                      >
                        {txn.receiver.name}
                      </div>

                      <div
                        className="text-[10px] text-slate-400 font-mono truncate"
                        title={txn.receiver.account}
                      >
                        {txn.receiver.account}
                      </div>

                      <span className="text-[10px] text-slate-400 inline-block font-sans">
                        {txn.receiver.country}
                      </span>

                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 font-mono font-bold text-white text-sm whitespace-nowrap">
                      {formatCurrency(txn.amount, txn.currency)}
                    </td>

                    {/* Date and Time */}
                    <td className="py-3.5 px-4 text-slate-300 font-mono whitespace-nowrap text-[11px]">

                      <div>{transactionDate.date}</div>

                      <div className="text-[10px] text-slate-400">
                        {transactionDate.time}
                      </div>

                    </td>

                    {/* Risk Score */}
                    <td className="py-3.5 px-4 whitespace-nowrap">

                      <div className="flex items-center gap-2">

                        <span
                          className={`font-mono font-bold text-xs ${
                            txn.riskScore >= 85
                              ? 'text-red-400'
                              : txn.riskScore >= 65
                              ? 'text-orange-400'
                              : txn.riskScore >= 40
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {txn.riskScore}/100
                        </span>

                        <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">

                          <div
                            className={`h-full rounded-full ${
                              txn.riskScore >= 85
                                ? 'bg-red-500'
                                : txn.riskScore >= 65
                                ? 'bg-orange-500'
                                : txn.riskScore >= 40
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${txn.riskScore}%` }}
                          />

                        </div>

                      </div>

                    </td>

                    {/* Risk Level */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <RiskBadge level={txn.riskLevel} />
                    </td>

                    {/* Transaction Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={txn.status} />
                    </td>

                    {/* Action */}
                    <td
                      className="py-3.5 px-4 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >

                      <div className="flex items-center justify-end gap-1.5">

                        {(isSuspicious || isUnderInvestigation || isCriticalOrHigh) ? (
                          <button
                            onClick={() => setInvestigatingTxn(txn)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all shadow-sm"
                            title="Open Investigation Interface"
                          >
                            <Cpu className="w-3.5 h-3.5" />
                            <span>Investigate</span>
                          </button>
                        ) : null}

                        <button
                          onClick={() => setSelectedTransaction(txn)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                          title="View Complete Forensic Dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                      </div>

                    </td>

                  </tr>
                );

              })

            ) : (

              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400">

                  <ShieldAlert className="w-9 h-9 text-slate-600 mx-auto mb-2" />

                  <p className="text-sm font-semibold text-slate-300">
                    No transactions match the selected filter criteria
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Try clearing your search query or selecting "All Risk Levels" and "All Statuses"
                  </p>

                  <button
                    onClick={handleResetFilters}
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-blue-400 font-medium transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset All Filters
                  </button>

                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Investigation Action Modal */}
      {investigatingTxn && (
        <InvestigationModal
          transaction={investigatingTxn}
          isOpen={!!investigatingTxn}
          onClose={() => setInvestigatingTxn(null)}
        />
      )}

    </div>
  );
};