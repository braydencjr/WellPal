"""
AI Chat schemas
"""

from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


class ChatMessageRequest(BaseModel):
    """Chat message request schema"""
    message: str
    context: Optional[str] = None


class ChatMessageResponse(BaseModel):
    """Chat message response schema"""
    response: str
    suggestions: List[str] = []
    mood_insights: Optional[Dict[str, Any]] = None
    companion_avatar: str  # Random AI companion image


class ChatHistoryMessage(BaseModel):
    """Chat history message schema"""
    id: int
    content: str
    sender: str  # "user" or "assistant"
    timestamp: datetime
    companion_avatar: Optional[str] = None


class ChatHistoryResponse(BaseModel):
    """Chat history response schema"""
    messages: List[ChatHistoryMessage]
    total: int


class WellnessInsight(BaseModel):
    """Wellness insight schema"""
    emotion_detected: str
    confidence: float
    suggestions: List[str]
    resources: List[str] = []
