export const initialReports = [
  {
    id: "SAR-2026-9041",
    title: "Cross-Border Layering & Shell Company Smurfing Ring ($4.2M)",
    suspectEntity: "Apex Global Offshore S.A. / Dmitri Kozlov",
    primaryOffense: "Sanctions Evasion & Trade-Based Layering (OFAC EO 14024)",
    filingStatus: "FinCEN Submitted",
    filingDate: "2026-11-15",
    priority: "Critical",
    riskScore: 96,
    amountExposed: 4290000.00,
    leadInvestigator: "Marcus Vance (Senior AML Specialist, FinShield)",
    aiConfidence: 98.4,
    jurisdictions: ["Panama", "Cyprus", "United Arab Emirates", "United States"],
    narrative: `FinShield automated surveillance identified a multi-jurisdictional layering network orchestrated between Panama shell entity Apex Global Offshore S.A., Cyprus logistics intermediary Volkov Logistics Ltd, and Dubai Free Zone trading entity Kozlov Trans-Siberian Trading. Inbound micro-structuring flows from 6 retail accounts were consolidated and rapidly wired through correspondent banking corridors within 14 hours. Beneficial ownership analysis directly correlates to OFAC Specially Designated National (SDN) Dmitri Kozlov.`,
    timeline: [
      { time: "2026-11-14 18:20 UTC", event: "FastPay MSB deposits $48,750 via 5 rapid structured transactions to Elena Rostova (Mule #14)." },
      { time: "2026-11-15 04:22 UTC", event: "Consolidation transfer of $490,000 executed from BlueFin UK gateway to Apex Global Offshore S.A." },
      { time: "2026-11-15 11:42 UTC", event: "Wire of $1,450,000 sent from Apex Global (Panama) to Volkov Logistics (Cyprus) flagged by Transaction Agent." },
      { time: "2026-11-15 12:05 UTC", event: "Network Investigation Agent traversed graph topology; detected cyclic laundering ring." },
      { time: "2026-11-15 12:15 UTC", event: "Evidence Verification Agent matched beneficiary to OFAC SDN list." },
      { time: "2026-11-15 12:30 UTC", event: "FinCEN Form 111 SAR electronically compiled and submitted to Treasury BSA Portal." }
    ],
    violations: [
      "Bank Secrecy Act (BSA) 31 U.S.C. 5324 - Structuring to Evade Reporting",
      "Executive Order 14024 - Prohibited Transactions with Blocked Persons",
      "18 U.S.C. 1956 - Laundering of Monetary Instruments",
      "FATF Recommendation 16 - Wire Transfer Transparency"
    ],
    exhibits: [
      { name: "EXHIBIT_A_SWIFT_MT103_PA_CY.pdf", size: "1.4 MB", type: "Wire Confirmation" },
      { name: "EXHIBIT_B_OFAC_SDN_MATCH_KOZLOV.pdf", size: "820 KB", type: "Sanctions Dossier" },
      { name: "EXHIBIT_C_GRAPH_TOPOLOGY_RING_4.png", size: "3.2 MB", type: "Network Visualization" },
      { name: "EXHIBIT_D_TOR_EXIT_NODE_FORENSICS.json", size: "140 KB", type: "Device Telemetry" }
    ],
    recommendation: "Immediate emergency administrative asset freeze on all correspondent clearing accounts and direct referral to IRS Criminal Investigation and OFAC Sanctions Enforcement."
  },
  {
    id: "SAR-2026-8812",
    title: "Automated Micro-Structuring & Mule Infiltration Syndicate ($890K)",
    suspectEntity: "Elena Rostova & Syndicate Mule Ring #04",
    primaryOffense: "Smurfing & Rapid Cash Extraction below CTR Threshold",
    filingStatus: "Under Review",
    filingDate: "2026-11-14",
    priority: "High",
    riskScore: 88,
    amountExposed: 890000.00,
    leadInvestigator: "Sarah Chen (Compliance Officer, Fraud Intel)",
    aiConfidence: 95.2,
    jurisdictions: ["United States (Florida, New York)"],
    narrative: `Surveillance triggered on 14 checking accounts opened across southern Florida banking branches by university students on temporary visas. Accounts received structured ACH and P2P deposits calibrated strictly between $9,400 and $9,950, followed by immediate physical ATM withdrawals and cryptocurrency kiosk cashouts within 30 minutes of credit.`,
    timeline: [
      { time: "2026-11-13 14:00 UTC", event: "Pattern recognized by Transaction Investigation Agent (TIA-v4.2)." },
      { time: "2026-11-14 09:20 UTC", event: "ATM cashout at Biscayne Blvd branch recorded on camera surveillance." },
      { time: "2026-11-14 16:45 UTC", event: "Accounts linked to shared mobile device IMEI hardware fingerprint." }
    ],
    violations: [
      "31 U.S.C. 5313 / 5324 - Structuring Currency Transactions",
      "18 U.S.C. 1028 - Fraud in Connection with Identification Documents"
    ],
    exhibits: [
      { name: "EXHIBIT_A_ATM_WITHDRAWAL_LOGS.csv", size: "480 KB", type: "Transaction Log" },
      { name: "EXHIBIT_B_DEVICE_HARDWARE_FINGERPRINT.json", size: "85 KB", type: "Device Fingerprint" }
    ],
    recommendation: "Debit card suspension across all identified cluster accounts and notification dispatched to local FBI Financial Crimes Squad."
  },
  {
    id: "SAR-2026-8703",
    title: "Sanctioned Entity Evasion via Offshore Cryptocurrency Ramp ($2.1M)",
    suspectEntity: "Nexus Digital Asset Vault / DarkPool Mixer [0x7a3]",
    primaryOffense: "Decentralized Mixer Exploitation & Sanctioned Asset Commingling",
    filingStatus: "FinCEN Submitted",
    filingDate: "2026-11-13",
    priority: "Critical",
    riskScore: 97,
    amountExposed: 2100000.00,
    leadInvestigator: "Marcus Vance (Senior AML Specialist, FinShield)",
    aiConfidence: 99.1,
    jurisdictions: ["United States", "Switzerland", "Decentralized Smart Contracts"],
    narrative: `Nexus Digital OTC custody desk executed multiple high-value fiat-to-crypto settlements immediately routed through Tornado Cash and associated privacy pools previously designated by OFAC under Cyber Sanctions Regulations (31 CFR Part 578).`,
    timeline: [
      { time: "2026-11-13 02:11 UTC", event: "Inbound wire from Geneva private bank credited to custody wallet." },
      { time: "2026-11-13 02:18 UTC", event: "Outbound transfer to smart contract mixer intercepted by FinShield automated gateway." },
      { time: "2026-11-13 03:00 UTC", event: "Smart contract address matched against OFAC Specially Designated Nationals list." }
    ],
    violations: [
      "OFAC Cyber-Related Sanctions (31 CFR Part 578)",
      "BSA 31 U.S.C. 5318(h) - AML Program Deficiencies"
    ],
    exhibits: [
      { name: "EXHIBIT_A_BLOCKCHAIN_TX_TRACE.pdf", size: "2.1 MB", type: "On-Chain Forensic Map" },
      { name: "EXHIBIT_B_SMART_CONTRACT_DECOMPILATION.txt", size: "320 KB", type: "Contract Bytecode Audit" }
    ],
    recommendation: "Permanent gateway blacklisting of destination contract hashes and formal filing with FinCEN Cyber Crime Unit."
  },
  {
    id: "SAR-2026-8490",
    title: "Trade-Based Money Laundering in Over-Invoiced Electronics ($6.7M)",
    suspectEntity: "Starlight Holdings Cayman & Eurasian Mineral Trading AG",
    primaryOffense: "Trade-Based Over-Invoicing & Dual-Use Export Layering",
    filingStatus: "Draft",
    filingDate: "2026-11-11",
    priority: "High",
    riskScore: 84,
    amountExposed: 6700000.00,
    leadInvestigator: "David Park (Forensic Accountant)",
    aiConfidence: 88.5,
    jurisdictions: ["Cayman Islands", "Austria", "Hong Kong"],
    narrative: `Discrepancy identified between declared customs invoice valuation ($4,120,000 for electronic micro-controllers) and global manufacturer price lists ($890,000 market value). Funds originated from Cayman Islands shell accounts and cleared through correspondent EU banks.`,
    timeline: [
      { time: "2026-11-11 10:14 UTC", event: "Commercial invoice flagged by Evidence Verification Agent for >300% price outlier." },
      { time: "2026-11-12 11:30 UTC", event: "Corroborated with shipping manifests via Singapore Port Authority." }
    ],
    violations: [
      "18 U.S.C. 1956(a)(2) - International Money Laundering",
      "19 U.S.C. 1592 - Customs Fraud & False Statements"
    ],
    exhibits: [
      { name: "EXHIBIT_A_CUSTOMS_DECLARATION_DISCREPANCY.pdf", size: "940 KB", type: "Customs Audit" }
    ],
    recommendation: "Referral to Department of Homeland Security / HSI Commercial Fraud division."
  },
  {
    id: "SAR-2026-8321",
    title: "High-Velocity Account Takeover on Wealth Management Portfolio ($1.8M)",
    suspectEntity: "Helios Private Wealth Ltd Client Account",
    primaryOffense: "Credential Stuffing & Unauthorized Wire Transfer",
    filingStatus: "Closed",
    filingDate: "2026-11-08",
    priority: "Medium",
    riskScore: 78,
    amountExposed: 1800000.00,
    leadInvestigator: "Elena Rostova (Incident Commander)",
    aiConfidence: 94.0,
    jurisdictions: ["Switzerland", "United States"],
    narrative: `High-net-worth client account compromised via session cookie theft. Wire requested to offshore escrow account was blocked by FinShield behavioral biometric anomaly detector. Client identity authenticated via voice biometric callback and funds secured.`,
    timeline: [
      { time: "2026-11-08 07:44 UTC", event: "Suspicious login from anomalous IP location (Tor exit)." },
      { time: "2026-11-08 07:45 UTC", event: "Wire instruction blocked automatically by FinShield velocity rules." },
      { time: "2026-11-08 08:30 UTC", event: "Client verified incident; account reset and funds preserved." }
    ],
    violations: [
      "18 U.S.C. 1030 - Fraud and Related Activity in Connection with Computers"
    ],
    exhibits: [
      { name: "EXHIBIT_A_LOGIN_SESSION_TELEMETRY.json", size: "64 KB", type: "Security Telemetry" }
    ],
    recommendation: "Case resolved. Zero financial loss recorded. Credentials rotated and device hardware key registered."
  }
];
