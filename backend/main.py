import os
import sqlite3
import networkx as nx

from pathlib import Path
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# ==================================
# FASTAPI APPLICATION
# ==================================

app = FastAPI(
    title="FinShield Next-Gen API",
    description="AI-Powered Financial Fraud Investigation System",
    version="1.2.0"
)


# ==================================
# FRONTEND CONNECTION (CORS)
# ==================================

# Configure CORS origins from environment variable or default to allowing all origins
cors_origins_env = os.getenv("CORS_ORIGINS", "").strip()

if cors_origins_env and cors_origins_env != "*":
    allowed_origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )


# ==================================
# TRANSACTION MODEL
# ==================================

class Transaction(BaseModel):
    transaction_id: str
    sender: str
    receiver: str
    amount: float = Field(gt=0)
    timestamp: datetime
    transaction_type: str


# ==================================
# SQLITE DATABASE
# ==================================

DATABASE_PATH_ENV = os.getenv("DATABASE_PATH")
if DATABASE_PATH_ENV:
    DATABASE = Path(DATABASE_PATH_ENV).resolve()
else:
    DATABASE = Path(__file__).resolve().parent / "finshield.db"


def get_db_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():

    connection = get_db_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            transaction_id TEXT UNIQUE NOT NULL,
            sender TEXT NOT NULL,
            receiver TEXT NOT NULL,
            amount REAL NOT NULL,
            timestamp TEXT NOT NULL,
            transaction_type TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


def get_all_transactions():

    connection = get_db_connection()

    rows = connection.execute("""
        SELECT transaction_id, sender, receiver,
               amount, timestamp, transaction_type
        FROM transactions
        ORDER BY id
    """).fetchall()

    connection.close()

    return [dict(row) for row in rows]


initialize_database()


# ==================================
# HELPER FUNCTIONS
# ==================================

def parse_timestamp(value):

    timestamp = datetime.fromisoformat(value)

    if timestamp.tzinfo is None:
        return timestamp.replace(tzinfo=timezone.utc)

    return timestamp.astimezone(timezone.utc)


# IMPORTANT:
# Renamed to avoid conflict with /api/graph endpoint.

def build_transaction_graph(data):

    G = nx.DiGraph()

    for transaction in data:

        G.add_edge(
            transaction["sender"],
            transaction["receiver"]
        )

    return G


def detect_cycles(data):

    G = build_transaction_graph(data)

    return list(nx.simple_cycles(G))


# ==================================
# HOME API
# ==================================

@app.get("/")
def home():

    return {
        "message": "Welcome to FinShield Next-Gen",
        "status": "Backend Running",
        "database": "SQLite Connected"
    }


# ==================================
# HEALTH CHECK API
# ==================================

@app.get("/api/health")
def health_check():

    return {
        "status": "healthy",
        "project": "FinShield Next-Gen",
        "backend": "FastAPI",
        "database": "SQLite"
    }


# ==================================
# ADD TRANSACTION API
# ==================================

