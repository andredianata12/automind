"""
Production deployment script.
Serves both backend API and frontend static files.
"""

import uvicorn
import sys
import os

# Add frontend dist to path
FRONTEND_DIST = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if __name__ == "__main__":
    # Set environment
    os.environ.setdefault("DATABASE_URL", "sqlite:///./automind.db")
    
    print("🚀 Starting AutoMind in production mode...")
    print(f"   Frontend: {FRONTEND_DIST}")
    print(f"   Backend: http://0.0.0.0:8800")
    print(f"   API Docs: http://0.0.0.0:8800/docs")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8800,
        workers=1,
        log_level="info",
    )
