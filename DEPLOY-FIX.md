# إصلاح riads.shop — 502

## السبب (من لقطة الشاشة ديالك)

فـ **Domains** عندك غير:
`riads-frontend.fvd4...` → `:80`

**`riads.shop` مازال مزيدش** → Cloudflare كيوصل للسيرفر ولكن Easypanel ما عندوش خدمة لـ `riads.shop` → **502**.

`api.riads.shop` خدام لأن الـ **backend** مربوط؛ الـ **frontend** لا.

---

## الحل (5 دقائق)

### 1) Easypanel → `frontend` → **Domains**

1. كليك **Add Domain**
2. Domain: **`riads.shop`**
3. Port: **80** (نفس `http://riads_frontend:80/`)
4. HTTPS: **ON** (Let's Encrypt)
5. ⭐ خليه **Primary** إذا كاين الخيار
6. **Save**

(اختياري) زيد **`www.riads.shop`** بنفس الإعدادات.

### 2) **Environment** (frontend)

```env
HOSTNAME=0.0.0.0
PORT=80
```

احذف `PORT=3000` إذا باقي.

### 3) **Deploy** → انتظر **خضر**

### 4) جرّب بالترتيب

1. الرابط `https://riads-frontend.fvd4...` (من Domains)
2. `https://riads.shop`

### 5) Cloudflare (إذا بقا 502)

- **SSL/TLS** → **Flexible**
- **DNS** → A `@` → IP السيرفر (Proxied برتقالي)

---

## GitHub

آخر commit من الكود: Next.js كيخدم مباشرة على **80** (بلا nginx).

بعد **Deploy** من Easypanel، خاص `riads.shop` يخدم.
