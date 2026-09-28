# Aries HealthCare — Nginx Gateway Configuration

This directory contains the production Nginx reverse proxy configuration for the Aries HealthCare Eco-System.

---

## Architecture
- **`api.ariesxpert.com`**: Terminates SSL and forwards REST API traffic to `ariesxpert-backend` (port 5001), with WebSocket upgrade support on `/socket.io/`.
- **`ariesxpert.com`**: Terminates SSL and forwards traffic to the production `AriesXpert-Admin-Dashboard` (Next.js server), with optimized caching headers for `/_next/static/` bundles.

## Deployment
On Hostinger VPS or Debian/Ubuntu hosts:
```bash
sudo cp infrastructure/nginx/ariesxpert.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/ariesxpert.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```
