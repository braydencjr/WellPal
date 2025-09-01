"""
Simple test script to verify backend is working
"""

import asyncio
import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(__file__))

from app.services.ai_chat_service import AIChatService
from app.core.database import get_db

async def test_ai_chat():
    """Test the AI chat service"""
    print("🧪 Testing AI Chat Service...")
    
    try:
        # Create a mock database session (for testing)
        db = next(get_db())
        
        # Initialize AI service
        ai_service = AIChatService(db)
        
        # Test message
        test_message = "I'm feeling stressed about my exams"
        print(f"📤 Sending test message: '{test_message}'")
        
        # Send message to AI
        response = await ai_service.send_message(test_message)
        
        print("📥 AI Response:")
        print(f"  Response: {response.response}")
        print(f"  Suggestions: {response.suggestions}")
        print(f"  Companion Avatar: {response.companion_avatar}")
        
        if response.mood_insights:
            print(f"  Mood Insights: {response.mood_insights}")
        
        print("✅ AI Chat Service test completed successfully!")
        
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        print("💡 Make sure you have set GOOGLE_API_KEY in your .env file")
        return False
    
    return True

async def main():
    """Main test function"""
    print("🚀 WellPal Backend Test Suite")
    print("=" * 40)
    
    success = await test_ai_chat()
    
    print("\n" + "=" * 40)
    if success:
        print("🎉 All tests passed! Your AI Chat Companion is ready to use.")
    else:
        print("🔧 Some tests failed. Please check your configuration.")

if __name__ == "__main__":
    asyncio.run(main())
