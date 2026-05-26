/**
 * Branded product SVGs — terracotta riads style.
 * Run: npm run generate:images
 */

import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "images", "products");

const PRODUCTS = [
  {
    id: "jadr",
    nameAr: "جدر",
    tagline: "زيت تطويل الشعر",
    volume: "50ml",
    color: "#9A4E36",
    accent: "#C9A45C",
    shape: "bottle",
    painBullets: ["الشعر خفيف وتساقطه مزعج"],
    scienceTags: ["تغذية · نمو · حماية"],
    ingredients: ["زيت الخروع النقي", "زيت الأرغان", "البيوتين (B7)"],
    usageSteps: [
      "بعد الغسيل — على الفروة والشعر",
      "دلكي بحركات دائرية",
      "اتركيه 30 دقيقة ثم اغسليه",
      "مرتين أسبوعياً",
    ],
  },
  {
    id: "nour",
    nameAr: "نور",
    tagline: "كريم الرتينول",
    volume: "50ml",
    color: "#C9A45C",
    accent: "#9A4E36",
    shape: "jar",
    painBullets: ["البشرة باهتة وتحتاج إشراقة"],
    scienceTags: ["تجدد · كولاجين · إشراقة"],
    ingredients: ["الرتينول النقي", "فيتامين سي", "جل الألوفيرا"],
    usageSteps: [
      "نظفي الوجه مساءً",
      "ضعي الكريم وتجنبي العين",
      "استعمليه بانتظام",
      "واقي شمس نهاراً",
    ],
  },
  {
    id: "naqaa",
    nameAr: "نقاء",
    tagline: "كريم مزيل العرق",
    volume: "50g",
    color: "#7A8061",
    accent: "#C9A45C",
    shape: "tube",
    painBullets: ["تهيج الجلد بسبب مزيلات كيميائية"],
    scienceTags: ["تحكم · انتعاش · راحة"],
    ingredients: ["الزنك الفعال", "زيت جوز الهند", "مستخلصات مهدئة"],
    usageSteps: [
      "جلد نظيف وجاف",
      "كمية مناسبة يومياً",
      "دعيه يمتص",
      "حماية طوال النهار",
    ],
  },
];

