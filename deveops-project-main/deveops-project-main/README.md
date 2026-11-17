# 🏛️ CivicPulse – Online Complaint & Public Issue Reporting Portal

> **Subject:** DevOps & Full Stack (B.Tech IV Year Course Project)  
> **Evaluation Rubric:** Maximum Marks: 10 (Rubric Criteria 1 to 5)  
> **Technology Stack:** **Frontend (HTML5/Nginx SPA) + Backend (Node.js & Express) + Database (MongoDB & Mongoose)**  
> **Orchestration:** Docker & Kubernetes (Deployments, Services, ConfigMaps, MongoDB PVC, Probes)  

---

## 📌 1. Project Overview & Specifications

**CivicPulse** is an enterprise public issue redressal system connecting citizens with municipal authorities. Citizens report issues with photos and locations; department officers inspect and resolve them; supervisors allocate staff and escalate overdue SLA violations; and administrators track overall performance and system health.

### 👥 User Roles (4 Roles)
1. **Citizen:** Lodge civic complaints with photos and location, track progress, and submit 1–5 star ratings with feedback upon resolution.
2. **Department Officer:** View assigned departmental tasks, record site inspection remarks, log technical resolution notes, and update statuses (*In Progress* $\rightarrow$ *Resolved*).
3. **Supervisor:** Oversee incoming complaints across all municipal departments, assign responsible officers, and escalate overdue SLA breaches (> 48 hrs).
4. **Admin:** Master oversight of departments, officer rosters, system audit trails, and Kubernetes cluster health.

---

## 🖥️ 2. Minimum Screens Breakdown (8 Screens)

CivicPulse contains **8 distinct interactive screens/views**:

| Screen # | Screen Name | Route / View | Key Features & Functionality |
| :---: | :--- | :--- | :--- |
| **Screen 1** | **Home & Public Feed** | `screen-home` | Metric summary counters, search by Ticket ID / location, category filters, and live Kubernetes pod load-balancing monitor. |
| **Screen 2** | **Lodge Grievance** | `screen-submit` | Citizen submission form with title, department, priority, exact ward location, description, and **photo attachment (preset civic photos or custom URL)**. |
| **Screen 3** | **Citizen Tracking & Feedback** | `screen-track` | Citizen's filed grievance status tracking and **interactive 5-star rating & feedback submission** upon resolution. |
| **Screen 4** | **Officer Workspace** | `screen-officer` | Officer task queue, field remarks entry, technical resolution notes logging, and status transitions (*In Progress* / *Resolved*). |
| **Screen 5** | **Supervisor Desk & Escalation** | `screen-supervisor` | Department officer allocation, ticket assignment, and **emergency escalation for overdue SLA complaints**. |
| **Screen 6** | **Admin Management Console** | `screen-admin` | Registered officers roster by department, system configuration, and Kubernetes cluster infrastructure health view. |
| **Screen 7** | **Mandatory Analytical Reports** | `screen-reports` | Dedicated reporting dashboard with **all 4 mandatory analytical reports** + **CSV Export** functionality. |
| **Screen 8** | **Complaint Detail & Audit Trail** | `screen-timeline` | Deep-dive screen with metadata, attached photos, and an **interactive vertical lifecycle audit trail timeline** from submission to closure. |

---

## 📊 3. Mandatory Reports (4 Reports)

CivicPulse includes a dedicated, exportable reporting engine on **Screen 7**:

1. **Complaint Category Report:** Categorizes grievances across *Roads & Transport*, *Water Supply*, *Electricity*, *Sanitation*, and *Health & Hygiene*, with total lodged, pending, resolved, and resolution percentages.
2. **Pending Complaint Report (Aging Analysis):** Displays all active unresolved complaints with **days pending** and automated **SLA Breach Warnings** for issues open longer than 3 days.
3. **Resolved Complaint Report:** Turnaround duration (**resolution time in hours**), officer resolution notes, and **citizen star ratings (1–5 ⭐)** with feedback reviews.
4. **Department-wise Performance Report:** Departmental benchmark comparison: total received, resolution rates, average resolution time (hours), citizen satisfaction score, and SLA tier rating.

