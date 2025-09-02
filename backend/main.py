"""
FastAPI Application Entry Point
WellPal Backend API Server
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api.v1.api import api_router
from app.core.config import settings
from app.core.database import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manage application lifecycle
    - Startup: Initialize database connections, start background tasks
    - Shutdown: Clean up resources
    """
    # Startup
    print("🚀 WellPal Backend starting up...")
    await init_db()
    
    yield
    
    # Shutdown
    print("🛑 WellPal Backend shutting down...")
    # TODO: Clean up database connections
    # TODO: Stop background tasks


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    description="Mental wellness companion API for university students",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    """Root endpoint for health check"""
    return {"message": "WellPal Backend API", "status": "healthy"}


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "WellPal Backend"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
