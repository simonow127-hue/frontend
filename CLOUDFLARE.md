# Cloudflare + Easypanel + riads.shop

## خطأ 502 Bad Gateway

Cloudflare خدام، لكن **السيرفر (Host)** ما كيردش صح.

### 1. Easypanel — Domains

`frontend` → **Domains** → لازم يكون مضاف:

- `riads.shop`
- Port: **80**
- HTTPS: مفعّل (Let's Encrypt)

من بعد: **Deploy**

### 2. Cloudflare — DNS

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | IP السيرفر ديال Easypanel | Proxied (برتقالي) |
| A | www | نفس IP | Proxied |

### 3. Cloudflare — SSL

**SSL/TLS** → **Overview**:

- جرّب **Flexible** (أسهل): Cloudflare HTTPS → السيرفر HTTP
- أو **Full** إذا Easypanel عطا HTTPS لـ `riads.shop`

### 4. اختبار

1. أولاً: رابط Easypanel `https://riads-frontend-....`
2. من بعد: `https://riads.shop`

### 5. Environment (Easypanel)

```env
PORT=80
HOSTNAME=0.0.0.0
```
