# Easypanel — frontend

## المنفذ

| المكان | القيمة |
|--------|--------|
| **Domains** | port **80** → `http://riads_frontend:80/` |
| **Environment** | `PORT=80`, `HOSTNAME=0.0.0.0`, `NEXT_PUBLIC_API_URL=https://api.riads.shop` |

## Domains (مهم)

1. `riads-frontend-....easypanel.host` → port **80**
2. **Add Domain** → **`riads.shop`** → port **80** → HTTPS
3. ⭐ Primary domain

بدون `riads.shop` فـ Domains → **502** فـ Cloudflare.

راجع `DEPLOY-FIX.md` للخطوات بالصور.

## بعد push

**Deploy** → خضر → جرّب `riads-frontend-...` ثم `riads.shop`.