---

## 🏗️ 4. Cloud-Native DevOps Architecture (Node.js + MongoDB)

```text
                               +-------------------------------------------------------------+
                               |                 Kubernetes Cluster (Namespace: civicpulse)   |
                               |                                                             |
   [ Citizen / Officer ]       |   NodePort Service (Port 30080 / 80)                        |
            │                  |                     │                                       |
            ▼                  |                     ▼                                       |
  ┌──────────────────┐         |        ┌─────────────────────────┐                          |
  │ Web Browser (UI) │────────>│        │  frontend-deployment    │ (2 Replicas - Nginx)     |
  └──────────────────┘         |        └────────────┬────────────┘                          |
                               |                     │ Reverse Proxy /api/ & /healthz        |
                               |                     ▼                                       |
                               |   ClusterIP Service: backend:5000                           |
                               |                     │                                       |
                               |                     ▼                                       |
                               |        ┌─────────────────────────┐                          |
                               |        │   backend-deployment    │ (2 Replicas - Node.js)   |
                               |        │   - /healthz (Probes)   │                          |
                               |        │   - /api/reports/*      │                          |
                               |        └────────────┬────────────┘                          |
                               |                     │ ClusterIP Service: mongodb:27017      |
                               |                     ▼                                       |
                               |        ┌─────────────────────────┐                          |
                               |        │   mongodb-deployment    │ (1 Replica - MongoDB 6)  |
                               |        └────────────┬────────────┘                          |
                               |                     │ Mounted to /data/db                   |
                               |                     ▼                                       |
                               |        ┌─────────────────────────┐                          |
                               |        │  PersistentVolumeClaim  │ (1Gi RWO Storage)        |
                               |        │     (mongodb-pvc)       │                          |
                               |        └─────────────────────────┘                          |
                               +-------------------------------------------------------------+
```

---

## 💻 5. Technology Stack Summary

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, Modern ES6 JavaScript, Nginx Alpine | 8 responsive screens, interactive role switcher, CSV export |
| **Backend** | **Node.js + Express** | RESTful API, Kubernetes probes, auto-retry connection, data aggregation |
| **Database** | **MongoDB (Mongoose ODM)** | Document storage for complaints and lifecycle audit timelines |
| **Containers** | Docker & Docker Compose | Multi-container isolation, environment variables, healthchecks |
| **Orchestration** | Kubernetes | Deployments (2 Replicas), NodePort & ClusterIP Services, ConfigMap, MongoDB PVC |

---

## 🚀 6. Execution Instructions

### A. Run Locally with Docker Compose
```bash
cd civicpulse
docker compose up --build -d
```
- **Web Portal:** Open [http://localhost:3000](http://localhost:3000)
- **Health & Pod Status:** Open [http://localhost:5000/healthz](http://localhost:5000/healthz)
- **Stop:** `docker compose down`

---

### B. Deploy to Kubernetes Cluster (Minikube / Docker Desktop / Kind)

1. **Start Minikube and link Docker daemon:**
   ```bash
   minikube start
   minikube docker-env | Invoke-Expression   # PowerShell
   ```

2. **Build Docker images:**
   ```bash
   docker build -t civicpulse-backend:latest ./backend
   docker build -t civicpulse-frontend:latest ./frontend
   ```

3. **Deploy all manifests:**
   ```bash
   kubectl apply -k k8s/
   ```

4. **Verify running pods & services:**
   ```bash
   kubectl get pods -n civicpulse
   kubectl get pvc -n civicpulse
   ```

5. **Open Portal in Browser:**
   ```bash
   minikube service frontend -n civicpulse
   # Or directly at: http://localhost:30080
   ```
