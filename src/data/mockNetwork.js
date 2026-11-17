export const initialNetworkNodes = [
  {
    id: "entity-apex",
    type: "accountNode",
    position: { x: 280, y: 140 },
    data: {
      id: "entity-apex",
      label: "Apex Global Offshore S.A.",
      accountNumber: "PA04-BLAT-9012-4412",
      role: "Offshore Shell Corp",
      jurisdiction: "Panama",
      riskScore: 94,
      riskLevel: "Critical",
      flagged: true,
      balance: "$2,890,000 USD",
      inflow: "$4,210,000",
      outflow: "$3,850,000",
      ubo: "Concealed (Nominee Dir: Carlos Mendez)",
      kycStatus: "Non-Compliant / Expired",
      tags: ["High Velocity", "Tax Haven", "Shell Syndicate", "Layering Anchor"]
    }
  },
  {
    id: "entity-volkov",
    type: "accountNode",
    position: { x: 620, y: 140 },
    data: {
      id: "entity-volkov",
      label: "Volkov Logistics Ltd",
      accountNumber: "CY29-HEBA-8812-7091",
      role: "Logistics / Freight Layer",
      jurisdiction: "Cyprus",
      riskScore: 89,
      riskLevel: "High",
      flagged: true,
      balance: "$1,420,000 USD",
      inflow: "$2,900,000",
      outflow: "$2,780,000",
      ubo: "Andrei Volkov (Cyprus / Russian dual national)",
      kycStatus: "Partial / Suspended",
      tags: ["Phantom Invoicing", "Intermediary Layer", "Maritime Shell"]
    }
  },
  {
    id: "entity-kozlov",
    type: "accountNode",
    position: { x: 960, y: 140 },
    data: {
      id: "entity-kozlov",
      label: "Kozlov Trans-Siberian Trading",
      accountNumber: "AE12-EMIR-4019-9932",
      role: "General Trading FZC (Sanctioned)",
      jurisdiction: "United Arab Emirates",
      riskScore: 95,
      riskLevel: "Critical",
      flagged: true,
      balance: "$4,150,000 USD",
      inflow: "$6,100,000",
      outflow: "$5,890,000",
      ubo: "Dmitri Kozlov (OFAC SDN Designated)",
      kycStatus: "OFAC SDN Blacklisted",
      tags: ["OFAC Sanctions Match", "Dual-Use Tech Diversion", "Capital Flight"]
    }
  },
  {
    id: "entity-mule14",
    type: "accountNode",
    position: { x: 280, y: 380 },
    data: {
      id: "entity-mule14",
      label: "Elena Rostova (Mule #14)",
      accountNumber: "US55-CHAS-9922-8311",
      role: "Retail Mule Funnel",
      jurisdiction: "United States",
      riskScore: 85,
      riskLevel: "High",
      flagged: true,
      balance: "$14,250 USD",
      inflow: "$210,000",
      outflow: "$198,000",
      ubo: "Elena Rostova (Student Visa)",
      kycStatus: "Flagged Suspicious Activity",
      tags: ["Structuring < $10k", "Immediate Cashout", "Smurfing Funnel"]
    }
  },
  {
    id: "entity-fastpay",
    type: "accountNode",
    position: { x: 40, y: 380 },
    data: {
      id: "entity-fastpay",
      label: "FastPay Cashier #44 (MSB)",
      accountNumber: "US33-WFGO-4091-0012",
      role: "Money Services Business",
      jurisdiction: "United States",
      riskScore: 76,
      riskLevel: "High",
      flagged: true,
      balance: "$85,000 USD",
      inflow: "$950,000",
      outflow: "$920,000",
      ubo: "FastPay Retail Operations LLC",
      kycStatus: "Under FinCEN MSB Audit",
      tags: ["Rapid Smurfing Source", "CTR Circumvention"]
    }
  },
  {
    id: "entity-atm",
    type: "accountNode",
    position: { x: 620, y: 380 },
    data: {
      id: "entity-atm",
      label: "ATM Cluster (Biscayne)",
      accountNumber: "ATM-DISP-MIA-904",
      role: "Cash Dispenser Terminal",
      jurisdiction: "United States",
      riskScore: 81,
      riskLevel: "High",
      flagged: true,
      balance: "Terminal Cache",
      inflow: "$98,500",
      outflow: "$98,500 Cash Dispensed",
      ubo: "Retail Banking Terminal Network",
      kycStatus: "Forensic Video Subpoenaed",
      tags: ["Physical Cash Extraction", "Mule Courier Terminal"]
    }
  },
  {
    id: "entity-nexus",
    type: "accountNode",
    position: { x: 620, y: -80 },
    data: {
      id: "entity-nexus",
      label: "Nexus Digital Asset Vault",
      accountNumber: "US88-CHAS-1029-4411",
      role: "Crypto Custody / OTC Desk",
      jurisdiction: "United States",
      riskScore: 68,
      riskLevel: "Medium",
      flagged: false,
      balance: "$18,500,000 USD",
      inflow: "$84,000,000",
      outflow: "$81,000,000",
      ubo: "Nexus Digital Holdings Inc",
      kycStatus: "FinCEN Registered MSB",
      tags: ["High Volume OTC", "Mixer Exposure Warning"]
    }
  },
  {
    id: "entity-mixer",
    type: "accountNode",
    position: { x: 960, y: -80 },
    data: {
      id: "entity-mixer",
      label: "DarkPool Mixer [0x7a3...b91]",
      accountNumber: "ETH-TORN-0x7a3F91A...c44B",
      role: "DeFi Privacy Protocol",
      jurisdiction: "Decentralized",
      riskScore: 98,
      riskLevel: "Critical",
      flagged: true,
      balance: "$42,000,000 TVL",
      inflow: "$110,000,000",
      outflow: "$108,000,000",
      ubo: "Autonomous Smart Contract",
      kycStatus: "OFAC SDN Listed Contract",
      tags: ["OFAC Sanctioned", "Unregulated Mixer", "Darknet Conduit"]
    }
  },
  {
    id: "entity-meridian",
    type: "accountNode",
    position: { x: 960, y: 380 },
    data: {
      id: "entity-meridian",
      label: "Meridian Horizon Capital LLC",
      accountNumber: "US12-BOFA-7744-1299",
      role: "Regulated Asset Manager",
      jurisdiction: "United States",
      riskScore: 32,
      riskLevel: "Low",
      flagged: false,
      balance: "$45,000,000 USD",
      inflow: "$120,000,000",
      outflow: "$115,000,000",
      ubo: "Meridian Capital Partners LLP",
      kycStatus: "Fully Compliant / SEC Registered",
      tags: ["Tier-1 Custodian", "Clean Entity Benchmark"]
    }
  }
];

