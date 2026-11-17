import React, { useMemo, useState } from 'react';

import {
  ArrowLeftRight,
  ShieldAlert,
  Users,
  Cpu,
  Activity,
  AlertTriangle,
  ArrowRight,
  Clock,
  Sparkles,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

import { StatCard } from '../components/common/StatCard';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionDetailDrawer } from '../components/transactions/TransactionDetailDrawer';

import { useInvestigation } from '../context/InvestigationContext';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

import { useNavigate } from 'react-router-dom';

export const OverviewPage = () => {
  const {
    transactions = [],
    transactionLoading,
    transactionError,
    refreshTransactions,
    networkNodes = [],
    networkLoading,
    selectedTransaction,
    setSelectedTransaction,
    startSimulation
  } = useInvestigation();

  const navigate = useNavigate();

  const [chartView, setChartView] = useState('ALL');

  // ==========================================
  // BACKEND-DERIVED DASHBOARD METRICS
  // ==========================================

  const suspiciousTransactions = useMemo(
    () => transactions.filter(txn =>
      ['Suspicious', 'Flagged'].includes(txn.status)
    ),
    [transactions]
  );

  const totalTransactions = transactions.length;

  const totalVolume = transactions.reduce(
    (sum, txn) => sum + Number(txn.amount || 0),
    0
  );

  const highRiskAccounts = networkNodes.filter(node =>
    ['High', 'Critical'].includes(node.data?.riskLevel)
  ).length;

  const activeInvestigations = suspiciousTransactions.length;

  const normalTransactions = transactions.filter(
    txn => !['Suspicious', 'Flagged'].includes(txn.status)
  ).length;

  const formatCurrency = amount =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Number(amount || 0));

  // ==========================================
  // TRANSACTION ACTIVITY CHART
  // ==========================================

  const chartData = useMemo(() => {
    const grouped = {};

    transactions.forEach(txn => {
      const date = txn.timestamp
        ? new Date(txn.timestamp)
        : null;

      const label = date && !Number.isNaN(date.getTime())
        ? date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
        : 'Unknown';

      if (!grouped[label]) {
        grouped[label] = {
          time: label,
          volume: 0,
          suspicious: 0,
          normal: 0
        };
      }

      grouped[label].volume += Number(txn.amount || 0);

      if (['Suspicious', 'Flagged'].includes(txn.status)) {
        grouped[label].suspicious += Number(txn.amount || 0);
      } else {
        grouped[label].normal += Number(txn.amount || 0);
      }
    });

    return Object.values(grouped);
  }, [transactions]);

  // ==========================================
  // ANOMALY REASON DISTRIBUTION
  // ==========================================

  const fraudCategoryData = useMemo(() => {
    const categories = {};

    suspiciousTransactions.forEach(txn => {
      const reasons = Array.isArray(txn.amlTriggers)
        ? txn.amlTriggers
        : [];

      if (reasons.length === 0) {
        categories['Other Anomaly'] =
          (categories['Other Anomaly'] || 0) + 1;
      }

      reasons.forEach(reason => {
        categories[reason] = (categories[reason] || 0) + 1;
      });
    });

    const colors = [
      '#f97316',
      '#ef4444',
      '#eab308',
      '#a78bfa',
      '#06b6d4'
    ];

    const total = Object.values(categories).reduce(
      (sum, count) => sum + count,
      0
    );

    return Object.entries(categories).map(
      ([name, count], index) => ({
        name,
        count,
        value: total
          ? Math.round((count / total) * 100)
          : 0,
        color: colors[index % colors.length]
      })
    );
  }, [suspiciousTransactions]);

  // ==========================================
  // RISK DISTRIBUTION
  // ==========================================

  const riskDistributionData = useMemo(() => {
    const levels = [
      { level: 'Critical', color: '#ef4444' },
      { level: 'High', color: '#f97316' },
      { level: 'Medium', color: '#eab308' },
      { level: 'Low', color: '#22c55e' }
    ];

    return levels.map(item => ({
      ...item,
      count: networkNodes.filter(
        node => node.data?.riskLevel === item.level
      ).length
    }));
  }, [networkNodes]);

  // ==========================================
  // BACKEND-BASED ACTIVITY FEED
  // ==========================================

  const recentActivityFeed = useMemo(() => {
    return suspiciousTransactions
      .slice()
      .sort(
        (a, b) =>
          new Date(b.timestamp || 0) -
          new Date(a.timestamp || 0)
      )
      .slice(0, 5)
      .map((txn, index) => ({
        id: txn.id || `activity-${index}`,
        badge: txn.riskLevel?.toUpperCase() || 'SUSPICIOUS',
        timestamp: txn.timestamp
          ? new Date(txn.timestamp).toLocaleString('en-IN')
          : 'Time unavailable',
        title: `Suspicious Transaction: ${txn.id}`,
        description:
          Array.isArray(txn.amlTriggers) && txn.amlTriggers.length
            ? txn.amlTriggers.join(', ')
            : 'Transaction flagged by experimental rule-based anomaly detection.',
        actor: txn.sender?.account || 'Unknown Account',
        transaction: txn
      }));
  }, [suspiciousTransactions]);

  // ==========================================
  // CHART TOOLTIP
  // ==========================================

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    return (
      <div className="bg-[#0b1220] border border-slate-700/80 p-3 rounded-lg shadow-xl text-xs space-y-1">

        <p className="font-mono font-semibold text-white border-b border-slate-800 pb-1">
          {label}
        </p>

        {payload.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4"
          >
            <span style={{ color: item.color }}>
              {item.name}
            </span>

            <span className="font-mono font-bold text-white">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}

      </div>
    );
  };

  const isLoading = transactionLoading || networkLoading;

  return (
    <div className="space-y-8 animate-in fade-in duration-150">

      {/* PAGE HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>

          <div className="flex items-center gap-2 flex-wrap">

            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Executive Fraud Intelligence Overview
            </h1>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              BACKEND CONNECTED
            </span>

          </div>

          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Backend transaction monitoring, experimental anomaly detection,
            and investigation overview.
          </p>

        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() => {
              startSimulation('DEMO-INVESTIGATION');
              navigate('/ai-investigation');
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Investigation Workflow</span>
          </button>

          <button
            onClick={refreshTransactions}
            disabled={transactionLoading}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-50"
            title="Refresh backend data"
          >
            <RefreshCw
              className={`w-4 h-4 ${
                transactionLoading ? 'animate-spin' : ''
              }`}
            />
          </button>

        </div>

      </div>

      {/* PROTOTYPE NOTICE */}

      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-400">
        Prototype data source: SQLite backend. Anomaly indicators are
        experimental rule-based results, not confirmed fraud. No automatic
        transaction blocking or regulatory filing is performed.
      </div>

      {/* API ERROR */}

      {transactionError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300">
          Backend connection error: {transactionError}
        </div>
      )}

      {/* STAT CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          title="Total Transactions"
          value={isLoading ? '...' : totalTransactions.toLocaleString('en-IN')}
          change=""
          isPositive={true}
          subtext="SQLite backend records"
          icon={ArrowLeftRight}
          accent="blue"
          onClick={() => navigate('/transactions')}
        />

        <StatCard
          title="Suspicious Transactions"
          value={isLoading ? '...' : suspiciousTransactions.length}
          change=""
          isPositive={false}
          subtext="Flagged by backend rules"
          icon={ShieldAlert}
          accent="red"
          onClick={() => navigate('/transactions')}
        />

        <StatCard
          title="High Risk Accounts"
          value={networkLoading ? '...' : highRiskAccounts}
          change=""
          isPositive={false}
          subtext={`Out of ${networkNodes.length} accounts`}
          icon={Users}
          accent="orange"
          onClick={() => navigate('/network')}
        />

        <StatCard
          title="Active Investigations"
          value={isLoading ? '...' : activeInvestigations}
          change=""
          isPositive={false}
          subtext="Suspicious records requiring review"
          icon={Cpu}
          accent="cyan"
          onClick={() => navigate('/reports')}
        />

      </div>

      {/* TOTAL VOLUME */}

      <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800/80 flex flex-wrap items-center justify-between gap-3">

        <div>
          <p className="text-[10px] uppercase font-semibold text-slate-400">
            Total Transaction Volume
          </p>

          <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">
            {isLoading ? 'Loading...' : formatCurrency(totalVolume)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-slate-400">
            Normal Transactions
          </p>

          <p className="text-lg font-bold text-emerald-400">
            {isLoading ? '...' : normalTransactions}
          </p>
        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ACTIVITY CHART */}

        <div className="lg:col-span-8 p-5 rounded-2xl bg-[#0d1424] border border-slate-800/80 shadow-xl space-y-4">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                Transaction Activity
              </h3>

              <p className="text-xs text-slate-400">
                Transaction amounts grouped by recorded timestamp
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-[#090e1a] p-1 rounded-lg border border-slate-800 text-xs">

              <button
                onClick={() => setChartView('ALL')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
                  chartView === 'ALL'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full Volume
              </button>

              <button
                onClick={() => setChartView('SUSPICIOUS_ONLY')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
                  chartView === 'SUSPICIOUS_ONLY'
                    ? 'bg-red-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Anomalies Only
              </button>

            </div>

          </div>

          <div className="h-[280px] w-full pt-2">

            {chartData.length === 0 ? (

              <div className="h-full flex items-center justify-center text-xs text-slate-500">
                {isLoading
                  ? 'Loading transaction data...'
                  : 'No transaction data available.'}
              </div>

            ) : (

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >

                  <defs>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>

                    <linearGradient id="suspiciousGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="time"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                  />

                  <YAxis
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={value => `₹${value}`}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  {chartView === 'ALL' ? (

                    <Area
                      type="monotone"
                      dataKey="volume"
                      name="Total Volume"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#volumeGradient)"
                    />

                  ) : (

                    <Area
                      type="monotone"
                      dataKey="suspicious"
                      name="Flagged Amount"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fill="url(#suspiciousGradient)"
                    />

                  )}

                </AreaChart>

              </ResponsiveContainer>

            )}

          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">

            <div className="flex items-center gap-4">

              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Total Volume</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Flagged Amount</span>
              </div>

            </div>

            <span className="font-mono text-[10px] text-slate-500">
              Backend records only
            </span>

          </div>

        </div>

        {/* ANOMALY CATEGORIES */}

        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#0d1424] border border-slate-800/80 shadow-xl flex flex-col justify-between space-y-4">

          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              Detected Anomaly Indicators
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Categories derived from backend anomaly reasons
            </p>
          </div>

          <div className="space-y-3">

            {fraudCategoryData.length === 0 ? (

              <p className="text-xs text-slate-500">
                No anomaly indicators available.
              </p>

            ) : (

              fraudCategoryData.map((cat, idx) => (

                <div key={idx} className="space-y-1">

                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-slate-300 font-medium">
                      {cat.name}
                    </span>

                    <span className="text-slate-400 font-mono text-[11px]">
                      {cat.count} occurrences
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${cat.value}%`,
                        backgroundColor: cat.color
                      }}
                    />
                  </div>

                </div>

              ))

            )}

          </div>

          {/* RISK DISTRIBUTION */}

          <div className="pt-3 border-t border-slate-800/80">

            <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-2">
              Account Risk Distribution
            </span>

            <div className="grid grid-cols-4 gap-1.5 text-center">

              {riskDistributionData.map((risk, index) => (

                <div
                  key={index}
                  className="p-2 rounded-lg bg-[#090e1a] border border-slate-800"
                >

                  <span className="text-[10px] text-slate-400 block">
                    {risk.level}
                  </span>

                  <span
                    className="text-xs font-mono font-bold block mt-0.5"
                    style={{ color: risk.color }}
                  >
                    {risk.count}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* RECENT TRANSACTIONS AND ACTIVITY FEED */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* SUSPICIOUS TRANSACTIONS TABLE */}

        <div className="lg:col-span-8 space-y-3">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Recent Suspicious Transactions
              </h3>

              <p className="text-xs text-slate-400">
                Backend records requiring analyst review
              </p>
            </div>

            <button
              onClick={() => navigate('/transactions')}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* IMPORTANT: Only Suspicious / Flagged transactions */}

          <TransactionTable
            limit={5}
            showFilters={false}
            statusFilter="SUSPICIOUS"
          />

        </div>

        {/* ACTIVITY FEED */}

        <div className="lg:col-span-4 space-y-3 flex flex-col">

          <div className="flex items-center justify-between">

            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Investigation Activity Feed
            </h3>

            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
              BACKEND DATA
            </span>

          </div>

          <div className="p-4 rounded-2xl bg-[#0d1424] border border-slate-800/80 shadow-xl flex-1 space-y-4">

            {recentActivityFeed.length === 0 ? (

              <div className="py-8 text-center">

                <Clock className="w-6 h-6 text-slate-600 mx-auto" />

                <p className="text-xs text-slate-500 mt-2">
                  No suspicious activity recorded.
                </p>

              </div>

            ) : (

              recentActivityFeed.map(item => {

                const badgeColors = {
                  CRITICAL: 'text-red-400 bg-red-500/10 border-red-500/30',
                  HIGH: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
                  MEDIUM: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
                  LOW: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
                  SUSPICIOUS: 'text-red-400 bg-red-500/10 border-red-500/30'
                };

                return (

                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedTransaction(item.transaction);
                      navigate('/transactions');
                    }}
                    className="p-3 rounded-xl bg-[#090f1d] border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors space-y-1.5 group"
                  >

                    <div className="flex items-center justify-between gap-2">

                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                          badgeColors[item.badge] || badgeColors.SUSPICIOUS
                        }`}
                      >
                        {item.badge}
                      </span>

                      <span className="text-[10px] font-mono text-slate-400">
                        {item.timestamp}
                      </span>

                    </div>

                    <h4 className="text-xs font-semibold text-slate-200 group-hover:text-blue-300">
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">

                      <span>
                        Account: {item.actor}
                      </span>

                      <span className="text-blue-400 flex items-center gap-0.5">
                        Inspect
                        <ExternalLink className="w-2.5 h-2.5" />
                      </span>

                    </div>

                  </div>

                );

              })

            )}

          </div>

        </div>

      </div>

      {/* TRANSACTION DETAIL DRAWER */}

      {selectedTransaction && (

        <TransactionDetailDrawer
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />

      )}

    </div>
  );
};