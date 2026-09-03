const app = document.getElementById("app");
const dashboardHTML = app.innerHTML;

let simulatorState = {
    customer: "Demo Customer",
    amount: "2500",
    status: "success",
    result: null
};
const pages = {
    dashboard: "Financial Command Center",
    simulator: "Payment Simulator",
    investigation: "AI Investigation",
    recovery: "Recovery Center",

    transactions: "Transactions",
    revenue: "Revenue Leak",
    reconciliation: "Reconciliation",

    customers: "Customers",
    risk: "Risk & Security",
    insights: "AI Finance Insights",

    audit: "Audit Trail",
    health: "System Health"
};

document.querySelectorAll(".nav-item").forEach(button => {
    button.addEventListener("click", () => {

        // Save Payment Simulator values before changing pages
        saveSimulatorState();

        const page = button.dataset.page;

        // Update active sidebar button
        document.querySelectorAll(".nav-item").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        // Update top page title
        const pageTitle = document.getElementById("pageTitle");

        if (pageTitle && pages[page]) {
            pageTitle.textContent = pages[page];
        }

        // Load the selected page
        switch (page) {

            case "dashboard":
                showDashboard();
                break;

            case "simulator":
                showSimulator();
                break;

            case "investigation":
                showInvestigation();
                break;

            case "recovery":
                showRecovery();
                break;

            case "transactions":
                showTransactions();
                break;

            case "revenue":
                showRevenue();
                break;

            case "reconciliation":
                showReconciliation();
                break;

            case "customers":
                showCustomers();
                break;

            case "risk":
                showRisk();
                break;

            case "insights":
                showInsights();
                break;

            case "audit":
                showAudit();
                break;

            case "health":
                showHealth();
                break;

            default:
                console.warn("Unknown page:", page);
        }
    });
});


function saveSimulatorState() {
    const customerInput = document.getElementById("simCustomer");
    const amountInput = document.getElementById("simAmount");
    const statusInput = document.getElementById("simStatus");

    if (customerInput) {
        simulatorState.customer = customerInput.value;
    }

    if (amountInput) {
        simulatorState.amount = amountInput.value;
    }

    if (statusInput) {
        simulatorState.status = statusInput.value;
    }
}


