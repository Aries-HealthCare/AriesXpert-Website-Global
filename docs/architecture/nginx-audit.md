# Aries HealthCare Eco-System — Nginx Reverse Proxy Architecture & Security Audit

**Audit Date:** 2026-09-28  
**Audited File:** `infrastructure/nginx/ariesxpert.conf`  
**Target Environments:** Hostinger VPS Gateway (`157.173.218.56`), Production Gateways (`api.ariesxpert.com`, `ariesxpert.com`)  
**Status:** AUDITED — FUNCTIONAL WITH HIGH-PRIORITY SECURITY RECOMMENDATIONS

---

## 1. Executive Summary

The Nginx configuration file in `infrastructure/nginx/ariesxpert.conf` defines a reverse proxy topology for routing incoming internet traffic to `ariesxpert-backend` (port `5001`), `AriesXpert-Admin-Dashboard` (port `3000`), and defines an upstream for `OmniRoute` (port `20128`).

This audit evaluated TLS security, WebSocket resilience, timeouts, body sizes, rate limiting, and trusted proxy headers against the production reality of `ariesxpert.com` and `api.ariesxpert.com`.

---

## 2. Technical Evaluation Matrix

| Category | Implementation in `ariesxpert.conf` | Evaluation & Production Comparison | Risk Level |
| :--- | :--- | :--- | :--- |
| **TLS & Protocols** | `ssl_protocols TLSv1.2 TLSv1.3;`<br>`ssl_ciphers HIGH:!aNULL:!MD5;` | Modern and secure. Enforces TLS 1.2/1.3. Disables weak legacy ciphers (SSLv3, TLS 1.0/1.1). | **LOW** |
| **HTTP to HTTPS Redirect** | Port 80 returns `301 https://$host$request_uri;` | Standard 301 permanent redirect. Correctly preserves request parameters and paths. | **LOW** |
| **Upstream Pools** | `aries_backend_upstream` (5001), `aries_dashboard_upstream` (3000), `aries_omniroute_upstream` (20128) with `keepalive 32` | Proper connection reuse via keepalive. Prevents TCP socket exhaustion under load. | **LOW** |
| **WebSocket Support** | Dedicated `location /socket.io/` block with `Upgrade` and `Connection "upgrade"` | Essential for telehealth signaling, appointment sync, and live chat. `proxy_read_timeout 86400s` (24h) prevents premature socket drops. | **LOW** |
| **Body Size Limits** | `client_max_body_size 50M;` (API)<br>`client_max_body_size 25M;` (Dashboard) | Sufficient for clinical imaging, prescription PDFs, and avatar uploads. | **LOW** |
| **Static Caching** | `location /_next/static/` with `max-age=31536000, immutable` | Best-practice caching for content-hashed Next.js assets. Offloads CPU from Node.js runtime. | **LOW** |
| **Rate Limiting** | **NOT CONFIGURED** | Missing `limit_req_zone`. Vulnerable to brute force on `/api/v1/auth/login` and DoS on lead ingestion endpoints. | **HIGH** |
| **Dormant Upstream** | `upstream aries_omniroute_upstream` defined on `127.0.0.1:20128` | Upstream is defined but **no server or location block routes to it**! External clients cannot access OmniRoute via Nginx. | **MEDIUM** |
| **Regional Websites** | Not included in Nginx config | Regional domains (`in.ariesxpert.com`, `ca.ariesxpert.com`, `uk.ariesxpert.com`) are not defined; Hostinger or DNS directs them separately. | **MEDIUM** |
| **Trusted Proxy / Real IP** | Passes `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto` | Properly configured. Backend `express` must enable `app.set('trust proxy', 1)` to prevent rate limit bypasses. | **LOW** |
| **Security Headers** | `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy` | Solid baseline headers. HSTS (`Strict-Transport-Security`) should be added once TLS is permanently validated. | **MEDIUM** |
| **CORS Interaction** | Proxied without rewriting `Access-Control-*` | Correct: Express backend (`src/index.ts`) handles dynamic CORS origins based on `CORS_ORIGIN` env var. | **LOW** |

---

## 3. High-Priority Recommendations for Production

### Recommendation 1: Implement Rate Limiting Zones
To prevent brute-force attacks on healthcare authentication and lead ingestion pipelines, configure rate limiting zones in Nginx `http` block:

```nginx
# Rate limiting for auth and public APIs
limit_req_zone $binary_remote_addr zone=auth_limit:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=api_general:10m rate=30r/s;

# Inside api.ariesxpert.com server block:
location /api/v1/auth/ {
    limit_req zone=auth_limit burst=5 nodelay;
    proxy_pass http://aries_backend_upstream;
}

location / {
    limit_req zone=api_general burst=50 nodelay;
    proxy_pass http://aries_backend_upstream;
}
```

### Recommendation 2: Expose OmniRoute AI Gateway via Dedicated Path or Subdomain
Currently, `aries_omniroute_upstream` is declared but unrouted. Route it either via a protected path or dedicated subdomain:

```nginx
# Option A: Path-based routing with internal auth
location /ai/v1/ {
    rewrite ^/ai/v1/(.*)$ /v1/$1 break;
    proxy_pass http://aries_omniroute_upstream;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}

# Option B: Subdomain routing (ai.ariesxpert.com)
server {
    listen 443 ssl http2;
    server_name ai.ariesxpert.com;
    # ... ssl config ...
    location / {
        proxy_pass http://aries_omniroute_upstream;
    }
}
```

### Recommendation 3: Add HTTP Strict Transport Security (HSTS)
To guarantee browsers never downgrade to unencrypted HTTP, append:
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```
