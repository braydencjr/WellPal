"""
Main API Router
Includes all endpoint routers
"""

from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    users,
    mood_tracking,
    ai_chat,
    support_resources
)

# Create main API router
api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["authentication"]
)

api_router.include_router(
    users.router,
    prefix="/users",
    tags=["users"]
)

api_router.include_router(
    mood_tracking.router,
    prefix="/mood",
    tags=["mood-tracking"]
)

api_router.include_router(
    ai_chat.router,
    prefix="/chat",
    tags=["ai-chat"]
)

api_router.include_router(
    support_resources.router,
    prefix="/support",
    tags=["support"]
)
