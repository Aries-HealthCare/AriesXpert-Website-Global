# Aries HealthCare Eco-System — Environment Variable Matrix

**Audit Date:** 2026-09-28  
**Scope:** Complete Environment Security & Configuration Audit Across All Services  
**Compliance Rule:** NO REAL SECRET VALUES PRINTED (VARIABLE NAMES ONLY)

---

## 1. Master Environment Variable Matrix

| Service | Variable Name | Required? | Secret? | Public? | Development Value Pattern | Production Source | Currently Defined in Dev Template? | Risk Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Backend** | `NODE_ENV` | **YES** | No | No | `development` | Hostinger PM2 env | **YES** (`core.env.example`) | Low |
| **Backend** | `PORT` | **YES** | No | No | `5001` | Hostinger PM2 env | **YES** (`core.env.example`) | Low |
| **Backend** | `MONGODB_URI` | **YES** | **YES** | No | `mongodb://.../dev` | MongoDB Atlas Vault | **YES** (placeholder) | **CRITICAL** (Data Access) |
| **Backend** | `DATABASE_URL` | No | **YES** | No | `postgresql://...` | Hostinger Postgres | No (Legacy) | Medium |
| **Backend** | `REDIS_HOST` | **YES** | No | No | `redis` / `localhost` | Hostinger Localhost | **YES** | Low |
| **Backend** | `REDIS_PORT` | **YES** | No | No | `6379` | Hostinger Localhost | **YES** | Low |
| **Backend** | `REDIS_PASSWORD` | No | **YES** | No | Empty | Hostinger Redis Conf | **YES** | **HIGH** (Unprotected in Dev) |
| **Backend** | `JWT_SECRET` | **YES** | **YES** | No | 32+ char token | Hostinger Secret Vault | **YES** (placeholder) | **CRITICAL** (Auth Bypass) |
| **Backend** | `JWT_EXPIRATION` | **YES** | No | No | `7d` | Config | **YES** | Low |
| **Backend** | `TOKEN_ENCRYPTION_KEY` | **YES** | **YES** | No | 32-byte AES key | Hostinger Secret Vault | No (Missing in core.env) | **HIGH** (OAuth Token Leak) |
| **Backend** | `CASHFREE_APP_ID` | **YES** | **YES** | No | Sandbox App ID | Cashfree Dashboard | **YES** | Medium |
| **Backend** | `CASHFREE_APP_SECRET` | **YES** | **YES** | No | Sandbox Secret | Cashfree Dashboard | **YES** | **HIGH** (Financial) |
| **Backend** | `CASHFREE_MODE` | **YES** | No | No | `SANDBOX` | Production / Prod | **YES** | **HIGH** (Charge Safety) |
| **Backend** | `RAZORPAY_KEY_ID` | **YES** | **YES** | No | `rzp_test_...` | Razorpay Dashboard | **YES** | Medium |
| **Backend** | `RAZORPAY_KEY_SECRET` | **YES** | **YES** | No | Test Secret | Razorpay Dashboard | **YES** | **HIGH** (Financial) |
| **Backend** | `RAZOR_PAY_WEBHOOKS_SECRET` | No | **YES** | No | Webhook Secret | Razorpay Webhooks | No (Missing in core.env) | Medium |
| **Backend** | `WHATSAPP_TOKEN` | **YES** | **YES** | No | System User Token | Meta Business Manager | **YES** | **HIGH** (Meta API Access) |
| **Backend** | `WHATSAPP_PHONE_NUMBER_ID` | **YES** | No | No | Meta Phone ID | Meta Business Manager | **YES** | Low |
| **Backend** | `WHATSAPP_WABA_ID` | **YES** | No | No | Meta WABA ID | Meta Business Manager | **YES** | Low |
| **Backend** | `WHATSAPP_APP_SECRET` | **YES** | **YES** | No | Meta App Secret | Meta Developers | No (Missing in core.env) | **HIGH** (Webhook Spoofing) |
| **Backend** | `WHATSAPP_VERIFY_TOKEN` | **YES** | **YES** | No | Webhook Verify Token | Meta Webhook Config | No (Missing in core.env) | Medium |
| **Backend** | `LEAD_INGEST_SECRET` | **YES** | **YES** | No | Ingest Header Secret | Website Ingest Config | No (Missing in core.env) | **HIGH** (Spam / Fake Leads) |
| **Backend** | `AWS_ACCESS_KEY_ID` | **YES** | **YES** | No | IAM User Key | AWS IAM | **YES** | **HIGH** (Cloud Storage) |
| **Backend** | `AWS_SECRET_ACCESS_KEY` | **YES** | **YES** | No | IAM Secret Key | AWS IAM | **YES** | **CRITICAL** (Cloud Storage) |
| **Backend** | `AWS_REGION` | **YES** | No | No | `ap-south-1` | AWS Infrastructure | **YES** | Low |
| **Backend** | `S3_BUCKET_NAME` | **YES** | No | No | Bucket identifier | AWS S3 | **YES** | Low |
| **Backend** | `LIVEKIT_URL` | No | No | No | `http://localhost:7880` | LiveKit Cloud / VPS | **YES** | Low |
| **Backend** | `LIVEKIT_API_KEY` | No | **YES** | No | LiveKit Key | LiveKit Cloud | **YES** | Medium |
| **Backend** | `LIVEKIT_API_SECRET` | No | **YES** | No | LiveKit Secret | LiveKit Cloud | **YES** | Medium |
| **Backend** | `OMNIROUTE_API_URL` | No | No | No | `http://localhost:20128`| `https://ai.ahci.company` | No (Hardcoded in code) | Medium |
| **Backend** | `OMNIROUTE_API_KEY` | No | **YES** | No | Gateway API key | OmniRoute Admin | No (Missing in core.env) | Medium |
| **Backend** | `AVATAR_RENDER_URL` | No | No | No | `http://localhost:8000` | GPU Endpoint | No (Hardcoded VPS IP) | Medium |
| **Admin** | `NEXT_PUBLIC_API_URL` | **YES** | No | **YES** | `http://localhost:5001/api/v1` | `https://api.ariesxpert.com/api/v1` | **YES** | Low |
| **Admin** | `NEXT_PUBLIC_WEBSITE_URL` | **YES** | No | **YES** | `http://localhost:3000` | `https://ariesxpert.com` | **YES** | Low |
| **Admin** | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | No | No | **YES** | Dummy placeholder | Google Cloud Console | **YES** | Low (Domain Restricted) |
| **Admin** | `NEXT_PUBLIC_FIREBASE_*` | No | No | **YES** | Firebase web config | Firebase Console | **YES** | Low (Public Config) |
| **Therapist App** | `NEXT_PUBLIC_API_URL` | **YES** | No | **YES** | `https://api.ariesxpert.com` | `https://api.ariesxpert.com` | **YES** | Low |
| **Websites** | `BACKEND_API_BASE_URL` | **YES** | No | No | `http://localhost:5001/api/v1` | `https://api.ariesxpert.com/api/v1` | **YES** | Low |
| **Websites** | `LEAD_INGEST_SECRET` | **YES** | **YES** | No | Ingest Header Secret | Backend `.env` match | No (In .env.production) | **HIGH** (Leads pipeline) |
| **Mobile (Flutter)**| `GOOGLE_MAPS_API_KEY` | **YES** | No | **YES** | `--dart-define` key | Google Cloud Console | In `environment.dart` | Low (Android Package key) |
| **Mobile (Flutter)**| `CASHFREE_ENV` | **YES** | No | No | `SANDBOX` | `--dart-define=CASHFREE_ENV=PRODUCTION` | In `environment.dart` | **CRITICAL** (Payment Mode) |
| **OmniRoute** | `PORT` | **YES** | No | No | `20128` | Docker Compose / PM2 | **YES** (`ai.env.example`) | Low |
| **OmniRoute** | `API_PORT` | **YES** | No | No | `20129` | Docker Compose / PM2 | **YES** (`ai.env.example`) | Low |
| **OmniRoute** | `REDIS_URL` | **YES** | No | No | `redis://redis:6379` | Docker / Hostinger | **YES** (`ai.env.example`) | Low |
| **OmniRoute** | `QDRANT_URL` | No | No | No | `http://qdrant:6333` | Docker Qdrant | **YES** (`ai.env.example`) | Low |
| **OmniRoute** | `OPENROUTER_API_KEY` | No | **YES** | No | OpenRouter API Key | OpenRouter Dashboard | **YES** (placeholder) | **HIGH** (Cost/Billing) |
| **OmniRoute** | `GEMINI_API_KEY` | No | **YES** | No | Gemini API Key | Google AI Studio | **YES** (placeholder) | **HIGH** (Cost/Billing) |
| **Avatar Engine**| `SERVICE_API_KEY` | **YES** | **YES** | No | Avatar Service Key | Internal Secret Vault | **YES** (`avatar.env.example`) | **HIGH** (Render Abuse) |
| **Avatar Engine**| `JWT_SECRET` | **YES** | **YES** | No | 32-char token | Internal Secret Vault | **YES** (`avatar.env.example`) | **HIGH** (Auth Token) |
| **Avatar Engine**| `MINIO_ENDPOINT` | **YES** | No | No | `minio:9000` | Internal Docker / VPS | **YES** (`avatar.env.example`) | Low |
| **Avatar Engine**| `MINIO_ACCESS_KEY` | **YES** | **YES** | No | `minioadmin` | MinIO Configuration | **YES** (`avatar.env.example`) | **HIGH** (Storage Access) |
| **Avatar Engine**| `MINIO_SECRET_KEY` | **YES** | **YES** | No | `minioadmin` | MinIO Configuration | **YES** (`avatar.env.example`) | **HIGH** (Storage Access) |

