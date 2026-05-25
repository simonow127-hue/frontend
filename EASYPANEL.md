# Easypanel — frontend (riads.shop)

## المنفذ (مهم)

| المكان | القيمة |
|--------|--------|
| **Domains** (Easypanel) | **80** → `http://riads_frontend:80/` |
| **Environment** `PORT` | **3000** (داخلي — ما تبدلوش لـ 80) |
| **Environment** `HOSTNAME` | `0.0.0.0` |

الحاوية: **nginx على 80** → **Next.js على 3000**.

## Environment

```env
HOSTNAME=0.0.0.0
PORT=3000
```

ما تحطش `PORT=80` — غادي يخرب الربط.

## Domains

1. الرابط الافتراضي `riads-frontend-....easypanel.host` → port **80**
2. **Add Domain** → `riads.shop` → port **80** → HTTPS + Let's Encrypt
3. نفس الشيء لـ `www.riads.shop` (اختياري)

## بعد كل push لـ GitHub

1. **Deploy** (انتظر **خضر**)
2. جرّب الرابط `riads-frontend-....` — خاصو يبان المتجر
3. من بعد `https://riads.shop`

## Cloudflare

راجع `CLOUDFLARE.md` — SSL **Flexible** أولاً إذا بقا 502.
