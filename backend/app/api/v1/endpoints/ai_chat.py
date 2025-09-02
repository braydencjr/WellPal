"""
AI Chat assistant endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.schemas.chat import ChatMessageRequest, ChatMessageResponse, ChatHistoryResponse
from app.services.ai_chat_service import AIChatService


router = APIRouter()


@router.post("/message", response_model=ChatMessageResponse)
async def send_chat_message(
    message_data: ChatMessageRequest,
    db: Session = Depends(get_db)
) -> ChatMessageResponse:
    """
    Send message to AI chat assistant
    Requires authentication
    """
    try:
        ai_service = AIChatService(db)
        return await ai_service.send_message(
            message=message_data.message,
            context=message_data.context
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


@router.get("/history", response_model=ChatHistoryResponse)
async def get_chat_history(
    limit: int = 20,
    db: Session = Depends(get_db)
) -> ChatHistoryResponse:
    """
    Get user's chat history
    Requires authentication
    """
    try:
        ai_service = AIChatService(db)
        # TODO: Get actual user_id from authentication
        user_id = 1  # Placeholder
        
        messages = await ai_service.get_chat_history(user_id, limit)
        
        return ChatHistoryResponse(
            messages=messages,
            total=len(messages)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat history error: {str(e)}")


@router.delete("/history")
async def clear_chat_history(
    db: Session = Depends(get_db)
):
    """
    Clear user's chat history
    Requires authentication
    """
    try:
        ai_service = AIChatService(db)
        # TODO: Get actual user_id from authentication
        user_id = 1  # Placeholder
        
        success = await ai_service.clear_chat_history(user_id)
        
        if success:
            return {"message": "Chat history cleared successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to clear chat history")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Clear history error: {str(e)}")


@router.get("/companion-avatar")
async def get_companion_avatar(
    db: Session = Depends(get_db)
):
    """
    Get a random AI companion avatar
    """
    try:
        ai_service = AIChatService(db)
        avatar = ai_service.get_random_companion_avatar()
        return {"avatar": avatar}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Avatar error: {str(e)}")