---

## 2. Gaps Discovered Between Code & Docker Templates

1. **Missing Backend Ingestion Secrets in `core.env.example`:**
   - `LEAD_INGEST_SECRET`: Required to submit leads from Next.js websites (`/api/v1/leads/*`) securely. Missing from `core.env.example`.
   - `TOKEN_ENCRYPTION_KEY`: Required by Growth Engine OAuth token storage at rest. Missing from `core.env.example`.
   - `WHATSAPP_APP_SECRET`: Required for HMAC-SHA256 signature verification on incoming Meta WhatsApp webhooks. Missing from `core.env.example`.
2. **Hardcoded VPS IP Addresses in Code:**
   - In `ariesxpert-backend/src/aiModule/selfHostedStack.ts`, fallback hosts are hardcoded to `http://157.173.218.56:20128` and `http://157.173.218.56:8000`.
   - In local docker development, these should resolve via container service names (`omniroute`, `backend`) rather than external Hostinger VPS IP addresses.
3. **Flutter Cashfree Environment Flag Safety Net:**
   - In `ariesxpertv2/lib/core/config/environment.dart`, `CASHFREE_ENV` defaults to `SANDBOX`.
   - For release builds, failure to pass `--dart-define=CASHFREE_ENV=PRODUCTION` prevents charges from completing against real payment gateways.
