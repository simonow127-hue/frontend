# Easypanel — frontend

## المنفذ (مهم)

الحاوية كتخدم هكذا:

- **80** ← Easypanel / الدومين (nginx)
- **3000** ← Next.js (داخلي)

فـ **Domains** خلي الهدف:

```text
http://riads_frontend:80/
```

ولا Port **80** فواجهة Easypanel.

## بعد كل push

**Deploy** → تسنى خضر → افتح الرابط من Domains.

## riads.shop

1. Domains → Add → `riads.shop` → port **80** → HTTPS
2. DNS: A → `@` → IP السيرفر

## Environment

```env
PORT=3000
HOSTNAME=0.0.0.0
NEXT_PUBLIC_API_URL=https://api.riads.shop
NEXT_PUBLIC_SITE_URL=https://riads.shop
```
