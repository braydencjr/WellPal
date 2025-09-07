"""
AI Chat Service using LangChain and Google Gemini
"""

import random
from typing import List, Dict, Any, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate
from sqlalchemy.orm import Session

from app.core.config import settings
from app.schemas.chat import ChatMessageResponse, WellnessInsight


class AIChatService:
    """AI Chat Service for mental wellness support"""
    
    def __init__(self, db: Session):
        self.db = db
        
        # Initialize Gemini model
        if not settings.GOOGLE_API_KEY:
            raise ValueError("GOOGLE_API_KEY not found in environment variables")
            
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash-lite",
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0.7,
            max_tokens=1000
        )
        
        # Available AI companion avatars
        self.companion_avatars = [
            "ai-companion-1.png",
            "ai-companion-2.png", 
            "ai-companion-3.png"
        ]
        
        # System prompt for wellness companion
        self.system_prompt = """You are a gentle and empathetic wellness companion for university students — more like a caring friend than a robot.  

        Your role is to:  
        1. Listen with warmth, patience, and genuine empathy to whatever the student shares.  
        2. Respond with comforting words that provide emotional support and reassurance.  
        3. Offer thoughtful, practical suggestions that can help with stress, sleep, study-life balance, and emotional wellbeing.  
        4. Recognize when the situation might require professional support, and gently encourage seeking help.  
        5. Always keep the conversation natural, encouraging, and relatable — never cold or mechanical.  
        6. Respect each student’s background and individuality, being culturally sensitive and inclusive.  

        Guidelines:  
        - Keep responses warm, concise, and meaningful (2–4 sentences usually).  
        - Prioritize emotional connection over formality — speak like a trusted confidant.  
        - Never give medical advice or diagnoses.  
        - When offering tips, make them specific, gentle, and actionable.  
        - Remember: You are here to bring comfort, encouragement, and perspective — not to replace professional care.  
        """

    async def send_message(self, message: str, context: Optional[str] = None) -> ChatMessageResponse:
        """Send message to AI and get response"""
        
        try:
            # Create the prompt
            prompt = ChatPromptTemplate.from_messages([
                ("system", self.system_prompt),
                ("human", "{user_message}")
            ])
            
            # Add context if provided
            if context:
                formatted_message = f"Context: {context}\n\nUser message: {message}"
            else:
                formatted_message = message
            
            # Generate response
            chain = prompt | self.llm
            response = await chain.ainvoke({"user_message": formatted_message})
            
            # Extract mood insights and suggestions
            mood_insights = await self._analyze_mood(message)
            suggestions = await self._generate_suggestions(message, response.content)
            
            # Select random companion avatar
            companion_avatar = random.choice(self.companion_avatars)
            
            return ChatMessageResponse(
                response=response.content,
                suggestions=suggestions,
                mood_insights=mood_insights,
                companion_avatar=companion_avatar
            )
            
        except Exception as e:
            # Fallback response if AI fails
            return ChatMessageResponse(
                response="I'm here to listen and support you. Could you tell me a bit more about what you're going through?",
                suggestions=[
                    "Take a few deep breaths",
                    "Try a short walk outside",
                    "Consider talking to a counselor"
                ],
                companion_avatar=random.choice(self.companion_avatars)
            )

    async def _analyze_mood(self, message: str) -> Dict[str, Any]:
        """Analyze mood from user message"""
        
        # Simple keyword-based mood analysis (can be enhanced with more sophisticated NLP)
        mood_keywords = {
            "anxious": ["anxious", "worried", "nervous", "panic", "fear"],
            "stressed": ["stressed", "overwhelmed", "pressure", "exam", "deadline"],
            "sad": ["sad", "depressed", "down", "lonely", "empty"],
            "angry": ["angry", "frustrated", "annoyed", "mad", "upset"],
            "happy": ["happy", "good", "great", "excited", "joy"],
            "tired": ["tired", "exhausted", "sleepy", "fatigue", "worn out"],
            "confused": ["confused", "lost", "uncertain", "unclear", "don't know"]
        }
        
        message_lower = message.lower()
        detected_emotions = []
        
        for emotion, keywords in mood_keywords.items():
            if any(keyword in message_lower for keyword in keywords):
                detected_emotions.append(emotion)
        
        primary_emotion = detected_emotions[0] if detected_emotions else "neutral"
        confidence = 0.8 if detected_emotions else 0.5
        
        return {
            "detected_emotion": primary_emotion,
            "confidence": confidence,
            "all_emotions": detected_emotions
        }

    async def _generate_suggestions(self, user_message: str, ai_response: str) -> List[str]:
        """Generate contextual suggestions based on conversation"""
        
        message_lower = user_message.lower()
        suggestions = []
        
        # Context-aware suggestions
        if any(word in message_lower for word in ["stress", "stressed", "overwhelmed"]):
            suggestions = [
                "Try the 4-7-8 breathing technique",
                "Take a 10-minute break from studying",
                "Listen to calming music",
                "Practice progressive muscle relaxation"
            ]
        elif any(word in message_lower for word in ["exam", "test", "study"]):
            suggestions = [
                "Break study sessions into 25-minute chunks",
                "Create a study schedule",
                "Find a study group",
                "Visit the academic support center"
            ]
        elif any(word in message_lower for word in ["sleep", "tired", "exhausted"]):
            suggestions = [
                "Establish a consistent bedtime routine",
                "Limit screen time before bed",
                "Try meditation before sleep",
                "Keep your room cool and dark"
            ]
        elif any(word in message_lower for word in ["lonely", "alone", "isolated"]):
            suggestions = [
                "Join a campus club or organization",
                "Reach out to a friend or family member",
                "Attend campus social events",
                "Consider peer support groups"
            ]
        else:
            # General wellness suggestions
            suggestions = [
                "Take a few deep breaths",
                "Go for a short walk outside",
                "Practice mindfulness for 5 minutes",
                "Write in a journal"
            ]
        
        # Return random 3-4 suggestions
        return random.sample(suggestions, min(3, len(suggestions)))

    async def get_chat_history(self, user_id: int, limit: int = 20) -> List[Dict]:
        """Get user's chat history (placeholder for now)"""
        
        # TODO: Implement database storage for chat history
        # For now, return mock data
        return [
            {
                "id": 1,
                "content": "I'm feeling stressed about my upcoming exams",
                "sender": "user",
                "timestamp": "2024-01-01T10:00:00Z",
                "companion_avatar": None
            },
            {
                "id": 2,
                "content": "I understand that exam stress can be overwhelming. It's completely normal to feel this way. Have you tried breaking your study sessions into smaller, manageable chunks?",
                "sender": "assistant",
                "timestamp": "2024-01-01T10:00:05Z",
                "companion_avatar": "ai-companion-1.png"
            }
        ]

    async def clear_chat_history(self, user_id: int) -> bool:
        """Clear user's chat history"""
        
        # TODO: Implement database deletion
        return True

    def get_random_companion_avatar(self) -> str:
        """Get a random companion avatar"""
        return random.choice(self.companion_avatars)