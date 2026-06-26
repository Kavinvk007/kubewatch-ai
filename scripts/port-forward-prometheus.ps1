# port-forward-prometheus.ps1

Write-Host "Starting Prometheus Port-Forward..." -ForegroundColor Cyan
Write-Host "This terminal must stay open! If you close it, Prometheus will stop working." -ForegroundColor Yellow
Write-Host "Prometheus will be available at: http://localhost:9090" -ForegroundColor Green
Write-Host "Prometheus Targets will be available at: http://localhost:9090/targets`n" -ForegroundColor Green

kubectl port-forward svc/prometheus 9090:9090 -n kubewatch