@app.post("/api/transactions")
def add_transaction(transaction: Transaction):

    connection = get_db_connection()

    try:

        connection.execute("""
            INSERT INTO transactions (
                transaction_id,
                sender,
                receiver,
                amount,
                timestamp,
                transaction_type
            )
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            transaction.transaction_id,
            transaction.sender,
            transaction.receiver,
            transaction.amount,
            transaction.timestamp.isoformat(),
            transaction.transaction_type
        ))

        connection.commit()

        return {
            "message": "Transaction added successfully",
            "transaction": transaction
        }

    except sqlite3.IntegrityError:

        raise HTTPException(
            status_code=409,
            detail="Transaction ID already exists"
        )

    finally:

        connection.close()


# ==================================
# GET ALL TRANSACTIONS API
# ==================================

@app.get("/api/transactions")
def get_transactions():

    data = get_all_transactions()

    return {
        "total_transactions": len(data),
        "transactions": data
    }


# ==================================
# GRAPH INTELLIGENCE API
# ==================================

@app.get("/api/graph")
def get_transaction_graph():

    data = get_all_transactions()

    G = build_transaction_graph(data)

    accounts = list(G.nodes())

    connections = [
        {
            "sender": transaction["sender"],
            "receiver": transaction["receiver"],
            "amount": transaction["amount"],
            "transaction_id": transaction["transaction_id"],
            "timestamp": transaction["timestamp"],
            "transaction_type": transaction["transaction_type"]
        }
        for transaction in data
    ]

    return {
        "total_accounts": len(accounts),
        "total_connections": len(connections),
        "accounts": accounts,
        "connections": connections
    }


# ==================================
# CIRCULAR TRANSACTION DETECTION
# ==================================

@app.get("/api/graph/cycles")
def detect_circular_transactions():

    data = get_all_transactions()

    cycles = detect_cycles(data)

    suspicious_cycles = []

    for cycle in cycles:

        cycle_accounts = cycle + [cycle[0]]

        cycle_transactions = []

        for i in range(len(cycle)):

            sender = cycle[i]
            receiver = cycle[(i + 1) % len(cycle)]

            matching_transactions = [
                {
                    "sender": t["sender"],
                    "receiver": t["receiver"],
                    "amount": t["amount"],
                    "transaction_id": t["transaction_id"]
                }
                for t in data
                if t["sender"] == sender
                and t["receiver"] == receiver
            ]

            cycle_transactions.extend(matching_transactions)

        suspicious_cycles.append({
            "accounts_involved": cycle_accounts,
            "total_accounts": len(cycle),
            "transactions": cycle_transactions
        })

    return {
        "cycles_detected": len(suspicious_cycles),
        "suspicious_cycles": suspicious_cycles
    }


# ==================================
# ACCOUNT RISK SCORING ENGINE
# ==================================

@app.get("/api/accounts/risk")
def calculate_account_risk():

    data = get_all_transactions()

    G = build_transaction_graph(data)

    cycles = detect_cycles(data)

    account_risks = []

    for account in G.nodes():

        incoming = [
            t for t in data
            if t["receiver"] == account
        ]

        outgoing = [
            t for t in data
            if t["sender"] == account
        ]

        incoming_count = len(incoming)
        outgoing_count = len(outgoing)

        incoming_amount = sum(
            t["amount"] for t in incoming
        )

        outgoing_amount = sum(
            t["amount"] for t in outgoing
        )

        risk_score = 0
        risk_reasons = []

        # RULE 1: HIGH VALUE TRANSACTIONS

        high_value_transactions = [
            t for t in outgoing
            if t["amount"] >= 40000
        ]

        if high_value_transactions:

            risk_score += 20

            risk_reasons.append(
                "High-value transaction detected"
            )

        # RULE 2: RAPID TRANSACTION ACTIVITY

        rapid_activity = False

        parsed_outgoing = sorted(
            outgoing,
            key=lambda t: parse_timestamp(t["timestamp"])
        )

        for i in range(len(parsed_outgoing)):

            first_time = parse_timestamp(
                parsed_outgoing[i]["timestamp"]
            )

            for j in range(i + 1, len(parsed_outgoing)):

                second_time = parse_timestamp(
                    parsed_outgoing[j]["timestamp"]
                )

                difference = (
                    second_time - first_time
                ).total_seconds()

                if 0 < difference <= 600:

                    rapid_activity = True
                    break

            if rapid_activity:
                break

        if rapid_activity:

            risk_score += 25

            risk_reasons.append(
                "Multiple outgoing transactions within 10 minutes"
            )

        # RULE 3: HIGH TRANSACTION FREQUENCY

        if outgoing_count >= 4:

            risk_score += 15

            risk_reasons.append(
                "High outgoing transaction frequency"
            )

        # RULE 4: HIGH OUTGOING VOLUME

        if outgoing_amount >= 100000:

            risk_score += 15

            risk_reasons.append(
                "High total outgoing transaction volume"
            )

        # RULE 5: HIGH INCOMING VOLUME

        if incoming_amount >= 100000:

            risk_score += 15

            risk_reasons.append(
                "High total incoming transaction volume"
            )

        # RULE 6: MULTIPLE RECIPIENTS

        unique_receivers = set(
            t["receiver"] for t in outgoing
        )

        if len(unique_receivers) >= 3:

            risk_score += 15

            risk_reasons.append(
                "Funds distributed across multiple accounts"
            )

        # RULE 7: CIRCULAR TRANSACTIONS

        if any(account in cycle for cycle in cycles):

            risk_score += 35

            risk_reasons.append(
                "Account involved in a circular transaction pattern"
            )

        # FINAL RISK SCORE

        risk_score = min(risk_score, 100)

        if risk_score >= 70:
            risk_level = "High"

        elif risk_score >= 40:
            risk_level = "Medium"

        else:
            risk_level = "Low"

        account_risks.append({

            "account": account,

            "incoming_transactions": incoming_count,

            "outgoing_transactions": outgoing_count,

            "incoming_amount": incoming_amount,

            "outgoing_amount": outgoing_amount,

            "risk_score": risk_score,

            "risk_level": risk_level,

            "risk_reasons": risk_reasons

        })

    return {

        "total_accounts_analyzed": len(account_risks),

        "account_risks": account_risks,

        "scoring_type": "Experimental Rule-Based",

        "disclaimer": "Risk scores indicate suspicious patterns, not confirmed fraud."

    }


# ==================================
# TRANSACTION ANOMALY DETECTION
# ==================================

@app.get("/api/transactions/anomalies")
def detect_transaction_anomalies():

    rows = get_all_transactions()

    anomalies = []

    for transaction in rows:

        reasons = []

        # RULE 1: HIGH VALUE TRANSACTION

        if transaction["amount"] >= 40000:

            reasons.append(
                "High-value transaction"
            )

        # RULE 2: RAPID TRANSACTION ACTIVITY

        transaction_time = parse_timestamp(
            transaction["timestamp"]
        )

        for other in rows:

            if other["transaction_id"] == transaction["transaction_id"]:
                continue

            if other["sender"] != transaction["sender"]:
                continue

            other_time = parse_timestamp(
                other["timestamp"]
            )

            time_difference = abs(
                (transaction_time - other_time).total_seconds()
            )

            if 0 < time_difference <= 600:

                reasons.append(
                    "Multiple transactions from same account within 10 minutes"
                )

                break

        if reasons:

            anomalies.append({

                "transaction_id": transaction["transaction_id"],

                "sender": transaction["sender"],

                "receiver": transaction["receiver"],

                "amount": transaction["amount"],

                "timestamp": transaction["timestamp"],

                "risk_level": (
                    "High"
                    if transaction["amount"] >= 40000
                    else "Medium"
                ),

                "reasons": reasons

            })

    return {

        "total_transactions_analyzed": len(rows),

        "anomalies_detected": len(anomalies),

        "anomalies": anomalies

    }


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("main:app", host=host, port=port, reload=True)