function showDashboard() {
    app.innerHTML = dashboardHTML;
    loadDashboard();
}
function showSimulator() {

    app.innerHTML = `

        <div class="page-intro">

            <div>
                <span class="eyebrow">PAYMENT OPERATIONS</span>

                <h2>Payment Simulator</h2>

                <p>
                    Simulate a payment and observe the finance control workflow.
                </p>
            </div>

            <div class="live-indicator">
                <span class="status-dot"></span>
                Simulation mode
            </div>

        </div>


        <div class="dashboard-grid">


            <div class="panel">

                <div class="panel-header">

                    <div>
                        <span class="eyebrow">
                            PAYMENT REQUEST
                        </span>

                        <h3>
                            Create a payment
                        </h3>
                    </div>

                </div>


                <div class="form-group">

                    <label for="simCustomer">Customer</label>

                    <input
                        id="simCustomer"
                        type="text"
                        placeholder="Customer name"
                        value="${simulatorState.customer}"
                    >

                </div>


                <div class="form-group">

                    <label for="simAmount">Amount</label>

                    <input
                        id="simAmount"
                        type="number"
                        placeholder="Enter amount"
                        value="${simulatorState.amount}"
                    >

                </div>


                <div class="form-group">

                    <label for="simStatus">Payment outcome</label>

                    <select id="simStatus">
    <option value="success" ${simulatorState.status === "success" ? "selected" : ""}>
        Successful
    </option>

    <option value="failed" ${simulatorState.status === "failed" ? "selected" : ""}>
        Failed
    </option>
</select>

                </div>


               <button class="primary-btn" onclick="simulatePayment()">
    Process Payment →
</button>

<button
    class="secondary-btn"
    onclick="resetSimulations()"
    style="margin-top:10px; width:100%;"
>
    Reset Simulation Data
</button>

            </div>


            <div class="panel">

                <div class="panel-header">

                    <div>
                        <span class="eyebrow">
                            CONTROL FLOW
                        </span>

                        <h3>
                            What happens next?
                        </h3>
                    </div>

                </div>


                <div class="workflow">

                    <div class="workflow-step active">
                        <span>1</span>
                        <div>
                            <strong>Payment received</strong>
                            <small>Transaction enters the system</small>
                        </div>
                    </div>


                    <div class="workflow-line"></div>


                    <div class="workflow-step">
                        <span>2</span>
                        <div>
                            <strong>Risk analysis</strong>
                            <small>Transaction risk is evaluated</small>
                        </div>
                    </div>


                    <div class="workflow-line"></div>


                    <div class="workflow-step">
                        <span>3</span>
                        <div>
                            <strong>AI investigation</strong>
                            <small>Failures are analyzed</small>
                        </div>
                    </div>


                    <div class="workflow-line"></div>


                    <div class="workflow-step">
                        <span>4</span>
                        <div>
                            <strong>Recovery decision</strong>
                            <small>Recommended action is generated</small>
                        </div>
                    </div>

                </div>

            </div>

        </div>


        <div
            id="simulationResult"
            class="panel"
            style="margin-top:18px; display:none;"
        >

            <div class="panel-header">

                <div>
                    <span class="eyebrow">
                        PAYMENT RESULT
                    </span>

                    <h3>
                        Simulation result
                    </h3>
                </div>

            </div>

            <div id="simulationContent"></div>

        </div>

        `;

    // Restore previous simulation result
    const result = document.getElementById("simulationResult");
    const content = document.getElementById("simulationContent");

    if (simulatorState.result) {
        result.style.display = "block";
        content.innerHTML = simulatorState.result;
    }
}
function showInvestigation() {

    app.innerHTML = `
        <div class="page-intro">
            <div>
                <span class="eyebrow">AI FINANCE INTELLIGENCE</span>
                <h2>AI Investigation</h2>
                <p>
                    Investigate failed payments, transaction risk and financial anomalies.
                </p>
            </div>

            <div class="live-indicator">
                <span class="status-dot"></span>
                AI analysis active
            </div>
        </div>

        <div class="dashboard-grid">

            <div class="panel">
                <div class="panel-header">
                    <div>
                        <span class="eyebrow">INVESTIGATION QUEUE</span>
                        <h3>Transactions requiring investigation</h3>
                    </div>
                </div>

                <div id="investigationList">
                    <div class="loading-state">
                        Analyzing transactions...
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-header">
                    <div>
                        <span class="eyebrow">AI ANALYSIS</span>
                        <h3>Risk intelligence</h3>
                    </div>
                </div>

                <div class="ai-insight-box">
                    <div class="ai-symbol">✦</div>

                    <div>
                        <strong>AI Controller Analysis</strong>

                        <p>
                            The AI investigation engine evaluates failed payments,
                            high-value transactions and financial risk patterns.
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <div class="panel" style="margin-top:18px;">
            <div class="panel-header">
                <div>
                    <span class="eyebrow">INVESTIGATION SUMMARY</span>
                    <h3>Financial risk overview</h3>
                </div>
            </div>

            <div id="investigationSummary">
                Loading investigation data...
            </div>
        </div>
    `;

    loadInvestigationData();
}
function loadInvestigationData() {

    const investigationList =
        document.getElementById("investigationList");

    const summary =
        document.getElementById("investigationSummary");

    if (!investigationList || !summary) {
        return;
    }

    investigationList.innerHTML = `
        <div class="loading-state">
            Analyzing transactions...
        </div>
    `;

    Promise.all([
        fetch("https://razorpay-ai-finance-controller.onrender.com/transactions/analysis"),
        fetch("https://razorpay-ai-finance-controller.onrender.com/transactions/risk")
    ])
    .then(async ([analysisResponse, riskResponse]) => {

        if (!analysisResponse.ok || !riskResponse.ok) {
            throw new Error("Failed to load investigation data");
        }

        const analysis = await analysisResponse.json();
        const riskData = await riskResponse.json();

        return {
            analysis,
            riskData
        };
    })
    .then(({ analysis, riskData }) => {

        const failedTransactions =
            riskData.transactions.filter(
                transaction => transaction.status === "failed"
            );

        /* Investigation Queue */

        if (failedTransactions.length === 0) {

            investigationList.innerHTML = `
                <div class="exception-item">
                    <strong>No transactions require investigation</strong>
                    <p>All transactions are currently healthy.</p>
                </div>
            `;

        } else {

            investigationList.innerHTML = failedTransactions.map(
                transaction => `
                    <div class="exception-item">

                        <div>
                            <strong>
                                ${transaction.transaction_id}
                            </strong>

                            <p>
                                Failed payment requiring investigation.
                            </p>
                        </div>

                        <div>
                            <strong>
                                ₹${Number(transaction.amount)
                                    .toLocaleString("en-IN")}
                            </strong>

                            <p>
                                Risk:
                                <strong>${transaction.risk}</strong>
                            </p>
                        </div>

                    </div>
                `
            ).join("");
        }


        /* Investigation Summary */

        summary.innerHTML = `
            <div class="exception-item">

                <strong>AI Risk Analysis</strong>

                <p>
                    Failed Transactions:
                    <strong>${analysis.failed_transactions}</strong>
                </p>

                <p>
                    Failed Amount:
                    <strong>
                        ₹${Number(analysis.failed_amount)
                            .toLocaleString("en-IN")}
                    </strong>
                </p>

                <p>
                    High-Value Transactions:
                    <strong>${analysis.high_value_transactions}</strong>
                </p>

                <p>
                    High-Value Amount:
                    <strong>
                        ₹${Number(analysis.high_value_amount)
                            .toLocaleString("en-IN")}
                    </strong>
                </p>

            </div>
        `;
    })
    .catch(error => {

        console.error("Investigation data error:", error);

        investigationList.innerHTML = `
            <div class="exception-item">
                <strong>Investigation Data Error</strong>

                <p>
                    Unable to load investigation data.
                    Make sure the FastAPI server is running.
                </p>
            </div>
        `;

        summary.innerHTML = `
            <div class="exception-item">
                <strong>Investigation Data Error</strong>

                <p>
                    Unable to load investigation summary.
                </p>
            </div>
        `;
    });
}
    function showRecovery() {

    app.innerHTML = `
        <div class="page-intro">

            <div>
                <span class="eyebrow">AI FINANCE OPERATIONS</span>

                <h2>Recovery Center</h2>

                <p>
                    Review failed payments and generate recommended recovery actions.
                </p>
            </div>

            <div class="live-indicator">
                <span class="status-dot"></span>
                Recovery engine active
            </div>

        </div>

        <div class="dashboard-grid">

            <div class="panel">

                <div class="panel-header">
                    <div>
                        <span class="eyebrow">RECOVERY QUEUE</span>
                        <h3>Payments requiring recovery</h3>
                    </div>
                </div>

                <div id="recoveryQueue">
                    Loading recovery data...
                </div>

            </div>


            <div class="panel">

                <div class="panel-header">
                    <div>
                        <span class="eyebrow">AI RECOMMENDATION</span>
                        <h3>Recovery strategy</h3>
                    </div>
                </div>

                <div id="recoveryRecommendation">
                    Analyzing failed payments...
                </div>

            </div>

        </div>


        <div class="panel" style="margin-top:18px;">

            <div class="panel-header">
                <div>
                    <span class="eyebrow">RECOVERY SUMMARY</span>
                    <h3>Financial recovery overview</h3>
                </div>
            </div>

            <div id="recoverySummary">
                Loading recovery summary...
            </div>
<div class="panel" style="margin-top:18px;">
    <div class="panel-header">
        <div>
            <span class="eyebrow">RECOVERY HISTORY</span>
            <h3>Actions initiated</h3>
        </div>
    </div>

    <div id="recoveryHistory">
        Loading recovery history...
    </div>
</div>
        </div>
    `;

    loadRecoveryData();
}


