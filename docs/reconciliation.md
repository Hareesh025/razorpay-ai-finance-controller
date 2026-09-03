# Reconciliation Engine

## Purpose

The reconciliation engine compares payment transaction records with settlement records to identify transactions that have been successfully settled and financial exceptions that require investigation.

## Input Data

The engine uses two synthetic CSV datasets:

- `data/transactions.csv`
- `data/settlements.csv`

The test dataset contains:

- **60 transaction records**
- **52 settlement records**

## Reconciliation Process

Each transaction is matched with its corresponding settlement using the transaction ID.

The engine then compares:

1. Transaction ID
2. Transaction amount
3. Settlement status
4. Settlement amount

Transactions are classified as either successfully reconciled or unresolved exceptions.

## Exception Classification

The reconciliation engine identifies three main exception categories.

### Missing Settlement

A transaction exists in the transaction dataset but has no corresponding settlement record.

Recommended action:

> Verify settlement with the payment processor.

### Amount Variance

A settlement exists, but the settlement amount does not match the original transaction amount.

Recommended action:

> Review the settlement amount and investigate the variance.

### Pending Settlement

A settlement record exists but has not reached the settled state.

Recommended action:

> Monitor the settlement and follow up if unresolved.

## Current Dataset Results

The current synthetic dataset produces the following reconciliation results:

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
| Records Processed | 60 |

## Calculation

The reconciliation rate is calculated as:

```text
Reconciliation Rate =
(Matched Transactions / Total Transactions Checked) × 100
