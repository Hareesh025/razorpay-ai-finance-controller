# System Architecture

## Overview

Razorpay AI Finance Controller is an AI-assisted finance operations control center designed to monitor payments, analyze transaction risk, reconcile settlements, investigate exceptions, and initiate recovery actions.

## Architecture Flow

```text
Financial Transaction Data
          │
          ▼
   CSV Financial Records
   ├── transactions.csv
   └── settlements.csv
          │
          ▼
      Pandas Engine
          │
          ▼
       FastAPI Backend
          │
          ├── Transaction Analysis
          ├── Reconciliation Engine
          ├── Risk Analysis
          ├── Exception Detection
          ├── Payment Simulation
          └── Recovery Actions
          │
          ▼
      Finance Controller
          │
          ▼
     Web Dashboard
          │
          ├── Command Center
          ├── Reconciliation
          ├── Risk & Security
          ├── AI Investigation
          ├── Recovery Center
          └── AI Finance Insights