function loadRecoveryData() {
    const queue = document.getElementById("recoveryQueue");
    const recommendation = document.getElementById("recoveryRecommendation");
    const summary = document.getElementById("recoverySummary");
    const history = document.getElementById("recoveryHistory");

    Promise.all([
        fetch("https://razorpay-ai-finance-controller.onrender.com/transactions/analysis"),
        fetch("https://razorpay-ai-finance-controller.onrender.com/transactions/risk"),
        fetch("https://razorpay-ai-finance-controller.onrender.com/recovery/actions")
    ])
    .then(async ([analysisResponse, riskResponse, historyResponse]) => {

        if (
            !analysisResponse.ok ||
            !riskResponse.ok ||
            !historyResponse.ok
        ) {
            throw new Error("Failed to load recovery data");
        }

        const analysis = await analysisResponse.json();
        const riskData = await riskResponse.json();
        const historyData = await historyResponse.json();

        return {
            analysis,
            riskData,
            historyData
        };
    })
    .then(({ analysis, riskData, historyData }) => {

        const riskyTransactions =
            riskData.transactions.filter(
                transaction => transaction.status === "failed"
            );

        queue.innerHTML = `
            <div class="exception-item">
                <strong>
                    ${riskyTransactions.length} failed payment(s)
                    require recovery
                </strong>

                <p>
                    Failed payment value:
                    <strong>
                        ₹${Number(analysis.failed_amount)
                            .toLocaleString("en-IN")}
                    </strong>
                </p>
            </div>

            ${riskyTransactions.map(transaction => `
                <div
                    class="exception-item"
                    style="margin-top:10px;"
                >

                    <div
                        style="
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                            gap:20px;
                        "
                    >
                        <strong>
                            ${transaction.transaction_id}
                        </strong>

                        <strong>
                            ₹${Number(transaction.amount)
                                .toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <p style="margin-top:6px;">
                        Failed payment requiring recovery.
                    </p>

                    <p style="margin-top:6px;">
                        Risk:
                        <strong>
                            ${transaction.risk}
                        </strong>
                    </p>

                    <p style="margin-top:6px;">
                        Recommended action:
                        <strong>
                            ${
                                transaction.risk === "HIGH"
                                    ? "Priority investigation and recovery"
                                    : "Review and initiate recovery"
                            }
                        </strong>
                    </p>

                    <button
                        class="secondary-btn"
                        style="margin-top:10px;"
                        onclick="initiateRecovery(
                            '${transaction.transaction_id}',
                            ${transaction.amount},
                            '${transaction.risk}'
                        )"
                    >
                        Initiate Recovery →
                    </button>

                </div>
            `).join("")}
        `;

        if (riskyTransactions.length > 0) {

            recommendation.innerHTML = `
                <div class="exception-item">

                    <strong>
                        AI Recommended Action
                    </strong>

                    <p>
                        Review failed transactions and initiate
                        recovery for eligible payments.
                    </p>

                    <p>
                        High-value failed payments should receive
                        priority investigation.
                    </p>

                </div>
            `;

        } else {

            recommendation.innerHTML = `
                <div class="exception-item">

                    <strong>
                        No recovery actions required
                    </strong>

                    <p>
                        No failed payments were detected.
                    </p>

                </div>
            `;
        }

        summary.innerHTML = `
            <div class="exception-item">

                <strong>
                    Recovery Summary
                </strong>

                <p>
                    Failed Transactions:
                    <strong>
                        ${analysis.failed_transactions}
                    </strong>
                </p>

                <p>
                    Failed Amount:
                    <strong>
                        ₹${Number(analysis.failed_amount)
                            .toLocaleString("en-IN")}
                    </strong>
                </p>

                <p>
                    High-Value Transactions:
                    <strong>
                        ${analysis.high_value_transactions}
                    </strong>
                </p>

                <p>
                    High-Value Amount:
                    <strong>
                        ₹${Number(analysis.high_value_amount)
                            .toLocaleString("en-IN")}
                    </strong>
                </p>

            </div>
        `;

        if (
            historyData.actions &&
            historyData.actions.length > 0
        ) {

            history.innerHTML =
                historyData.actions.map(action => `

                    <div
                        class="exception-item"
                        style="margin-top:10px;"
                    >

                        <div
                            style="
                                display:flex;
                                justify-content:space-between;
                                align-items:center;
                                gap:20px;
                            "
                        >

                            <strong>
                                ${action.transaction_id}
                            </strong>

                            <strong>
                                ₹${Number(action.amount)
                                    .toLocaleString("en-IN")}
                            </strong>

                        </div>

                        <p style="margin-top:6px;">
                            Risk:
                            <strong>
                                ${action.risk}
                            </strong>
                        </p>

                        <p style="margin-top:6px;">
                            Status:
                            <strong>
                                Recovery Initiated
                            </strong>
                        </p>

                    </div>

                `).join("");

        } else {

            history.innerHTML = `
                <div class="exception-item">

                    <strong>
                        No recovery actions yet
                    </strong>

                    <p>
                        No recovery actions have been initiated.
                    </p>

                </div>
            `;
        }

    })
    .catch(error => {

        console.error(
            "Recovery data error:",
            error
        );

        queue.innerHTML = `
            <div class="exception-item">

                <strong>
                    Recovery Data Error
                </strong>

                <p>
                    Unable to load recovery data.
                    Make sure the FastAPI server is running.
                </p>

            </div>
        `;

        recommendation.innerHTML = "";
        summary.innerHTML = "";

        if (history) {

            history.innerHTML = `
                <div class="exception-item">

                    <strong>
                        Recovery History Error
                    </strong>

                    <p>
                        Unable to load recovery history.
                    </p>

                </div>
            `;
        }
    });
}
    function showTransactions() {

    app.innerHTML = `

        <div class="page-intro">

            <div>
                <span class="eyebrow">PAYMENT OPERATIONS</span>

                <h2>Transactions</h2>

                <p>
                    Monitor and analyze every payment transaction.
                </p>
            </div>

            <div class="live-indicator">
                <span class="status-dot"></span>
                Live data
            </div>

        </div>


        <div class="panel">

            <div class="panel-header">

                <div>
                    <span class="eyebrow">TRANSACTION MONITOR</span>
                    <h3>Recent transactions</h3>
                </div>

                <button class="refresh-button"
                        onclick="loadTransactions()">
                    ↻ Refresh
                </button>

            </div>


            <div class="table-container">

                <table>

                    <thead>

                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Risk</th>
                        </tr>

                    </thead>

                    <tbody id="transactionTable">

                        <tr>
                            <td colspan="4">
                                Loading transactions...
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    `;

        loadTransactions();
}

