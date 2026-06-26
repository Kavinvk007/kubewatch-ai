# port-forward-grafana.ps1

Write-Host "Starting Grafana Port-Forward..." -ForegroundColor Cyan
Write-Host "This terminal must stay open! If you close it, Grafana will stop working." -ForegroundColor Yellow
Write-Host "Grafana will be available at: http://localhost:3001`n" -ForegroundColor Green

kubectl port-forward svc/grafana 3001:3000 -n kubewatch
