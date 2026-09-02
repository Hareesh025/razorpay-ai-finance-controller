from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Razorpay AI Finance Controller")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
import pandas as pd
simulated_transactions = []
recovery_actions = []
@app.get("/")
def home():
    return {
        "message": "Razorpay AI Finance Controller is running!"
    }
@app.get("/transactions/summary")
def transaction_summary():
    df = pd.read_csv("data/transactions.csv")

    total_transactions = len(df)
    successful_transactions = len(df[df["status"] == "success"])
    failed_transactions = len(df[df["status"] == "failed"])
    total_amount = df["amount"].sum()
    successful_amount = df[df["status"] == "success"]["amount"].sum()

    return {
        "total_transactions": total_transactions,
        "successful_transactions": successful_transactions,
        "failed_transactions": failed_transactions,
        "total_amount": int(total_amount),
        "successful_amount": int(successful_amount)
    }
@app.get("/transactions/analysis")
def transaction_analysis():
    df = pd.read_csv("data/transactions.csv")

    failed_count = len(df[df["status"] == "failed"])
    high_value_count = len(df[df["amount"] >= 5000])

    failed_amount = df[df["status"] == "failed"]["amount"].sum()
    high_value_amount = df[df["amount"] >= 5000]["amount"].sum()

    for transaction in simulated_transactions:
        if transaction["status"] == "failed":
            failed_count += 1
            failed_amount += transaction["amount"]

        if transaction["amount"] >= 5000:
            high_value_count += 1
            high_value_amount += transaction["amount"]

    return {
        "failed_transactions": failed_count,
        "high_value_transactions": high_value_count,
        "failed_amount": int(failed_amount),
        "high_value_amount": int(high_value_amount)
    }
@app.get("/reconciliation")
def reconciliation():
    transactions = pd.read_csv("data/transactions.csv")
    settlements = pd.read_csv("data/settlements.csv")

    merged = transactions.merge(
        settlements,
        on="transaction_id",
        how="left",
        suffixes=("_transaction", "_settlement")
    )

    merged["amount_match"] = (
        merged["amount"] == merged["settled_amount"]
    )

    matched = merged[
        (merged["settlement_status"] == "settled") &
        (merged["amount_match"] == True)
    ]

    unmatched = merged[
        ~(
            (merged["settlement_status"] == "settled") &
            (merged["amount_match"] == True)
        )
    ]

    total = len(merged)
    matched_count = len(matched)
    unmatched_count = len(unmatched)

    match_rate = (
        round((matched_count / total) * 100, 2)
        if total else 0
    )

    matched_value = matched["amount"].sum()

    exception_value = unmatched["amount"].sum()

    missing_settlement_value = merged[
        merged["settlement_status"].isna()
    ]["amount"].sum()

    amount_variance = (
        merged[
            merged["settled_amount"].notna()
        ]["amount"]
        -
        merged[
            merged["settled_amount"].notna()
        ]["settled_amount"]
    ).abs().sum()

    return {
        "total_transactions_checked": total,
        "matched_transactions": matched_count,
        "unmatched_transactions": unmatched_count,
        "match_rate_percent": match_rate,

        "matched_value": int(matched_value),
        "exception_value": int(exception_value),
        "missing_settlement_value": int(missing_settlement_value),
        "amount_variance": int(amount_variance),

        "processing_throughput": total
    }