async function loadTransactions() {

    try {

        const response =
            await fetch(
                "https://razorpay-ai-finance-controller.onrender.com/transactions/risk"
            );

        const data = await response.json();

        const table =
            document.getElementById("transactionTable");

        table.innerHTML = "";

        data.transactions.forEach(transaction => {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>
                    <strong>${transaction.transaction_id}</strong>
                </td>

                <td>
                    ₹${transaction.amount}
                </td>

                <td>
                    ${transaction.status}
                </td>

                <td>
                    <span class="risk-badge ${transaction.risk.toLowerCase()}">
                        ${transaction.risk}
                    </span>
                </td>

            `;

            table.appendChild(row);

        });

    }

    catch (error) {

        console.error("Transaction error:", error);

        document.getElementById("transactionTable").innerHTML = `

            <tr>
                <td colspan="4">
                    Unable to load transaction data.
                </td>
            </tr>

        `;

    }

}


function showReconciliation() {

    app.innerHTML = `

        <div class="page-intro">

            <div>
                <span class="eyebrow">FINANCIAL CONTROL</span>

                <h2>Reconciliation</h2>

                <p>
                    Compare transactions against settlement records.
                </p>
            </div>

        </div>


        <div class="panel">

            <div class="panel-header">

                <div>
                    <span class="eyebrow">SETTLEMENT CONTROL</span>
                    <h3>Reconciliation status</h3>
                </div>

            </div>

            <div id="reconciliationPage">
                Loading reconciliation data...
            </div>

        </div>

    `;

    loadReconciliation();
}
async function loadReconciliation() {
    const page = document.getElementById("reconciliationPage");

    try {
        const [reconciliationResponse, exceptionsResponse] =
            await Promise.all([
                fetch("https://razorpay-ai-finance-controller.onrender.com/reconciliation"),
                fetch("https://razorpay-ai-finance-controller.onrender.com/reconciliation/exceptions")
            ]);

        if (!reconciliationResponse.ok || !exceptionsResponse.ok) {
            throw new Error("Failed to load reconciliation data");
        }

        const data = await reconciliationResponse.json();
        const exceptionData = await exceptionsResponse.json();

        page.innerHTML = `
            <div class="recon-stats">

                <div>
                    <span>Total Checked</span>
                    <strong>${data.total_transactions_checked}</strong>
                </div>

                <div>
                    <span>Matched</span>
                    <strong>${data.matched_transactions}</strong>
                </div>

                <div>
                    <span>Unmatched</span>
                    <strong>${data.unmatched_transactions}</strong>
                </div>

                <div>
                    <span>Match Rate</span>
                    <strong>${data.match_rate_percent}%</strong>
                </div>

            </div>

           <div class="recon-financial-metrics">

    <div class="recon-financial-card">
        <span>Matched Value</span>
        <strong>
            ₹${Number(data.matched_value || 0)
                .toLocaleString("en-IN")}
        </strong>
    </div>

    <div class="recon-financial-card">
        <span>Exception Value</span>
        <strong>
            ₹${Number(data.exception_value || 0)
                .toLocaleString("en-IN")}
        </strong>
    </div>

    <div class="recon-financial-card">
        <span>Missing Settlement Value</span>
        <strong>
            ₹${Number(data.missing_settlement_value || 0)
                .toLocaleString("en-IN")}
        </strong>
    </div>

    <div class="recon-financial-card">
        <span>Amount Variance</span>
        <strong>
            ₹${Number(data.amount_variance || 0)
                .toLocaleString("en-IN")}
        </strong>
    </div>

</div>

            </div>

            <div class="panel" style="margin-top:18px;">

                <div class="panel-header">
                    <div>
                        <span class="eyebrow">
                            PROCESSING PERFORMANCE
                        </span>

                        <h3>
                            Reconciliation throughput
                        </h3>
                    </div>
                </div>

                <div class="exception-item">

                    <strong>
                        ${data.processing_throughput || 0}
                        records processed
                    </strong>

                    <p style="margin-top:6px;">
                        Financial records analyzed by the
                        reconciliation engine.
                    </p>

                </div>

            </div>

            <div class="panel" style="margin-top:18px;">

                <div class="panel-header">
                    <div>
                        <span class="eyebrow">
                            RECONCILIATION EXCEPTIONS
                        </span>

                        <h3>
                            ${exceptionData.exception_count}
                            exception(s) require review
                        </h3>
                    </div>
                </div>

                ${
                    exceptionData.exceptions.length > 0
                        ? exceptionData.exceptions.map(exception => `
                            <div
                                class="exception-item"
                                style="margin-top:10px;"
                            >

                                <div
                                    style="
                                        display:flex;
                                        justify-content:space-between;
                                        align-items:center;
                                        gap:20px;
                                    "
                                >

                                    <strong>
                                        ${exception.transaction_id}
                                    </strong>

                                    <strong>
                                        ₹${Number(
                                            exception.transaction_amount
                                        ).toLocaleString("en-IN")}
                                    </strong>

                                </div>

                                <p style="margin-top:6px;">
                                    Settlement amount:

                                    <strong>
                                        ${
                                            exception.settled_amount === null
                                                ? "Not Found"
                                                : "₹" + Number(
                                                    exception.settled_amount
                                                ).toLocaleString("en-IN")
                                        }
                                    </strong>
                                </p>

                               <p style="margin-top:6px;">
    Reason:

    <strong>
        ${exception.reason}
    </strong>
</p>

<p style="margin-top:6px;">
    AI Classification:

    <strong>
        ${exception.classification}
    </strong>
</p>

<p style="margin-top:6px;">
    Recommended Action:

    <strong>
        ${exception.recommended_action}
    </strong>
</p>
                            </div>
                        `).join("")
                        : `
                            <div class="exception-item">

                                <strong>
                                    No reconciliation exceptions
                                </strong>

                                <p>
                                    All transactions are reconciled.
                                </p>

                            </div>
                        `
                }

            </div>
        `;

    } catch (error) {

        console.error(
            "Reconciliation error:",
            error
        );

        page.innerHTML = `
            <div class="exception-item">

                <strong>
                    Reconciliation Data Error
                </strong>

                <p>
                    Unable to load reconciliation data.
                    Make sure the FastAPI server is running.
                </p>

            </div>
        `;
    }
}

function showExceptions() {

    app.innerHTML = `

        <div class="page-intro">

            <div>
                <span class="eyebrow">EXCEPTION MANAGEMENT</span>

                <h2>Exceptions</h2>

                <p>
                    Investigate settlement mismatches and missing records.
                </p>

            </div>

        </div>


        <div class="panel">

            <div class="panel-header">

                <div>
                    <span class="eyebrow">OPEN EXCEPTIONS</span>
                    <h3>Items requiring attention</h3>
                </div>

            </div>

            <div id="exceptionsPage">
                Loading exceptions...
            </div>

        </div>

    `;

    loadExceptions();
}


async function loadExceptions() {

    const response =
        await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/reconciliation/exceptions"
        );

    const data = await response.json();

    const container =
        document.getElementById("exceptionsPage");

    container.innerHTML = "";

    data.exceptions.forEach(exception => {

        container.innerHTML += `

            <div class="exception-item">

                <div>

                    <strong>
                        ${exception.transaction_id}
                    </strong>

                    <p>
                        ${exception.reason}
                    </p>

                </div>

                <div class="exception-amount">
                    ₹${exception.transaction_amount}
                </div>

            </div>

        `;

    });

}


function showRisk() {

    app.innerHTML = `

        <div class="page-intro">

            <div>
                <span class="eyebrow">RISK ENGINE</span>

                <h2>Risk Analysis</h2>

                <p>
                    Analyze transaction risk across the payment system.
                </p>

            </div>

        </div>


        <div class="panel">

            <div class="panel-header">

                <div>
                    <span class="eyebrow">RISK MONITORING</span>
                    <h3>Transaction risk profile</h3>
                </div>

            </div>

            <div id="riskPage">
                Loading risk analysis...
            </div>

        </div>

    `;

    loadRisk();
}


async function loadRisk() {

    const response =
        await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/transactions/risk"
        );

    const data = await response.json();

    const container =
        document.getElementById("riskPage");

    container.innerHTML = "";

    data.transactions.forEach(transaction => {

        container.innerHTML += `

            <div class="exception-item">

                <div>

                    <strong>
                        ${transaction.transaction_id}
                    </strong>

                    <p>
                        Status: ${transaction.status}
                    </p>

                </div>

                <div>
                    <strong>
                        ${transaction.risk}
                    </strong>
                </div>

            </div>

        `;

    });

}


function showInsights() {

    app.innerHTML = `
        <div class="page-intro">
            <div>
                <span class="eyebrow">ARTIFICIAL INTELLIGENCE</span>
                <h2>AI Finance Insights</h2>
                <p>
                    Intelligent observations generated from financial activity.
                </p>
            </div>
        </div>

        <div class="panel ai-panel">

            <div class="ai-header">
                <div class="ai-symbol">
                    ✦
                </div>

                <div>
                    <span class="eyebrow">
                        AI CONTROLLER
                    </span>

                    <h3>
                        Financial intelligence
                    </h3>
                </div>
            </div>

            <p>
                The AI finance controller analyzes transactions,
                reconciliation exceptions and payment risks to
                identify areas that require attention.
            </p>

            <div id="insightsContent">
                <p>Analyzing financial activity...</p>
            </div>

        </div>
    `;

    loadInsightsData();
}
async function loadInsightsData() {

    try {

        const reconciliationResponse =
            await fetch("https://razorpay-ai-finance-controller.onrender.com/reconciliation");

        const exceptionResponse =
            await fetch("https://razorpay-ai-finance-controller.onrender.com/reconciliation/exceptions");

        const riskResponse =
            await fetch("https://razorpay-ai-finance-controller.onrender.com/transactions/risk");

        if (
            !reconciliationResponse.ok ||
            !exceptionResponse.ok ||
            !riskResponse.ok
        ) {
            throw new Error("Unable to load financial intelligence data.");
        }

        const reconciliation =
            await reconciliationResponse.json();

        const exceptions =
            await exceptionResponse.json();

        const riskData =
            await riskResponse.json();

        const highRiskTransactions =
            riskData.transactions.filter(
                transaction => transaction.risk === "HIGH"
            ).length;

        const mediumRiskTransactions =
            riskData.transactions.filter(
                transaction => transaction.risk === "MEDIUM"
            ).length;
        const missingSettlementValue =
            Number(reconciliation.missing_settlement_value || 0);

        const amountVariance =
            Number(reconciliation.amount_variance || 0);

        const exceptionValue =
            Number(reconciliation.exception_value || 0);

        let priorityLevel;
        let priorityTitle;
        let priorityMessage;

        if (missingSettlementValue > 0) {

            priorityLevel = "HIGH";
            priorityTitle = "Missing settlements require immediate review";
            priorityMessage =
                `₹${missingSettlementValue.toLocaleString("en-IN")} in transactions have no corresponding settlement record.`;

        } else if (amountVariance > 0) {

            priorityLevel = "MEDIUM";
            priorityTitle = "Settlement variance requires investigation";
            priorityMessage =
                `₹${amountVariance.toLocaleString("en-IN")} in settlement amount variance was detected.`;

        } else {

            priorityLevel = "LOW";
            priorityTitle = "Financial operations are under control";
            priorityMessage =
                "No significant reconciliation exceptions require immediate attention.";

        }
        const insightsContent =
            document.getElementById("insightsContent");

        if (!insightsContent) {
            return;
        }

        insightsContent.innerHTML = `

            <div class="insight-summary">

                <div class="recon-financial-metrics">

                    <div class="recon-financial-card">
                        <span>Reconciliation Rate</span>
                        <strong>
                            ${reconciliation.match_rate_percent}%
                        </strong>
                    </div>

                    <div class="recon-financial-card">
                        <span>Exception Exposure</span>
                        <strong>
                            ₹${reconciliation.exception_value.toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <div class="recon-financial-card">
                        <span>Unresolved Exceptions</span>
                        <strong>
                            ${exceptions.exception_count}
                        </strong>
                    </div>

                    <div class="recon-financial-card">
                        <span>Amount Variance</span>
                        <strong>
                            ₹${reconciliation.amount_variance.toLocaleString("en-IN")}
                        </strong>
                    </div>

                </div>

            </div>

            <div class="ai-insight-list">

                <div class="insight-item">
                    <strong>⚠ Reconciliation requires attention</strong>
                    <p>
                        ${exceptions.exception_count}
                        transactions remain unresolved, representing
                        ₹${reconciliation.exception_value.toLocaleString("en-IN")}
                        in exception exposure.
                    </p>
                </div>

                <div class="insight-item">
                    <strong>🔎 Missing settlements are the main issue</strong>
                    <p>
                        ₹${reconciliation.missing_settlement_value.toLocaleString("en-IN")}
                        is associated with transactions that do not have
                        a corresponding settlement record.
                    </p>
                </div>

                <div class="insight-item">
                    <strong>💰 Settlement variance detected</strong>
                    <p>
                        The system detected
                        ₹${reconciliation.amount_variance.toLocaleString("en-IN")}
                        in settlement amount variance.
                    </p>
                </div>

                <div class="insight-item">
                    <strong>🛡 Risk monitoring</strong>
                    <p>
                        ${highRiskTransactions}
                        high-risk and
                        ${mediumRiskTransactions}
                        medium-risk transactions require monitoring.
                    </p>
                </div>

            </div>
            <div class="ai-priority-card">

                <div>
                    <span class="eyebrow">
                        AI DECISION
                    </span>

                    <h3>
                        ${priorityTitle}
                    </h3>

                    <p>
                        ${priorityMessage}
                    </p>
                </div>

                <div class="ai-priority-badge">
                    ${priorityLevel}
                </div>

            </div>
            <div class="ai-recommendation">

                <span class="eyebrow">
                    AI PRIORITY
                </span>

                <h3>
                    Recommended Finance Actions
                </h3>

                <ul>
                    <li>
                        Investigate missing settlement records first.
                    </li>

                    <li>
                        Review all settlement amount variances.
                    </li>

                    <li>
                        Prioritize high-risk transactions for manual review.
                    </li>

                    <li>
                        Resolve outstanding exceptions before settlement confirmation.
                    </li>
                </ul>

            </div>
        `;

    } catch (error) {

        console.error("AI Insights error:", error);

        const insightsContent =
            document.getElementById("insightsContent");

        if (insightsContent) {
            insightsContent.innerHTML = `
                <p>
                    Unable to generate AI finance insights.
                </p>
            `;
        }
    }
}

function showAudit() {
    app.innerHTML = `
        <div class="page-intro">
            <div>
                <span class="eyebrow">SYSTEM MONITORING</span>

                <h2>Audit & System Health</h2>

                <p>
                    Monitor API connectivity and financial processing health.
                </p>
            </div>

            <div class="live-indicator">
                <span class="status-dot"></span>
                Live system data
            </div>
        </div>


        <div class="dashboard-grid">

            <div class="panel">

                <span class="eyebrow">
                    API STATUS
                </span>

                <h3>
                    Backend connection
                </h3>

                <div class="system-status">
                    <span class="status-dot"></span>
                    System Online
                </div>

            </div>


            <div class="panel">

                <span class="eyebrow">
                    DATA PIPELINE
                </span>

                <h3>
                    Transaction processing
                </h3>

                <p>
                    CSV → Pandas → FastAPI → Finance Controller
                </p>

            </div>

        </div>


        <div class="panel">

            <div class="panel-header">

                <div>
                    <span class="eyebrow">
                        FINANCE CONTROL AUDIT
                    </span>

                    <h3>
                        Processing audit summary
                    </h3>
                </div>

                <span class="panel-badge">
                    Live
                </span>

            </div>


            <div id="auditSummary">
                Loading audit data...
            </div>

        </div>
    `;

    loadAuditData();
}
async function loadAuditData() {
    try {

        const summaryResponse = await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/transactions/summary"
        );

        const summary = await summaryResponse.json();


        const reconciliationResponse = await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/reconciliation"
        );

        const reconciliation = await reconciliationResponse.json();


        const exceptionResponse = await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/reconciliation/exceptions"
        );

        const exceptionData = await exceptionResponse.json();


        const auditSummary =
            document.getElementById("auditSummary");


        auditSummary.innerHTML = `

            <div class="metric-grid">

                <div class="metric-card">
                    <span>Transactions Processed</span>
                    <strong>
                        ${summary.total_transactions}
                    </strong>
                </div>


                <div class="metric-card">
                    <span>Successful Payments</span>
                    <strong>
                        ${summary.successful_transactions}
                    </strong>
                </div>


                <div class="metric-card">
                    <span>Reconciliation Rate</span>
                    <strong>
                        ${reconciliation.match_rate_percent}%
                    </strong>
                </div>


                <div class="metric-card">
                    <span>Unresolved Exceptions</span>
                    <strong>
                        ${exceptionData.exception_count}
                    </strong>
                </div>

            </div>


            <div class="exception-item">

                <div>
                    <strong>
                        Reconciliation Control
                    </strong>

                    <p>
                        ${reconciliation.matched_transactions}
                        of
                        ${reconciliation.total_transactions_checked}
                        transactions matched successfully.
                    </p>
                </div>

                <strong>
                    ${reconciliation.match_rate_percent}%
                </strong>

            </div>


            <div class="exception-item">

                <div>
                    <strong>
                        Exception Control
                    </strong>

                    <p>
                        ${exceptionData.exception_count}
                        unresolved financial exceptions require review.
                    </p>
                </div>

                <strong>
                    REVIEW
                </strong>

            </div>

        `;

    }

    catch (error) {

        console.error(
            "Audit error:",
            error
        );

        const auditSummary =
            document.getElementById("auditSummary");

        auditSummary.innerHTML = `
            <div class="exception-item">

                <div>
                    <strong>
                        Unable to load audit data
                    </strong>

                    <p>
                        Please refresh the page and try again.
                    </p>
                </div>

            </div>
        `;
    }
}

loadDashboard();


async function loadDashboard() {
    if (!document.getElementById("totalTransactions")) {
        return;
    }
    try {

        const summaryResponse =
            await fetch(
                "https://razorpay-ai-finance-controller.onrender.com/transactions/summary"
            );

        const summary =
            await summaryResponse.json();

        document.getElementById("totalTransactions").textContent =
            summary.total_transactions;

        document.getElementById("failedTransactions").textContent =
            summary.failed_transactions;

        document.getElementById("totalAmount").textContent =
            "₹" + summary.total_amount;


        const reconciliationResponse =
            await fetch(
                "https://razorpay-ai-finance-controller.onrender.com/reconciliation"
            );

        const reconciliation =
            await reconciliationResponse.json();

        document.getElementById("matchRate").textContent =
            reconciliation.match_rate_percent + "%";

        document.getElementById("matchRateCircle").textContent =
            reconciliation.match_rate_percent + "%";

        document.getElementById("checked").textContent =
            reconciliation.total_transactions_checked;

        document.getElementById("matched").textContent =
            reconciliation.matched_transactions;

        document.getElementById("unmatched").textContent =
            reconciliation.unmatched_transactions;


        const exceptionResponse =
            await fetch(
                "https://razorpay-ai-finance-controller.onrender.com/reconciliation/exceptions"
            );

        const exceptionData =
            await exceptionResponse.json();

        document.getElementById("exceptionCount").textContent =
            exceptionData.exception_count;


        const exceptionList =
            document.getElementById("exceptionList");

        exceptionList.innerHTML = "";

        exceptionData.exceptions.forEach(exception => {

            exceptionList.innerHTML += `

                <div class="exception-item">

                    <div>

                        <strong>
                            ${exception.transaction_id}
                        </strong>

                        <p>
                            ${exception.reason}
                        </p>

                    </div>

                    <div class="exception-amount">
                        ₹${exception.transaction_amount}
                    </div>

                </div>

            `;

        });


        const riskResponse =
            await fetch(
                "https://razorpay-ai-finance-controller.onrender.com/transactions/risk"
            );

        const riskData =
            await riskResponse.json();

        let low = 0;
        let medium = 0;
        let high = 0;

        riskData.transactions.forEach(transaction => {

            if (transaction.risk === "LOW") low++;
            if (transaction.risk === "MEDIUM") medium++;
            if (transaction.risk === "HIGH") high++;

        });

        document.getElementById("lowRisk").textContent = low;
        document.getElementById("mediumRisk").textContent = medium;
        document.getElementById("highRisk").textContent = high;


        document.getElementById("aiInsight").textContent =
            `The system detected ${exceptionData.exception_count} reconciliation exceptions and ${high} high-risk transactions. Review unresolved exceptions before settlement confirmation.`;

    }

    catch (error) {

    console.error("Dashboard error:", error);

}

}


async function simulatePayment() {

    const customer =
        document.getElementById("simCustomer").value.trim();

    const amount =
        Number(document.getElementById("simAmount").value);

    const status =
        document.getElementById("simStatus").value;
        simulatorState.customer = customer;
simulatorState.amount = amount;
simulatorState.status = status;


    if (!customer) {
        alert("Please enter a customer name.");
        return;
    }


    if (!amount || amount <= 0) {
        alert("Please enter a valid payment amount.");
        return;
    }


    const result =
        document.getElementById("simulationResult");

    const content =
        document.getElementById("simulationContent");


    result.style.display = "block";

    content.innerHTML = `
        <div style="padding:20px;">
            <strong>Processing payment...</strong>

            <p style="color:#718096;">
                Connecting to Finance AI backend...
            </p>
        </div>
    `;


    try {

        const response = await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/payments/simulate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    customer: customer,
                    amount: amount,
                    status: status
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Payment simulation failed."
            );

        }


        if (data.status === "success") {

            content.innerHTML = `

                <div class="exception-item"
                     style="
                        background:#e8f8f2;
                        border-color:#c8f0df;
                     ">

                    <div>

                        <strong>
                            Payment Successful
                        </strong>

                        <p>
                            ${data.customer} successfully
                            processed
                            ₹${Number(data.amount)
                                .toLocaleString("en-IN")}.
                        </p>

                    </div>


                    <div style="
                        color:#159570;
                        font-weight:800;
                    ">
                        SUCCESS
                    </div>

                </div>


                <div style="margin-top:18px;">

                    <strong>
                        Transaction ID
                    </strong>

                    <p style="
                        margin-top:6px;
                        color:#718096;
                    ">
                        ${data.transaction_id}
                    </p>

                </div>


                <div style="margin-top:14px;">

                    <strong>
                        Risk Level:
                    </strong>

                    ${data.risk}

                </div>

            `;

                } else {

            content.innerHTML = `

                <div class="exception-item">

                    <div>

                        <strong>
                            Payment Failed
                        </strong>

                        <p>
                            ${data.customer}'s payment of
                            ₹${Number(data.amount)
                                .toLocaleString("en-IN")}
                            requires investigation.
                        </p>

                    </div>


                    <div class="exception-amount">
                        FAILED
                    </div>

                </div>


                <div style="
                    margin-top:18px;
                    padding:20px;
                    border-radius:12px;
                    background:#f5f3ff;
                    border:1px solid #e5e1ff;
                ">

                    <strong>
                        ✦ AI Control Flow Started
                    </strong>

                    <p style="
                        margin-top:8px;
                        color:#718096;
                    ">

                        Transaction
                        <strong>${data.transaction_id}</strong>

                        has been classified as

                        <strong>${data.risk}</strong>

                        risk and requires investigation.

                    </p>

                </div>


                <div style="margin-top:18px;">

                    <strong>
                        Recommended Next Step
                    </strong>

                    <p style="
                        margin-top:6px;
                        color:#718096;
                    ">

                        Open AI Investigation to analyze the
                        failure and determine the appropriate
                        recovery action.

                    </p>

                </div>

            `;

               }

        simulatorState.result = content.innerHTML;

    }

    catch (error) {

        console.error(
            "Payment simulation error:",
            error
        );


        content.innerHTML = `

            <div class="exception-item">

                <div>

                    <strong>
                        Backend Connection Error
                    </strong>

                    <p>
                        Unable to connect to the Finance AI API.
                        Make sure the FastAPI server is running.
                    </p>

                </div>

            </div>

        `;

    }

}
function showRevenue() {
    app.innerHTML = `
        <div class="page-intro">
            <div>
                <span class="eyebrow">FINANCE OPERATIONS</span>
                <h2>Revenue Leak</h2>
                <p>Monitor successful revenue and identify potential financial leakage.</p>
            </div>

            <div class="live-indicator">
                <span class="status-dot"></span>
                Revenue analysis active
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="panel">
                <div class="panel-header">
                    <div>
                        <span class="eyebrow">REVENUE OVERVIEW</span>
                        <h3>Processed Revenue</h3>
                    </div>
                </div>

                <div id="revenueContent">
                    Loading revenue data...
                </div>
            </div>

            <div class="panel">
                <div class="panel-header">
                    <div>
                        <span class="eyebrow">FINANCIAL CONTROL</span>
                        <h3>Revenue Health</h3>
                    </div>
                </div>

                <div id="revenueHealth">
                    Analyzing revenue...
                </div>
            </div>
        </div>
    `;

    loadRevenueData();
}

async function loadRevenueData() {
    try {
        const response = await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/transactions/summary"
        );

        if (!response.ok) {
            throw new Error("Failed to load revenue data");
        }

        const data = await response.json();

        const revenueContent =
            document.getElementById("revenueContent");

        const revenueHealth =
            document.getElementById("revenueHealth");

        revenueContent.innerHTML = `
            <div class="metric-grid">
                <div class="metric-card">
                    <span>Total Transaction Value</span>
                    <strong>₹${Number(data.total_amount).toLocaleString("en-IN")}</strong>
                </div>

                <div class="metric-card">
                    <span>Successful Revenue</span>
                    <strong>₹${Number(data.successful_amount).toLocaleString("en-IN")}</strong>
                </div>

                <div class="metric-card">
                    <span>Total Transactions</span>
                    <strong>${data.total_transactions}</strong>
                </div>

                <div class="metric-card">
                    <span>Failed Payments</span>
                    <strong>${data.failed_transactions}</strong>
                </div>
            </div>
        `;

        const successRate =
            data.total_transactions > 0
                ? ((data.successful_transactions / data.total_transactions) * 100).toFixed(2)
                : 0;

        revenueHealth.innerHTML = `
            <div class="exception-item">
                <div>
                    <strong>Revenue Success Rate</strong>
                    <p>${successRate}% of transactions were successful.</p>
                </div>
            </div>

            <div class="exception-item">
                <div>
                    <strong>Successful Revenue</strong>
                    <p>₹${Number(data.successful_amount).toLocaleString("en-IN")} processed successfully.</p>
                </div>
            </div>

            <div class="exception-item">
                <div>
                    <strong>Failed Payment Value</strong>
                    <p>₹${(
                        Number(data.total_amount) -
                        Number(data.successful_amount)
                    ).toLocaleString("en-IN")} requires attention.</p>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Revenue error:", error);

        const revenueContent =
            document.getElementById("revenueContent");

        if (revenueContent) {
            revenueContent.innerHTML = `
                <div class="exception-item">
                    <div>
                        <strong>Backend Connection Error</strong>
                        <p>
                            Unable to load revenue data.
                            Make sure the FastAPI server is running.
                        </p>
                    </div>
                </div>
            `;
        }
    }
}
function showCustomers() {
    app.innerHTML = `
        <div class="page-intro">
            <div>
                <span class="eyebrow">INTELLIGENCE</span>
                <h2>Customers</h2>
                <p>Monitor customer transaction activity and financial behavior.</p>
            </div>

            <div class="live-indicator">
                <span class="status-dot"></span>
                Customer intelligence active
            </div>
        </div>

        <div class="panel">
            <div class="panel-header">
                <div>
                    <span class="eyebrow">CUSTOMER MONITOR</span>
                    <h3>Customer Transaction Overview</h3>
                </div>
            </div>

            <div id="customersContent">
                Loading customer data...
            </div>
        </div>
    `;

    loadCustomers();
}

async function loadCustomers() {
    try {
        const response = await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/transactions/risk"
        );

        if (!response.ok) {
            throw new Error("Failed to load customer data");
        }

        const data = await response.json();

        const customersContent =
            document.getElementById("customersContent");

        const transactions = data.transactions || [];

        customersContent.innerHTML = `
            <div class="metric-grid">
                <div class="metric-card">
                    <span>Total Customers</span>
                    <strong>${transactions.length}</strong>
                </div>

                <div class="metric-card">
                    <span>High Risk</span>
                    <strong>
                        ${transactions.filter(t => t.risk === "HIGH").length}
                    </strong>
                </div>

                <div class="metric-card">
                    <span>Medium Risk</span>
                    <strong>
                        ${transactions.filter(t => t.risk === "MEDIUM").length}
                    </strong>
                </div>

                <div class="metric-card">
                    <span>Low Risk</span>
                    <strong>
                        ${transactions.filter(t => t.risk === "LOW").length}
                    </strong>
                </div>
            </div>

            <div style="margin-top: 24px; overflow-x: auto;">
                <table>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.map(transaction => `
                            <tr>
                                <td>
                                    <strong>${transaction.transaction_id}</strong>
                                </td>
                                <td>
                                    ₹${Number(transaction.amount).toLocaleString("en-IN")}
                                </td>
                                <td>${transaction.status}</td>
                                <td>${transaction.risk}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;

    } catch (error) {
        console.error("Customers error:", error);

        const customersContent =
            document.getElementById("customersContent");

        if (customersContent) {
            customersContent.innerHTML = `
                <div class="exception-item">
                    <div>
                        <strong>Backend Connection Error</strong>
                        <p>
                            Unable to load customer data.
                            Make sure the FastAPI server is running.
                        </p>
                    </div>
                </div>
            `;
        }
    }
    
}
window.simulatePayment = simulatePayment;
async function resetSimulations() {
    try {
        const response = await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/payments/reset",
            {
                method: "POST"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Reset failed.");
        }

        alert("Simulation data has been cleared.");

        // Refresh the current page
        showSimulator();

    } catch (error) {
        console.error("Reset error:", error);
        alert("Unable to reset simulation data.");
    }
}

window.resetSimulations = resetSimulations;
async function initiateRecovery(transactionId, amount, risk) {
    try {
        const response = await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/recovery/initiate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    transaction_id: transactionId,
                    amount: amount,
                    risk: risk
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Recovery initiation failed."
            );
        }

        alert(
            `Recovery initiated for ${transactionId}.`
        );
        loadRecoveryData();

    } catch (error) {
        console.error("Recovery error:", error);
        alert(error.message);
    }
}

