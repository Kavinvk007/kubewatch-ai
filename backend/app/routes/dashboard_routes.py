from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, auth, database, metrics

router = APIRouter()

@router.get("/metrics")
def get_dashboard_metrics(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    # Mock data for Kubernetes dashboard as per A1
    active_pods = 14
    failed_pods = 2
    metrics.ACTIVE_PODS.set(active_pods)
    metrics.FAILED_PODS.set(failed_pods)
    
    open_incidents = db.query(models.Incident).filter(models.Incident.status == "Open").count()
    
    return {
        "total_pods": 16,
        "running_pods": active_pods,
        "failed_pods": failed_pods,
        "services": 5,
        "deployments": 3,
        "open_incidents": open_incidents
    }

@router.get("/deployments")
def get_deployments(current_user: models.User = Depends(auth.get_current_user)):
    return [
        {"name": "backend-deployment", "status": "Running", "replicas": 2, "ready": 2},
        {"name": "frontend-deployment", "status": "Running", "replicas": 1, "ready": 1},
        {"name": "redis-deployment", "status": "Failed", "replicas": 1, "ready": 0},
    ]