export const initialNetworkEdges = [
  {
    id: "edge-apex-volkov",
    source: "entity-apex",
    target: "entity-volkov",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2.5 },
    label: "$1,450,000 (Layering)",
    labelStyle: { fill: "#f87171", fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.9, rx: 4, ry: 4 }
  },
  {
    id: "edge-volkov-kozlov",
    source: "entity-volkov",
    target: "entity-kozlov",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2.5 },
    label: "$1,420,000 (Sanctions Corridor)",
    labelStyle: { fill: "#f87171", fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.9, rx: 4, ry: 4 }
  },
  {
    id: "edge-fastpay-mule",
    source: "entity-fastpay",
    target: "entity-mule14",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2 },
    label: "$9,850 x 5 (Structuring)",
    labelStyle: { fill: "#fb923c", fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.9, rx: 4, ry: 4 }
  },
  {
    id: "edge-mule-atm",
    source: "entity-mule14",
    target: "entity-atm",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2 },
    label: "$9,500 Cashout",
    labelStyle: { fill: "#fb923c", fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.9, rx: 4, ry: 4 }
  },
  {
    id: "edge-nexus-mixer",
    source: "entity-nexus",
    target: "entity-mixer",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2.5 },
    label: "$820,000 (Mixer Hop)",
    labelStyle: { fill: "#f87171", fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.9, rx: 4, ry: 4 }
  },
  {
    id: "edge-apex-nexus",
    source: "entity-apex",
    target: "entity-nexus",
    style: { stroke: "#38bdf8", strokeWidth: 1.5, strokeDasharray: "4 4" },
    label: "$490,000 Inflow",
    labelStyle: { fill: "#38bdf8", fontSize: 11 },
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.9, rx: 4, ry: 4 }
  },
  {
    id: "edge-kozlov-meridian",
    source: "entity-kozlov",
    target: "entity-meridian",
    style: { stroke: "#eab308", strokeWidth: 1.8 },
    label: "$3,200,000 (Attempted Escrow)",
    labelStyle: { fill: "#fde047", fontSize: 11 },
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.9, rx: 4, ry: 4 }
  }
];