window.initiateRecovery = initiateRecovery;
async function showHealth() {
    app.innerHTML = `
        <div class="page-intro">
            <div>
                <span class="eyebrow">SYSTEM MONITORING</span>
                <h2>Audit & System Health</h2>
                <p>Monitor API connectivity and financial processing health.</p>
            </div>

            <div class="live-indicator">
                <span class="status-dot"></span>
                System monitoring active
            </div>
        </div>

        <div class="dashboard-grid">

            <div class="panel">
                <span class="eyebrow">API STATUS</span>
                <h3>Backend connection</h3>

                <div id="healthStatus">
                    Checking backend...
                </div>
            </div>

            <div class="panel">
                <span class="eyebrow">DATA PIPELINE</span>
                <h3>Transaction processing</h3>

                <p>
                    CSV → Pandas → FastAPI → Finance Controller
                </p>
            </div>

        </div>
    `;

    try {
        const response = await fetch(
            "https://razorpay-ai-finance-controller.onrender.com/health"
        );

        const data = await response.json();

        const healthStatus =
            document.getElementById("healthStatus");

        if (response.ok && data.status === "healthy") {
            healthStatus.innerHTML = `
                <div class="live-indicator">
                    <span class="status-dot"></span>
                    System Online
                </div>
                <p>
                    API: ${data.api}<br>
                    Data: ${data.database}
                </p>
            `;
        } else {
            healthStatus.innerHTML = `
                <p>Backend health check failed.</p>
            `;
        }

    } catch (error) {
        console.error("Health check error:", error);

        const healthStatus =
            document.getElementById("healthStatus");

        healthStatus.innerHTML = `
            <p>Backend Offline</p>
        `;
    }
}