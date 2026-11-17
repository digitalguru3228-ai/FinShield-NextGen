import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';

import { initialTransactions } from '../data/mockTransactions';
import { initialReports } from '../data/mockReports';
import { mockAgents, simulationSteps } from '../data/mockAgents';

import {
  initialNetworkNodes,
  initialNetworkEdges
} from '../data/mockNetwork';
import { API_BASE_URL } from '../config/api';

const InvestigationContext = createContext(null);


// ==========================================
// TRANSACTION DATA MAPPER
// ==========================================

const mapBackendTransaction = (transaction, anomalyMap) => {

  const anomaly = anomalyMap[transaction.transaction_id];

  const riskLevel = anomaly?.risk_level || 'Low';

  const riskScore = {
    Critical: 95,
    High: 80,
    Medium: 55,
    Low: 10
  }[riskLevel] ?? 10;

  const reasons = anomaly?.reasons || [];

  return {

    id: transaction.transaction_id,

    sender: {
      name: transaction.sender,
      account: transaction.sender,
      country: 'Not available'
    },

    receiver: {
      name: transaction.receiver,
      account: transaction.receiver,
      country: 'Not available'
    },

    amount: Number(transaction.amount || 0),

    currency: 'INR',

    timestamp: transaction.timestamp,

    transactionType: transaction.transaction_type,

    riskScore,

    riskLevel,

    status: anomaly ? 'Suspicious' : 'Normal',

    fraudCategory: reasons.length
      ? reasons.join(', ')
      : 'No rule-based anomaly detected',

    amlTriggers: reasons,

    device: 'Not available',

    dataSource: 'SQLite Backend',

    scoringType: 'Experimental Rule-Based'

  };

};


