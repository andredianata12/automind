# AutoMind Production Deployment

AutoMind can run as one FastAPI production server on port `8800`. The backend serves API routes and, when `frontend/dist` exists, also serves the React SPA.

## Build

```bash
cd /home/ubuntu/automind/frontend
npm ci
npm run build

cd /home/ubuntu/automind/backend
python -m py_compile main.py deploy.py
```

## Systemd

```bash
sudo cp /home/ubuntu/automind/automind-backend.service /etc/systemd/system/automind-backend.service
sudo systemctl daemon-reload
sudo systemctl enable --now automind-backend.service
sudo systemctl status automind-backend.service
```

Health check:

```bash
curl http://127.0.0.1:8800/health
```

## URLs

- Frontend: `http://SERVER_IP:8800/`
- API docs: `http://SERVER_IP:8800/docs`
- Health: `http://SERVER_IP:8800/health`

## Notes

- `DATABASE_URL` defaults to `sqlite:///./automind.db` relative to `/home/ubuntu/automind/backend`.
- `CORS_ORIGINS` is comma-separated.
- Telegram production webhooks should use HTTPS through a domain/reverse proxy.