@app.get("/reconciliation/exceptions")
def reconciliation_exceptions():
    transactions = pd.read_csv("data/transactions.csv")
    settlements = pd.read_csv("data/settlements.csv")

    merged = transactions.merge(
        settlements,
        on="transaction_id",
        how="left",
        suffixes=("_transaction", "_settlement")
    )

    merged["amount_match"] = (
        merged["amount"] == merged["settled_amount"]
    )

    exceptions = merged[
        ~(
            (merged["settlement_status"] == "settled") &
            (merged["amount_match"] == True)
        )
    ]

    results = []

    for _, row in exceptions.iterrows():

        if pd.isna(row["settlement_status"]):
            reason = "No settlement record found"
            classification = "Missing Settlement"
            recommended_action = (
                "Verify settlement with payment processor"
            )

        elif not row["amount_match"]:
            reason = "Settlement amount mismatch"
            classification = "Amount Variance"
            recommended_action = (
                "Review settlement amount and investigate variance"
            )

        else:
            reason = "Settlement not completed"
            classification = "Pending Settlement"
            recommended_action = (
                "Monitor settlement and follow up if unresolved"
            )

        results.append({
            "transaction_id": row["transaction_id"],
            "transaction_amount": int(row["amount"]),

            "settled_amount": (
                None
                if pd.isna(row["settled_amount"])
                else int(row["settled_amount"])
            ),

            "reason": reason,
            "classification": classification,
            "recommended_action": recommended_action
        })

    return {
        "exception_count": len(results),
        "exceptions": results
    }
@app.get("/transactions/risk")
def transaction_risk():
    df = pd.read_csv("data/transactions.csv")

    results = []

    # Existing CSV transactions
    for _, row in df.iterrows():
        amount = row["amount"]
        status = row["status"]

        if status == "failed" and amount >= 5000:
            risk = "HIGH"
        elif status == "failed" or amount >= 5000:
            risk = "MEDIUM"
        else:
            risk = "LOW"

        results.append({
            "transaction_id": row["transaction_id"],
            "amount": int(amount),
            "status": status,
            "risk": risk
        })

    # Simulated transactions
    for transaction in simulated_transactions:
        results.append({
            "transaction_id": transaction["transaction_id"],
            "amount": int(transaction["amount"]),
            "status": transaction["status"],
            "risk": transaction["risk"]
        })

    return {
        "transactions": results
    }
@app.post("/payments/simulate")
def simulate_payment(data: dict):

    customer = data.get("customer", "Unknown Customer")
    amount = float(data.get("amount", 0))
    status = data.get("status", "success")

    if amount <= 0:
        return {
            "success": False,
            "message": "Invalid payment amount"
        }

    transaction_id = "SIM-" + str(len(simulated_transactions) + 1)

    if status == "success":
        risk = "LOW"
        message = "Payment processed successfully"
    else:
        status = "failed"

        if amount >= 5000:
            risk = "HIGH"
        else:
            risk = "MEDIUM"

        message = "Payment failed and requires investigation"

    transaction = {
        "transaction_id": transaction_id,
        "customer": customer,
        "amount": amount,
        "status": status,
        "risk": risk
    }

    # Save simulated transaction
    simulated_transactions.append(transaction)

    return {
        "success": True,
        "transaction_id": transaction_id,
        "customer": customer,
        "amount": amount,
        "status": status,
        "risk": risk,
        "message": message
    }
@app.post("/payments/reset")
def reset_simulations():
    simulated_transactions.clear()
    recovery_actions.clear()

    return {
        "success": True,
        "message": "All simulated transactions and recovery actions have been cleared."
    }
@app.post("/recovery/initiate")
def initiate_recovery(data: dict):

    transaction_id = data.get("transaction_id")
    amount = float(data.get("amount", 0))
    risk = data.get("risk", "MEDIUM")

    if not transaction_id or amount <= 0:
        return {
            "success": False,
            "message": "Invalid recovery request"
        }
    for existing_action in recovery_actions:
        if existing_action["transaction_id"] == transaction_id:
            return {
                "success": False,
                "message": "Recovery already initiated for this transaction."
            }
    action = {
        "transaction_id": transaction_id,
        "amount": amount,
        "risk": risk,
        "status": "recovery_initiated"
    }

    recovery_actions.append(action)

    return {
        "success": True,
        "transaction_id": transaction_id,
        "amount": amount,
        "risk": risk,
        "status": "recovery_initiated",
        "message": "Recovery action initiated successfully."
    }
@app.get("/recovery/actions")
def get_recovery_actions():
    return {
        "count": len(recovery_actions),
        "actions": recovery_actions
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Razorpay AI Finance Controller",
        "database": "CSV data connected",
        "api": "FastAPI running"
    }