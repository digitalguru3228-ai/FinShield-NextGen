import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionDetailDrawer } from '../components/transactions/TransactionDetailDrawer';
import { StatCard } from '../components/common/StatCard';
import { useInvestigation } from '../context/InvestigationContext';

import {
  ArrowLeftRight,
  CheckCircle2,
  AlertTriangle,
  SearchCode,
  Sparkles
} from 'lucide-react';

export const TransactionsPage = () => {
  const [searchParams] = useSearchParams();

  const {
    transactions = [],
    selectedTransaction,
    setSelectedTransaction
  } = useInvestigation();

  const querySearch = searchParams.get('search') || '';

  // Safely calculate transaction amount
  const getAmount = (transaction) => {
    return Number(transaction.amount) || 0;
  };

  // Normalize transaction status
  const getStatus = (transaction) => {
    const status = String(
      transaction.status || transaction.risk_level || 'Normal'
    ).toLowerCase();

    if (
      status.includes('suspicious') ||
      status.includes('flagged') ||
      status.includes('high') ||
      status.includes('critical')
    ) {
      return 'Suspicious';
    }

    if (
      status.includes('investigation') ||
      status.includes('review') ||
      status.includes('medium')
    ) {
      return 'Under Investigation';
    }

    return 'Normal';
  };

  // Total transaction statistics
  const totalCount = transactions.length;

  const totalAmount = transactions.reduce(
    (total, transaction) => total + getAmount(transaction),
    0
  );

  // Normal transactions
  const normalTransactions = transactions.filter(
    transaction => getStatus(transaction) === 'Normal'
  );

  const normalCount = normalTransactions.length;

  const normalAmount = normalTransactions.reduce(
    (total, transaction) => total + getAmount(transaction),
    0
  );

  // Suspicious transactions
  const suspiciousTransactions = transactions.filter(
    transaction => getStatus(transaction) === 'Suspicious'
  );

  const suspiciousCount = suspiciousTransactions.length;

  const suspiciousAmount = suspiciousTransactions.reduce(
    (total, transaction) => total + getAmount(transaction),
    0
  );

  // Transactions under investigation
  const underInvestigationTransactions = transactions.filter(
    transaction => getStatus(transaction) === 'Under Investigation'
  );

  const underInvestigationCount = underInvestigationTransactions.length;

  const underInvestigationAmount = underInvestigationTransactions.reduce(
    (total, transaction) => total + getAmount(transaction),
    0
  );

  // Currency formatting
  const formatCurrency = (amount) => {
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <div className="flex items-center gap-2.5 flex-wrap">

            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Transaction Monitoring
            </h1>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-sky-500/30 uppercase">
              Transaction Ledger
            </span>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Prototype Data
            </span>

          </div>

          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor incoming and outgoing transactions, identify suspicious
            activity, and review risk indicators.
          </p>
        </div>

        {/* Data Notice */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-cyan-300">

          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />

          <span className="font-mono text-[11px]">
            TRANSACTION RECORDS • {totalCount} Records
          </span>

        </div>

      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Transactions */}
        <StatCard
          title="Total Transactions"
          value={totalCount.toString()}
          change={formatCurrency(totalAmount)}
          isPositive={true}
          subtext="Total Transaction Volume"
          icon={ArrowLeftRight}
          accent="blue"
        />

        {/* Normal Transactions */}
        <StatCard
          title="Normal Transactions"
          value={normalCount.toString()}
          change={formatCurrency(normalAmount)}
          isPositive={true}
          subtext="No Current Risk Indicators"
          icon={CheckCircle2}
          accent="green"
        />

        {/* Suspicious Transactions */}
        <StatCard
          title="Suspicious Transactions"
          value={suspiciousCount.toString()}
          change={formatCurrency(suspiciousAmount)}
          isPositive={false}
          subtext="Rule-Based Risk Indicators"
          icon={AlertTriangle}
          accent="red"
        />

        {/* Under Investigation */}
        <StatCard
          title="Under Investigation"
          value={underInvestigationCount.toString()}
          change={formatCurrency(underInvestigationAmount)}
          isPositive={false}
          subtext="Requires Analyst Review"
          icon={SearchCode}
          accent="cyan"
        />

      </div>

      {/* Transaction Table */}
      <TransactionTable
        showFilters={true}
        initialSearch={querySearch}
      />

      {/* Transaction Detail Drawer */}
      {selectedTransaction && (
        <TransactionDetailDrawer
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

    </div>
  );
};