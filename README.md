# 💊 PharmaOne

A blockchain-powered pharmaceutical supply chain management system that improves transparency, traceability, and security across the medicine distribution process. PharmaOne enables manufacturers, distributors, pharmacies, regulators, and administrators to securely manage medicine inventories, orders, and transactions using Ethereum blockchain technology.

---

## 📌 Overview

PharmaOne combines traditional web technologies with blockchain to provide a secure platform for managing pharmaceutical operations. Critical inventory operations are recorded on the Ethereum Sepolia Test Network, ensuring tamper-resistant records while MongoDB stores application data for efficient access.

---

## ✨ Features

### 🔐 Authentication
- Email & Password Login
- Google OAuth Login
- Role-based access control
- Session management

### 👥 User Roles
- Administrator
- Manufacturer
- Distributor
- Pharmacy
- Regulator

### 💊 Medicine Management
- Add medicines
- Update medicine inventory
- View inventory
- Track medicine ownership
- Blockchain-backed quantity updates

### 📦 Order Management
- Place medicine orders
- Accept or reject offers
- Generate invoices
- Upload payment proofs
- Order status tracking

### 📄 Document Management
- User verification document upload
- Invoice storage
- Payment proof uploads
- Memo generation

### ⛓ Blockchain Integration
- Ethereum Sepolia Test Network
- Smart Contract based inventory
- Immutable medicine records
- Secure transaction signing
- Transaction hash generation

### 📊 Administration
- User verification
- Audit logs
- Dashboard statistics
- Inventory monitoring
- Feedback management

---

# 🏗 System Architecture

```

```
            React Frontend
                  │
                  ▼
          Flask REST API
          ├──────────────┐
          ▼              ▼
     MongoDB Atlas   Ethereum
                        │
                 Smart Contract
```
