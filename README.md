# 🤖 AutoMind — AI Multi-Platform DM & Chat Assistant

> **Automasi 90% chat bisnis Anda di 15+ platform dalam satu dashboard.**

AutoMind adalah AI-powered communication hub yang mengubah cara bisnis kecil-menengah menghandle pesan masuk di WhatsApp, Instagram, Telegram, Shopee, dan 11+ platform lainnya. Bukan sekedar auto-reply biasa — AutoMind **membaca konteks, mendeteksi intent, dan mengambil keputusan otomatis** seperti sales assistant profesional yang bekerja 24/7.

---

## 📑 Daftar Isi

- [Kenapa AutoMind?](#-kenapa-automind)
- [Fitur Utama](#-fitur-utama)
- [Platform yang Didukung](#-platform-yang-didukung)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [AI Pipeline](#-ai-pipeline)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Instalasi & Setup](#-instalasi--setup)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Konfigurasi Platform](#-konfigurasi-platform)
- [Dashboard & UI](#-dashboard--ui)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Kenapa AutoMind?

### Problem yang Diselesaikan

Bisnis kecil-menengah menghadapi masalah besar dalam mengelola komunikasi dengan pelanggan:

| Problem | Dampak |
|---------|--------|
| **Chat masuk menumpuk** | 50-200 DM/hari, 80% pertanyaan berulang |
| **Response time lambat** | > 1 jam = 60% lead hilang |
| **Tidak bisa bedain intent** | Mana yang mau beli vs tanya doang vs spam |
| **Manual follow-up terlupakan** | Closing gagal karena tidak ada tindak lanjut |
| **Multi-platform kacau** | WA, IG, Shopee, Telegram — semuanya terpisah |

### Solusi AutoMind

```
Tanpa AutoMind:
Customer DM → Owner baca manual → Balas (1-4 jam) → Customer udah pergi 😢

Dengan AutoMind:
Customer DM → AI baca konteks → Deteksi intent → Auto-reply (0.8 detik) → Lead tersimpan → Follow-up otomatis 🎉
```

### Hasil yang Diharapkan

- 📉 **Response time**: dari 47 menit → 0.8 detik
- 📈 **Conversion rate**: naik 25-35% karena tidak ada lead yang terlewat
- ⏰ **Time saved**: 4+ jam/hari yang bisa dipakai untuk hal lain
- 💰 **Cost efficient**: 10x lebih murah dari hire tim CS

---

## ✨ Fitur Utama

### 🎯 Intent Detection
AI membaca konteks dan memahami tujuan customer:
- `PURCHASE_INQUIRY` — Mau beli sesuatu
- `PRICE_CHECK` — Tanya harga
- `COMPLAINT` — Komplain atau masalah
- `GENERAL_QUESTION` — Pertanyaan umum
- `COLLAB_OFFER` — Tawaran kerjasama
- `GREETING` — Sapaan biasa
- `SPAM` — Spam atau pesan tidak relevan

### 🔥 Lead Scoring
Setiap customer di-score 0-100 berdasarkan 15+ faktor:

| Tier | Score | Aksi |
|------|-------|------|
| 🔥 Hot Lead | 80-100 | Auto-reply + notifikasi owner |
| 🟡 Warm Lead | 50-79 | Auto-reply + follow-up 1 hari |
| 🔵 Cold Lead | 20-49 | Auto-reply + follow-up 3 hari |
| ⚪ Non-Lead | 0-19 | Auto-reply standar |

Faktor yang mempengaruhi score:
- Intent (purchase = +35, spam = -50)
- Sentiment (positive = +10, negative = -10)
- Engagement (jumlah pesan)
- Profile data (nama, avatar, followers)

### 🤖 Auto Reply Engine
- Personalized reply sesuai brand voice
- Menggunakan knowledge base (produk, FAQ, katalog)
- Support multi-bahasa (ID, EN, MY, ZH, JA)
- Fallback ke template jika AI tidak tersedia
- Quality check sebelum mengirim

### 🔄 Follow-Up Automation
```
Hot Lead  → +2 jam: "Masih tertarik?"
Warm Lead → +1 hari: Social proof / testimoni
Cold Lead → +3 hari: Limited offer / discount
```
- Maksimal 3 follow-up per lead
- Respect business hours
- A/B test content

### 📊 Analytics Dashboard
- Real-time message volume
- Platform performance comparison
- Intent breakdown (pie chart)
- Lead distribution (hot/warm/cold)
- Conversion tracking
- AI vs Human handle rate

### 📚 Knowledge Base
- Upload produk (nama, harga, stok, deskripsi, gambar)
- FAQ manual + auto-generate dari chat history
- Katalog dengan kategori
- Brand voice settings (tone, greeting, signature)

---

## 🌐 Platform yang Didukung

### 💬 Chat Platforms
| Platform | Status | Fitur |
|----------|--------|-------|
| **WhatsApp** | ✅ Ready | WhatsApp Business API |
| **Telegram** | ✅ Ready | Bot API + webhook |
| **Instagram** | ✅ Ready | Graph API DM |
| **Twitter/X** | 🔜 Planned | API v2 |
| **Facebook** | 🔜 Planned | Messenger API |
| **LINE** | 🔜 Planned | Messaging API |
| **Discord** | 🔜 Planned | Bot API |

### 🛒 E-Commerce Platforms
| Platform | Status | Fitur |
|----------|--------|-------|
| **Shopee** | ✅ Ready | Chat API |
| **Tokopedia** | 🔜 Planned | Chat API |
| **Lazada** | 🔜 Planned | Chat API |
| **TikTok Shop** | 🔜 Planned | Chat API |
| **Bukalapak** | 🔜 Planned | Chat API |

### 🌍 Web & Custom
| Platform | Status | Fitur |
|----------|--------|-------|
| **Website Widget** | 🔜 Planned | Embeddable JS widget |
| **WordPress** | 🔜 Planned | Plugin |
| **Slack** | 🔜 Planned | Bot + App |
| **Email** | 🔜 Planned | IMAP/SMTP |
| **SMS** | 🔜 Planned | Twilio integration |

---

## 🏗️ Arsitektur Sistem

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
1. Customer kirim pesan di platform (WA/IG/TG/Shopee)
2. Platform trigger webhook ke AutoMind
3. Webhook handler normalisasi pesan
4. MessageProcessor.process_incoming() dijalankan:
   a. Find/create conversation di database
   b. Simpan pesan masuk
   c. Ambil history 20 pesan terakhir
   d. Load knowledge base (produk, FAQ)
   e. Load brand voice settings
   f. Jalankan AI pipeline:
      - Intent classification
      - Sentiment analysis
      - Lead scoring
      - Decision engine
      - Reply generation
   g. Simpan hasil analisis ke database
   h. Create/update lead
   i. Kirim reply via platform connector
   j. Notifikasi owner jika perlu
5. Frontend menampilkan data real-time
```

---

## 🧠 AI Pipeline

### Stage 1: Intent Classification

```python
Input: "Kak, sepatu size 42 ada?"
Output: {"intent": "PURCHASE_INQUIRY", "confidence": 0.92}
```

Metode:
- **Primary**: OpenAI GPT-4o-mini dengan structured prompt
- **Fallback**: Rule-based keyword matching (jika API tidak tersedia)

### Stage 2: Sentiment Analysis

```python
Input: "Produknya jelek banget, mau refund!"
Output: {"sentiment": "negative", "score": -0.8, "urgency": 9}
```

Metode:
- **Primary**: OpenAI GPT-4o-mini
- **Fallback**: Keyword counting (positive vs negative words)

### Stage 3: Lead Scoring

```python
Score = base(20) + intent_points + sentiment_points + engagement_points + profile_points

Contoh:
- PURCHASE_INQUIRY (confidence 0.92) → +32.2
- Positive sentiment → +10
- 5 messages history → +10
- Has name + avatar → +8
- Total: 80.2 → 🔥 HOT LEAD
```

### Stage 4: Decision Engine

```python
Rules (priority order):
1. SPAM → block
2. COMPLAINT + high urgency → escalate
3. HOT + PURCHASE → auto-reply + notify
4. HOT (any) → auto-reply + notify
5. COMPLAINT → escalate
6. COLLAB → queue for review
7. Default → auto-reply
```

### Stage 5: Reply Generation

```python
Input:
- message: "Kak, sepatu size 42 ada?"
- intent: PURCHASE_INQUIRY
- knowledge_base: {products: [...], faqs: [...]}
- brand_voice: {tone: "friendly", greeting: "Halo kak! 😊"}

Output:
"Ada kak! Size 42 ready stock. Warna: Hitam, Putih, Navy. 
 Harga Rp 349.000. Mau langsung order? 😊"
```

---

## 🛠️ Tech Stack

### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | FastAPI | 0.115.0 |
| Server | Uvicorn | 0.30.0 |
| Database | SQLAlchemy + SQLite | 2.0.35 |
| Auth | python-jose (JWT) | 3.3.0 |
| Password | passlib + bcrypt | 1.7.4 |
| HTTP Client | httpx | 0.27.0 |
| AI | OpenAI API | 1.50.0 |
| Scheduler | APScheduler | 3.10.4 |
| Cache | Redis (optional) | 5.1.0 |

### Frontend
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | React | 18.3.1 |
| Bundler | Vite | 5.4.0 |
| Language | TypeScript | 5.5.0 |
| Styling | TailwindCSS | 3.4.6 |
| State | Zustand | 4.5.0 |
| Charts | Recharts | 2.12.0 |
| Router | React Router | 6.26.0 |
| Icons | Lucide React | 0.400.0 |

### Infrastructure
| Component | Technology |
|-----------|-----------|
| VPS | AWS EC2 (Ubuntu) |
| Ports | 8800 (API), 5173 (Frontend) |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Process | uvicorn + systemd |

---

## 📁 Project Structure

```
automind/
├── README.md                          # Dokumentasi utama
├── docker-compose.yml                 # Docker setup
├── .gitignore                         # Git ignore rules
│
├── backend/                           # FastAPI Backend
│   ├── main.py                        # Entry point + lifespan
│   ├── requirements.txt               # Python dependencies
│   ├── deploy.py                      # Production deploy script
│   ├── .env.example                   # Environment template
│   │
│   ├── api/                           # API Layer
│   │   ├── routes/                    # Route handlers
│   │   │   ├── auth.py                # Register, login, /me
│   │   │   ├── messages.py            # Conversations, send
│   │   │   ├── leads.py               # Lead CRUD + stats
│   │   │   ├── platforms.py           # Platform connections
│   │   │   ├── knowledge.py           # Products + FAQ
│   │   │   ├── analytics.py           # Overview, stats
│   │   │   └── webhooks.py            # Platform webhooks
│   │   └── middleware/                # Auth, rate limit
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
│   │   ├── whatsapp.py                # WhatsApp Business API
│   │   ├── instagram.py               # Instagram Graph API
│   │   ├── telegram.py                # Telegram Bot API
│   │   ├── shopee.py                  # Shopee Open API
│   │   └── registry.py               # Platform registry
│   │
│   ├── models/                        # Database Models
│   │   ├── database.py                # Engine + session
│   │   ├── user.py                    # User accounts
│   │   ├── message.py                 # Chat messages
│   │   ├── conversation.py            # Conversations
│   │   ├── lead.py                    # Lead tracking
│   │   ├── product.py                 # Product catalog
│   │   └── platform_connection.py     # Platform credentials
│   │
│   ├── services/                      # Business Services
│   │   ├── message_processor.py       # Core message pipeline
│   │   ├── follow_up_scheduler.py     # Auto follow-up
│   │   ├── notification_service.py    # Owner notifications
│   │   └── message_queue.py           # Message queue
│   │
│   └── config/                        # Configuration
│       ├── settings.py                # Pydantic settings
│       └── prompts.py                 # AI prompts
│
├── frontend/                          # React Frontend
│   ├── package.json                   # NPM dependencies
│   ├── vite.config.ts                 # Vite configuration
│   ├── tailwind.config.ts             # TailwindCSS config
│   ├── tsconfig.json                  # TypeScript config
│   │
│   └── src/
│       ├── main.tsx                   # Entry point
│       ├── App.tsx                    # Router setup
│       ├── index.css                  # Global styles
│       │
│       ├── pages/                     # Page Components
│       │   ├── LandingPage.tsx        # Marketing page
│       │   ├── LoginPage.tsx          # Login form
│       │   ├── RegisterPage.tsx       # Register form
│       │   ├── DashboardPage.tsx      # Main dashboard
│       │   └── NotFoundPage.tsx       # 404 page
│       │
│       ├── components/
│       │   ├── landing/               # Landing page sections
│       │   │   ├── Hero.tsx           # Hero + animated demo
│       │   │   ├── PlatformShowcase.tsx # Platform grid
│       │   │   ├── HowItWorks.tsx     # 4-step interactive
│       │   │   ├── FeatureCards.tsx    # 9 feature cards
│       │   │   ├── LiveDemo.tsx       # Interactive chat demo
│       │   │   ├── Pricing.tsx        # 3-tier pricing
│       │   │   ├── Testimonials.tsx   # Customer stories
│       │   │   └── Footer.tsx         # Footer links
│       │   │
│       │   ├── dashboard/             # Dashboard widgets
│       │   │   ├── Sidebar.tsx        # Navigation sidebar
│       │   │   ├── Overview.tsx       # Stats + charts
│       │   │   ├── MessageInbox.tsx   # Unified inbox
│       │   │   ├── LeadBoard.tsx      # Lead table + filters
│       │   │   ├── AIBrainPanel.tsx   # AI configuration
│       │   │   ├── KnowledgeBase.tsx  # Products + FAQ
│       │   │   ├── PlatformManager.tsx # Platform connections
│       │   │   ├── Analytics.tsx      # Charts + metrics
│       │   │   └── Settings.tsx       # User settings
│       │   │
│       │   └── shared/                # Reusable components
│       │       ├── Navbar.tsx         # Top navigation
│       │       ├── Button.tsx         # Button variants
│       │       ├── Card.tsx           # Card container
│       │       ├── Modal.tsx          # Modal dialog
│       │       ├── Chart.tsx          # Recharts wrappers
│       │       └── ProtectedRoute.tsx # Auth guard
│       │
│       ├── hooks/                     # React Hooks
│       │   └── useAuth.ts             # Auth state + API
│       │
│       ├── store/                     # State Management
│       │   ├── authStore.ts           # Auth re-export
│       │   └── messageStore.ts        # Messages + conversations
│       │
│       └── utils/                     # Utilities
│           ├── api.ts                 # API client
│           └── formatters.ts          # Date, currency formatters
│
└── docs/                              # Documentation
    ├── TELEGRAM_SETUP.md              # Telegram bot guide
    ├── API.md                         # API documentation
    └── DEPLOYMENT.md                  # Deployment guide
```

---

## 🚀 Instalasi & Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- Git
- (Optional) Redis
- (Optional) OpenAI API key

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/andredianata12/automind.git
cd automind

# 2. Setup Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env
# Edit .env dengan API keys kamu

# 4. Start Backend
uvicorn main:app --host 0.0.0.0 --port 8800 --reload

# 5. Setup Frontend (di terminal baru)
cd frontend
npm install
npm run dev
```

### Environment Variables

```bash
# backend/.env
DATABASE_URL=sqlite:///./automind.db
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-random-secret-key-here
OPENAI_API_KEY=sk-your-openai-key

# Platform API Keys (set sesuai platform yang mau dihubungkan)
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

Ini akan menjalankan:
- Backend di port 8800
- Frontend di port 5173
- Redis di port 6379

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user baru |
| POST | `/api/auth/login` | Login, dapat JWT token |
| GET | `/api/auth/me` | Get current user profile |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/conversations` | List semua conversations |
| GET | `/api/messages/conversations/{id}/messages` | Get messages dalam conversation |
| POST | `/api/messages/send` | Kirim manual message |

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads/` | List semua leads (filter: tier, platform) |
| GET | `/api/leads/stats` | Lead statistics (total, hot, warm, cold) |
| PATCH | `/api/leads/{id}` | Update lead status/notes |

### Platforms

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/platforms/` | List connected platforms |
| GET | `/api/platforms/supported` | List supported platforms |
| POST | `/api/platforms/connect` | Connect platform baru |
| DELETE | `/api/platforms/{id}` | Disconnect platform |

### Knowledge Base

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/knowledge/products` | List products |
| POST | `/api/knowledge/products` | Create product |
| PUT | `/api/knowledge/products/{id}` | Update product |
| DELETE | `/api/knowledge/products/{id}` | Delete product (soft) |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/overview?days=7` | Overview stats |
| GET | `/api/analytics/platform-stats?days=30` | Per-platform stats |
| GET | `/api/analytics/intent-breakdown?days=30` | Intent distribution |

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webhooks/telegram` | Telegram webhook |
| POST | `/api/webhooks/whatsapp` | WhatsApp webhook |
| POST | `/api/webhooks/instagram` | Instagram webhook |
| POST | `/api/webhooks/shopee` | Shopee webhook |
| GET | `/api/webhooks/verify/{platform}` | Verify webhook |

### Contoh Penggunaan

```bash
# Register
curl -X POST http://localhost:8800/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","username":"user","password":"pass123"}'

# Login
curl -X POST http://localhost:8800/api/auth/login \
  -d "username=user&password=pass123"

# Get leads (with token)
curl http://localhost:8800/api/leads/?tier=hot \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create product
curl -X POST http://localhost:8800/api/knowledge/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Sepatu Pro","price":349000,"stock":45}'
```

---

## 🚀 Deployment

### AWS EC2 Deployment

```bash
# 1. SSH ke VPS
ssh -i key.pem ubuntu@YOUR_VPS_IP

# 2. Clone repo
git clone https://github.com/andredianata12/automind.git
cd automind

# 3. Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 4. Setup frontend
cd ../frontend
npm install
npm run build

# 5. Start backend (production)
cd ../backend
uvicorn main:app --host 0.0.0.0 --port 8800

# 6. Start frontend preview
cd ../frontend
npx vite preview --port 5173 --host 0.0.0.0
```

### Systemd Service (Auto-start)

```bash
# Copy service file
sudo cp automind-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable automind-backend
sudo systemctl start automind-backend

# Check status
sudo systemctl status automind-backend
```

### AWS Security Group

Pastikan port berikut terbuka:
- **8800** — Backend API
- **5173** — Frontend

---

## 🔌 Konfigurasi Platform

### Telegram Bot

```bash
# 1. Buat bot di @BotFather
#    Chat @BotFather → /newbot → dapat token

# 2. Register ke AutoMind
curl -X POST http://YOUR_IP:8800/api/platforms/connect \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"platform":"telegram","credentials":{"bot_token":"BOT_TOKEN"}}'

# 3. Set webhook
curl -X POST "https://api.telegram.org/botBOT_TOKEN/setWebhook" \
  -d '{"url":"http://YOUR_IP:8800/api/webhooks/telegram"}'

# 4. Test! Kirim pesan ke bot di Telegram
```

### WhatsApp Business API

```bash
# 1. Daftar di Meta Business
# 2. Buat WhatsApp Business App
# 3. Dapatkan access_token dan phone_number_id

# 4. Register ke AutoMind
curl -X POST http://YOUR_IP:8800/api/platforms/connect \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "whatsapp",
    "credentials": {
      "access_token": "YOUR_ACCESS_TOKEN",
      "phone_number_id": "YOUR_PHONE_ID"
    }
  }'

# 5. Set webhook di Meta Dashboard
#    Callback URL: http://YOUR_IP:8800/api/webhooks/whatsapp
#    Verify Token: (dari settings.SECRET_KEY)
```

### Instagram DM

```bash
# 1. Buat Facebook App di developers.facebook.com
# 2. Tambahkan Instagram Graph API
# 3. Dapatkan page access token

curl -X POST http://YOUR_IP:8800/api/platforms/connect \
  -H "Authorization: Bearer YOUR_TOKEN" \
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

- **Hero** — Animated chat demo + CTA
- **Platform Showcase** — 16 platform cards
- **How It Works** — 4-step interactive explorer
- **Feature Cards** — 9 fitur utama
- **Live Demo** — Interactive chat simulator dengan AI Brain panel
- **Pricing** — 3 tier (Starter, Growth, Enterprise)
- **Testimonials** — Customer stories

### Dashboard Pages

- **Overview** — Stats cards + Pie chart (leads) + Bar chart (intents) + Quick Actions
- **Message Inbox** — Unified inbox dengan real-time chat, AI analysis panel
- **Lead Board** — Lead table dengan filter (tier, platform), score badges
- **AI Brain** — Brand voice settings, AI behavior toggles, custom instructions
- **Knowledge Base** — Product manager, FAQ manager
- **Platform Manager** — Connect/disconnect platforms, status monitoring
- **Analytics** — Charts (Pie, Bar), platform details, intent breakdown
- **Settings** — Profile, notifications, plan, API keys

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
source venv/bin/activate

# Start server
uvicorn main:app --port 8800 &

# Test endpoints
curl http://localhost:8800/health
curl -X POST http://localhost:8800/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","username":"test","password":"test123"}'

# Run pytest (jika tersedia)
pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend

# TypeScript check
npx tsc --noEmit

# Build check
npm run build

# Dev server
npm run dev
```

### Integration Test

```bash
# 1. Register user
# 2. Login, dapat token
# 3. Connect platform (misal Telegram)
# 4. Kirim pesan ke bot
# 5. Cek di dashboard apakah pesan masuk
# 6. Cek apakah AI membalas
```

---

## 🗺️ Roadmap

### Phase 1 — MVP ✅
- [x] FastAPI backend + SQLite
- [x] AI Engine (intent, sentiment, lead scoring, reply)
- [x] Platform connectors (WA, IG, TG, Shopee)
- [x] React dashboard + landing page
- [x] Recharts integration
- [x] Auth system (JWT)
- [x] Webhook handlers

### Phase 2 — Production Ready 🚧
- [ ] Real OpenAI integration testing
- [ ] WebSocket untuk real-time updates
- [ ] File upload (gambar produk)
- [ ] Export data (CSV, PDF)
- [ ] Multi-user / team support
- [ ] Rate limiting middleware
- [ ] Request logging

### Phase 3 — Scale 📋
- [ ] PostgreSQL migration
- [ ] Redis caching
- [ ] Background task queue (Celery)
- [ ] More platform connectors (Tokopedia, Lazada, LINE)
- [ ] Website embeddable widget
- [ ] API rate limiting per plan
- [ ] Webhook retry mechanism

### Phase 4 — Advanced 🎯
- [ ] Custom AI training per business
- [ ] A/B testing reply strategies
- [ ] Voice message support
- [ ] Image recognition (product detection)
- [ ] Multi-language auto-detect improvement
- [ ] White-label solution
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions welcome! Cara kontribusi:

1. Fork repository
2. Buat feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "feat: add amazing feature"`
4. Push ke branch: `git push origin feature/amazing-feature`
5. Buat Pull Request

### Code Style

- **Backend**: PEP 8, type hints, docstrings
- **Frontend**: ESLint + Prettier, TypeScript strict
- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`, etc.)

---

## 📄 License

MIT License © 2026

---

## 🙏 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/) — Backend framework
- [React](https://react.dev/) — Frontend framework
- [TailwindCSS](https://tailwindcss.com/) — Styling
- [OpenAI](https://openai.com/) — AI capabilities
- [Recharts](https://recharts.org/) — Charts
- [Zustand](https://github.com/pmndrs/zustand) — State management

---

<div align="center">

**Made with 🤖 by AutoMind Team**

[GitHub](https://github.com/andredianata12/automind) · [API Docs](http://54.156.126.227:8800/docs) · [Live Demo](http://54.156.126.227:5173)

</div>
