/**
 * Generates branded studio SVGs for riads.shop (jadr, nour, naqaa).
 * Run: node scripts/generate-product-images.mjs
 * Output: public/images/products/*.svg
 */

import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "images", "products");

/** Must match lib/products.ts */
const PRODUCTS = [
  {
    id: "jadr",
    nameAr: "جدر",
    tagline: "زيت تطويل الشعر",
    volume: "50ml",
    color: "#9A4E36",
    shape: "bottle",
    painBullets: [
      "الشعر خفيف وتساقطه مزعج",
      "الفروة جافة ومحتاجة تغذية من الجذور",
      "بغيت/ي شعراً أكثف وأصح بروتين طبيعي",
    ],
    scienceTags: ["تغذية · نمو · حماية"],
    ingredients: ["زيت الخروع النقي", "زيت الأرغان", "البيوتين (B7)"],
    usageSteps: [
      "بعد الغسيل — على الفروة والشعر المبلل",
      "دلكي بحركات دائرية دقيقتين",
      "اتركيه 30 دقيقة ثم اغسليه",
      "مرتين أسبوعياً للنتيجة",
    ],
  },
  {
    id: "nour",
    nameAr: "نور",
    tagline: "كريم الرتينول",
    volume: "50ml",
    color: "#C9A45C",
    shape: "jar",
    painBullets: [
      "الخطوط الدقيقة والتجاعيد تزعجك",
      "البشرة باهتة وتحتاج إشراقة",
      "بغيت/ي كريم فعّال بمكونات موثوقة",
    ],
    scienceTags: ["تجدد · كولاجين · إشراقة"],
    ingredients: ["الرتينول النقي", "فيتامين سي + حمض اللاكتيك", "جل الألوفيرا"],
    usageSteps: [
      "نظفي الوجه والرقبة مساءً",
      "ضعي الكريم وتجنبي محيط العين",
      "استعمليه بانتظام كل مساء",
      "واقي شمس نهاراً ضروري",
    ],
  },
  {
    id: "naqaa",
    nameAr: "نقاء",
    tagline: "كريم مزيل العرق",
    volume: "50g",
    color: "#7A8061",
    shape: "tube",
    painBullets: [
      "تهيج الجلد بسبب مزيلات كيميائية",
      "الحاجة لحماية تدوم طوال اليوم",
      "حساسيات تجاه مكونات اصطناعية",
    ],
    scienceTags: ["تحكم · انتعاش · راحة"],
    ingredients: ["الزنك الفعال", "زيت جوز الهند", "مستخلصات مهدئة"],
    usageSteps: [
      "جلد نظيف وجاف تماماً",
      "كمية مناسبة على المنطقة",
      "دعيه يمتص قبل الملابس",
      "استعمال يومي للحماية",
    ],
  },
];

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function studioDefs(color, uid) {
  return `
  <defs>
    <pattern id="stripes-${uid}" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="12" height="12" fill="#FFF9F2"/>
      <line x1="0" y1="0" x2="0" y2="12" stroke="${color}" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
    <linearGradient id="bg-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ECECEF"/>
      <stop offset="55%" stop-color="#F7F7F9"/>
      <stop offset="100%" stop-color="#E4E4E8"/>
    </linearGradient>
    <linearGradient id="shadow-${uid}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
  </defs>`;
}

function studioBg(w, h, color, uid) {
  return `
  <rect width="${w}" height="${h}" fill="url(#bg-${uid})"/>
  <rect width="${w}" height="${h}" fill="url(#stripes-${uid})"/>`;
}

function drawBottle(cx, cy) {
  return `
  <ellipse cx="${cx}" cy="${cy + 175}" rx="72" ry="14" fill="url(#shadow-UID)"/>
  <rect x="${cx - 38}" y="${cy}" width="76" height="168" rx="18" fill="#FAFAFA" stroke="#DDD" stroke-width="1.5"/>
  <rect x="${cx - 32}" y="${cy + 12}" width="64" height="140" rx="12" fill="#FFFFFF"/>
  <rect x="${cx - 14}" y="${cy - 32}" width="28" height="36" rx="6" fill="#1A1A1A"/>
  <circle cx="${cx}" cy="${cy - 38}" r="10" fill="#2A2A2A"/>`;
}

function drawJar(cx, cy) {
  return `
  <ellipse cx="${cx}" cy="${cy + 175}" rx="68" ry="13" fill="url(#shadow-UID)"/>
  <rect x="${cx - 42}" y="${cy + 60}" width="84" height="118" rx="10" fill="#FAFAFA" stroke="#DDD" stroke-width="1.5"/>
  <rect x="${cx - 36}" y="${cy + 68}" width="72" height="100" rx="8" fill="#FFFFFF"/>
  <rect x="${cx - 42}" y="${cy - 10}" width="84" height="72" rx="42" fill="#F0F0F0" stroke="#CCC"/>
  <rect x="${cx - 36}" y="${cy - 4}" width="72" height="60" rx="36" fill="#FFFFFF"/>`;
}

