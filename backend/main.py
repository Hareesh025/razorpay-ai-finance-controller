

    customer = data.get("customer", "Unknown Customer")
    amount = float(data.get("amount", 0))
    status = data.get("status", "success")

    if amount <= 0:
        return {
            "success": False,
            "message": "Invalid payment amount"
        }

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

    # Allocate the next SIM number safely within a database transaction.
    with get_db_connection() as conn:
        conn.execute("SELECT pg_advisory_xact_lock(872341)")
        next_number = conn.execute(
            """
            SELECT COALESCE(
                MAX(SUBSTRING(transaction_id FROM 5)::BIGINT), 0
            ) + 1 AS next_number
            FROM simulated_transactions
            WHERE transaction_id ~ '^SIM-[0-9]+$'
            """
        ).fetchone()["next_number"]

        transaction_id = f"SIM-{next_number}"

        conn.execute(
            """
            INSERT INTO simulated_transactions
                (transaction_id, customer, amount, status, risk)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (transaction_id, customer, amount, status, risk)
        )

    return {
        "success": True,
        "transaction_id": transaction_id,
        "customer": customer,
        "amount": amount,
        "status": status,
        "risk": risk,
        "message": message
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

    with get_db_connection() as conn:
        inserted = conn.execute(
            """
            INSERT INTO recovery_actions
                (transaction_id, amount, risk, status)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (transaction_id) DO NOTHING
            RETURNING transaction_id
            """,
            (transaction_id, amount, risk, "recovery_initiated")
        ).fetchone()

    if inserted is None:
        return {
            "success": False,
            "message": "Recovery already initiated for this transaction."
        }

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
    actions = get_recovery_actions_from_db()
    return {
        "count": len(actions),
        "actions": actions
    }


@app.get("/health")
def health_check():
    # Confirm that the Neon database is reachable.
    with get_db_connection() as conn:
        conn.execute("SELECT 1")

    return {
        "status": "healthy",
        "service": "Razorpay AI Finance Controller",
        "database": "Neon PostgreSQL + CSV data connected",
        "api": "FastAPI running"
    }