function esc(t) {
  return String(t)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function defs(uid, accent) {
  return `
  <defs>
    <linearGradient id="bg-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A95C42"/>
      <stop offset="45%" stop-color="#9A4E36"/>
      <stop offset="100%" stop-color="#7A3828"/>
    </linearGradient>
    <radialGradient id="glow-${uid}" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#FFF9F2" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#FFF9F2" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shadow-${uid}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
    <pattern id="dots-${uid}" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="${accent}" fill-opacity="0.08"/>
    </pattern>
  </defs>`;
}

function bg(w, h, uid) {
  return `
  <rect width="${w}" height="${h}" fill="url(#bg-${uid})"/>
  <rect width="${w}" height="${h}" fill="url(#glow-${uid})"/>
  <rect width="${w}" height="${h}" fill="url(#dots-${uid})"/>`;
}

function brandMark(x, y, uid) {
  return `
  <g transform="translate(${x},${y})" opacity="0.92">
    <circle cx="18" cy="18" r="17" fill="#FFF9F2"/>
    <circle cx="18" cy="18" r="17" fill="none" stroke="#C9A45C" stroke-width="2"/>
    <text x="18" y="24" text-anchor="middle" fill="#9A4E36" font-family="Georgia, serif" font-size="16" font-weight="700">R</text>
  </g>`;
}

function drawBottle(cx, cy, uid) {
  return `
  <ellipse cx="${cx}" cy="${cy + 175}" rx="72" ry="14" fill="url(#shadow-${uid})"/>
  <rect x="${cx - 38}" y="${cy}" width="76" height="168" rx="18" fill="#FAFAFA" stroke="#E7D8CC" stroke-width="1.5"/>
  <rect x="${cx - 32}" y="${cy + 12}" width="64" height="140" rx="12" fill="#FFFFFF"/>
  <rect x="${cx - 14}" y="${cy - 32}" width="28" height="36" rx="6" fill="#2D201A"/>
  <circle cx="${cx}" cy="${cy - 38}" r="10" fill="#1A1A1A"/>`;
}

function drawJar(cx, cy, uid) {
  return `
  <ellipse cx="${cx}" cy="${cy + 175}" rx="68" ry="13" fill="url(#shadow-${uid})"/>
  <rect x="${cx - 42}" y="${cy + 60}" width="84" height="118" rx="10" fill="#FAFAFA" stroke="#E7D8CC" stroke-width="1.5"/>
  <rect x="${cx - 36}" y="${cy + 68}" width="72" height="100" rx="8" fill="#FFFFFF"/>
  <rect x="${cx - 42}" y="${cy - 10}" width="84" height="72" rx="42" fill="#F0F0F0" stroke="#D8C8BC"/>
  <rect x="${cx - 36}" y="${cy - 4}" width="72" height="60" rx="36" fill="#FFFFFF"/>`;
}

function drawTube(cx, cy, uid) {
  return `
  <ellipse cx="${cx}" cy="${cy + 175}" rx="75" ry="14" fill="url(#shadow-${uid})"/>
  <rect x="${cx - 58}" y="${cy + 65}" width="116" height="95" rx="14" fill="#F8F8F8" stroke="#E7D8CC" stroke-width="1.5"/>
  <ellipse cx="${cx}" cy="${cy + 65}" rx="58" ry="12" fill="#EEEEEE"/>
  <rect x="${cx - 50}" y="${cy + 2}" width="100" height="28" rx="6" fill="#C0C0C0"/>
  <rect x="${cx - 46}" y="${cy + 78}" width="92" height="72" rx="10" fill="#FFFFFF"/>`;
}

function drawProduct(shape, cx, cy, uid) {
  if (shape === "bottle") return drawBottle(cx, cy, uid);
  if (shape === "jar") return drawJar(cx, cy, uid);
  return drawTube(cx, cy, uid);
}

function labelCard(cx, cy, p) {
  const w = 220;
  const h = 118;
  const x = cx - w / 2;
  const y = cy;
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#FFF9F2" fill-opacity="0.97" stroke="${p.accent}" stroke-width="2.5"/>
  <text x="${cx}" y="${y + 28}" text-anchor="middle" fill="#5C4A42" font-size="11" font-weight="700" font-family="Tahoma, Arial, sans-serif">للجمال رياض</text>
  <text x="${cx}" y="${y + 44}" text-anchor="middle" fill="${p.color}" font-size="11" font-weight="700" font-family="Georgia, serif">riads</text>
  <text x="${cx}" y="${y + 72}" text-anchor="middle" fill="#2D201A" font-size="28" font-weight="800" font-family="Tahoma, Arial, sans-serif">${esc(p.nameAr)}</text>
  <text x="${cx}" y="${y + 94}" text-anchor="middle" fill="#5C4A42" font-size="13" font-weight="600" font-family="Tahoma, Arial, sans-serif">${esc(p.tagline)}</text>
  <text x="${cx}" y="${y + 112}" text-anchor="middle" fill="#8A7A72" font-size="11" font-family="Tahoma, Arial, sans-serif">${esc(p.volume)}</text>`;
}

function stack(p, cx, uid, py = 250) {
  return `${drawProduct(p.shape, cx, py, uid)}${labelCard(cx, py + 150, p)}`;
}

function wrap(uid, p, inner, w = 800, h = 800) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${defs(uid, p.accent)}
${bg(w, h, uid)}
${brandMark(w - 52, 20, uid)}
${inner}
</svg>`;
}

function hero(p) {
  const uid = `${p.id}-hero`;
  return wrap(uid, p, `${stack(p, 400, uid)}<text x="400" y="760" text-anchor="middle" fill="#FFF9F2" fill-opacity="0.35" font-size="12" letter-spacing="4" font-family="Georgia, serif">RIADS.SHOP</text>`);
}

function pain(p) {
  const uid = `${p.id}-pain`;
  return wrap(
    uid,
    p,
    `
  <rect x="36" y="36" width="110" height="32" rx="16" fill="#FFF9F2" fill-opacity="0.15" stroke="#FFF9F2" stroke-opacity="0.3"/>
  <text x="54" y="57" fill="#FFF9F2" font-size="14" font-weight="700" font-family="Tahoma, Arial, sans-serif">المشكلة</text>
  ${stack(p, 280, uid)}
  <text x="620" y="520" text-anchor="end" fill="#FFD4CC" font-size="22" font-weight="800">✕</text>
  <text x="600" y="555" text-anchor="end" fill="#FFF9F2" font-size="17" font-family="Tahoma, Arial, sans-serif">${esc(p.painBullets[0])}</text>`
  );
}

function science(p) {
  const uid = `${p.id}-science`;
  return wrap(
    uid,
    p,
    `
  <rect x="36" y="36" width="110" height="32" rx="16" fill="#FFF9F2" fill-opacity="0.15" stroke="#FFF9F2" stroke-opacity="0.3"/>
  <text x="54" y="57" fill="#FFF9F2" font-size="14" font-weight="700" font-family="Tahoma, Arial, sans-serif">الفعالية</text>
  ${stack(p, 280, uid)}
  <circle cx="560" cy="480" r="48" fill="#FFF9F2" fill-opacity="0.12" stroke="#C9A45C" stroke-width="2"/>
  <text x="560" y="560" text-anchor="middle" fill="#FFF9F2" font-size="14" font-family="Tahoma, Arial, sans-serif">${esc(p.scienceTags[0])}</text>`
  );
}

function ingredients(p) {
  const uid = `${p.id}-ingredients`;
  const rows = p.ingredients
    .map((name, i) => {
      const y = 442 + i * 52;
      return `
  <rect x="380" y="${y}" width="400" height="44" rx="12" fill="#FFF9F2" fill-opacity="0.92" stroke="#E7D8CC"/>
  <text x="410" y="${y + 28}" fill="${p.accent}" font-size="18" font-weight="700">✦</text>
  <text x="440" y="${y + 30}" fill="#2D201A" font-size="16" font-weight="700" font-family="Tahoma, Arial, sans-serif">${esc(name)}</text>`;
    })
    .join("");
  return wrap(
    uid,
    p,
    `
  <rect x="36" y="36" width="120" height="32" rx="16" fill="#FFF9F2" fill-opacity="0.15" stroke="#FFF9F2" stroke-opacity="0.3"/>
  <text x="54" y="57" fill="#FFF9F2" font-size="14" font-weight="700" font-family="Tahoma, Arial, sans-serif">المكونات</text>
  ${stack(p, 280, uid)}${rows}`
  );
}

function usage(p) {
  const uid = `${p.id}-usage`;
  const steps = p.usageSteps
    .map((step, i) => {
      const y = 420 + i * 72;
      return `
  <circle cx="420" cy="${y + 4}" r="18" fill="#FFF9F2"/>
  <text x="420" y="${y + 10}" text-anchor="middle" fill="#9A4E36" font-size="14" font-weight="700">${i + 1}</text>
  <text x="455" y="${y + 10}" fill="#FFF9F2" font-size="15" font-family="Tahoma, Arial, sans-serif">${esc(step)}</text>`;
    })
    .join("");
  return wrap(
    uid,
    p,
    `
  <rect x="36" y="36" width="120" height="32" rx="16" fill="#FFF9F2" fill-opacity="0.15" stroke="#FFF9F2" stroke-opacity="0.3"/>
  <text x="54" y="57" fill="#FFF9F2" font-size="14" font-weight="700" font-family="Tahoma, Arial, sans-serif">الاستعمال</text>
  ${stack(p, 280, uid)}${steps}`
  );
}

function heroTrio() {
  const uid = "hero-trio";
  const slots = [
    { p: PRODUCTS[0], cx: 220 },
    { p: PRODUCTS[1], cx: 600 },
    { p: PRODUCTS[2], cx: 980 },
  ];
  const stacks = slots
    .map(({ p, cx }) => `${drawProduct(p.shape, cx, 180, uid)}${labelCard(cx, 380, p)}`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
${defs(uid, "#C9A45C")}
${bg(1200, 675, uid)}
${brandMark(20, 20, uid)}
${stacks}
<text x="600" y="640" text-anchor="middle" fill="#FFF9F2" fill-opacity="0.45" font-size="13" letter-spacing="5" font-family="Georgia, serif">RIADS — روتين متكامل</text>
</svg>`;
}

mkdirSync(OUT, { recursive: true });
const written = [];
for (const p of PRODUCTS) {
  const map = {
    [`${p.id}-hero.svg`]: hero(p),
    [`${p.id}-pain.svg`]: pain(p),
    [`${p.id}-science.svg`]: science(p),
    [`${p.id}-ingredients.svg`]: ingredients(p),
    [`${p.id}-usage.svg`]: usage(p),
  };
  for (const [name, svg] of Object.entries(map)) {
    writeFileSync(join(OUT, name), svg, "utf8");
    written.push(name);
  }
}
writeFileSync(join(OUT, "hero-trio.svg"), heroTrio(), "utf8");
written.push("hero-trio.svg");
console.log(`Generated ${written.length} branded images.`);
