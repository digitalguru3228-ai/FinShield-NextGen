# FinShield Next-Gen | Enterprise Fraud Investigation Platform

**FinShield Next-Gen** is an agentic AI-powered financial fraud investigation web application engineered for tier-1 compliance officers, fraud intelligence units, and AML analysts. It features real-time suspicious transaction surveillance, interactive multi-hop account topology graph analysis, and autonomous multi-agent case investigation with FinCEN Form 111 (SAR) regulatory synthesis.

---

## 🏛️ Key Capabilities & Enterprise Modules

### 1. Executive Fraud Intelligence Dashboard (`/`)
- **Key Risk Indicators (KRIs)**: Real-time telemetry tracking Total Transactions ($14.82B volume), Suspicious Transactions (3,428 flagged), High-Risk Accounts (419 mapped), and Active Investigations.
- **Transaction Activity & Anomaly Ingress Chart**: High-performance interactive dual-area Recharts visualization comparing clearing volume against intercepted anomalies with 24-hour historical timeframes.
- **Attack Vector Distribution**: Heuristic breakdown of primary fraud methodologies (Layering via Shell Companies, Micro-Structuring/Smurfing, Sanctions Proximity, Crypto Off-Ramp Conduits, and Account Takeover).
- **Live Investigation Activity Feed**: Chronological stream of automated sentinel alerts, network expansions, gateway freezes, and analyst clearances.

### 2. Global Transaction Surveillance & Interdiction (`/transactions`)
- **Forensic Ledger Table**: Comprehensive inspection of transactions with sorting, multi-criteria filtering (Critical, High, Medium, Low risk; Flagged, Under Review, Cleared, Blocked status), and CSV export.
- **Forensic Detail Drawer**: Slide-over drawer presenting granular evidence:
  - Originating and beneficiary banking entities, routing, and UBO disclosures.
  - FinCEN / Bank Secrecy Act (BSA) triggered indicators.
  - Forensic device & network telemetry (IP address, Tor exit node detection, commercial VPN identification, device hardware hashes).
  - Triage actions: Emergency Account Freeze, Clear Transaction, or Launch Autonomous AI Case.

