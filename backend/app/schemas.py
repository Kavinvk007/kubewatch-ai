from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from .models import SeverityEnum

class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class IncidentCreate(BaseModel):
    title: str
    description: str
    status: Optional[str] = "Open"

class IncidentResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class AIAnalysisRequest(BaseModel):
    log_text: str

class AIAnalysisResponse(BaseModel):
    id: int
    original_log: str
    explanation: str
    root_cause: str
    severity: SeverityEnum
    suggested_fix: str
    prevention_tip: str
    created_at: datetime

    class Config:
        from_attributes = True
