# Easypanel — frontend (رياض)

## ليش خضر ولكن الموقع ما كيفتحش؟

**أخضر** = Docker build نجح.  
**الموقع ما كيفتحش** = غالباً **Domains** (المنفذ أو الدومين).

---

## ① جرّب الرابط ديال Easypanel (ماشي riads.shop أولاً)

1. `frontend` → **Domains**
2. انسخ الرابط الكامل: `https://riads-frontend-xxxxx...`
3. حطو فالمتصفح

### صحّح المنفذ (مهم)

فـ Domains، السطر ديال الرابط لازم يكون الهدف:

```text
http://riads_frontend:3000/
```

**ماشي `:80`** — التطبيق كيخدم على **3000**.

**Environment** (تبويب Environment):

```env
PORT=3000
HOSTNAME=0.0.0.0
```

من بعد: **Save** → **Deploy**

---

## ② riads.shop

`riads.shop` **ما كيخدمش بوحدو** حتى:

1. **Domains** → **Add Domain** → `riads.shop` → Port **3000** → HTTPS
2. DNS عند مسجّل الدومين: **A** `@` → IP السيرفر ديال Easypanel
3. انتظار 5–30 دقيقة

بدون هاد الخطوتين، `riads.shop` غادي يبان 404 ديال Easypanel (ماشي موقع رياض).

---

## ③ اختبار سريع

- الرابط `riads-frontend-...` → متجر عربي رياض ✅
- `riads.shop` → بعد DNS + Add Domain ✅
