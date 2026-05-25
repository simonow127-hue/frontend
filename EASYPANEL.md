# Easypanel — frontend

## بعد كل push: Deploy

زر **Deploy** الأخضر فـ `riads` → `frontend`.

## Domains

1. **Domains** → الدومين الافتراضي `riads-frontend-...`  
   - الهدف: `http://riads_frontend:80/` (أو Port **80**)
2. **Add Domain** → `riads.shop` + `www.riads.shop`  
   - نفس المنفذ **80**  
   - HTTPS مفعّل
3. كليكي ⭐ على الدومين اللي بغيتي يكون رئيسي

## Environment (اختياري)

```
PORT=80
HOSTNAME=0.0.0.0
NEXT_PUBLIC_API_URL=https://api.riads.shop
NEXT_PUBLIC_SITE_URL=https://riads.shop
```

## DNS لـ riads.shop

سجل **A** → `@` → IP السيرفر ديال Easypanel.

## اختبار

افتح الرابط `https://riads-frontend-....` من Domains — خاصك يبان متجر رياض.
