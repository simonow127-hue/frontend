/**
 * Generates branded SVG assets for riads.shop
 * Run: node scripts/generate-brand-images.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = join(__dirname, "..", "public", "images", "products");
const STORE_DIR = join(__dirname, "..", "public", "images", "store");

const PRODUCTS = [
  {
    id: "jadr",
    nameAr: "جدر",
    tagline: "زيت تطويل الشعر",
    volume: "50ml",
    color: "#9A4E36",
    shape: "bottle",
    pain: "الشعر خفيف وتساقطه مزعج",
    science: "تغذية · نمو · حماية",
    ingredients: ["زيت الخروع", "زيت الأرغان", "البيوتين"],
    usage: ["بعد الغسيل", "دلكي دقيقتين", "اتركيه 30 دقيقة", "مرتين أسبوعياً"],
  },
  {
    id: "nour",
    nameAr: "نور",
    tagline: "كريم الرتينول",
    volume: "50ml",
    color: "#C9A45C",
    shape: "jar",
    pain: "البشرة باهتة وتحتاج إشراقة",
    science: "تجدد · كولاجين · إشراقة",
    ingredients: ["الرتينول", "فيتامين سي", "الألوفيرا"],
    usage: ["نظفي مساءً", "ضعي الكريم", "استعمليه بانتظام", "واقي شمس نهاراً"],
  },
  {
    id: "naqaa",
    nameAr: "نقاء",
    tagline: "كريم مزيل العرق",
    volume: "50g",
    color: "#7A8061",
    shape: "tube",
    pain: "الحاجة لحماية تدوم طوال اليوم",
    science: "تحكم · انتعاش · راحة",
    ingredients: ["الزنك", "جوز الهند", "مستخلصات مهدئة"],
    usage: ["جلد نظيف وجاف", "كمية مناسبة", "دعيه يمتص", "استعمال يومي"],
  },
];

function esc(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function defs(color, uid) {
  return `
  <defs>
    <pattern id="stripes-${uid}" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="12" height="12" fill="#FFF9F2"/>
      <line x1="0" y1="0" x2="0" y2="12" stroke="${color}" stroke-opacity="0.05" stroke-width="1"/>
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

function bg(w, h, color, uid) {
  return `
  <rect width="${w}" height="${h}" fill="url(#bg-${uid})"/>
  <rect width="${w}" height="${h}" fill="url(#stripes-${uid})"/>`;
}

function bottle(cx, cy, uid) {
  return `
  <ellipse cx="${cx}" cy="${cy + 175}" rx="72" ry="14" fill="url(#shadow-${uid})"/>
  <rect x="${cx - 38}" y="${cy}" width="76" height="168" rx="18" fill="#FAFAFA" stroke="#DDD" stroke-width="1.5"/>
  <rect x="${cx - 32}" y="${cy + 12}" width="64" height="140" rx="12" fill="#FFFFFF"/>
  <rect x="${cx - 14}" y="${cy - 32}" width="28" height="36" rx="6" fill="#1A1A1A"/>
  <circle cx="${cx}" cy="${cy - 38}" r="10" fill="#2A2A2A"/>`;
}

function jar(cx, cy, uid) {
  return `
  <ellipse cx="${cx}" cy="${cy + 175}" rx="68" ry="13" fill="url(#shadow-${uid})"/>
  <rect x="${cx - 42}" y="${cy + 60}" width="84" height="118" rx="10" fill="#FAFAFA" stroke="#DDD" stroke-width="1.5"/>
  <rect x="${cx - 36}" y="${cy + 68}" width="72" height="100" rx="8" fill="#FFFFFF"/>
  <rect x="${cx - 42}" y="${cy - 10}" width="84" height="72" rx="42" fill="#F0F0F0" stroke="#CCC"/>
  <rect x="${cx - 36}" y="${cy - 4}" width="72" height="60" rx="36" fill="#FFFFFF"/>`;
}

function tube(cx, cy, uid) {
  return `
  <ellipse cx="${cx}" cy="${cy + 175}" rx="75" ry="14" fill="url(#shadow-${uid})"/>
  <rect x="${cx - 58}" y="${cy + 65}" width="116" height="95" rx="14" fill="#F8F8F8" stroke="#D8D8D8" stroke-width="1.5"/>
  <ellipse cx="${cx}" cy="${cy + 65}" rx="58" ry="12" fill="#EEEEEE"/>
  <rect x="${cx - 50}" y="${cy + 2}" width="100" height="28" rx="6" fill="#C0C0C0"/>
  <rect x="${cx - 46}" y="${cy + 78}" width="92" height="72" rx="10" fill="#FFFFFF"/>`;
}

function productShape(p, cx, cy, uid) {
  if (p.shape === "bottle") return bottle(cx, cy, uid);
  if (p.shape === "jar") return jar(cx, cy, uid);
  return tube(cx, cy, uid);
}

function labelCard(cx, cy, p) {
  const w = 220;
  const x = cx - w / 2;
  return `
  <rect x="${x}" y="${cy}" width="${w}" height="118" rx="12" fill="#FFF9F2" fill-opacity="0.96" stroke="${p.color}" stroke-width="2.5"/>
  <text x="${cx}" y="${cy + 28}" text-anchor="middle" fill="#5C4A42" font-size="11" font-weight="700" font-family="Tahoma, Arial, sans-serif">للجمال رياض</text>
  <text x="${cx}" y="${cy + 44}" text-anchor="middle" fill="${p.color}" font-size="11" font-weight="700" font-family="Georgia, serif">riads</text>
  <text x="${cx}" y="${cy + 72}" text-anchor="middle" fill="#2D201A" font-size="28" font-weight="800" font-family="Tahoma, Arial, sans-serif">${esc(p.nameAr)}</text>
  <text x="${cx}" y="${cy + 94}" text-anchor="middle" fill="#5C4A42" font-size="13" font-weight="600" font-family="Tahoma, Arial, sans-serif">${esc(p.tagline)}</text>
  <text x="${cx}" y="${cy + 112}" text-anchor="middle" fill="#8A7A72" font-size="11" font-family="Tahoma, Arial, sans-serif">${esc(p.volume)}</text>`;
}

function brandMark(x, y, size = 56) {
  const r = size / 2;
  const cx = x + r;
  const cy = y + r;
  return `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#9A4E36" opacity="0.08"/>
  <circle cx="${cx}" cy="${cy}" r="${r - 4}" fill="#FFF9F2" stroke="#C9A45C" stroke-width="2.5"/>
  <text x="${cx}" y="${cy + 8}" text-anchor="middle" fill="#9A4E36" font-size="${size * 0.38}" font-weight="700" font-family="Georgia, serif">R</text>
  <text x="${cx}" y="${y + size + 18}" text-anchor="middle" fill="#9A4E36" font-size="11" font-family="Georgia, serif" letter-spacing="0.12em">riads</text>`;
}

function wrap(uid, p, inner, w = 800, h = 800) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${defs(p.color, uid)}
${bg(w, h, p.color, uid)}
${inner}
</svg>`;
}

function hero(p) {
  const uid = `${p.id}-hero`;
  return wrap(uid, p, `
  ${productShape(p, 400, 260, uid)}
  ${labelCard(400, 368, p)}
  ${brandMark(680, 36, 48)}
  <text x="400" y="760" text-anchor="middle" fill="#9A4E36" fill-opacity="0.35" font-size="12" letter-spacing="4" font-family="Georgia, serif">RIADS.SHOP</text>`);
}

function section(p, kind) {
  const uid = `${p.id}-${kind}`;
  const badges = { pain: "المشكلة", science: "الفعالية", ingredients: "المكونات", usage: "الاستعمال" };
  let extra = "";
  if (kind === "pain") {
    extra = `
      <text x="620" y="520" text-anchor="end" fill="#B42318" font-size="22" font-weight="800">✕</text>
      <text x="600" y="555" text-anchor="end" fill="#2D201A" font-size="17" font-family="Tahoma, Arial, sans-serif">${esc(p.pain)}</text>`;
  } else if (kind === "science") {
    extra = `
      <circle cx="560" cy="480" r="48" fill="${p.color}" fill-opacity="0.12" stroke="${p.color}" stroke-width="2"/>
      <path d="M560 452 L560 508 M532 480 L588 480" stroke="${p.color}" stroke-width="3" stroke-linecap="round"/>
      <text x="560" y="560" text-anchor="middle" fill="#5C4A42" font-size="14" font-family="Tahoma, Arial, sans-serif">${esc(p.science)}</text>`;
  } else if (kind === "ingredients") {
    extra = p.ingredients
      .map(
        (name, i) => `
        <rect x="380" y="${442 + i * 52}" width="400" height="44" rx="12" fill="#FFF9F2" fill-opacity="0.9" stroke="#E7D8CC"/>
        <text x="410" y="${470 + i * 52}" fill="${p.color}" font-size="18" font-weight="700">✦</text>
        <text x="440" y="${472 + i * 52}" fill="#2D201A" font-size="16" font-weight="700" font-family="Tahoma, Arial, sans-serif">${esc(name)}</text>`
      )
      .join("");
  } else {
    extra = p.usage
      .map(
        (step, i) => `
        <circle cx="420" cy="${424 + i * 72}" r="18" fill="${p.color}"/>
        <text x="420" y="${430 + i * 72}" text-anchor="middle" fill="#FFF9F2" font-size="14" font-weight="700">${i + 1}</text>
        <text x="455" y="${430 + i * 72}" fill="#2D201A" font-size="15" font-family="Tahoma, Arial, sans-serif">${esc(step)}</text>`
      )
      .join("");
  }

  return wrap(uid, p, `
  <rect x="36" y="36" width="${badges[kind].length * 11 + 40}" height="32" rx="16" fill="${p.color}"/>
  <text x="54" y="57" fill="#FFF9F2" font-size="14" font-weight="700" font-family="Tahoma, Arial, sans-serif">${badges[kind]}</text>
  ${productShape(p, 280, 280, uid)}
  ${labelCard(280, 430, p)}
  ${extra}
  <rect x="0" y="792" width="800" height="8" fill="${p.color}"/>`);
}

function heroTrio() {
  const uid = "hero-trio";
  const slots = [
    { p: PRODUCTS[0], cx: 220 },
    { p: PRODUCTS[1], cx: 600 },
    { p: PRODUCTS[2], cx: 980 },
  ];
  const stacks = slots
    .map(({ p, cx }) => `${productShape(p, cx, 200, uid)}${labelCard(cx, 400, p)}`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
${defs("#9A4E36", uid)}
${bg(1200, 675, "#9A4E36", uid)}
${stacks}
${brandMark(1050, 24, 52)}
<text x="600" y="640" text-anchor="middle" fill="#9A4E36" fill-opacity="0.4" font-size="13" letter-spacing="5" font-family="Georgia, serif">RIADS — روتين متكامل</text>
</svg>`;
}

function storeSvg(name, title, subtitle) {
  const uid = `store-${name}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
${defs("#9A4E36", uid)}
${bg(1200, 675, "#9A4E36", uid)}
<rect x="80" y="120" width="1040" height="435" rx="28" fill="#FFF9F2" fill-opacity="0.92" stroke="#C9A45C" stroke-width="2"/>
${brandMark(540, 180, 88)}
<text x="600" y="340" text-anchor="middle" fill="#2D201A" font-size="42" font-weight="800" font-family="Tahoma, Arial, sans-serif">${esc(title)}</text>
<text x="600" y="390" text-anchor="middle" fill="#5C4A42" font-size="20" font-family="Tahoma, Arial, sans-serif">${esc(subtitle)}</text>
<text x="600" y="620" text-anchor="middle" fill="#9A4E36" fill-opacity="0.45" font-size="13" letter-spacing="5" font-family="Georgia, serif">RIADS.SHOP</text>
</svg>`;
}

mkdirSync(PRODUCTS_DIR, { recursive: true });
mkdirSync(STORE_DIR, { recursive: true });

const written = [];
for (const p of PRODUCTS) {
  for (const [name, fn] of [
    [`${p.id}-hero.svg`, () => hero(p)],
    [`${p.id}-pain.svg`, () => section(p, "pain")],
    [`${p.id}-science.svg`, () => section(p, "science")],
    [`${p.id}-ingredients.svg`, () => section(p, "ingredients")],
    [`${p.id}-usage.svg`, () => section(p, "usage")],
  ]) {
    writeFileSync(join(PRODUCTS_DIR, name), fn(), "utf8");
    written.push(`products/${name}`);
  }
}

writeFileSync(join(PRODUCTS_DIR, "hero-trio.svg"), heroTrio(), "utf8");
written.push("products/hero-trio.svg");

for (const [file, title, subtitle] of [
  ["about-hero.svg", "من نحن — رياض", "عناية مغربية موثوقة للجميع"],
  ["brand-story.svg", "روتين العناية مش كلها متساوية", "اختيار موثوق للمناخ المغربي"],
  ["bundle-value.svg", "الباقة 3 عبوات", "أفضل قيمة للاستمرارية — وفر 248 درهم"],
  ["contact-trust.svg", "تواصل معنا", "فريق رياض متاح لتأكيد طلبك"],
]) {
  writeFileSync(join(STORE_DIR, file), storeSvg(file.replace(".svg", ""), title, subtitle), "utf8");
  written.push(`store/${file}`);
}

console.log(`Generated ${written.length} SVG files:`);
written.forEach((f) => console.log("  ·", f));