### 3. Financial Entity Relationship Graph (`/network`)
- **Interactive Graph Visualization (React Flow)**: Visualizes trans-border capital flows across jurisdictions (Panama, Switzerland, Cyprus, UAE, USA).
- **Laundering Ring Identification**: Identifies cyclical money laundering loops (e.g. Syndicate Ring #4: Panama Shell -> Cyprus Intermediary -> Dubai Free Zone entity).
- **Entity Dossier Panel**: Inspects individual nodes to reveal balance, 24-hour wire velocity, ultimate beneficial ownership, and KYC status.

### 4. AI Investigation Center (`/ai-investigation`)
- **Four Autonomous Fraud Agents**:
  1. **Transaction Investigation Agent (`TIA-v4.2`)**: Evaluates rapid velocity bursts, micro-deposits, and threshold evasion ($9,850 smurfing patterns).
  2. **Network Investigation Agent (`NIA-v3.8`)**: Executes multi-hop graph traversals to uncover money mule syndicates and closed cyclical loops.
  3. **Evidence Verification Agent (`EVA-v5.0`)**: Correlates targets against OFAC SDN watchlists, PEP databases, and maritime trade manifests.
  4. **Report Generation Agent (`RGA-v2.9`)**: Synthesizes cross-agent investigative findings into FinCEN Form 111 Suspicious Activity Reports (SAR).
- **Multi-Agent Orchestration Simulation Console**:
  - Live interactive demonstration of collaborative agent deliberations using realistic synthetic evidence.
  - Terminal-style orchestrator logs stream.
  - Seamless jump to assembled SAR case files.

### 5. Suspicious Activity Reports & Case Dossiers (`/reports`)
- **FinCEN Form 111 Dossiers**: Pre-compiled and analyst-created SAR filings with full executive summaries, chronological event logs, statutory BSA violation codes, and corroborating exhibits.
- **Export & Print**: Full printable view and JSON export functionality.
- **Case Creator Wizard**: Allows compliance officers to draft new SAR filings with immediate state persistence.

### 6. Enterprise Compliance & Engine Settings (`/settings`)
- Sensitivity sliders for Critical, High, and Medium risk boundaries.
- FinCEN Currency Transaction Report (CTR) limit configuration ($10,000 threshold).
- Automated interdiction toggles (Immediate freeze on OFAC SDN matches, Tor exit node penalties, multi-agent consensus mandates).
- Lead investigator profile and emergency alert webhook configuration.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with enterprise dark navy obsidian aesthetic
- **Charts**: [Recharts](https://recharts.org/)
- **Network Graph**: [@xyflow/react](https://reactflow.dev/) (React Flow v12)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Server**: [Uvicorn](https://www.uvicorn.org/) (ASGI)
- **Graph Engine**: [NetworkX](https://networkx.org/) (cycle detection, directed topological analysis)
- **Database**: [SQLite3](https://docs.python.org/3/library/sqlite3.html) (`finshield.db`)
- **Validation**: [Pydantic v2](https://docs.pydantic.dev/)

---

## 📁 Repository Structure

```
FinShield-NextGen/
├── backend/                        # FastAPI Python backend
│   ├── finshield.db                # SQLite demo database
│   ├── main.py                     # FastAPI application & graph algorithms
│   ├── requirements.txt            # Python dependencies
│   └── .env.example                # Backend environment template
├── public/                         # Static assets (favicons, icons)
├── src/                            # Frontend React application
│   ├── assets/                     # Images and SVGs
│   ├── components/                 # Reusable React components
│   │   ├── ai/                     # Agent cards & deliberation console
│   │   ├── common/                 # Badges, stat cards, search inputs
│   │   ├── layout/                 # Sidebar, TopNav, MainLayout
│   │   ├── network/                # React Flow graph nodes & dossier panel
│   │   ├── reports/                # SAR modals & report creators
│   │   └── transactions/           # Transaction table & detail drawer
│   ├── config/                     # Centralized API configuration (api.js)
│   ├── context/                    # InvestigationContext (state & backend fetch)
│   ├── data/                       # Mock data datasets & fallbacks
│   ├── pages/                      # Page view controllers
│   ├── App.jsx                     # Route definitions
│   ├── index.css                   # Tailwind v4 styles & custom utilities
│   └── main.jsx                    # Application entrypoint
├── .env.example                    # Frontend environment template
├── .gitignore                      # GitHub & deployment ignore rules
├── index.html                      # HTML entrypoint
├── package.json                    # Node dependencies and build scripts
├── package-lock.json               # Deterministic dependency lockfile
├── render.yaml                     # Render deployment blueprint
├── requirements.txt                # Root Python dependencies
├── vercel.json                     # Vercel deployment rewrites configuration
├── vite.config.js                  # Vite bundler configuration
└── README.md                       # Documentation
```

---

## 💻 Local Development Setup

### 1. Backend Setup (FastAPI)
```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the development server
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The FastAPI backend will be available at `http://127.0.0.1:8000`.
Interactive API documentation (Swagger UI) is available at `http://127.0.0.1:8000/docs`.

### 2. Frontend Setup (React + Vite)
```bash
# From the project root directory
npm install

# Start the Vite development server
npm run dev
```
The frontend web application will be accessible at `http://localhost:5173`.

---

## 🚀 Production Deployment Guide

### A. Deploy Frontend to Vercel

1. **Import Repository**:
   - Push your code to GitHub.
   - In Vercel, click **Add New...** -> **Project** and select your GitHub repository.

2. **Build Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**:
   - Add `VITE_API_URL` pointing to your deployed backend URL:
     ```
     VITE_API_URL=https://finshield-backend.onrender.com
     ```
   *(Note: Do not include a trailing slash.)*

4. **SPA Routing**:
   - Handled automatically by the included `vercel.json` rewrite configuration (`/(.*)` -> `/index.html`).

---

### B. Deploy Backend to Render

1. **Deploy with Blueprint (Recommended)**:
   - Connect your GitHub repository to Render.
   - Render will detect the included `render.yaml` blueprint and configure the service automatically.

2. **Manual Web Service Setup**:
   - In the Render Dashboard, click **New** -> **Web Service**.
   - Connect your GitHub repository.
   - Configure the following settings:
     - **Name**: `finshield-backend`
     - **Language**: `Python 3`
     - **Root Directory**: `backend`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**:
     - `PYTHON_VERSION`: `3.12.0`
     - `CORS_ORIGINS`: `*` (or your specific Vercel frontend URL, e.g. `https://finshield-nextgen.vercel.app`)

3. **SQLite Database Persistence Notes**:
   - The repository includes a pre-seeded demo SQLite database (`finshield.db`).
   - On Render's free tier, the local filesystem is ephemeral and resets on restart. For testing and demonstration, the included `finshield.db` automatically seeds and initializes on startup.
   - For persistent production storage on Render, attach a **Persistent Disk** (e.g. mounted at `/var/data`) and set the environment variable:
     ```
     DATABASE_PATH=/var/data/finshield.db
     ```
