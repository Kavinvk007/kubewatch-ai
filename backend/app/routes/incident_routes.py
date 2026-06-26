from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth, database

router = APIRouter()

@router.post("/", response_model=schemas.IncidentResponse)
def create_incident(incident: schemas.IncidentCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    new_incident = models.Incident(**incident.model_dump())
    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)
    return new_incident

@router.get("/", response_model=List[schemas.IncidentResponse])
def get_incidents(skip: int = 0, limit: int = 100, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    incidents = db.query(models.Incident).order_by(models.Incident.created_at.desc()).offset(skip).limit(limit).all()
    return incidents

@router.put("/{incident_id}/resolve", response_model=schemas.IncidentResponse)
def resolve_incident(incident_id: int, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    incident = db.query(models.Incident).filter(models.Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    incident.status = "Resolved"
    db.commit()
    db.refresh(incident)
    return incident