function drawTube(cx, cy) {
  return `
  <ellipse cx="${cx}" cy="${cy + 175}" rx="75" ry="14" fill="url(#shadow-UID)"/>
  <rect x="${cx - 58}" y="${cy + 65}" width="116" height="95" rx="14" fill="#F8F8F8" stroke="#D8D8D8" stroke-width="1.5"/>
  <ellipse cx="${cx}" cy="${cy + 65}" rx="58" ry="12" fill="#EEEEEE"/>
  <rect x="${cx - 50}" y="${cy + 2}" width="100" height="28" rx="6" fill="#C0C0C0"/>
  <rect x="${cx - 46}" y="${cy + 78}" width="92" height="72" rx="10" fill="#FFFFFF"/>`;
}

function drawProduct(shape, cx, cy, uid) {
  const body =
    shape === "bottle"
      ? drawBottle(cx, cy)
      : shape === "jar"
        ? drawJar(cx, cy)
        : drawTube(cx, cy);
  return body.replace(/UID/g, uid);
}

function drawLabelCard(cx, cy, p, uid) {
  const w = 220;
  const h = 118;
  const x = cx - w / 2;
  const y = cy;
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#FFF9F2" fill-opacity="0.96" stroke="${p.color}" stroke-width="2.5"/>
  <text x="${cx}" y="${y + 28}" text-anchor="middle" fill="#5C4A42" font-size="11" font-weight="700" font-family="Tahoma, Arial, sans-serif">للجمال رياض</text>
  <text x="${cx}" y="${y + 44}" text-anchor="middle" fill="${p.color}" font-size="11" font-weight="700" font-family="Georgia, serif">riads</text>
  <text x="${cx}" y="${y + 72}" text-anchor="middle" fill="#2D201A" font-size="28" font-weight="800" font-family="Tahoma, Arial, sans-serif">${esc(p.nameAr)}</text>
  <text x="${cx}" y="${y + 94}" text-anchor="middle" fill="#5C4A42" font-size="13" font-weight="600" font-family="Tahoma, Arial, sans-serif">${esc(p.tagline)}</text>
  <text x="${cx}" y="${y + 112}" text-anchor="middle" fill="#8A7A72" font-size="11" font-family="Tahoma, Arial, sans-serif">${esc(p.volume)}</text>`;
}

function sectionBadge(label, color, x = 36, y = 36) {
  const w = label.length * 11 + 40;
  return `
  <rect x="${x}" y="${y}" width="${w}" height="32" rx="16" fill="${color}"/>
  <text x="${x + 18}" y="${y + 21}" fill="#FFF9F2" font-size="14" font-weight="700" font-family="Tahoma, Arial, sans-serif">${esc(label)}</text>`;
}

function brandMark(color, x = 620, y = 28) {
  return `
  <g opacity="0.22" transform="translate(${x},${y})">
    <rect width="72" height="72" rx="14" fill="${color}" fill-opacity="0.15"/>
    <text x="36" y="28" text-anchor="middle" fill="${color}" font-size="9" font-family="Georgia, serif">riads</text>
    <text x="36" y="52" text-anchor="middle" fill="${color}" font-size="22" font-weight="700" font-family="Georgia, serif">R</text>
  </g>`;
}

function productHeader(p, subtitle) {
  return `
  ${brandMark(p.color)}
  <text x="720" y="130" text-anchor="end" fill="#2D201A" font-size="36" font-weight="800" font-family="Tahoma, Arial, sans-serif">${esc(p.nameAr)}</text>
  <text x="720" y="162" text-anchor="end" fill="#6B5A52" font-size="16" font-family="Tahoma, Arial, sans-serif">${esc(subtitle)}</text>`;
}

function productStack(p, cx, uid, productY = 280) {
  const labelY = productY + 150;
  return `
  ${drawProduct(p.shape, cx, productY, uid)}
  ${drawLabelCard(cx, labelY, p, uid)}`;
}

function fixSvg(svg, p, uid) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
${studioDefs(p.color, uid)}
${studioBg(800, 800, p.color, uid)}
${svg}
</svg>`;
}

function generatePain(p) {
  const uid = `${p.id}-pain`;
  const bullet = p.painBullets[0];
  const inner = `
  ${sectionBadge("المشكلة", p.color)}
  ${productHeader(p, "روتين رياض — حل مركّز")}
  ${productStack(p, 280, uid)}
  <text x="620" y="520" text-anchor="end" fill="#B42318" font-size="22" font-weight="800">✕</text>
  <text x="600" y="555" text-anchor="end" fill="#2D201A" font-size="18" font-family="Tahoma, Arial, sans-serif">${esc(bullet)}</text>
  <rect x="0" y="792" width="800" height="8" fill="${p.color}"/>`;
  return fixSvg(inner, p, uid);
}

