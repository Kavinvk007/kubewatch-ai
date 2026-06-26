from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth, database, ai_service

router = APIRouter()

@router.post("/analyze", response_model=schemas.AIAnalysisResponse)
def analyze_log(request: schemas.AIAnalysisRequest, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    analysis_result = ai_service.analyze_log(request.log_text)
    
    # Save to db
    log_entry = models.AIAnalysisLog(
        original_log=request.log_text,
        explanation=analysis_result.get("explanation", ""),
        root_cause=analysis_result.get("root_cause", ""),
        severity=analysis_result.get("severity", "Medium"),
        suggested_fix=analysis_result.get("suggested_fix", ""),
        prevention_tip=analysis_result.get("prevention_tip", "")
    )
    db.add(log_entry)
    db.commit()
    db.refresh(log_entry)
    return log_entry

@router.get("/history", response_model=List[schemas.AIAnalysisResponse])
def get_analysis_history(skip: int = 0, limit: int = 50, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    history = db.query(models.AIAnalysisLog).order_by(models.AIAnalysisLog.created_at.desc()).offset(skip).limit(limit).all()
    return history
