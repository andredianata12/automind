# 🤖 AutoMind — AI Multi-Platform DM & Chat Assistant

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![React](https://img.shields.io/badge/react-18.3-61DAFB.svg)
![FastAPI](https://img.shields.io/badge/fastapi-0.115-009688.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.5-3178C6.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

**Automate 90% of your business chats across 15+ platforms — all from a single dashboard.**

</div>

> AutoMind is an AI-powered communication hub that transforms how small and medium businesses handle incoming messages on WhatsApp, Instagram, Telegram, Shopee, and 11+ other platforms. It's far more than a simple auto-reply bot — AutoMind **reads context, detects intent, and makes autonomous decisions** like a professional sales assistant working 24/7.

<img width="1672" height="941" alt="AutoMind Dashboard Preview" src="https://github.com/user-attachments/assets/05bcd5c7-0abc-46bd-84d0-8c880e960178" />

---

## 📑 Table of Contents

- [Why AutoMind?](#-why-automind)
- [Key Features](#-key-features)
- [Supported Platforms](#-supported-platforms)
- [System Architecture](#-system-architecture)
- [AI Pipeline](#-ai-pipeline)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Platform Configuration](#-platform-configuration)
- [Dashboard & UI](#-dashboard--ui)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🎯 Why AutoMind?

### The Problem

Small and medium businesses face significant challenges in managing customer communications:

| Problem | Impact |
|---------|--------|
| **Chat backlog** | 50–200 DMs per day, with 80% being repetitive questions |
| **Slow response times** | More than 1 hour delay = 60% of leads lost |
| **Inability to distinguish intent** | No way to separate buyers from casual inquiries and spam |
| **Forgotten manual follow-ups** | Deals fall through due to lack of follow-through |
| **Multi-platform chaos** | WhatsApp, Instagram, Shopee, Telegram — all disconnected |

### The AutoMind Solution

```
Without AutoMind:
Customer DM → Owner reads manually → Replies (1–4 hours) → Customer already left 😢

With AutoMind:
Customer DM → AI reads context → Detects intent → Auto-reply (0.8 seconds) → Lead saved → Follow-up automated 🎉
```

### Expected Results

- 📉 **Response time**: Reduced from 47 minutes to 0.8 seconds
- 📈 **Conversion rate**: Increased by 25–35% because no lead goes unnoticed
- ⏰ **Time saved**: 4+ hours per day freed up for other tasks
- 💰 **Cost efficient**: 10x cheaper than hiring a customer support team

---

## ✨ Key Features

### 🎯 Intent Detection
The AI reads conversation context and identifies the customer's goal:

- `PURCHASE_INQUIRY` — Customer wants to buy something
- `PRICE_CHECK` — Customer is asking about pricing
- `COMPLAINT` — Customer has a complaint or issue
- `GENERAL_QUESTION` — General inquiry
- `COLLAB_OFFER` — Business collaboration proposal
- `GREETING` — Casual greeting or small talk
- `SPAM` — Spam or irrelevant message

### 🔥 Lead Scoring
Every customer is scored on a 0–100 scale based on 15+ factors:

| Tier | Score Range | Action |
|------|-------------|--------|
| 🔥 Hot Lead | 80–100 | Instant auto-reply + owner notification |
| 🟡 Warm Lead | 50–79 | Auto-reply + follow-up after 1 day |
| 🔵 Cold Lead | 20–49 | Auto-reply + follow-up after 3 days |
| ⚪ Non-Lead | 0–19 | Standard auto-reply |

**Scoring factors include:**
- Intent (purchase = +35, spam = -50)
- Sentiment (positive = +10, negative = -10)
- Engagement level (number of messages exchanged)
- Profile data (name, avatar, follower count)

### 🤖 Auto Reply Engine
- Personalized replies aligned with your brand voice
- Powered by your knowledge base (products, FAQs, catalog)
- Multi-language support (Indonesian, English, Malay, Chinese, Japanese)
- Graceful fallback to templates when AI is unavailable
- Quality check before sending any reply

### 🔄 Follow-Up Automation
```
Hot Lead  → +2 hours: "Still interested?"
Warm Lead → +1 day: Social proof / testimonials
Cold Lead → +3 days: Limited-time offer / discount
```
- Maximum of 3 follow-ups per lead
- Respects business hours (no messages at night)
- Supports A/B testing of follow-up content

### 📊 Analytics Dashboard
- Real-time message volume tracking
- Platform-by-platform performance comparison
- Intent distribution breakdown (pie chart)
- Lead distribution by tier (hot/warm/cold)
- Conversion funnel tracking
- AI vs. human handling rate

### 📚 Knowledge Base
- Upload product catalogs (name, price, stock, description, images)
- Manual FAQ entries + auto-generated FAQs from chat history
- Categorized product catalog
- Brand voice settings (tone, greeting style, signature)

---

## 🌐 Supported Platforms

### 💬 Chat Platforms

| Platform | Status | Integration |
|----------|--------|-------------|
| **WhatsApp** | ✅ Ready | WhatsApp Business API |
| **Telegram** | ✅ Ready | Bot API + Webhook |
| **Instagram** | ✅ Ready | Graph API DM |
| **Twitter/X** | 🔜 Planned | API v2 |
| **Facebook** | 🔜 Planned | Messenger API |
| **LINE** | 🔜 Planned | Messaging API |
| **Discord** | 🔜 Planned | Bot API |

### 🛒 E-Commerce Platforms

| Platform | Status | Integration |
|----------|--------|-------------|
| **Shopee** | ✅ Ready | Chat API |
| **Tokopedia** | 🔜 Planned | Chat API |
| **Lazada** | 🔜 Planned | Chat API |
| **TikTok Shop** | 🔜 Planned | Chat API |
| **Bukalapak** | 🔜 Planned | Chat API |

### 🌍 Web & Custom Channels

| Platform | Status | Integration |
|----------|--------|-------------|
| **Website Widget** | 🔜 Planned | Embeddable JavaScript widget |
| **WordPress** | 🔜 Planned | Plugin |
| **Slack** | 🔜 Planned | Bot + App |
| **Email** | 🔜 Planned | IMAP/SMTP |
| **SMS** | 🔜 Planned | Twilio integration |

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATFORM LAYER                            │
│  WhatsApp │ Instagram │ Telegram │ Shopee │ Website │ ...   │
└──────────────────────┬──────────────────────────────────────┘
                       │ Webhooks
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  API GATEWAY (FastAPI)                       │
│  /api/webhooks/* │ /api/auth/* │ /api/messages/* │ ...      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                MESSAGE PROCESSOR                             │
│  Normalize → Context Build → AI Pipeline → DB → Reply       │
└──────────────────────┬──────────────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
   ┌────────────┐ ┌─────────┐ ┌──────────────┐
   │ AI Engine  │ │Database │ │ Notification │
   │            │ │(SQLite) │ │   Service    │
   │ • Intent   │ │         │ │              │
   │ • Sentiment│ │ • Users │ │ • Hot Lead   │
   │ • Lead     │ │ • Msgs  │ │ • Complaint  │
   │ • Reply    │ │ • Leads │ │ • Collab     │
   └────────────┘ └─────────┘ └──────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  FRONTEND       │
              │  React + Vite   │
              │                 │
              │ • Landing Page  │
              │ • Dashboard     │
              │ • Analytics     │
              └─────────────────┘
```

### Data Flow

```
1. Customer sends a message on a platform (WA / IG / TG / Shopee)
2. Platform triggers a webhook to AutoMind
3. Webhook handler normalizes the incoming message
4. MessageProcessor.process_incoming() executes:
   a. Find or create conversation record in the database
   b. Store the incoming message
   c. Retrieve the last 20 messages for context
   d. Load relevant knowledge base entries (products, FAQs)
   e. Load brand voice configuration
   f. Execute the AI pipeline:
      - Intent classification
      - Sentiment analysis
      - Lead scoring
      - Decision engine
      - Reply generation
   g. Save analysis results to the database
   h. Create or update the lead record
   i. Send the reply via the platform connector
   j. Notify the business owner if necessary
5. Frontend displays all data in real time
```

---

## 🧠 AI Pipeline

The AI pipeline is the core intelligence layer of AutoMind. Each incoming message passes through five sequential stages to produce a contextually appropriate, brand-aligned response.

### Stage 1: Intent Classification

```python
Input: "Hey, do you have these shoes in size 42?"
Output: {"intent": "PURCHASE_INQUIRY", "confidence": 0.92}
```

**Methods:**
- **Primary**: OpenAI GPT-4o-mini with structured JSON prompt
- **Fallback**: Rule-based keyword matching (used when the API is unavailable)

### Stage 2: Sentiment Analysis

```python
Input: "This product is terrible, I want a refund!"
Output: {"sentiment": "negative", "score": -0.8, "urgency": 9}
```

**Methods:**
- **Primary**: OpenAI GPT-4o-mini
- **Fallback**: Keyword counting (positive vs. negative word ratio)

### Stage 3: Lead Scoring

```python
Score = base(20) + intent_points + sentiment_points + engagement_points + profile_points

Example:
- PURCHASE_INQUIRY (confidence 0.92) → +32.2
- Positive sentiment → +10
- 5 messages in history → +10
- Has name + avatar → +8
- Total: 80.2 → 🔥 HOT LEAD
```

### Stage 4: Decision Engine

```python
Rules (evaluated in priority order):
1. SPAM               → Block and ignore
2. COMPLAINT + high urgency → Escalate to owner immediately
3. HOT + PURCHASE      → Auto-reply + notify owner
4. HOT (any intent)    → Auto-reply + notify owner
5. COMPLAINT           → Escalate to owner
6. COLLAB_OFFER        → Queue for manual review
7. Default             → Auto-reply with standard response
```

### Stage 5: Reply Generation

```python
Input:
- message: "Hey, do you have these shoes in size 42?"
- intent: PURCHASE_INQUIRY
- knowledge_base: {products: [...], faqs: [...]}
- brand_voice: {tone: "friendly", greeting: "Hi there! 😊"}

Output:
"Yes we do! Size 42 is in stock. Available colors: Black, White, Navy.
 Price: $24.99. Would you like to place an order? 😊"
```

---

## 🛠️ Tech Stack

### Backend

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | FastAPI | 0.115.0 |
| ASGI Server | Uvicorn | 0.30.0 |
| Database ORM | SQLAlchemy + SQLite | 2.0.35 |
| Authentication | python-jose (JWT) | 3.3.0 |
| Password Hashing | passlib + bcrypt | 1.7.4 |
| HTTP Client | httpx | 0.27.0 |
| AI / LLM | OpenAI API | 1.50.0 |
| Scheduler | APScheduler | 3.10.4 |
| Cache Layer | Redis (optional) | 5.1.0 |

### Frontend

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | React | 18.3.1 |
| Bundler | Vite | 5.4.0 |
| Language | TypeScript | 5.5.0 |
| Styling | TailwindCSS | 3.4.6 |
| State Management | Zustand | 4.5.0 |
| Charting | Recharts | 2.12.0 |
| Routing | React Router | 6.26.0 |
| Icons | Lucide React | 0.400.0 |

### Infrastructure

| Component | Technology |
|-----------|-----------|
| VPS | AWS EC2 (Ubuntu) |
| Ports | 8800 (API), 5173 (Frontend) |
| Database | SQLite (development) / PostgreSQL (production) |
| Process Management | uvicorn + systemd |

---

## 📁 Project Structure

```
automind/
├── README.md                          # Main documentation
├── docker-compose.yml                 # Docker setup
├── .gitignore                         # Git ignore rules
│
├── backend/                           # FastAPI Backend
│   ├── main.py                        # Entry point + lifespan events
│   ├── requirements.txt               # Python dependencies
│   ├── deploy.py                      # Production deployment script
│   ├── .env.example                   # Environment variable template
│   │
│   ├── api/                           # API Layer
│   │   ├── routes/                    # Route handlers
│   │   │   ├── auth.py                # Register, login, /me endpoint
│   │   │   ├── messages.py            # Conversations, send messages
│   │   │   ├── leads.py               # Lead CRUD + statistics
│   │   │   ├── platforms.py           # Platform connection management
│   │   │   ├── knowledge.py           # Products + FAQ management
│   │   │   ├── analytics.py           # Overview, statistics
│   │   │   └── webhooks.py            # Platform webhook handlers
│   │   └── middleware/                # Authentication, rate limiting
│   │
│   ├── core/                          # AI Engine
│   │   ├── ai_engine.py               # Main pipeline orchestrator
│   │   ├── intent_classifier.py       # Intent detection (AI + fallback)
│   │   ├── sentiment_analyzer.py      # Sentiment analysis
│   │   ├── lead_scorer.py             # Lead scoring algorithm
│   │   ├── reply_generator.py         # AI reply generation
│   │   └── decision_engine.py         # Action decision logic
│   │
│   ├── platforms/                     # Platform Connectors
│   │   ├── base.py                    # Abstract base class
│   │   ├── whatsapp.py                # WhatsApp Business API connector
│   │   ├── instagram.py               # Instagram Graph API connector
│   │   ├── telegram.py                # Telegram Bot API connector
│   │   ├── shopee.py                  # Shopee Open API connector
│   │   └── registry.py               # Platform connector registry
│   │
│   ├── models/                        # Database Models
│   │   ├── database.py                # Engine + session factory
│   │   ├── user.py                    # User accounts
│   │   ├── message.py                 # Chat messages
│   │   ├── conversation.py            # Conversations
│   │   ├── lead.py                    # Lead tracking
│   │   ├── product.py                 # Product catalog
│   │   └── platform_connection.py     # Platform credentials storage
│   │
│   ├── services/                      # Business Services
│   │   ├── message_processor.py       # Core message processing pipeline
│   │   ├── follow_up_scheduler.py     # Automated follow-up engine
│   │   ├── notification_service.py    # Owner notification dispatcher
│   │   └── message_queue.py           # Message queue handler
│   │
│   └── config/                        # Configuration
│       ├── settings.py                # Pydantic settings management
│       └── prompts.py                 # AI prompt templates
│
├── frontend/                          # React Frontend
│   ├── package.json                   # NPM dependencies
│   ├── vite.config.ts                 # Vite configuration
│   ├── tailwind.config.ts             # TailwindCSS configuration
│   ├── tsconfig.json                  # TypeScript configuration
│   │
│   └── src/
│       ├── main.tsx                   # Application entry point
│       ├── App.tsx                    # Router configuration
│       ├── index.css                  # Global styles
│       │
│       ├── pages/                     # Page Components
│       │   ├── LandingPage.tsx        # Marketing landing page
│       │   ├── LoginPage.tsx          # Login form
│       │   ├── RegisterPage.tsx       # Registration form
│       │   ├── DashboardPage.tsx      # Main dashboard
│       │   └── NotFoundPage.tsx       # 404 error page
│       │
│       ├── components/
│       │   ├── landing/               # Landing page sections
│       │   │   ├── Hero.tsx           # Hero banner + animated demo
│       │   │   ├── PlatformShowcase.tsx # Platform grid display
│       │   │   ├── HowItWorks.tsx     # 4-step interactive explainer
│       │   │   ├── FeatureCards.tsx    # 9 feature highlight cards
│       │   │   ├── LiveDemo.tsx       # Interactive chat simulator
│       │   │   ├── Pricing.tsx        # 3-tier pricing table
│       │   │   ├── Testimonials.tsx   # Customer success stories
│       │   │   └── Footer.tsx         # Footer links
│       │   │
│       │   ├── dashboard/             # Dashboard widgets
│       │   │   ├── Sidebar.tsx        # Navigation sidebar
│       │   │   ├── Overview.tsx       # Stats cards + charts
│       │   │   ├── MessageInbox.tsx   # Unified message inbox
│       │   │   ├── LeadBoard.tsx      # Lead table with filters
│       │   │   ├── AIBrainPanel.tsx   # AI configuration panel
│       │   │   ├── KnowledgeBase.tsx  # Product + FAQ manager
│       │   │   ├── PlatformManager.tsx # Platform connection manager
│       │   │   ├── Analytics.tsx      # Charts + metrics
│       │   │   └── Settings.tsx       # User settings
│       │   │
│       │   └── shared/                # Reusable components
│       │       ├── Navbar.tsx         # Top navigation bar
│       │       ├── Button.tsx         # Button variants
│       │       ├── Card.tsx           # Card container
│       │       ├── Modal.tsx          # Modal dialog
│       │       ├── Chart.tsx          # Recharts wrapper components
│       │       └── ProtectedRoute.tsx # Auth route guard
│       │
│       ├── hooks/                     # Custom React Hooks
│       │   └── useAuth.ts             # Authentication state + API
│       │
│       ├── store/                     # State Management (Zustand)
│       │   ├── authStore.ts           # Auth state re-export
│       │   └── messageStore.ts        # Messages + conversations state
│       │
│       └── utils/                     # Utility Functions
│           ├── api.ts                 # API client configuration
│           └── formatters.ts          # Date, currency, and number formatters
│
└── docs/                              # Supplementary Documentation
    ├── TELEGRAM_SETUP.md              # Telegram bot setup guide
    ├── API.md                         # API documentation
    └── DEPLOYMENT.md                  # Production deployment guide
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Python 3.11+** — Required for the backend
- **Node.js 18+** — Required for the frontend
- **Git** — For cloning the repository
- **(Optional) Redis** — For caching in production
- **(Optional) OpenAI API Key** — For full AI capabilities (falls back to rule-based logic without it)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/andredianata12/automind.git
cd automind

# 2. Set up the backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your API keys and configuration

# 4. Start the backend server
uvicorn main:app --host 0.0.0.0 --port 8800 --reload

# 5. Set up the frontend (in a new terminal)
cd frontend
npm install
npm run dev
```

### Environment Variables

```bash
# backend/.env

# Database
DATABASE_URL=sqlite:///./automind.db

# Redis (optional — leave blank to disable)
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-random-secret-key-here

# OpenAI (optional — falls back to rule-based engine if not set)
OPENAI_API_KEY=sk-your-openai-key

# Platform API Keys (configure only the platforms you intend to use)
TELEGRAM_BOT_TOKEN=
INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=
SHOPEE_PARTNER_ID=
SHOPEE_PARTNER_SECRET=
```

### Docker Setup (Alternative)

```bash
docker-compose up -d
```

This will spin up the following services:
- **Backend** on port 8800
- **Frontend** on port 5173
- **Redis** on port 6379

---

## 📡 API Reference

All API endpoints require JWT authentication unless otherwise noted. Obtain a token via the `/api/auth/login` endpoint.

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user account |
| POST | `/api/auth/login` | Login and receive a JWT access token |
| GET | `/api/auth/me` | Retrieve the current user's profile |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/conversations` | List all conversations |
| GET | `/api/messages/conversations/{id}/messages` | Get messages within a conversation |
| POST | `/api/messages/send` | Send a manual message to a conversation |

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads/` | List all leads (supports `tier` and `platform` filters) |
| GET | `/api/leads/stats` | Get lead statistics (total, hot, warm, cold counts) |
| PATCH | `/api/leads/{id}` | Update a lead's status or notes |

### Platforms

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/platforms/` | List all connected platforms |
| GET | `/api/platforms/supported` | List all supported platform integrations |
| POST | `/api/platforms/connect` | Connect a new platform |
| DELETE | `/api/platforms/{id}` | Disconnect a platform |

### Knowledge Base

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/knowledge/products` | List all products |
| POST | `/api/knowledge/products` | Create a new product |
| PUT | `/api/knowledge/products/{id}` | Update an existing product |
| DELETE | `/api/knowledge/products/{id}` | Soft-delete a product |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/overview?days=7` | Get overview statistics for the given period |
| GET | `/api/analytics/platform-stats?days=30` | Get per-platform performance statistics |
| GET | `/api/analytics/intent-breakdown?days=30` | Get intent distribution data |

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webhooks/telegram` | Telegram incoming message webhook |
| POST | `/api/webhooks/whatsapp` | WhatsApp incoming message webhook |
| POST | `/api/webhooks/instagram` | Instagram incoming message webhook |
| POST | `/api/webhooks/shopee` | Shopee incoming message webhook |
| GET | `/api/webhooks/verify/{platform}` | Verify a platform webhook connection |

### Usage Examples

```bash
# Register a new user
curl -X POST http://localhost:8800/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","username":"user","password":"pass123"}'

# Login and receive a JWT token
curl -X POST http://localhost:8800/api/auth/login \
  -d "username=user&password=pass123"

# Get hot leads (with authentication)
curl http://localhost:8800/api/leads/?tier=hot \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create a new product in the knowledge base
curl -X POST http://localhost:8800/api/knowledge/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Running Shoes Pro","price":12999,"stock":45}'
```

---

## 🚀 Deployment

### AWS EC2 Deployment

```bash
# 1. SSH into your VPS
ssh -i key.pem ubuntu@YOUR_VPS_IP

# 2. Clone the repository
git clone https://github.com/andredianata12/automind.git
cd automind

# 3. Set up the backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 4. Build the frontend
cd ../frontend
npm install
npm run build

# 5. Start the backend (production mode)
cd ../backend
uvicorn main:app --host 0.0.0.0 --port 8800

# 6. Serve the frontend
cd ../frontend
npx vite preview --port 5173 --host 0.0.0.0
```

### Systemd Service (Auto-start on Boot)

```bash
# Copy the service file to systemd
sudo cp automind-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable automind-backend
sudo systemctl start automind-backend

# Check the service status
sudo systemctl status automind-backend
```

### AWS Security Group Configuration

Ensure the following ports are open in your EC2 security group:

- **8800** — Backend API (FastAPI)
- **5173** — Frontend (Vite preview)

---

## 🔌 Platform Configuration

### Telegram Bot

```bash
# 1. Create a new bot via @BotFather on Telegram
#    Open @BotFather → /newbot → follow prompts → copy the bot token

# 2. Register the bot with AutoMind
curl -X POST http://YOUR_IP:8800/api/platforms/connect \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"platform":"telegram","credentials":{"bot_token":"BOT_TOKEN"}}'

# 3. Set the webhook URL
curl -X POST "https://api.telegram.org/botBOT_TOKEN/setWebhook" \
  -d '{"url":"http://YOUR_IP:8800/api/webhooks/telegram"}'

# 4. Test it! Send a message to your bot on Telegram
```

### WhatsApp Business API

```bash
# 1. Register at Meta Business (business.facebook.com)
# 2. Create a WhatsApp Business application
# 3. Obtain your access_token and phone_number_id

# 4. Register the platform with AutoMind
curl -X POST http://YOUR_IP:8800/api/platforms/connect \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "whatsapp",
    "credentials": {
      "access_token": "YOUR_ACCESS_TOKEN",
      "phone_number_id": "YOUR_PHONE_NUMBER_ID"
    }
  }'

# 5. Configure the webhook in the Meta Developer Dashboard
#    Callback URL: http://YOUR_IP:8800/api/webhooks/whatsapp
#    Verify Token: (use the value from settings.SECRET_KEY)
```

### Instagram DM

```bash
# 1. Create a Facebook App at developers.facebook.com
# 2. Add the Instagram Graph API product
# 3. Obtain a Page Access Token

# 4. Register the platform with AutoMind
curl -X POST http://YOUR_IP:8800/api/platforms/connect \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "instagram",
    "credentials": {
      "access_token": "PAGE_ACCESS_TOKEN",
      "page_id": "YOUR_PAGE_ID"
    }
  }'
```

---

## 🖥️ Dashboard & UI

### Landing Page

The marketing landing page is designed to showcase AutoMind's capabilities to potential customers:

- **Hero Section** — Animated chat demo with call-to-action
- **Platform Showcase** — Visual grid of 16 supported platforms
- **How It Works** — 4-step interactive explainer
- **Feature Cards** — 9 key feature highlights with descriptions
- **Live Demo** — Interactive chat simulator with the AI Brain panel
- **Pricing** — 3-tier pricing table (Starter, Growth, Enterprise)
- **Testimonials** — Customer success stories and use cases

### Dashboard Pages

The main dashboard provides a comprehensive management interface:

- **Overview** — Stats cards, pie chart (lead distribution), bar chart (intent breakdown), and quick action buttons
- **Message Inbox** — Unified inbox with real-time chat view and AI analysis sidebar
- **Lead Board** — Filterable lead table with tier and platform filters, plus score badges
- **AI Brain** — Brand voice configuration, AI behavior toggles, and custom instruction settings
- **Knowledge Base** — Product catalog manager and FAQ editor
- **Platform Manager** — Connect/disconnect platforms with status monitoring
- **Analytics** — Interactive charts (pie, bar), platform-level details, and intent breakdown
- **Settings** — User profile, notification preferences, plan management, and API key configuration

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
source venv/bin/activate

# Start the server in the background
uvicorn main:app --port 8800 &

# Test the health endpoint
curl http://localhost:8800/health

# Test user registration
curl -X POST http://localhost:8800/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","username":"test","password":"test123"}'

# Run the pytest test suite (if available)
pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend

# Run TypeScript type checking
npx tsc --noEmit

# Verify production build succeeds
npm run build

# Start the development server
npm run dev
```

### End-to-End Integration Test

```
1. Register a new user account
2. Log in and obtain a JWT token
3. Connect a platform (e.g., Telegram)
4. Send a message to the bot
5. Verify the message appears in the dashboard
6. Verify the AI responds with an appropriate reply
```

---

## 🗺️ Roadmap

### Phase 1 — MVP ✅

- [x] FastAPI backend with SQLite database
- [x] AI Engine (intent classification, sentiment analysis, lead scoring, reply generation)
- [x] Platform connectors (WhatsApp, Instagram, Telegram, Shopee)
- [x] React dashboard with landing page
- [x] Recharts integration for analytics
- [x] JWT authentication system
- [x] Webhook handlers for all platforms

### Phase 2 — Production Ready 🚧

- [ ] Full OpenAI integration testing and optimization
- [ ] WebSocket support for real-time dashboard updates
- [ ] File upload support (product images)
- [ ] Data export functionality (CSV, PDF)
- [ ] Multi-user / team collaboration support
- [ ] Rate limiting middleware
- [ ] Structured request logging

### Phase 3 — Scale 📋

- [ ] PostgreSQL migration for production workloads
- [ ] Redis caching layer
- [ ] Background task queue (Celery)
- [ ] Additional platform connectors (Tokopedia, Lazada, LINE)
- [ ] Embeddable website widget
- [ ] API rate limiting per subscription plan
- [ ] Webhook retry mechanism with exponential backoff

### Phase 4 — Advanced 🎯

- [ ] Custom AI model training per business domain
- [ ] A/B testing framework for reply strategies
- [ ] Voice message transcription and response
- [ ] Image recognition (product detection from photos)
- [ ] Improved multi-language auto-detection
- [ ] White-label solution for agencies
- [ ] Mobile application (React Native)

---

## 🤝 Contributing

Contributions are welcome! We appreciate any help in making AutoMind better.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m "feat: add amazing feature"`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request with a clear description of your changes

### Code Style Guidelines

- **Backend**: Follow PEP 8, use type hints, and write docstrings for all public functions
- **Frontend**: Use ESLint + Prettier, enable TypeScript strict mode
- **Commits**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (`feat:`, `fix:`, `docs:`, `refactor:`, etc.)

---

## 📄 License

This project is licensed under the **MIT License** © 2026.

See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/) — High-performance Python web framework
- [React](https://react.dev/) — Declarative frontend UI library
- [TailwindCSS](https://tailwindcss.com/) — Utility-first CSS framework
- [OpenAI](https://openai.com/) — AI and language model capabilities
- [Recharts](https://recharts.org/) — Composable charting library for React
- [Zustand](https://github.com/pmndrs/zustand) — Lightweight state management

---

<div align="center">

**Made with 🤖 by the AutoMind Team**

[GitHub](https://github.com/andredianata12/automind) · [API Docs](http://54.156.126.227:8800/docs) · [Live Demo](http://54.156.126.227:5173)

</div>
