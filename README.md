# 🤖 AutoMind — AI Multi-Platform DM & Chat Assistant

> Automasi 90% chat bisnis Anda di 15+ platform dalam satu dashboard.

## 🌐 Supported Platforms

| Category | Platforms |
|----------|-----------|
| 💬 Chat | WhatsApp, Telegram, Instagram DM, Twitter/X, Facebook Messenger, LINE, Discord |
| 🛒 E-Commerce | Shopee, Tokopedia, Lazada, Bukalapak, TikTok Shop |
| 🌍 Web & Custom | Website Widget, WordPress Plugin, Custom API, Slack, Email, SMS |

## ⚡ Key Features

- **🎯 Intent Detection** — Baca konteks & pahami tujuan user
- **🔥 Lead Scoring** — Skor 0-100 berdasarkan 15+ faktor
- **🤖 Auto Reply Engine** — Personalized reply sesuai brand voice
- **📊 Analytics Dashboard** — Real-time metrics & conversion tracking
- **🔄 Follow-Up Automation** — Otomatis follow-up terjadwal
- **📚 Knowledge Base** — Upload produk, FAQ, katalog
- **🌐 Multi-Language** — ID, EN, MY, ZH, JA + auto-detect
- **🎓 AI Learning** — Belajar dari owner feedback

## 🏗️ Tech Stack

- **Backend:** FastAPI + Python 3.11+
- **Frontend:** React + Vite + TypeScript + TailwindCSS
- **AI:** OpenAI/Claude API + custom prompt engineering
- **Queue:** Redis (message queue + caching)
- **DB:** SQLite (dev) / PostgreSQL (prod)
- **Infra:** Docker + AWS EC2

## 🚀 Quick Start

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8800

# Frontend
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
automind/
├── backend/          # FastAPI API + AI Engine
├── frontend/         # React + Vite Dashboard & Landing
└── docs/             # Documentation
```

## 📄 License

MIT License © 2026