export const InvestigationProvider = ({ children }) => {

  // ==========================================
  // TRANSACTIONS
  // ==========================================

  const [transactions, setTransactions] = useState([]);

  const [transactionLoading, setTransactionLoading] = useState(true);

  const [transactionError, setTransactionError] = useState(null);


  // ==========================================
  // REPORTS
  // ==========================================

  const [reports, setReports] = useState(initialReports);


  // ==========================================
  // NETWORK
  // ==========================================

  const [networkNodes, setNetworkNodes] = useState(initialNetworkNodes);

  const [networkEdges, setNetworkEdges] = useState(initialNetworkEdges);

  const [networkLoading, setNetworkLoading] = useState(true);

  const [networkError, setNetworkError] = useState(null);


  // ==========================================
  // SELECTION STATES
  // ==========================================

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [selectedEntity, setSelectedEntity] = useState(null);

  const [selectedReport, setSelectedReport] = useState(null);

  const [globalSearch, setGlobalSearch] = useState('');


  // ==========================================
  // FETCH TRANSACTIONS FROM BACKEND
  // ==========================================

  const refreshTransactions = useCallback(async () => {

    setTransactionLoading(true);

    setTransactionError(null);

    try {

      const [transactionResponse, anomalyResponse] = await Promise.all([

        fetch(`${API_BASE_URL}/api/transactions`),

        fetch(`${API_BASE_URL}/api/transactions/anomalies`)

      ]);

      if (!transactionResponse.ok || !anomalyResponse.ok) {

        throw new Error('Unable to fetch transaction data from backend.');

      }

      const transactionData = await transactionResponse.json();

      const anomalyData = await anomalyResponse.json();


      // Create anomaly lookup map

      const anomalyMap = {};

      (anomalyData.anomalies || []).forEach(anomaly => {

        anomalyMap[anomaly.transaction_id] = anomaly;

      });


      // Convert backend transactions into frontend format

      const mappedTransactions = (

        transactionData.transactions || []

      ).map(transaction =>

        mapBackendTransaction(transaction, anomalyMap)

      );


      setTransactions(mappedTransactions);


      console.log('FinShield Transactions Loaded:', {

        totalTransactions: mappedTransactions.length,

        suspiciousTransactions: mappedTransactions.filter(

          txn => txn.status === 'Suspicious'

        ).length,

        normalTransactions: mappedTransactions.filter(

          txn => txn.status === 'Normal'

        ).length

      });

    } catch (error) {

      console.error('Transaction API Error:', error);

      setTransactionError(error.message);

      setTransactions([]);

    } finally {

      setTransactionLoading(false);

    }

  }, []);


  // Fetch transactions when application loads

  useEffect(() => {

    refreshTransactions();

  }, [refreshTransactions]);


  // ==========================================
  // FETCH NETWORK DATA FROM BACKEND
  // ==========================================

  const refreshNetworkData = useCallback(async () => {

    setNetworkLoading(true);

    setNetworkError(null);

    try {

      const [graphResponse, riskResponse] = await Promise.all([

        fetch(`${API_BASE_URL}/api/graph`),

        fetch(`${API_BASE_URL}/api/accounts/risk`)

      ]);

      if (!graphResponse.ok || !riskResponse.ok) {

        throw new Error('Backend API request failed.');

      }

      const graphData = await graphResponse.json();

      const riskData = await riskResponse.json();


      // Create Risk Map

      const riskMap = {};

      (riskData.account_risks || []).forEach(account => {

        riskMap[account.account] = account;

      });


      // ==========================================
      // CONVERT BACKEND ACCOUNTS INTO GRAPH NODES
      // ==========================================

      const nodes = (graphData.accounts || []).map((account, index) => {

        const risk = riskMap[account] || {};

        const riskReasons = Array.isArray(risk.risk_reasons)

          ? risk.risk_reasons

          : [];

        return {

          id: `account-${account}`,

          type: 'accountNode',

          position: {

            x: (index % 3) * 300,

            y: Math.floor(index / 3) * 220

          },

          data: {

            label: account,

            accountNumber: account,

            role: 'Transaction Account',

            jurisdiction: 'Not available',

            riskScore: risk.risk_score ?? 0,

            riskLevel: risk.risk_level || 'Low',

            balance: 'Not available',

            inflow: `₹${Number(risk.incoming_amount || 0).toLocaleString('en-IN')}`,

            outflow: `₹${Number(risk.outgoing_amount || 0).toLocaleString('en-IN')}`,

            ubo: 'Not available',

            kycStatus: 'Not available',

            tags: riskReasons

          }

        };

      });


      // ==========================================
      // CONVERT BACKEND CONNECTIONS INTO EDGES
      // ==========================================

      const edges = (graphData.connections || []).map((transaction, index) => ({

        id: `transaction-${transaction.transaction_id}-${index}`,

        source: `account-${transaction.sender}`,

        target: `account-${transaction.receiver}`,

        type: 'smoothstep',

        label: `₹${Number(transaction.amount || 0).toLocaleString('en-IN')}`,

        animated: false,

        style: {

          stroke: '#22d3ee',

          strokeWidth: 2

        },

        labelStyle: {

          fill: '#e2e8f0',

          fontSize: 11,

          fontWeight: 600

        },

        labelBgStyle: {

          fill: '#0b1220',

          fillOpacity: 0.95

        },

        labelBgPadding: [6, 4],

        labelBgBorderRadius: 4

      }));


      setNetworkNodes(nodes);

      setNetworkEdges(edges);


      console.log('FinShield Backend Network Loaded:', {

        accounts: nodes.length,

        connections: edges.length,

        highRiskAccounts: nodes.filter(

          node =>

            node.data.riskLevel === 'High' ||

            node.data.riskLevel === 'Critical'

        ).length

      });

    } catch (error) {

      console.error('Network API Error:', error);

      setNetworkError(error.message);

    } finally {

      setNetworkLoading(false);

    }

  }, []);


  // Fetch network data when application loads

  useEffect(() => {

    refreshNetworkData();

  }, [refreshNetworkData]);


  // ==========================================
  // SETTINGS STATE
  // ==========================================

  const [settings, setSettings] = useState({

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

  });


  // ==========================================
  // NOTIFICATIONS
  // ==========================================

  const [notifications, setNotifications] = useState([

    {
      id: "notif-1",
      title: "OFAC SDN Match Detected",
      message: "Direct hit on beneficiary Dmitri Kozlov in wire TXN-2026-8951",
      time: "10m ago",
      level: "critical",
      read: false
    },

    {
      id: "notif-2",
      title: "Structuring Alert ($9,850 Smurfing)",
      message: "Elena Rostova account exceeded 5th structured deposit in 2h",
      time: "24m ago",
      level: "high",
      read: false
    },

    {
      id: "notif-3",
      title: "Mixer Interdiction Successful",
      message: "$820,000 USD blocked at clearing gateway before contract interaction",
      time: "1h ago",
      level: "info",
      read: true
    },

    {
      id: "notif-4",
      title: "FinCEN Form 111 SAR Generated",
      message: "SAR-2026-9041 ready for senior compliance officer review",
      time: "2h ago",
      level: "success",
      read: true
    }

  ]);


  // ==========================================
  // AI INVESTIGATION SIMULATION STATE
  // ==========================================

  const [simState, setSimState] = useState({

    isRunning: false,

    currentStepIndex: -1,

    completedSteps: [],

    progress: 0,

    caseId: "SAR-2026-9041",

    targetEntity: "Apex Global Offshore S.A.",

    liveLogs: [],

    isFinished: false

  });


  // ==========================================
  // NOTIFICATION FUNCTIONS
  // ==========================================

  const markNotificationAsRead = (id) => {

    setNotifications(prev =>

      prev.map(n =>

        n.id === id ? { ...n, read: true } : n

      )

    );

  };


  const clearAllNotifications = () => {

    setNotifications(prev =>

      prev.map(n => ({

        ...n,

        read: true

      }))

    );

  };


  // ==========================================
  // TRANSACTION STATUS UPDATE
  // ==========================================

  const updateTransactionStatus = (txnId, newStatus) => {

    setTransactions(prev =>

      prev.map(txn =>

        txn.id === txnId

          ? { ...txn, status: newStatus }

          : txn

      )

    );


    if (

      selectedTransaction &&

      selectedTransaction.id === txnId

    ) {

      setSelectedTransaction(prev => ({

        ...prev,

        status: newStatus

      }));

    }

  };


  // ==========================================
  // REPORT FUNCTIONS
  // ==========================================

  const addReport = (newReport) => {

    setReports(prev => [

      newReport,

      ...prev

    ]);

  };


  // ==========================================
  // START AI INVESTIGATION SIMULATION
  // ==========================================

  const startSimulation = (customCaseId = "SAR-2026-9041") => {

    if (simState.isRunning) return;

    setSimState({

      isRunning: true,

      currentStepIndex: 0,

      completedSteps: [],

      progress: 10,

      caseId: customCaseId,

      targetEntity:

        customCaseId === "SAR-2026-8812"

          ? "Elena Rostova (Mule Syndicate #4)"

          : "Apex Global Offshore S.A.",

      liveLogs: [

        {

          timestamp: new Date().toLocaleTimeString(),

          agent: "FinShield Orchestrator",

          text: `[DEMO] Launching simulated multi-agent investigation for ${customCaseId}...`

        }

      ],

      isFinished: false

    });

  };


  // ==========================================
  // SIMULATION STEP RUNNER
  // ==========================================

  useEffect(() => {

    if (!simState.isRunning || simState.isFinished) {

      return;

    }

    const currentStep = simState.currentStepIndex;

    if (currentStep >= simulationSteps.length) {

      setSimState(prev => ({

        ...prev,

        isRunning: false,

        isFinished: true,

        progress: 100,

        liveLogs: [

          ...prev.liveLogs,

          {

            timestamp: new Date().toLocaleTimeString(),

            agent: "FinShield Orchestrator",

            text: `[DEMO] Simulated investigation finished. Case ${prev.caseId} escalated for analyst review.`

          }

        ]

      }));

      return;

    }

    const stepData = simulationSteps[currentStep];

    const timer = setTimeout(() => {

      setSimState(prev => {

        const nextStepIndex = prev.currentStepIndex + 1;

        const newProgress = Math.min(

          100,

          Math.round(

            (nextStepIndex / simulationSteps.length) * 100

          )

        );

        return {

          ...prev,

          currentStepIndex: nextStepIndex,

          completedSteps: [

            ...prev.completedSteps,

            stepData

          ],

          progress: newProgress,

          liveLogs: [

            ...prev.liveLogs,

            {

              timestamp: new Date().toLocaleTimeString(),

              agent: stepData.agentCode,

              text: `[${stepData.agent.toUpperCase()}] ${stepData.title}: ${stepData.detail}`

            }

          ]

        };

      });

    }, 2200);

    return () => clearTimeout(timer);

  }, [

    simState.isRunning,

    simState.currentStepIndex,

    simState.isFinished

  ]);


  // ==========================================
  // RESET SIMULATION
  // ==========================================

  const resetSimulation = () => {

    setSimState({

      isRunning: false,

      currentStepIndex: -1,

      completedSteps: [],

      progress: 0,

      caseId: "SAR-2026-9041",

      targetEntity: "Apex Global Offshore S.A.",

      liveLogs: [],

      isFinished: false

    });

  };


  // ==========================================
  // CONTEXT PROVIDER
  // ==========================================

  return (

    <InvestigationContext.Provider

      value={{

        transactions,

        setTransactions,

        transactionLoading,

        transactionError,

        refreshTransactions,

        updateTransactionStatus,

        selectedTransaction,

        setSelectedTransaction,

        networkNodes,

        setNetworkNodes,

        networkEdges,

        setNetworkEdges,

        networkLoading,

        networkError,

        refreshNetworkData,

        selectedEntity,

        setSelectedEntity,

        reports,

        setReports,

        addReport,

        selectedReport,

        setSelectedReport,

        globalSearch,

        setGlobalSearch,

        notifications,

        markNotificationAsRead,

        clearAllNotifications,

        settings,

        setSettings,

        agents: mockAgents,

        simState,

        startSimulation,

        resetSimulation

      }}

    >

      {children}

    </InvestigationContext.Provider>

  );

};


// ==========================================
// CUSTOM HOOK
// ==========================================

export const useInvestigation = () => {

  const context = useContext(InvestigationContext);

  if (!context) {

    throw new Error(

      'useInvestigation must be used within an InvestigationProvider'

    );

  }

  return context;

};