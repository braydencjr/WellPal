"""
Database configuration and dependencies
"""

from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from app.core.config import settings


# Database URL - will be set when you choose your database
DATABASE_URL = settings.DATABASE_URL or "sqlite:///./wellpal.db"

# SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    # SQLite specific settings (remove when using PostgreSQL)
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for database models
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """
    Database dependency for FastAPI endpoints
    Usage: db: Session = Depends(get_db)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def init_db() -> None:
    """Initialize database - create tables"""
    # Import all models here to ensure they are registered with SQLAlchemy
    # from app.models import user, mood_entry  # TODO: Import your models
    
    Base.metadata.create_all(bind=engine)
    print("📊 Database initialized")


async def close_db() -> None:
    """Close database connections"""
    engine.dispose()
    print("📊 Database connections closed")
