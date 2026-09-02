# Razorpay AI Finance Controller

An AI-powered finance operations control center for monitoring payments, analyzing transaction risk, reconciling settlements, investigating exceptions, and initiating recovery actions.

## 🎯 Problem

Finance teams often need to manually compare payment transactions with settlement records, identify missing or mismatched settlements, investigate failed payments, and decide which financial exceptions require immediate attention.

This project demonstrates how an AI-assisted finance controller can bring these operations into a single dashboard.

## 🚀 Key Features

- Financial Command Center
- Payment Simulator
- Failed Payment Detection
- AI Investigation Queue
- Transaction Risk Classification
- Settlement Reconciliation
- Missing Settlement Detection
- Settlement Amount Variance Detection
- Recovery Center
- Recovery Action History
- Duplicate Recovery Prevention
- AI Finance Insights
- Audit Trail
- System Health Monitoring
- Synthetic Financial Dataset Processing

## 📊 Reconciliation Results

The system processes **60 synthetic financial transactions** against settlement records.

| Metric | Result |
|---|---:|
| Transactions Checked | 60 |
| Matched Transactions | 45 |
| Unresolved Exceptions | 15 |
| Reconciliation Rate | 75% |
| Matched Value | ₹1,66,900 |
| Exception Exposure | ₹63,200 |
| Missing Settlement Exposure | ₹37,700 |
| Amount Variance | ₹200 |
| Processing Throughput | 60 records |

The reconciliation engine identifies multiple exception types rather than relying on a single example:

- Missing settlements
- Settlement amount mismatches
- Pending settlements

## 🤖 AI Finance Controller

The AI Finance Insights module analyzes:

- Reconciliation performance
- Unresolved financial exceptions
- Missing settlement exposure
- Settlement amount variance
- High-risk transactions
- Failed payment activity

The controller produces prioritized finance actions so unresolved financial issues can be reviewed systematically.

## 🔐 Risk Analysis

Transactions are classified into:

- **LOW** — normal transaction activity
- **MEDIUM** — failed or high-value transactions requiring monitoring
- **HIGH** — failed high-value transactions requiring priority investigation

The current dataset contains:

- 2 high-risk transactions
- 20 medium-risk transactions
- 38 low-risk transactions

## 💳 Payment-to-Recovery Workflow

The project demonstrates an end-to-end finance control workflow:

```text
Payment
   ↓
Risk Analysis
   ↓
AI Investigation
   ↓
Recovery Decision
   ↓
Recovery Action
   ↓
Recovery History