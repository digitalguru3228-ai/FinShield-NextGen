import React, { useEffect, useMemo, useState } from 'react';
import { NetworkGraph } from '../components/network/NetworkGraph';

import {
  GitFork,
  ShieldAlert,
  AlertTriangle,
  Cpu,
  ArrowRight,
  Activity,
  Link2,
  Wallet,
  Users,
  RefreshCw
} from 'lucide-react';

import { useInvestigation } from '../context/InvestigationContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export const NetworkInvestigationPage = () => {
  const {
    startSimulation,
    networkNodes,
    networkEdges
  } = useInvestigation();

  const navigate = useNavigate();

  const [cycles, setCycles] = useState([]);
  const [cyclesLoading, setCyclesLoading] = useState(true);
  const [cyclesError, setCyclesError] = useState(false);

  const [totalVolume, setTotalVolume] = useState(null);
  const [volumeLoading, setVolumeLoading] = useState(true);

  // Fetch transaction volume directly from backend
  useEffect(() => {
    const fetchTransactionVolume = async () => {
      try {
        setVolumeLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/api/transactions`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const result = await response.json();

        const transactions = result.transactions || [];

        const volume = transactions.reduce((total, transaction) => {
          return total + Number(transaction.amount || 0);
        }, 0);

        setTotalVolume(volume);

        console.log('Transaction Volume:', volume);

      } catch (error) {
        console.error('Transaction Volume API Error:', error);
        setTotalVolume(null);
      } finally {
        setVolumeLoading(false);
      }
    };

    fetchTransactionVolume();
  }, []);

  // Fetch cycle detection results
  useEffect(() => {
    const fetchCycles = async () => {
      try {
        setCyclesLoading(true);
        setCyclesError(false);

        const response = await fetch(
          `${API_BASE_URL}/api/graph/cycles`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch cycle data');
        }

        const result = await response.json();

        setCycles(result.suspicious_cycles || []);

      } catch (error) {
        console.error('Cycle Detection API Error:', error);
        setCyclesError(true);
      } finally {
        setCyclesLoading(false);
      }
    };

    fetchCycles();
  }, []);

  // Calculate graph metrics
  const metrics = useMemo(() => {

    const totalAccounts = networkNodes.length;

    const totalConnections = networkEdges.length;

    const highRiskAccounts = networkNodes.filter(node => {
      const riskLevel = node.data?.riskLevel;

      return (
        riskLevel === 'High' ||
        riskLevel === 'Critical'
      );
    }).length;

    return {
      totalAccounts,
      totalConnections,
      highRiskAccounts
    };

  }, [networkNodes, networkEdges]);

  // Format Indian currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Launch AI Investigation
  const launchInvestigation = (caseId = 'SAR-2026-9041') => {
    startSimulation(caseId);
    navigate('/ai-investigation');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>

          <div className="flex items-center gap-2">

            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Financial Entity Relationship Graph & Ring Detection
            </h1>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              React Flow Engine
            </span>

          </div>

          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Analyze transaction relationships, connected accounts,
            financial flows and suspicious transaction cycles.
          </p>

        </div>

        <button
          onClick={() => launchInvestigation()}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
        >

          <Cpu className="w-4 h-4" />

          <span>Launch AI Graph Analysis</span>

        </button>

      </div>

      {/* Backend Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        {/* Total Accounts */}
        <div className="p-3.5 rounded-xl bg-[#0d1424] border border-slate-800">

          <div className="flex items-center justify-between">

            <span className="text-[10px] uppercase font-semibold text-slate-400">
              Entities Traversed
            </span>

            <Users className="w-4 h-4 text-blue-400" />

          </div>

          <p className="text-xl font-bold font-mono text-white mt-2">
            {metrics.totalAccounts.toLocaleString('en-IN')}
          </p>

          <span className="text-[10px] text-emerald-400 font-mono">
            Actual Connected Accounts
          </span>

        </div>

        {/* Total Connections */}
        <div className="p-3.5 rounded-xl bg-[#0d1424] border border-slate-800">

          <div className="flex items-center justify-between">

            <span className="text-[10px] uppercase font-semibold text-slate-400">
              Transaction Connections
            </span>

            <Link2 className="w-4 h-4 text-cyan-400" />

          </div>

          <p className="text-xl font-bold font-mono text-cyan-400 mt-2">
            {metrics.totalConnections.toLocaleString('en-IN')}
          </p>

          <span className="text-[10px] text-slate-400 font-mono">
            Actual Graph Connections
          </span>

        </div>

        {/* Total Transaction Volume */}
        <div className="p-3.5 rounded-xl bg-[#0d1424] border border-slate-800">

          <div className="flex items-center justify-between">

            <span className="text-[10px] uppercase font-semibold text-slate-400">
              Total Transaction Volume
            </span>

            <Wallet className="w-4 h-4 text-emerald-400" />

          </div>

          <p className="text-xl font-bold font-mono text-emerald-400 mt-2">

            {volumeLoading
              ? 'Loading...'
              : totalVolume === null
                ? 'Unavailable'
                : formatCurrency(totalVolume)}

          </p>

          <span className="text-[10px] text-slate-400 font-mono">
            Based on Backend Transactions
          </span>

        </div>

        {/* High Risk Accounts */}
        <div className="p-3.5 rounded-xl bg-[#0d1424] border border-slate-800">

          <div className="flex items-center justify-between">

            <span className="text-[10px] uppercase font-semibold text-slate-400">
              High Risk Accounts
            </span>

            <ShieldAlert className="w-4 h-4 text-orange-400" />

          </div>

          <p className="text-xl font-bold font-mono text-orange-400 mt-2">
            {metrics.highRiskAccounts}
          </p>

          <span className="text-[10px] text-slate-400 font-mono">
            High + Critical Risk
          </span>

        </div>

      </div>

      {/* Interactive Network Graph */}
      <NetworkGraph />

      {/* Transaction Cycle Detection */}
      <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 space-y-4">

        <div className="flex items-center justify-between flex-wrap gap-3">

          <div>

            <h2 className="text-sm font-bold text-white flex items-center gap-2">

              <GitFork className="w-4 h-4 text-cyan-400" />

              Transaction Cycle Detection

            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Circular transaction patterns identified by the backend graph engine.
            </p>

          </div>

          <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
            NetworkX Analysis
          </span>

        </div>

        {/* Loading */}
        {cyclesLoading && (

          <div className="flex items-center gap-2 text-xs text-slate-400 py-4">

            <RefreshCw className="w-4 h-4 animate-spin" />

            Analyzing transaction cycles...

          </div>

        )}

        {/* Error */}
        {!cyclesLoading && cyclesError && (

          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300">

            Unable to load cycle detection results.
            Please check whether the backend is running.

          </div>

        )}

        {/* No Cycles */}
        {!cyclesLoading && !cyclesError && cycles.length === 0 && (

          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">

            <div className="flex items-center gap-2 text-emerald-400">

              <Activity className="w-4 h-4" />

              <span className="text-sm font-semibold">
                No Transaction Cycles Detected
              </span>

            </div>

            <p className="text-xs text-slate-400 mt-2">
              The current transaction graph contains no detected
              circular transaction patterns.
            </p>

          </div>

        )}

        {/* Detected Cycles */}
        {!cyclesLoading && !cyclesError && cycles.length > 0 && (

          <div className="space-y-3">

            {cycles.map((cycle, index) => (

              <div
                key={index}
                className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20 space-y-3"
              >

                <div className="flex items-center justify-between flex-wrap gap-2">

                  <span className="text-xs font-bold text-orange-400 flex items-center gap-2">

                    <AlertTriangle className="w-4 h-4" />

                    Transaction Cycle #{index + 1}

                  </span>

                  <span className="text-[10px] font-mono text-orange-300 bg-orange-950/40 px-2 py-1 rounded border border-orange-500/20">
                    {cycle.total_accounts} Accounts
                  </span>

                </div>

                <div className="flex flex-wrap items-center gap-2">

                  {cycle.accounts_involved?.map((account, accountIndex) => (

                    <React.Fragment key={accountIndex}>

                      <span className="text-xs font-mono text-slate-200 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                        {account}
                      </span>

                      {accountIndex < cycle.accounts_involved.length - 1 && (

                        <ArrowRight className="w-3 h-3 text-orange-400" />

                      )}

                    </React.Fragment>

                  ))}

                </div>

                <div className="space-y-2">

                  {cycle.transactions?.map((transaction, transactionIndex) => (

                    <div
                      key={transactionIndex}
                      className="flex items-center justify-between text-xs border-t border-slate-800 pt-2 gap-2"
                    >

                      <span className="text-slate-400 font-mono">
                        {transaction.sender} → {transaction.receiver}
                      </span>

                      <span className="text-cyan-400 font-mono font-semibold">
                        {formatCurrency(transaction.amount)}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Backend Information */}
      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">

        <Activity className="w-3 h-3 text-emerald-400" />

        <span>
          Data Source: FinShield FastAPI Backend | Graph Engine: NetworkX
        </span>

      </div>

    </div>
  );
};