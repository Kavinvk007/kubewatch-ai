# setup-kubernetes-windows.ps1

Write-Host "KubeWatch AI - Windows Setup Script" -ForegroundColor Cyan
Write-Host "-------------------------------------"

$missingTools = $false

# Check Docker
Write-Host "Checking Docker..."
if (Get-Command "docker" -ErrorAction SilentlyContinue) {
    $dockerVersion = (docker --version)
    Write-Host "✅ Docker is installed: $dockerVersion" -ForegroundColor Green
    
    # Check if Docker Desktop is running
    $dockerInfo = (docker info 2>&1)
    if ($dockerInfo -match "error during connect") {
        Write-Host "❌ Docker Desktop is NOT running. Please open Docker Desktop and wait for it to start." -ForegroundColor Red
        $missingTools = $true
    } else {
        Write-Host "✅ Docker Desktop is running." -ForegroundColor Green
    }
} else {
    Write-Host "❌ Docker is missing. Please download and install Docker Desktop: https://www.docker.com/products/docker-desktop/" -ForegroundColor Red
    $missingTools = $true
}

# Check kubectl
Write-Host "`nChecking kubectl..."
if (Get-Command "kubectl" -ErrorAction SilentlyContinue) {
    Write-Host "✅ kubectl is installed." -ForegroundColor Green
    kubectl version --client
} else {
    Write-Host "❌ kubectl is missing." -ForegroundColor Red
    Write-Host "Please run this command to install it:" -ForegroundColor Yellow
    Write-Host "winget install -e --id Kubernetes.kubectl"
    $missingTools = $true
}

# Check minikube
Write-Host "`nChecking minikube..."
if (Get-Command "minikube" -ErrorAction SilentlyContinue) {
    Write-Host "✅ minikube is installed." -ForegroundColor Green
    minikube version
} else {
    Write-Host "❌ minikube is missing." -ForegroundColor Red
    Write-Host "Please run this command to install it:" -ForegroundColor Yellow
    Write-Host "winget install -e --id Kubernetes.minikube"
    $missingTools = $true
}

if ($missingTools) {
    Write-Host "`n========================================================" -ForegroundColor Red
    Write-Host "Install missing tools, close PowerShell, open a new PowerShell, then run this script again." -ForegroundColor Red
    Write-Host "========================================================" -ForegroundColor Red
    Exit 1
} else {
    Write-Host "`n✅ All tools are installed and ready to go!" -ForegroundColor Green
    Write-Host "You can now run: .\scripts\run-kubernetes-monitoring.ps1" -ForegroundColor Cyan
}
