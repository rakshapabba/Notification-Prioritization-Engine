# Notification Prioritization Engine

## 📌 Overview
A full-stack project built with **Java Spring Boot (backend)** and **React (frontend)**.  
The system classifies notifications into:
- **NOW** → deliver immediately  
- **LATER** → defer during quiet hours or normal priority  
- **NEVER** → suppress duplicates  

Every decision is logged in an **AuditLog entity** for transparency and auditability.

## ⚙️ Features
- Duplicate suppression
- Quiet hours handling (10 PM – 7 AM)
- Priority-based delivery
- Audit logging with explanations

## 🛠️ Tech Stack
- **Backend:** Java Spring Boot, Maven, PostgreSQL  
- **Frontend:** React, CSS  
- **Tools:** GitHub, Copilot (for code suggestions)

## 🚀 My Contributions
While Copilot helped accelerate development, I made key improvements:
- Cleaned up duplicate files and organized folder structure (entities, repositories, services, controllers).
- Fixed Maven build failures and import mismatches.
- Added multiple constructors to `AuditLog` for controller + service compatibility.
- Refined decision logic to align with real-world business rules.

## ▶️ How to Run
```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend
cd frontend
npm start
