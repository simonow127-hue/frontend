# Cloudflare + riads.shop

## الوضع الحالي

- `https://api.riads.shop/health` → خدام ✅
- `https://riads.shop` → 502 = **frontend** ما كيردش من Easypanel (منفذ / دومين / deploy)

## DNS

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | IP السيرفر (Easypanel) | Proxied |
| A | www | نفس IP | Proxied |
| A | api | نفس IP (إذا ما كانش CNAME) | Proxied |

`api` و `@` يقدرو يكونو على نفس IP — التوجيه بالـ **Host** فـ Easypanel.

## SSL/TLS

1. جرّب **Flexible** (Cloudflare HTTPS → origin HTTP)
2. إذا Easypanel عطا شهادة لـ `riads.shop` → **Full**

## ترتيب الإصلاح

1. Easypanel **frontend** → **Deploy** (آخر commit من GitHub)
2. **Domains** → `riads.shop` على **frontend** (ماشي backend) → port **80**
3. جرّب `riads-frontend-....easypanel.host` قبل `riads.shop`
4. Cloudflare SSL Flexible إذا بقا 502
