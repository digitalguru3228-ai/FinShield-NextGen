export const initialTransactions = [
  {
    id: "TXN-2026-8941",
    sender: {
      name: "Apex Global Offshore S.A.",
      account: "PA04-BLAT-9012-4412",
      type: "Offshore Shell Corp",
      bank: "Banco Latinoamericano (Panama)",
      country: "Panama",
      flagged: true,
      riskScore: 94
    },
    receiver: {
      name: "Volkov Logistics & Freight Ltd",
      account: "CY29-HEBA-8812-7091",
      type: "Commercial Logistics",
      bank: "Bank of Cyprus",
      country: "Cyprus",
      flagged: true,
      riskScore: 89
    },
    amount: 1450000.00,
    currency: "USD",
    timestamp: "2026-11-15 11:42:18 UTC",
    riskLevel: "Critical",
    riskScore: 94,
    status: "Suspicious",
    fraudCategory: "Cross-Border Layering & Shell Company Smurfing",
    aiConfidence: 98.4,
    amlTriggers: [
      "Layered wire via multiple non-cooperative jurisdictions (Panama -> Cyprus)",
      "Sender entity created less than 45 days prior to high-value transaction",
      "Ultimate Beneficial Owner (UBO) concealed behind nominee directors",
      "Immediate outbound hops scheduled to secondary accounts"
    ],
    device: {
      ip: "185.220.101.5",
      isTor: true,
      isVpn: true,
      location: "Panama City, PA",
      deviceId: "DEV-FINGERPRINT-88902-WIN"
    },
    caseId: "SAR-2026-9041",
    notes: "High priority alert dispatched. Inbound funds received from 12 distinct micro-sources prior to unified wire out."
  },
  {
    id: "TXN-2026-8942",
    sender: {
      name: "Nexus Digital Asset Vault",
      account: "US88-CHAS-1029-4411",
      type: "Crypto Custody / OTC Desk",
      bank: "JPMorgan Chase N.A.",
      country: "United States",
      flagged: false,
      riskScore: 68
    },
    receiver: {
      name: "DarkPool Mixer Transit [0x7a3...b91]",
      account: "ETH-TORN-0x7a3F91A...c44B",
      type: "Smart Contract Mixer",
      bank: "Ethereum Network",
      country: "Decentralized",
      flagged: true,
      riskScore: 97
    },
    amount: 820000.00,
    currency: "USD",
    timestamp: "2026-11-15 11:15:04 UTC",
    riskLevel: "Critical",
    riskScore: 96,
    status: "Blocked",
    fraudCategory: "Sanctioned Mixer Off-Ramp Evasion",
    aiConfidence: 99.1,
    amlTriggers: [
      "Direct interaction with OFAC-sanctioned smart contract hash",
      "Zero customer KYC recorded on destination wallet",
      "Rapid fragmentation pattern detected"
    ],
    device: {
      ip: "194.26.29.112",
      isTor: false,
      isVpn: true,
      location: "Zurich, Switzerland",
      deviceId: "DEV-MAC-CH-49102"
    },
    caseId: "SAR-2026-8703",
    notes: "Automated real-time interdiction triggered. Outbound transfer frozen at clearing gateway."
  },
  {
    id: "TXN-2026-8943",
    sender: {
      name: "Dmitri Kozlov (Personal)",
      account: "CH93-UBSW-0021-9943",
      type: "High-Net-Worth Individual",
      bank: "UBS Switzerland AG",
      country: "Switzerland",
      flagged: true,
      riskScore: 88
    },
    receiver: {
      name: "Meridian Horizon Capital LLC",
      account: "US12-BOFA-7744-1299",
      type: "Asset Management LLC",
      bank: "Bank of America",
      country: "United States",
      flagged: false,
      riskScore: 42
    },
    amount: 3200000.00,
    currency: "USD",
    timestamp: "2026-11-15 10:58:30 UTC",
    riskLevel: "High",
    riskScore: 86,
    status: "Under Investigation",
    fraudCategory: "PEP Sanction Proximity & Capital Flight",
    aiConfidence: 91.2,
    amlTriggers: [
      "Sender identified as 2nd-degree associate of Specially Designated National (SDN)",
      "Unexplained escalation of transfer volume vs 6-month baseline (+650%)",
      "Mismatch between registered source of wealth and wire value"
    ],
    device: {
      ip: "195.176.255.8",
      isTor: false,
      isVpn: false,
      location: "Geneva, Switzerland",
      deviceId: "DEV-IPAD-PRO-9912"
    },
    caseId: "SAR-2026-9041",
    notes: "Analyst review required. Tier-2 EDD (Enhanced Due Diligence) documents requested from correspondent bank."
  },
  {
    id: "TXN-2026-8944",
    sender: {
      name: "FastPay Cashier #44",
      account: "US33-WFGO-4091-0012",
      type: "MSB / Check Casher",
      bank: "Wells Fargo",
      country: "United States",
      flagged: true,
      riskScore: 82
    },
    receiver: {
      name: "Elena Rostova (Mule #14)",
      account: "US55-CHAS-9922-8311",
      type: "Individual Checking",
      bank: "JPMorgan Chase N.A.",
      country: "United States",
      flagged: true,
      riskScore: 85
    },
    amount: 9850.00,
    currency: "USD",
    timestamp: "2026-11-15 10:32:11 UTC",
    riskLevel: "High",
    riskScore: 84,
    status: "Suspicious",
    fraudCategory: "Structuring / Threshold Evasion (Smurfing)",
    aiConfidence: 94.7,
    amlTriggers: [
      "Amount ($9,850) calibrated just below $10,000 Currency Transaction Report (CTR) threshold",
      "5th transaction under $10,000 within a 2-hour window across sister retail branches",
      "Beneficiary account exhibits velocity spike with immediate ATM withdrawals"
    ],
    device: {
      ip: "74.125.18.99",
      isTor: false,
      isVpn: false,
      location: "Miami, Florida, US",
      deviceId: "POS-TERMINAL-MIA-04"
    },
    caseId: "SAR-2026-8812",
    notes: "Structuring pattern flagged by Transaction Agent. Connected to Miami mule network."
  },
  {
    id: "TXN-2026-8945",
    sender: {
      name: "Starlight Holdings Cayman",
      account: "KY89-BNPA-5501-2290",
      type: "Exempt Company",
      bank: "BNP Paribas Cayman",
      country: "Cayman Islands",
      flagged: true,
      riskScore: 78
    },
    receiver: {
      name: "Eurasian Mineral Trading AG",
      account: "AT40-ERST-1102-3399",
      type: "Commodity Trading",
      bank: "Erste Group Bank",
      country: "Austria",
      flagged: false,
      riskScore: 54
    },
    amount: 4120000.00,
    currency: "USD",
    timestamp: "2026-11-15 09:45:00 UTC",
    riskLevel: "High",
    riskScore: 79,
    status: "Under Investigation",
    fraudCategory: "Trade-Based Over-Invoicing & Layering",
    aiConfidence: 87.5,
    amlTriggers: [
      "Invoiced unit prices for copper cathode exceed LME benchmark by +340%",
      "Dual transit invoices routed through offshore tax haven",
      "Beneficiary bank previously cited for correspondent AML deficiencies"
    ],
    device: {
      ip: "190.216.14.88",
      isTor: false,
      isVpn: true,
      location: "George Town, Cayman Islands",
      deviceId: "DEV-SRV-CORP-01"
    },
    caseId: "SAR-2026-8490",
    notes: "Customs declaration cross-referenced. Maritime bill of lading mismatch identified."
  },
  {
    id: "TXN-2026-8946",
    sender: {
      name: "Elena Rostova (Mule #14)",
      account: "US55-CHAS-9922-8311",
      type: "Individual Checking",
      bank: "JPMorgan Chase N.A.",
      country: "United States",
      flagged: true,
      riskScore: 85
    },
    receiver: {
      name: "Cash Out ATM Cluster [Biscayne Blvd]",
      account: "ATM-DISP-MIA-904",
      type: "ATM Cash Withdrawal",
      bank: "JPMorgan Chase N.A.",
      country: "United States",
      flagged: true,
      riskScore: 81
    },
    amount: 9500.00,
    currency: "USD",
    timestamp: "2026-11-15 09:20:17 UTC",
    riskLevel: "High",
    riskScore: 82,
    status: "Suspicious",
    fraudCategory: "Rapid Mule Cashout / Structuring",
    aiConfidence: 96.0,
    amlTriggers: [
      "Instantaneous withdrawal following incoming wire (holding period: 18 mins)",
      "Daily cumulative cash limit exceeded across multiple card clones"
    ],
    device: {
      ip: "172.56.21.90",
      isTor: false,
      isVpn: false,
      location: "Miami, Florida, US",
      deviceId: "ATM-HW-081"
    },
    caseId: "SAR-2026-8812",
    notes: "Card skimmed or surrogate runner. Security camera footage requested from branch."
  },
  {
    id: "TXN-2026-8947",
    sender: {
      name: "Global Payroll Solutions Corp",
      account: "US99-CITI-4411-0021",
      type: "Commercial Payroll",
      bank: "Citibank N.A.",
      country: "United States",
      flagged: false,
      riskScore: 18
    },
    receiver: {
      name: "AstraZeneca Biopharma USA",
      account: "US11-CHAS-3320-1122",
      type: "Enterprise Corporate",
      bank: "JPMorgan Chase N.A.",
      country: "United States",
      flagged: false,
      riskScore: 12
    },
    amount: 5400000.00,
    currency: "USD",
    timestamp: "2026-11-15 08:50:00 UTC",
    riskLevel: "Low",
    riskScore: 14,
    status: "Normal",
    fraudCategory: "Verified Enterprise Payroll Disbursement",
    aiConfidence: 99.8,
    amlTriggers: [],
    device: {
      ip: "199.167.211.5",
      isTor: false,
      isVpn: false,
      location: "New York, NY, US",
      deviceId: "SWIFT-ALLIANCE-GATEWAY"
    },
    caseId: null,
    notes: "Verified recurring batch payroll execution. Full KYC and clean history."
  },
  {
    id: "TXN-2026-8948",
    sender: {
      name: "PanAsia Electronics HK Ltd",
      account: "HK02-HSBC-4901-8833",
      type: "Wholesale Electronics",
      bank: "HSBC Hong Kong",
      country: "Hong Kong",
      flagged: false,
      riskScore: 58
    },
    receiver: {
      name: "Silverline Commercial Escrow",
      account: "SG89-DBSB-0019-4402",
      type: "Escrow Agent",
      bank: "DBS Bank Singapore",
      country: "Singapore",
      flagged: false,
      riskScore: 45
    },
    amount: 670000.00,
    currency: "USD",
    timestamp: "2026-11-15 08:12:44 UTC",
    riskLevel: "Medium",
    riskScore: 56,
    status: "Normal",
    fraudCategory: "Commercial Trade Settlement",
    aiConfidence: 89.0,
    amlTriggers: [
      "Cross-border corridor monitored for dual-use tech diversion",
      "Minor discrepancy in container transit codes"
    ],
    device: {
      ip: "202.175.8.44",
      isTor: false,
      isVpn: false,
      location: "Kowloon, Hong Kong",
      deviceId: "CORP-ERP-SAP-NODE-03"
    },
    caseId: null,
    notes: "Cleared by automated rules. Commercial invoice and packing list verified."
  },
  {
    id: "TXN-2026-8949",
    sender: {
      name: "Alpha Crypto Liquidity Pool",
      account: "US76-SILV-9011-3321",
      type: "Fintech Settlement",
      bank: "Silvergate Bridge Bank",
      country: "United States",
      flagged: true,
      riskScore: 76
    },
    receiver: {
      name: "Helios Private Wealth Ltd",
      account: "CH09-CSFB-9981-1200",
      type: "Private Wealth",
      bank: "Credit Suisse AG",
      country: "Switzerland",
      flagged: false,
      riskScore: 61
    },
    amount: 1800000.00,
    currency: "USD",
    timestamp: "2026-11-15 07:44:12 UTC",
    riskLevel: "High",
    riskScore: 78,
    status: "Under Investigation",
    fraudCategory: "Rapid High-Velocity Crypto Off-Ramp",
    aiConfidence: 92.4,
    amlTriggers: [
      "Inbound crypto liquidity converted into fiat within 300 seconds",
      "Destination account opened in Zurich under discretionary trust",
      "Missing source of funds declaration on fiat leg"
    ],
    device: {
      ip: "104.244.42.1",
      isTor: false,
      isVpn: true,
      location: "San Francisco, CA, US",
      deviceId: "DEV-API-REST-CLIENT-09"
    },
    caseId: "SAR-2026-8321",
    notes: "Automated alert from Liquidity Sentinel module. Pending compliance officer review."
  },
  {
    id: "TXN-2026-8950",
    sender: {
      name: "Nordic Clean Energy Holdings",
      account: "SE45-HAND-8822-1100",
      type: "Renewable Energy Corp",
      bank: "Handelsbanken",
      country: "Sweden",
      flagged: false,
      riskScore: 22
    },
    receiver: {
      name: "Siemens Energy Grid Solutions",
      account: "DE89-DEUT-5001-9922",
      type: "Industrial Corp",
      bank: "Deutsche Bank AG",
      country: "Germany",
      flagged: false,
      riskScore: 16
    },
    amount: 9800000.00,
    currency: "EUR",
    timestamp: "2026-11-15 06:30:19 UTC",
    riskLevel: "Low",
    riskScore: 18,
    status: "Normal",
    fraudCategory: "Verified Intra-EU Infrastructure Wire",
    aiConfidence: 99.9,
    amlTriggers: [],
    device: {
      ip: "193.180.251.10",
      isTor: false,
      isVpn: false,
      location: "Stockholm, Sweden",
      deviceId: "SWIFT-ISO20022-NET"
    },
    caseId: null,
    notes: "Verified SEPA wholesale transfer. Standard KYC documentation in place."
  },
  {
    id: "TXN-2026-8951",
    sender: {
      name: "Volkov Logistics & Freight Ltd",
      account: "CY29-HEBA-8812-7091",
      type: "Commercial Logistics",
      bank: "Bank of Cyprus",
      country: "Cyprus",
      flagged: true,
      riskScore: 89
    },
    receiver: {
      name: "Kozlov Trans-Siberian Trading",
      account: "AE12-EMIR-4019-9932",
      type: "General Trading FZC",
      bank: "Emirates NBD",
      country: "United Arab Emirates",
      flagged: true,
      riskScore: 95
    },
    amount: 1420000.00,
    currency: "USD",
    timestamp: "2026-11-15 05:12:00 UTC",
    riskLevel: "Critical",
    riskScore: 95,
    status: "Suspicious",
    fraudCategory: "Sanction Evasion Corridor (UAE Re-Export Ring)",
    aiConfidence: 97.6,
    amlTriggers: [
      "Destination Dubai Free Zone company sanctioned under Executive Order 14024",
      "Immediate re-routing of funds received from Panama shell within 6 hours",
      "Phantom shipment documentation identified by Evidence Verification Agent"
    ],
    device: {
      ip: "194.226.54.12",
      isTor: true,
      isVpn: true,
      location: "Limassol, Cyprus",
      deviceId: "DEV-ROUTER-CY-880"
    },
    caseId: "SAR-2026-9041",
    notes: "Second leg of $1.4M laundering ring. Escalated to FinCEN and OFAC enforcement liaisons."
  },
  {
    id: "TXN-2026-8952",
    sender: {
      name: "BlueFin Payments Ltd",
      account: "GB33-BARC-2009-4412",
      type: "Payment Gateway",
      bank: "Barclays Bank UK",
      country: "United Kingdom",
      flagged: false,
      riskScore: 48
    },
    receiver: {
      name: "Apex Global Offshore S.A.",
      account: "PA04-BLAT-9012-4412",
      type: "Offshore Shell Corp",
      bank: "Banco Latinoamericano (Panama)",
      country: "Panama",
      flagged: true,
      riskScore: 94
    },
    amount: 490000.00,
    currency: "USD",
    timestamp: "2026-11-15 04:22:33 UTC",
    riskLevel: "High",
    riskScore: 81,
    status: "Suspicious",
    fraudCategory: "Inbound Layering to Shell Entity",
    aiConfidence: 93.1,
    amlTriggers: [
      "High volume payout from consumer card transactions routed to Panama shell",
      "Chargeback ratio on originating gateway exceeds 4.8%"
    ],
    device: {
      ip: "82.165.197.1",
      isTor: false,
      isVpn: false,
      location: "London, United Kingdom",
      deviceId: "API-GATEWAY-LON-02"
    },
    caseId: "SAR-2026-9041",
    notes: "Part of the upstream consolidation flow feeding Apex Global."
  },
  {
    id: "TXN-2026-8953",
    sender: {
      name: "Apple Inc Corporate Treasury",
      account: "US44-BOFA-1100-9988",
      type: "Multinational Treasury",
      bank: "Bank of America",
      country: "United States",
      flagged: false,
      riskScore: 8
    },
    receiver: {
      name: "Foxconn Industrial Internet Co",
      account: "TW80-CTBC-4401-2299",
      type: "Manufacturing Supplier",
      bank: "Chinatrust Commercial Bank",
      country: "Taiwan",
      flagged: false,
      riskScore: 14
    },
    amount: 42500000.00,
    currency: "USD",
    timestamp: "2026-11-15 03:45:10 UTC",
    riskLevel: "Low",
    riskScore: 10,
    status: "Normal",
    fraudCategory: "Approved Institutional Supply Chain Clearing",
    aiConfidence: 99.9,
    amlTriggers: [],
    device: {
      ip: "17.253.144.10",
      isTor: false,
      isVpn: false,
      location: "Cupertino, CA, US",
      deviceId: "TREASURY-SWIFT-HOST-01"
    },
    caseId: null,
    notes: "Regular scheduled component settlement under active Master Services Agreement."
  },
  {
    id: "TXN-2026-8954",
    sender: {
      name: "Casper Digital Holdings",
      account: "VG09-FCIB-3301-8844",
      type: "BVI Business Company",
      bank: "FirstCaribbean International",
      country: "British Virgin Islands",
      flagged: true,
      riskScore: 88
    },
    receiver: {
      name: "RedStar Gaming & Entertainment",
      account: "MT40-VALL-5501-9912",
      type: "Online Gaming / Casino",
      bank: "Bank of Valletta",
      country: "Malta",
      flagged: true,
      riskScore: 79
    },
    amount: 740000.00,
    currency: "EUR",
    timestamp: "2026-11-15 02:50:22 UTC",
    riskLevel: "High",
    riskScore: 83,
    status: "Suspicious",
    fraudCategory: "Casino Chip Washing & Offshore Layering",
    aiConfidence: 91.8,
    amlTriggers: [
      "Inbound deposit to iGaming account followed by 99% withdrawal without game play",
      "Originating entity registered in secrecy jurisdiction (BVI)",
      "Velocity spike: 3 wires over €500K within 48 hours"
    ],
    device: {
      ip: "195.181.164.7",
      isTor: true,
      isVpn: true,
      location: "Road Town, Tortola, BVI",
      deviceId: "CHROME-EXT-NODE-781"
    },
    caseId: "SAR-2026-8812",
    notes: "Casino operator flagged account for suspicious non-gaming chip redemption."
  },
  {
    id: "TXN-2026-8955",
    sender: {
      name: "Dr. Alistair Vance (Dormant)",
      account: "GB82-LOYD-3091-0044",
      type: "Individual Account",
      bank: "Lloyds Bank",
      country: "United Kingdom",
      flagged: true,
      riskScore: 77
    },
    receiver: {
      name: "P2P FastTransfer Gateway",
      account: "EE14-LHV-9920-1144",
      type: "Fintech EMI / Neobank",
      bank: "LHV Pank",
      country: "Estonia",
      flagged: false,
      riskScore: 62
    },
    amount: 145000.00,
    currency: "GBP",
    timestamp: "2026-11-15 02:14:05 UTC",
    riskLevel: "High",
    riskScore: 78,
    status: "Under Investigation",
    fraudCategory: "Dormant Account Takeover & Rapid Funnel",
    aiConfidence: 89.4,
    amlTriggers: [
      "Account inactive for 740 consecutive days prior to sudden wire burst",
      "Immediate password and 2FA credential reset from anomalous IP address",
      "Beneficiary is high-risk offshore electronic money institution (EMI)"
    ],
    device: {
      ip: "91.240.118.12",
      isTor: false,
      isVpn: true,
      location: "Tallinn, Estonia",
      deviceId: "DEV-ANDROID-S24-UNKNOWN"
    },
    caseId: "SAR-2026-8321",
    notes: "Account holder contacted via telephone for voice biometric out-of-band verification."
  },
  {
    id: "TXN-2026-8956",
    sender: {
      name: "Zeta Healthcare Foundation",
      account: "US65-WELL-2201-9934",
      type: "Non-Profit 501(c)(3)",
      bank: "Wells Fargo",
      country: "United States",
      flagged: false,
      riskScore: 32
    },
    receiver: {
      name: "MedSupply Global Solutions Ltd",
      account: "GB99-NATW-6012-4411",
      type: "Medical Equipment Corp",
      bank: "NatWest Bank",
      country: "United Kingdom",
      flagged: false,
      riskScore: 28
    },
    amount: 280000.00,
    currency: "USD",
    timestamp: "2026-11-15 01:38:19 UTC",
    riskLevel: "Low",
    riskScore: 30,
    status: "Normal",
    fraudCategory: "Verified Humanitarian Aid Supply Wire",
    aiConfidence: 98.7,
    amlTriggers: [],
    device: {
      ip: "12.180.44.2",
      isTor: false,
      isVpn: false,
      location: "Atlanta, GA, US",
      deviceId: "CORP-PAY-WORKSTATION-02"
    },
    caseId: null,
    notes: "Hospital grade diagnostic procurement contract verified against OFAC non-profit exemptions."
  },
  {
    id: "TXN-2026-8957",
    sender: {
      name: "Tornado Protocol Sanitizer [0x991]",
      account: "ETH-TORN-0x991b12...a881",
      type: "Smart Contract",
      bank: "Ethereum Network",
      country: "Decentralized",
      flagged: true,
      riskScore: 98
    },
    receiver: {
      name: "Alexander Petrov Private Wallet",
      account: "US45-SILV-7701-3312",
      type: "Unregistered Virtual Asset Broker",
      bank: "Silvergate Custody Node",
      country: "United States",
      flagged: true,
      riskScore: 94
    },
    amount: 1950000.00,
    currency: "USD",
    timestamp: "2026-11-15 00:55:00 UTC",
    riskLevel: "Critical",
    riskScore: 97,
    status: "Blocked",
    fraudCategory: "Sanctioned Smart Contract Evasion (OFAC SDN)",
    aiConfidence: 99.4,
    amlTriggers: [
      "Originating contract explicitly blacklisted on OFAC Cyber Sanctions Registry",
      "Beneficiary previously subject to FinCEN Geographic Targeting Order",
      "Zero verifiable source of funds on fiat on-ramp"
    ],
    device: {
      ip: "185.191.171.12",
      isTor: true,
      isVpn: true,
      location: "Frankfurt, Germany",
      deviceId: "ETH-RPC-INFURA-CLIENT"
    },
    caseId: "SAR-2026-8703",
    notes: "Intercepted by FinShield Sentinel Gateway prior to settlement."
  },
  {
    id: "TXN-2026-8958",
    sender: {
      name: "Marcus Aurelius Fine Art Ltd",
      account: "FR76-BNPA-3000-8811",
      type: "Art Advisory & Auction",
      bank: "BNP Paribas",
      country: "France",
      flagged: true,
      riskScore: 72
    },
    receiver: {
      name: "Helvetia Freeport Depository AG",
      account: "CH22-ZKBW-1190-4412",
      type: "Freeport Customs Vault",
      bank: "Zürcher Kantonalbank",
      country: "Switzerland",
      flagged: false,
      riskScore: 64
    },
    amount: 890000.00,
    currency: "EUR",
    timestamp: "2026-11-14 23:20:45 UTC",
    riskLevel: "High",
    riskScore: 71,
    status: "Under Investigation",
    fraudCategory: "High-Value Antiquities & Freeport Layering",
    aiConfidence: 86.2,
    amlTriggers: [
      "Artwork purchase without verifiable provenance documentation",
      "Storage in Geneva Freeport customs exempt warehouse zone",
      "Nominee buyer acting on behalf of undisclosed offshore principal"
    ],
    device: {
      ip: "80.12.34.89",
      isTor: false,
      isVpn: false,
      location: "Paris, France",
      deviceId: "MACBOOK-AIR-M3-FR"
    },
    caseId: "SAR-2026-8490",
    notes: "Auction house invoice requested; customs bill of entry pending."
  },
  {
    id: "TXN-2026-8959",
    sender: {
      name: "FastPay Cashier #44",
      account: "US33-WFGO-4091-0012",
      type: "MSB / Check Casher",
      bank: "Wells Fargo",
      country: "United States",
      flagged: true,
      riskScore: 82
    },
    receiver: {
      name: "Mateo Rodriguez (Mule #18)",
      account: "US12-TDIT-4491-0088",
      type: "Individual Checking",
      bank: "TD Bank USA",
      country: "United States",
      flagged: true,
      riskScore: 86
    },
    amount: 9900.00,
    currency: "USD",
    timestamp: "2026-11-14 22:45:11 UTC",
    riskLevel: "High",
    riskScore: 85,
    status: "Suspicious",
    fraudCategory: "Structuring / Threshold Evasion (Smurfing)",
    aiConfidence: 95.8,
    amlTriggers: [
      "Sequential wire calibrated to $9,900 to circumvent $10,000 CTR filing",
      "Beneficiary opened account less than 7 days prior to wire",
      "Common device IMEI fingerprint shared with Elena Rostova cluster"
    ],
    device: {
      ip: "74.125.18.99",
      isTor: false,
      isVpn: false,
      location: "Miami, Florida, US",
      deviceId: "POS-TERMINAL-MIA-04"
    },
    caseId: "SAR-2026-8812",
    notes: "Correlated to Miami syndicate mule ring. Immediate withdrawal alert placed on debit card."
  },
  {
    id: "TXN-2026-8960",
    sender: {
      name: "Toyota Motor Credit Corp",
      account: "US90-CHAS-5501-1122",
      type: "Automotive Financing",
      bank: "JPMorgan Chase N.A.",
      country: "United States",
      flagged: false,
      riskScore: 11
    },
    receiver: {
      name: "AutoNation Dealer Settlement #104",
      account: "US34-BOFA-9922-4411",
      type: "Automotive Retail Group",
      bank: "Bank of America",
      country: "United States",
      flagged: false,
      riskScore: 15
    },
    amount: 3840000.00,
    currency: "USD",
    timestamp: "2026-11-14 21:10:00 UTC",
    riskLevel: "Low",
    riskScore: 12,
    status: "Normal",
    fraudCategory: "Verified Corporate Automotive Wholesale Settlement",
    aiConfidence: 99.8,
    amlTriggers: [],
    device: {
      ip: "12.148.204.1",
      isTor: false,
      isVpn: false,
      location: "Plano, TX, US",
      deviceId: "ERP-SAP-TREASURY-04"
    },
    caseId: null,
    notes: "Daily inventory floorplan financing clearing batch."
  },
  {
    id: "TXN-2026-8961",
    sender: {
      name: "Orion Trade Logistics FZCO",
      account: "AE44-DUBB-2201-9988",
      type: "Free Zone Trading Corp",
      bank: "Dubai Islamic Bank",
      country: "United Arab Emirates",
      flagged: true,
      riskScore: 92
    },
    receiver: {
      name: "Volkov Logistics & Freight Ltd",
      account: "CY29-HEBA-8812-7091",
      type: "Commercial Logistics",
      bank: "Bank of Cyprus",
      country: "Cyprus",
      flagged: true,
      riskScore: 89
    },
    amount: 2450000.00,
    currency: "USD",
    timestamp: "2026-11-14 20:15:33 UTC",
    riskLevel: "Critical",
    riskScore: 93,
    status: "Suspicious",
    fraudCategory: "Sanction Evasion Corridor (Round-Tripping)",
    aiConfidence: 96.5,
    amlTriggers: [
      "Circulation loop: Funds wired to Dubai returning to Cyprus within 48 hours",
      "Beneficial ownership trace reveals shared proxy director with sanctioned entity",
      "Unjustified trade advance without commercial shipping invoices"
    ],
    device: {
      ip: "194.226.54.8",
      isTor: true,
      isVpn: true,
      location: "Dubai, United Arab Emirates",
      deviceId: "DEV-ROUTER-UAE-90"
    },
    caseId: "SAR-2026-9041",
    notes: "Round-tripping loop identified by Network Investigation Agent (NIA-v3.8)."
  },
  {
    id: "TXN-2026-8962",
    sender: {
      name: "Stripe Consumer Payments Inc",
      account: "US01-WFGO-8844-1100",
      type: "Merchant Acquiring Gateway",
      bank: "Wells Fargo",
      country: "United States",
      flagged: false,
      riskScore: 24
    },
    receiver: {
      name: "Shopify Merchant Payout Escrow",
      account: "US88-CITI-3301-4499",
      type: "E-Commerce Clearing",
      bank: "Citibank N.A.",
      country: "United States",
      flagged: false,
      riskScore: 21
    },
    amount: 14200000.00,
    currency: "USD",
    timestamp: "2026-11-14 19:00:00 UTC",
    riskLevel: "Low",
    riskScore: 22,
    status: "Normal",
    fraudCategory: "Verified E-Commerce Merchant Batch Settlement",
    aiConfidence: 99.6,
    amlTriggers: [],
    device: {
      ip: "54.240.196.1",
      isTor: false,
      isVpn: false,
      location: "San Francisco, CA, US",
      deviceId: "STRIPE-CLEARING-CLUSTER-09"
    },
    caseId: null,
    notes: "Automated daily settlement representing 184,000 sub-merchant payouts."
  },
  {
    id: "TXN-2026-8963",
    sender: {
      name: "Carlos Mendez Nominee Trust",
      account: "PA99-BGEN-4401-2299",
      type: "Nominee Trust Entity",
      bank: "Banco General",
      country: "Panama",
      flagged: true,
      riskScore: 91
    },
    receiver: {
      name: "Apex Global Offshore S.A.",
      account: "PA04-BLAT-9012-4412",
      type: "Offshore Shell Corp",
      bank: "Banco Latinoamericano (Panama)",
      country: "Panama",
      flagged: true,
      riskScore: 94
    },
    amount: 1250000.00,
    currency: "USD",
    timestamp: "2026-11-14 18:05:40 UTC",
    riskLevel: "Critical",
    riskScore: 91,
    status: "Suspicious",
    fraudCategory: "Internal Nominee Funneling",
    aiConfidence: 97.2,
    amlTriggers: [
      "Direct capital injection from designated nominee director of shell syndicate",
      "Immediate outbound wire structured within 3 hours",
      "Lack of commercial rationale for intra-entity capital reallocation"
    ],
    device: {
      ip: "190.216.14.22",
      isTor: false,
      isVpn: true,
      location: "Panama City, Panama",
      deviceId: "WIN11-SURFACE-PAN-01"
    },
    caseId: "SAR-2026-9041",
    notes: "Upstream feeder transaction for the $4.29M international layering ring."
  },
  {
    id: "TXN-2026-8964",
    sender: {
      name: "Sarah Jenkins (E-Commerce Freelance)",
      account: "US88-CHAS-2011-4455",
      type: "Individual Account",
      bank: "JPMorgan Chase N.A.",
      country: "United States",
      flagged: false,
      riskScore: 36
    },
    receiver: {
      name: "Upwork Global Escrow Services",
      account: "US33-WFGO-1100-3322",
      type: "Freelance Platform Escrow",
      bank: "Wells Fargo",
      country: "United States",
      flagged: false,
      riskScore: 25
    },
    amount: 4500.00,
    currency: "USD",
    timestamp: "2026-11-14 16:30:15 UTC",
    riskLevel: "Low",
    riskScore: 28,
    status: "Normal",
    fraudCategory: "Verified Contract Milestone Payment",
    aiConfidence: 99.4,
    amlTriggers: [],
    device: {
      ip: "67.188.192.1",
      isTor: false,
      isVpn: false,
      location: "Austin, TX, US",
      deviceId: "MACBOOK-PRO-M2-AUS"
    },
    caseId: null,
    notes: "Standard digital services milestone settlement."
  },
  {
    id: "TXN-2026-8965",
    sender: {
      name: "Caspian Energy Intermediary BV",
      account: "NL91-ABNA-0012-9944",
      type: "Holding BV",
      bank: "ABN AMRO Bank",
      country: "Netherlands",
      flagged: true,
      riskScore: 84
    },
    receiver: {
      name: "Kozlov Trans-Siberian Trading",
      account: "AE12-EMIR-4019-9932",
      type: "General Trading FZC",
      bank: "Emirates NBD",
      country: "United Arab Emirates",
      flagged: true,
      riskScore: 95
    },
    amount: 3890000.00,
    currency: "EUR",
    timestamp: "2026-11-14 15:10:20 UTC",
    riskLevel: "Critical",
    riskScore: 92,
    status: "Blocked",
    fraudCategory: "Sanctioned Hydrocarbon Re-Export Conduit",
    aiConfidence: 98.1,
    amlTriggers: [
      "Ultimate destination linked to sanctioned pipeline infrastructure operator",
      "False certificates of origin detected by Evidence Verification Agent",
      "Immediate interdiction ordered by EU Compliance Directorate"
    ],
    device: {
      ip: "145.220.10.4",
      isTor: false,
      isVpn: true,
      location: "Rotterdam, Netherlands",
      deviceId: "SRV-SWIFT-ALLIANCE-NL"
    },
    caseId: "SAR-2026-9041",
    notes: "Clearing payment blocked at Dutch correspondent level."
  }
];
