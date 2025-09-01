"""
Support resources endpoints
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db


router = APIRouter()


@router.get("/emergency-contacts")
async def get_emergency_contacts():
    """
    Get emergency support contacts
    Public endpoint - no authentication required
    """
    # TODO: Store these in database or config
    return {
        "contacts": [
            {
                "name": "National Suicide Prevention Lifeline",
                "phone": "988",
                "available": "24/7",
                "type": "crisis"
            },
            {
                "name": "Crisis Text Line",
                "text": "HOME to 741741",
                "available": "24/7",
                "type": "crisis"
            },
            {
                "name": "University Counseling Center",
                "phone": "(555) 123-4567",
                "available": "Mon-Fri 8AM-5PM",
                "type": "counseling"
            }
        ]
    }


@router.get("/mental-health-resources")
async def get_mental_health_resources():
    """
    Get mental health resources and articles
    Public endpoint - no authentication required
    """
    # TODO: Store these in database
    return {
        "resources": [
            {
                "title": "Managing University Stress",
                "description": "Tips for handling academic pressure",
                "url": "https://example.com/stress-management",
                "type": "article",
                "tags": ["stress", "academic"]
            },
            {
                "title": "Mindfulness for Students",
                "description": "Introduction to mindfulness practices",
                "url": "https://example.com/mindfulness",
                "type": "guide",
                "tags": ["mindfulness", "meditation"]
            },
            {
                "title": "Sleep Hygiene for Better Mental Health",
                "description": "How good sleep supports mental wellbeing",
                "url": "https://example.com/sleep-health",
                "type": "article",
                "tags": ["sleep", "health"]
            }
        ]
    }


@router.get("/counseling-services")
async def get_counseling_services(
    location: str = "university",
    db: Session = Depends(get_db)
):
    """
    Get available counseling services
    Optionally filtered by location
    """
    # TODO: Implement location-based counseling service lookup
    return {
        "services": [
            {
                "name": "University Counseling and Psychological Services",
                "address": "123 Campus Drive, Student Health Center",
                "phone": "(555) 123-4567",
                "services": ["Individual therapy", "Group therapy", "Crisis intervention"],
                "cost": "Free for students",
                "appointment_required": True
            },
            {
                "name": "Community Mental Health Center",
                "address": "456 Main Street",
                "phone": "(555) 987-6543",
                "services": ["Individual therapy", "Family therapy", "Medication management"],
                "cost": "Sliding scale fees",
                "appointment_required": True
            }
        ]
    }
