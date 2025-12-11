"""
memo.ai Backend API
Transforms PDFs into interactive study materials using AI
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import pdfplumber
import io
import re


# ============================================
# App Configuration
# ============================================

app = FastAPI(
    title="memo.ai API",
    description="Transform your PDFs into interactive flashcards and quizzes",
    version="1.0.0"
)

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================
# Models
# ============================================

# ============================================
# Utility Functions
# ============================================


# ============================================
# API Endpoints
# ============================================

@app.get("/", response_model=HealthResponse)
async def root():
    """
    Root endpoint - Health check
    """
    return HealthResponse(
        status="online",
        message="🧠 memo.ai API is running! Transform your PDFs into interactive study materials.",
        version="1.0.0"
    )


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint for monitoring
    """
    return HealthResponse(
        status="healthy",
        message="All systems operational",
        version="1.0.0"
    )


# ============================================
# Run with: uvicorn main:app --reload
# ============================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)