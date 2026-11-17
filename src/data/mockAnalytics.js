export const overviewStats = {
  totalTransactions: {
    value: "1,489,210",
    change: "+12.4%",
    isPositive: true,
    subtext: "vs previous 30-day period",
    volumeUsd: "$14.82B"
  },
  suspiciousTransactions: {
    value: "3,428",
    change: "-4.2%",
    isPositive: false, // reduction in suspicious volume is good, but shown as critical indicator
    subtext: "0.23% of total network volume",
    volumeUsd: "$89.4M"
  },
  highRiskAccounts: {
    value: "419",
    change: "+18 accounts",
    isPositive: false,
    subtext: "84 accounts under active freeze",
    criticalCount: 62
  },
  activeInvestigations: {
    value: "42",
    change: "6 ready for FinCEN SAR",
    isPositive: true,
    subtext: "Avg resolution time: 3.4 hrs",
    agentsDeployed: 4
  }
};

export const transactionActivityData = [
  { time: "00:00", volume: 42000, suspicious: 120, cleared: 41880, blocked: 18 },
  { time: "03:00", volume: 28000, suspicious: 95, cleared: 27905, blocked: 12 },
  { time: "06:00", volume: 55000, suspicious: 180, cleared: 54820, blocked: 24 },
  { time: "09:00", volume: 142000, suspicious: 490, cleared: 141510, blocked: 62 },
  { time: "12:00", volume: 189000, suspicious: 640, cleared: 188360, blocked: 94 },
  { time: "15:00", volume: 168000, suspicious: 580, cleared: 167420, blocked: 78 },
  { time: "18:00", volume: 124000, suspicious: 390, cleared: 123610, blocked: 45 },
  { time: "21:00", volume: 76000, suspicious: 220, cleared: 75780, blocked: 28 }
];

export const fraudCategoryData = [
  { name: "Layering & Shells", value: 38, count: 1302, color: "#ef4444" },
  { name: "Structuring / Smurfing", value: 27, count: 925, color: "#f97316" },
  { name: "Sanctions Proximity", value: 16, count: 548, color: "#eab308" },
  { name: "Crypto Off-Ramp", value: 12, count: 411, color: "#06b6d4" },
  { name: "Account Takeover", value: 7, count: 242, color: "#8b5cf6" }
];

export const riskDistributionData = [
  { level: "Critical (>85)", count: 342, percentage: "10%", color: "#ef4444" },
  { level: "High (65-84)", count: 812, percentage: "24%", color: "#f97316" },
  { level: "Medium (40-64)", count: 1240, percentage: "36%", color: "#eab308" },
  { level: "Low (<40)", count: 1034, percentage: "30%", color: "#10b981" }
];

export const recentActivityFeed = [
  {
    id: "act-1",
    timestamp: "12 mins ago",
    type: "AI_ALERT",
    badge: "CRITICAL",
    badgeColor: "red",
    title: "Sanctions Correlation Triggered",
    description: "Evidence Verification Agent flagged wire to Kozlov Trans-Siberian Trading [AE12-EMIR]. Direct OFAC SDN correlation confirmed.",
    actor: "EVA-v5.0",
    actionLink: "/transactions?search=TXN-2026-8951"
  },
  {
    id: "act-2",
    timestamp: "28 mins ago",
    type: "SAR_GENERATED",
    badge: "REPORT",
    badgeColor: "blue",
    title: "FinCEN Form 111 SAR Ready for Sign-Off",
    description: "Report Generation Agent drafted dossier SAR-2026-9041 covering $4.29M cross-border layering ring.",
    actor: "RGA-v2.9",
    actionLink: "/reports"
  },
  {
    id: "act-3",
    timestamp: "45 mins ago",
    type: "INTERDICTION",
    badge: "BLOCKED",
    badgeColor: "red",
    title: "Automated Gateway Freeze Executed",
    description: "Transaction TXN-2026-8942 ($820,000 USD) blocked prior to settlement into DarkPool mixer contract.",
    actor: "FinShield Sentinel Gateway",
    actionLink: "/transactions?search=TXN-2026-8942"
  },
  {
    id: "act-4",
    timestamp: "1 hr ago",
    type: "GRAPH_EXPANDED",
    badge: "NETWORK",
    badgeColor: "cyan",
    title: "Mule Ring Topology Expanded",
    description: "Network Investigation Agent connected 3 new Florida accounts to Elena Rostova cluster via shared IMEI fingerprint.",
    actor: "NIA-v3.8",
    actionLink: "/network"
  },
  {
    id: "act-5",
    timestamp: "2 hrs ago",
    type: "ANALYST_ACTION",
    badge: "CLEARED",
    badgeColor: "green",
    title: "Commercial Wire Cleared by Officer",
    description: "Lead Analyst Marcus Vance reviewed trade invoice documents and cleared PanAsia Electronics settlement ($670K).",
    actor: "Agent Marcus Vance",
    actionLink: "/transactions?search=TXN-2026-8948"
  }
];
