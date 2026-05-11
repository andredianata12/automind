from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio

from models.database import init_db
from config.settings import settings
from api.routes import auth, messages, leads, platforms, knowledge, analytics, webhooks
from services.follow_up_scheduler import FollowUpScheduler
from services.message_processor import message_processor


# Background task runner
background_tasks = []


async def follow_up_loop():
    """Background task: check and send follow-ups every 5 minutes."""
    from models.database import SessionLocal
    from services.follow_up_scheduler import FollowUpScheduler

    scheduler = FollowUpScheduler()
    while True:
        try:
            db = SessionLocal()
            pending = scheduler.get_pending_follow_ups(db)
            for lead in pending:
                msg = scheduler.get_follow_up_message(lead)
                # TODO: actually send the follow-up message via platform connector
                print(f"Follow-up to {lead.contact_name}: {msg}")
                scheduler.mark_follow_up_sent(lead, db)
            db.close()
        except Exception as e:
            print(f"Follow-up loop error: {e}")
        await asyncio.sleep(300)  # Check every 5 minutes


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup
    init_db()
    print("✅ AutoMind API started")
    print(f"   Database: {settings.DATABASE_URL}")
    print(f"   OpenAI: {'configured' if settings.OPENAI_API_KEY else 'NOT configured (using fallback)'}")

    # Start background tasks
    task = asyncio.create_task(follow_up_loop())
    background_tasks.append(task)

    yield

    # Shutdown
    for task in background_tasks:
        task.cancel()
    print("👋 AutoMind API shutting down")


app = FastAPI(
    title="AutoMind API",
    description="AI Multi-Platform DM & Chat Assistant",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS - configurable origins
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:8800",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(messages.router, prefix="/api/messages", tags=["Messages"])
app.include_router(leads.router, prefix="/api/leads", tags=["Leads"])
app.include_router(platforms.router, prefix="/api/platforms", tags=["Platforms"])
app.include_router(knowledge.router, prefix="/api/knowledge", tags=["Knowledge"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(webhooks.router, prefix="/api/webhooks", tags=["Webhooks"])


@app.get("/")
async def root():
    return {
        "name": "AutoMind API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
