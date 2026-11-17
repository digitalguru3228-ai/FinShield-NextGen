export const mockAgents = [
  {
    id: "agent-txn",
    name: "Transaction Investigation Agent",
    code: "TIA-v4.2",
    icon: "Activity",
    category: "Anomaly & Velocity Engine",
    status: "Active",
    statusText: "Analyzing Real-Time Inflow / Outflow Telemetry",
    confidence: 98.4,
    casesProcessed: 4892,
    avgLatency: "420ms",
    accuracyRate: "99.1%",
    description: "Evaluates micro-structuring, anomalous transaction velocity, smurfing patterns, and threshold evasion below FinCEN CTR limit ($10,000).",
    specialties: [
      "Threshold Evasion ($9,900 Smurfing)",
      "High-Frequency Wire Velocity Spikes",
      "Corridor Deviation Scoring",
      "Burst Volume Outlier Detection"
    ],
    currentTask: "Scanning Pan-American clearing pipeline for structured micro-deposits",
    progress: 78,
    metrics: {
      transactionsEvaluated: "142,890 / 24h",
      anomaliesTriaged: "312 flagged",
      falsePositiveRate: "0.82%"
    }
  },
  {
    id: "agent-network",
    name: "Network Investigation Agent",
    code: "NIA-v3.8",
    icon: "Network",
    category: "Graph Topology & Mule Cluster Engine",
    status: "Analyzing",
    statusText: "Traversing 4-Hop Shell Entity Graph Rings",
    confidence: 96.8,
    casesProcessed: 3410,
    avgLatency: "1.2s",
    accuracyRate: "97.9%",
    description: "Applies graph traversal and clustering algorithms to detect cyclical layering rings, mule funnels, shared beneficial ownership, and off-ramp mixer conduits.",
    specialties: [
      "Cyclic Laundering Loop Detection",
      "Mule Syndicate Fan-In / Fan-Out",
      "Offshore Shell Co. Cluster Mapping",
      "Multi-Hop Proximity Scoring"
    ],
    currentTask: "Tracing Apex Global -> Volkov Logistics -> Kozlov Trading multi-hop route",
    progress: 64,
    metrics: {
      graphNodesTraversed: "89,450 entities",
      syndicateClustersIdentified: "14 active rings",
      maxHopDepth: "6 degrees"
    }
  },
  {
    id: "agent-evidence",
    name: "Evidence Verification Agent",
    code: "EVA-v5.0",
    icon: "ShieldCheck",
    category: "Sanctions, KYC & Forensic Verification",
    status: "Active",
    statusText: "Cross-Referencing OFAC SDN, PEP & Maritime Registries",
    confidence: 99.2,
    casesProcessed: 5219,
    avgLatency: "680ms",
    accuracyRate: "99.8%",
    description: "Cross-correlates transactions against OFAC SDN lists, FATF gray/blacklists, corporate registrar databases, maritime bills of lading, and device IP/TOR telemetry.",
    specialties: [
      "OFAC / UN / EU Sanctions Matching",
      "Politically Exposed Persons (PEP) Tiers",
      "IP Geolocation & Tor Exit Corroboration",
      "Phantom Invoicing & Trade Verification"
    ],
    currentTask: "Validating beneficial ownership of Dubai Free Zone entity [AE12-EMIR]",
    progress: 92,
    metrics: {
      sanctionWatchlistsCovered: "42 international feeds",
      devicesFingerprinted: "1.2M hardware hashes",
      verificationPrecision: "99.85%"
    }
  },
  {
    id: "agent-report",
    name: "Report Generation Agent",
    code: "RGA-v2.9",
    icon: "FileText",
    category: "SAR / FinCEN Regulatory Dossier Synthesis",
    status: "Idle",
    statusText: "Standing By for Case Synthesis Trigger",
    confidence: 97.5,
    casesProcessed: 2190,
    avgLatency: "2.1s",
    accuracyRate: "98.5%",
    description: "Synthesizes cross-agent investigative findings into FinCEN Form 111 compliant Suspicious Activity Reports (SAR), executive audit summaries, and evidence dossiers.",
    specialties: [
      "FinCEN Form 111 (SAR-DI) Auto-Drafting",
      "Chronological Audit Trail Assembly",
      "Legal Evidence Packaging & Exhibits",
      "Regulatory Disposition Recommendations"
    ],
    currentTask: "Audit templates updated for FinCEN 2026 AML/CFT Act standards",
    progress: 100,
    metrics: {
      reportsCompiled: "2,190 filings",
      regulatorAuditAcceptance: "100%",
      avgDraftTime: "4.8 seconds"
    }
  }
];

export const simulationSteps = [
  {
    step: 1,
    agent: "Transaction Investigation Agent",
    agentCode: "TIA-v4.2",
    status: "COMPLETE",
    title: "Velocity & Structuring Anomaly Detection",
    detail: "Identified high-velocity sequence: 5 transactions totaling $48,750 executed within 42 minutes, each calibrated under $10,000 threshold to evade mandatory CTR filing.",
    findings: [
      "Amount pattern: $9,850, $9,900, $9,700, $9,800, $9,500",
      "Baseline deviation: +840% vs account 90-day historical mean",
      "Risk Score: 94 / 100"
    ],
    duration: "410ms"
  },
  {
    step: 2,
    agent: "Network Investigation Agent",
    agentCode: "NIA-v3.8",
    status: "COMPLETE",
    title: "Graph Traversal & Laundering Loop Discovery",
    detail: "Traversed 3 degrees of separation from target node. Discovered a closed cyclical loop returning 78% of funds to beneficial owner account via secondary logistics intermediary.",
    findings: [
      "Detected 6 mule accounts funneling liquidity into single staging account",
      "Topology match: 96.2% structural correlation with Syndicate Ring #4",
      "Identified hidden intermediary: Volkov Freight Ltd (Cyprus)"
    ],
    duration: "1,140ms"
  },
  {
    step: 3,
    agent: "Evidence Verification Agent",
    agentCode: "EVA-v5.0",
    status: "COMPLETE",
    title: "OFAC Sanctions & Forensic Fingerprinting",
    detail: "Cross-checked entity registry and network footprints. Beneficial owner Dmitri Kozlov matched against OFAC SDN List (Executive Order 14024). Originating device utilized Tor exit relay.",
    findings: [
      "Direct OFAC SDN match: 'Kozlov Trans-Siberian Trading' (Dubai FZC)",
      "Device IP: 185.220.101.5 confirmed Tor exit node in Panama City",
      "Shipping invoice: Phantom bill of lading detected (vessel IMO non-existent)"
    ],
    duration: "620ms"
  },
  {
    step: 4,
    agent: "Report Generation Agent",
    agentCode: "RGA-v2.9",
    status: "COMPLETE",
    title: "FinCEN Suspicious Activity Report (SAR) Synthesis",
    detail: "Compiled comprehensive 5-page FinCEN Form 111 draft dossier with 4 verified exhibits, regulatory violation tags, and immediate account freeze recommendation.",
    findings: [
      "Generated SAR Dossier: SAR-2026-9041 ready for Senior AML Officer sign-off",
      "Recommended Disposition: Immediate Emergency Asset Freeze & FinCEN Priority Referral",
      "Confidence Rating: 98.6% (Exceeds regulatory filing threshold)"
    ],
    duration: "1,850ms"
  }
];
