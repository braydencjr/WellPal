"""
Mood tracking schemas
"""

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class MoodEntryBase(BaseModel):
    """Base mood entry schema"""
    score: float  # 0.0 to 1.0
    labels: List[str]
    notes: Optional[str] = None


class MoodEntryCreate(MoodEntryBase):
    """Mood entry creation schema"""
    postcard_url: Optional[str] = None


class MoodEntryUpdate(BaseModel):
    """Mood entry update schema"""
    score: Optional[float] = None
    labels: Optional[List[str]] = None
    notes: Optional[str] = None


class MoodEntryResponse(MoodEntryBase):
    """Mood entry response schema"""
    id: int
    user_id: int
    postcard_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class MoodAnalytics(BaseModel):
    """Mood analytics schema"""
    average_mood: float
    mood_trend: str  # "improving", "stable", "declining"
    most_common_emotions: List[str]
    entries_count: int
    period_days: int
