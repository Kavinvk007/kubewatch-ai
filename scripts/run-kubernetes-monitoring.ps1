# run-kubernetes-monitoring.ps1

Write-Host "Starting KubeWatch AI Kubernetes Monitoring..." -ForegroundColor Cyan

Write-Host "`n1. Starting Minikube..." -ForegroundColor Yellow
minikube start --driver=docker

Write-Host "`n2. Setting Docker environment to Minikube..." -ForegroundColor Yellow
minikube -p minikube docker-env --shell powershell | Invoke-Expression

Write-Host "`n3. Building Local Docker Images..." -ForegroundColor Yellow
Write-Host "Building backend image..."
docker build -t kubewatch-backend:latest ./backend
Write-Host "Building frontend image..."
docker build -t kubewatch-frontend:latest ./frontend

Write-Host "`n4. Applying Kubernetes Manifests..." -ForegroundColor Yellow
kubectl apply -f k8s/

Write-Host "`nWaiting a few seconds for pods to initialize..."
Start-Sleep -Seconds 10

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "Kubernetes Nodes:" -ForegroundColor Cyan
kubectl get nodes

Write-Host "`nKubernetes Pods:" -ForegroundColor Cyan
kubectl get pods -n kubewatch

Write-Host "`nKubernetes Services:" -ForegroundColor Cyan
kubectl get svc -n kubewatch
Write-Host "========================================================`n" -ForegroundColor Cyan

Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host "To access the monitoring dashboards, please open TWO separate PowerShell terminals and run:" -ForegroundColor Yellow
Write-Host "Terminal 1: .\scripts\port-forward-grafana.ps1" -ForegroundColor White
Write-Host "Terminal 2: .\scripts\port-forward-prometheus.ps1" -ForegroundColor White
