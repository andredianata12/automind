# 🤖 Telegram Bot Setup Guide

## Step 1: Create Bot via @BotFather

1. Buka Telegram, search **@BotFather**
2. Kirim pesan: `/newbot`
3. BotFather akan minta:
   - **Bot name**: Nama display bot (contoh: "AutoMind Assistant")
   - **Bot username**: Username unik, harus ending `bot` (contoh: "automind_shop_bot")
4. Setelah selesai, kamu dapat **Bot Token** format:
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

## Step 2: Register Bot di AutoMind

Setelah dapat token, register bot ke AutoMind:

```bash
curl -X POST http://54.156.126.227:8800/api/platforms/connect \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "telegram",
    "credentials": {
      "bot_token": "YOUR_BOT_TOKEN"
    }
  }'
```

## Step 3: Set Webhook

Setelah bot terdaftar, set webhook agar Telegram kirim pesan ke AutoMind:

```bash
curl -X POST "https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "http://54.156.126.227:8800/api/webhooks/telegram"
  }'
```

## Step 4: Test!

Kirim pesan ke bot kamu di Telegram. AutoMind akan:
1. Terima pesan via webhook
2. Analisis intent & sentiment
3. Score lead
4. Auto-reply sesuai brand voice

## Troubleshooting

- **Bot tidak reply**: Cek logs di `/tmp/automind-backend.log`
- **Webhook error**: Pastikan port 8800 terbuka di AWS Security Group
- **Token invalid**: Generate baru di @BotFather dengan `/token`
