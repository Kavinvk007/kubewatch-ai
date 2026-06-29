# KubeWatch AI

KubeWatch AI is a production-ready CI/CD enabled Kubernetes Monitoring and AI Log Intelligence Platform.

## 🚀 Features
- **AI Log Analyzer**: Paste Kubernetes error logs and get Gemini AI-powered explanations, root causes, and suggested fixes.
- **Real-time Dashboard**: Overview of pods, deployments, API health, and recent incidents.
- **Monitoring Stack**: Integrated Prometheus for metrics and Grafana for beautiful visualizations.
- **Log Aggregation**: Loki + Promtail for comprehensive cluster logging.
- **Full CI/CD Pipeline**: GitHub actions for testing, building, pushing, and deploying to Kubernetes.
- **Secure Authentication**: JWT-based login for admin operations.

## 🏗️ Architecture

```mermaid
graph TD
    User([User]) -->|HTTP/HTTPS| Ingress[Nginx Ingress]
    Ingress -->|/| Frontend[React + Vite App]
    Ingress -->|/api| Backend[FastAPI + SQLite]
    
    Backend <-->|API Calls| Gemini[Google Gemini AI]
    Backend <--> DB[(SQLite Database)]
    
    Prometheus[Prometheus] -->|Scrapes /metrics| Backend
    Grafana[Grafana] -->|Queries| Prometheus
    Grafana -->|Queries| Loki[Loki]
    Promtail[Promtail] -->|Pushes logs| Loki
```

## 🛠️ Tech Stack
- **Frontend**: React, Vite, TailwindCSS v4, Recharts, Lucide Icons
- **Backend**: FastAPI, SQLAlchemy, Pydantic, Passlib, Google GenAI SDK
- **Database**: SQLite (easy local setup)
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes (Minikube / Kind compatible)
- **CI/CD**: GitHub Actions
- **Monitoring & Logging**: Prometheus, Grafana, Loki, Promtail

## 📁 Folder Structure
- `backend/`: FastAPI application code and requirements.
- `frontend/`: React application using Vite and Tailwind.
- `k8s/`: Kubernetes deployment manifests.
- `.github/workflows/`: CI/CD action pipelines.

## ⚙️ Local Setup Commands

### Prerequisites
- Node.js & npm
- Python 3.11+
- Docker & Docker Compose
- (Optional) Minikube or Kind for K8s testing

### 1. Environment Setup
Create a `.env` file in the `backend/` directory:
```
GEMINI_API_KEY=your_google_gemini_api_key
```

### 2. Run with Docker Compose
To run the full stack locally without Kubernetes:
```bash
docker compose up --build -d
docker compose ps
```
- Frontend: http://localhost:80
- Backend API: http://localhost:8000/docs
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001
  - Username: `admin`
  - Password: `admin`
  - Dashboard: http://localhost:3001/dashboards

> **Note:** If the dashboard does not appear, restart Docker Compose:
> ```bash
> docker compose down
> docker compose up --build -d
> ```

### 3. Run Manually (Development)
**Backend**:
```bash
cd backend
python -m venv venv
# Activate venv
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev
```

## 🌍 Live Deployment Guide

KubeWatch AI can be deployed live for production using Render (Backend) and Vercel (Frontend).

### Live Demo URLs
- **Frontend**: [Replace with Vercel URL]
- **Backend API Docs**: [Replace with Render URL]/docs

*(Grafana and Prometheus monitoring are kept local via Docker Compose for demo purposes.)*

### 1. Backend Deployment (Render)
Deploy the FastAPI backend using Render's Web Service:
1. Connect your GitHub repository to Render.
2. Create a new **Web Service**.
3. Settings:
   - **Root Directory**: ` ` (leave empty)
   - **Environment**: `Python 3`
   - **Build Command**: `cd backend && python -m pip install --upgrade pip setuptools wheel && pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. **Environment Variables**:
   - `GEMINI_API_KEY`: Your Google Gemini API Key
   - `FRONTEND_URL`: `https://your-frontend-project.vercel.app` (required for CORS)

### 2. Frontend Deployment (Vercel)
Deploy the React Vite frontend using Vercel:
1. Connect your GitHub repository to Vercel.
2. Import the project and set the **Framework Preset** to `Vite`.
3. Set the **Root Directory** to `frontend`.
4. **Environment Variables**:
   - `VITE_API_URL`: `https://your-backend-project.onrender.com/api`
5. Click **Deploy**.

### 3. Local Monitoring (Grafana & Prometheus)
To run the monitoring stack locally while developing:
```bash
docker compose up --build -d
docker compose ps
```
Grafana will be at `http://localhost:3001` and Prometheus at `http://localhost:9090`.

## ☸️ Windows Kubernetes Monitoring Setup

Step 1: Install tools:
```powershell
winget install -e --id Kubernetes.kubectl
winget install -e --id Kubernetes.minikube
```

Step 2: Close PowerShell and open a new PowerShell.

Step 3: Verify:
```powershell
kubectl version --client
minikube version
docker --version
```

Step 4: Start Docker Desktop.

Step 5: Run:
```powershell
.\scripts\setup-kubernetes-windows.ps1
.\scripts\run-kubernetes-monitoring.ps1
```

Step 6: Open two separate PowerShell terminals:
```powershell
.\scripts\port-forward-grafana.ps1
.\scripts\port-forward-prometheus.ps1
```

Step 7: Open:
- Grafana: http://localhost:3001
- Prometheus: http://localhost:9090
- Prometheus Targets: http://localhost:9090/targets

## 🔄 CI/CD Setup Guide
1. Push this repository to GitHub.
2. In your GitHub repository settings, add the following secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username.
   - `DOCKER_PASSWORD`: Your Docker Hub password/token.
   - `KUBECONFIG`: Your base64 encoded kubeconfig file for the deployment target.
3. Every push to the `main` branch will trigger tests, build Docker images, push to Docker Hub, and apply the manifests to your cluster.

## 📝 Resume Bullets
- Architected and deployed a scalable Kubernetes monitoring platform utilizing FastAPI, React, and Google Gemini AI, decreasing mean-time-to-resolution (MTTR) for cluster incidents through automated log analysis.
- Engineered a robust CI/CD pipeline using GitHub Actions to automatically test, build, and deploy Dockerized microservices to a Kubernetes cluster with zero downtime.
- Integrated a comprehensive observability stack (Prometheus, Grafana, Loki) for real-time tracking of API latencies, pod health, and error rates.
