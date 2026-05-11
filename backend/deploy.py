"""Production launcher for AutoMind."""

import os
from pathlib import Path

import uvicorn

ROOT = Path(__file__).resolve().parent.parent
FRONTEND_DIST = ROOT / "frontend" / "dist"

if __name__ == "__main__":
    os.environ.setdefault("DATABASE_URL", "sqlite:///./automind.db")
    os.environ.setdefault("CORS_ORIGINS", "http://localhost:8800")

    print("Starting AutoMind production server")
    print(f"   Backend: http://0.0.0.0:8800")
    print(f"   API docs: http://0.0.0.0:8800/docs")
    print(f"   Frontend dist: {FRONTEND_DIST} ({'found' if FRONTEND_DIST.exists() else 'missing'})")

    uvicorn.run("main:app", host="0.0.0.0", port=8800, workers=1, log_level="info")