function generateScience(p) {
  const uid = `${p.id}-science`;
  const inner = `
  ${sectionBadge("الفعالية", p.color)}
  ${productHeader(p, "مثبت بعناية · بلا مبالغة")}
  ${productStack(p, 280, uid)}
  <circle cx="560" cy="480" r="48" fill="${p.color}" fill-opacity="0.12" stroke="${p.color}" stroke-width="2"/>
  <path d="M560 452 L560 508 M532 480 L588 480" stroke="${p.color}" stroke-width="3" stroke-linecap="round"/>
  <text x="560" y="560" text-anchor="middle" fill="#5C4A42" font-size="14" font-family="Tahoma, Arial, sans-serif">${esc(p.scienceTags[0])}</text>
  <rect x="0" y="792" width="800" height="8" fill="${p.color}"/>`;
  return fixSvg(inner, p, uid);
}

function generateIngredients(p) {
  const uid = `${p.id}-ingredients`;
  const rows = p.ingredients
    .map((name, i) => {
      const y = 442 + i * 52;
      return `
        <rect x="380" y="${y}" width="400" height="44" rx="12" fill="#FFF9F2" fill-opacity="0.9" stroke="#E7D8CC"/>
        <text x="410" y="${y + 28}" fill="${p.color}" font-size="18" font-weight="700">✦</text>
        <text x="440" y="${y + 30}" fill="#2D201A" font-size="16" font-weight="700" font-family="Tahoma, Arial, sans-serif">${esc(name)}</text>`;
    })
    .join("");
  const inner = `
  ${sectionBadge("المكونات", p.color)}
  ${productHeader(p, "مكونات طبيعية · جودة عالية")}
  ${productStack(p, 280, uid)}
  ${rows}
  <rect x="0" y="792" width="800" height="8" fill="${p.color}"/>`;
  return fixSvg(inner, p, uid);
}

function generateUsage(p) {
  const uid = `${p.id}-usage`;
  const steps = p.usageSteps
    .map((step, i) => {
      const y = 420 + i * 72;
      return `
        <circle cx="420" cy="${y + 4}" r="18" fill="${p.color}"/>
        <text x="420" y="${y + 10}" text-anchor="middle" fill="#FFF9F2" font-size="14" font-weight="700" font-family="Tahoma, Arial, sans-serif">${i + 1}</text>
        <text x="455" y="${y + 10}" fill="#2D201A" font-size="15" font-family="Tahoma, Arial, sans-serif">${esc(step)}</text>`;
    })
    .join("");
  const inner = `
  ${sectionBadge("الاستعمال", p.color)}
  ${productHeader(p, "روتين سهل · 4 خطوات")}
  ${productStack(p, 280, uid)}
  ${steps}
  <rect x="0" y="792" width="800" height="8" fill="${p.color}"/>`;
  return fixSvg(inner, p, uid);
}

function generateHeroTrio() {
  const uid = "hero-trio";
  const slots = [
    { p: PRODUCTS[0], cx: 220 },
    { p: PRODUCTS[1], cx: 600 },
    { p: PRODUCTS[2], cx: 980 },
  ];
  const stacks = slots
    .map(({ p, cx }) => `
  ${drawProduct(p.shape, cx, 200, uid)}
  ${drawLabelCard(cx, 400, p, uid)}`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
${studioDefs("#9A4E36", uid)}
${studioBg(1200, 675, "#9A4E36", uid)}
${stacks}
  <text x="600" y="640" text-anchor="middle" fill="#9A4E36" fill-opacity="0.4" font-size="13" letter-spacing="5" font-family="Georgia, serif">RIADS — روتين متكامل</text>
</svg>`;
}

function generateHeroFixed(p) {
  const uid = `${p.id}-hero`;
  const inner = `
  ${drawProduct(p.shape, 400, 260, uid)}
  ${drawLabelCard(400, 368, p, uid)}
  <text x="400" y="760" text-anchor="middle" fill="#9A4E36" fill-opacity="0.35" font-size="12" letter-spacing="4" font-family="Georgia, serif">RIADS.SHOP</text>`;
  return fixSvg(inner, p, uid);
}

mkdirSync(OUT_DIR, { recursive: true });

const written = [];
for (const p of PRODUCTS) {
  const files = {
    [`${p.id}-hero.svg`]: generateHeroFixed(p),
    [`${p.id}-pain.svg`]: generatePain(p),
    [`${p.id}-science.svg`]: generateScience(p),
    [`${p.id}-ingredients.svg`]: generateIngredients(p),
    [`${p.id}-usage.svg`]: generateUsage(p),
  };
  for (const [name, content] of Object.entries(files)) {
    const path = join(OUT_DIR, name);
    writeFileSync(path, content, "utf8");
    written.push(name);
  }
}

const trioPath = join(OUT_DIR, "hero-trio.svg");
writeFileSync(trioPath, generateHeroTrio(), "utf8");
written.push("hero-trio.svg");

console.log(`Generated ${written.length} files in public/images/products/`);
written.forEach((f) => console.log("  ·", f));
