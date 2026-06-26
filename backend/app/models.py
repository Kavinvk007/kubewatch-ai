from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
from .database import Base

class SeverityEnum(str, enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    status = Column(String, default="Open")
    created_at = Column(DateTime, default=datetime.utcnow)

class AIAnalysisLog(Base):
    __tablename__ = "ai_analysis_logs"
    id = Column(Integer, primary_key=True, index=True)
    original_log = Column(Text)
    explanation = Column(Text)
    root_cause = Column(Text)
    severity = Column(SQLEnum(SeverityEnum))
    suggested_fix = Column(Text)
    prevention_tip = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
