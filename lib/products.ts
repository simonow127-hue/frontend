import type { Category } from "./categories";
import { getCompareAtPrice } from "./pricing";

export type Offer = {
  pieces: 1 | 2 | 3;
  price: number;
  compareAtPrice: number;
  label: string;
  sublabel: string;
  badge?: string;
};

export type Review = {
  name: string;
  city: string;
  flag?: string;
  text: string;
  rating: number;
  date?: string;
  verified?: boolean;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
  categoryId: Category["id"];
  arabicName: string;
  shortHeading: string;
  subheading: string;
  emotionalHeadline: string;
  painBullets: string[];
  mechanism: string;
  ingredients: { name: string; benefit: string }[];
  usageSteps: string[];
  offers: Offer[];
  defaultOffer: 1 | 2 | 3;
  crossSellIds: string[];
  reviewCount: number;
  rating: number;
  reviews: Review[];
  faqs: FAQ[];
  imagePlaceholder: string;
  ingredientsImage?: string;
  usageImage?: string;
  scienceImage?: string;
  painImage?: string;
  videoUrl?: string;
  imageColor: string;
  isNew?: boolean;
};

function buildOffer(
  pieces: 1 | 2 | 3,
  price: number,
  label: string,
  sublabel: string,
  badge?: string
): Offer {
  return { pieces, price, compareAtPrice: getCompareAtPrice(price), label, sublabel, badge };
}

type OfferSublabels = [string, string, string];

/** نفس جمل العروض على كل المنتجات — هوية رياض */
const BRAND_OFFER_SUBLABELS: OfferSublabels = [
  "ادفع لما يوصلك — بدون مخاطرة",
  "قطعتين بسعر أوفر",
  "٣ قطع — أكبر توفير",
];

function buildOffers(unitPrice: number): Offer[] {
  const two = Math.round(unitPrice * 1.82);
  const three = Math.round(unitPrice * 2.55);
  return [
    buildOffer(1, unitPrice, "عرض أساسي", BRAND_OFFER_SUBLABELS[0]),
    buildOffer(2, two, "قطعتين", BRAND_OFFER_SUBLABELS[1]),
    buildOffer(3, three, "٣ قطع", BRAND_OFFER_SUBLABELS[2], "أفضل قيمة"),
  ];
}

export const PRODUCTS: Product[] = [
  {
    id: "car-gap-filler",
    slug: "car-gap-filler",
    sku: "MP-Z3SJMALO3RPR",
    categoryId: "car",
    arabicName: "حاجز فجوة المقعد — ودّع ضياع أغراضك",
    shortHeading: "حاجز الفجوة: سيارتك مرتبة وكل شيء قدامك",
    subheading: "حل ذكي يمنع سقوط الجوال والعملات والمفاتيح بين المقعد والكونسول.",
    emotionalHeadline: "سيارتك تستاهل ترتيب يعكس ذوقك",
    painBullets: [
      "جوالك وعملاتك تطيح بين المقاعد كل يوم",
      "تضيع وقتك تدور على أغراضك وأنت ماشي",
      "الفجوة تجمع غبار وأوساخ ما تبان",
    ],
    mechanism:
      "حاجز فجوة المقعد مصمم بمقاس مرن يناسب أغلب السيارات. يسد الفراغ بين المقعد ودرج التحكم بإحكام، ويخلي أغراضك اليومية قريبة منك بدون ما تضيع. تركيبة ناعمة ما تخدش التنجيد، وسهل التركيب والإزالة.",
    ingredients: [
      { name: "جلد صناعي فاخر", benefit: "ملمس ناعم يتماشى مع داخلية السيارة" },
      { name: "حشوة مرنة", benefit: "تثبت بإحكام بدون حركة مع كل فرملة" },
      { name: "فتحة حزام الأمان", benefit: "ما تعيق استخدام حزام الأمان أبداً" },
    ],
    usageSteps: [
      "نظّف الفجوة من الغبار بقطعة قماش",
      "أدخل الحاجز بضغطة خفيفة حتى يثبت",
      "تأكد إن فتحة الحزام في مكانها الصحيح",
      "حط أغراضك اليومية فوق الحاجز بكل راحة",
    ],
    offers: buildOffers(89),
    defaultOffer: 1,
    crossSellIds: ["car-phone-holder", "neck-fan"],
    reviewCount: 11,
    rating: 4.9,
    reviews: [
      {
        name: "A***R",
        flag: "🇺🇸",
        city: "الولايات المتحدة",
        rating: 5,
        date: "مايو 2026",
        verified: true,
        text: "Absolutely Essential — Solves a Problem Every Driver Has! The Drop Stop is one of those products you don't realize you need until you use it. It completely eliminates the annoying (and dangerous) gap between your seat and center console, giving you 100% gap coverage so nothing can fall through — no phone, keys, coins, or snacks ever again. Installation takes seconds, and once it's in place, it moves with your seat so you never have to readjust it. Highly recommended — worth every penny!",
      },
      {
        name: "T***H",
        flag: "🇺🇸",
        city: "الولايات المتحدة",
        rating: 5,
        date: "يونيو 2026",
        verified: true,
        text: "Works like a charm. High quality, fits snug and stays in place. You forget it's even there and feels like it's part of the seat.",
      },
      {
        name: "m***n",
        flag: "🇺🇸",
        city: "الولايات المتحدة",
        rating: 5,
        date: "مايو 2026",
        verified: true,
        text: "best product! 10/10 great product! My husband hates my car since his phone falls through this crack EVERY time. I've only had this product for a few weeks and it's so worth it as it has completely stopped his phone from falling.",
      },
      {
        name: "r***y",
        flag: "🇺🇸",
        city: "الولايات المتحدة",
        rating: 5,
        date: "مايو 2026",
        verified: true,
        text: "Does exactly as advertised. They stay in place even when I adjust my seat. They fill the gap perfectly. They look good. I was pleasantly surprised with this product and happy I spent a little extra money.",
      },
      {
        name: "J***u",
        flag: "🇺🇸",
        city: "الولايات المتحدة",
        rating: 5,
        date: "أبريل 2026",
        verified: true,
        text: "You get extras when you order these from amazon. So Glad these came back in stock! They work as wonderfully as they claim to! These little gems work wonderfully in my 2014 Chevy Camaro! They're very sturdy, they stay put — even when I'm moving the seat.",
      },
      {
        name: "A***s",
        flag: "🇺🇸",
        city: "الولايات المتحدة",
        rating: 5,
        date: "يونيو 2026",
        verified: true,
        text: "Fits good. Very nice, easy to install, works great.",
      },
      {
        name: "H***e",
        flag: "🇦🇺",
        city: "أستراليا",
        rating: 5,
        date: "سبتمبر 2024",
        verified: true,
        text: "Excellent product! This is an excellent product! Very soft and won't damage or scratch your car. I recommend this to all!",
      },
      {
        name: "B***t",
        flag: "🇨🇦",
        city: "كندا",
        rating: 5,
        date: "يوليو 2019",
        verified: true,
        text: "Easy to fit...stays in place...does a good job. I am guilty of eating takeout in the car when travelling, with the inevitable dropping of french fries (and coins and various other bits of garbage) between the seat and the console. This solved it completely.",
      },
      {
        name: "i***n",
        flag: "🇬🇧",
        city: "المملكة المتحدة",
        rating: 5,
        date: "نوفمبر 2019",
        verified: true,
        text: "Simple but effective. Initially seems expensive for what it is and was tempted by some of the lower priced alternatives, but so glad I didn't. Very simple but really effective. Fits perfectly on BMW 3 series 07.",
      },
      {
        name: "C***s",
        flag: "🇲🇽",
        city: "المكسيك",
        rating: 5,
        date: "فبراير 2024",
        verified: true,
        text: "MUY ÚTIL. FÁCIL DE INSTALAR.",
      },
      {
        name: "S***t",
        flag: "🇺🇸",
        city: "الولايات المتحدة",
        rating: 4,
        date: "أبريل 2026",
        verified: true,
        text: "They function for their purpose, but tend to pop out if the seat moves. These were pretty hard to get inserted in the first place as the fit is really tight and seem to pop out when the seat goes forward or back a lot. It does stop things from falling through very well.",
      },
    ],
    faqs: [
      {
        question: "يناسب كل السيارات؟",
        answer: "نعم، المقاس مرن ويناسب أغلب السيارات السيدان والدفع الرباعي والكروس أوفر.",
      },
      {
        question: "هل يأثر على حزام الأمان؟",
        answer: "لا، فيه فتحة مخصصة لحزام الأمان وما يعيق استخدامه.",
      },
      {
        question: "كيف أنظفه؟",
        answer: "امسحه بقطعة مبللة وجفّفه — ما يحتاج صيانة معقدة.",
      },
    ],
    imagePlaceholder: "/images/products/car-gap-filler.jpg.jpeg",
    scienceImage: "/images/products/car-gap-filler-science.jpg.jpeg",
    usageImage: "/images/products/car-gap-filler-usage.jpg.jpeg",
    ingredientsImage: "/images/products/car-gap-filler-features.jpg.jpeg",
    painImage: "/images/products/car-gap-filler-pain.jpg.jpeg",
    imageColor: "#2D2D2D",
    isNew: true,
  },
  {
    id: "car-phone-holder",
    slug: "car-phone-holder",
    sku: "MP-D2FTXP9LUJ7Y",
    categoryId: "car",
    arabicName: "حامل جوال مغناطيسي للسيارة — ثبات ووضوح",
    shortHeading: "حامل الجوال: قيادة آمنة وشاشة واضحة",
    subheading: "تثبيت مغناطيسي قوي بزاوية مريحة — للخرائط والمكالمات بدون تشتيت.",
    emotionalHeadline: "ركّز على الطريق وخلك متصل",
    painBullets: [
      "جوالك ينزلق مع كل منعطف",
      "صعب تشوف الخريطة وأنت سايق",
      "الحاملات الرخيصة تنكسر بسرعة",
    ],
    mechanism:
      "حامل مغناطيسي بقاعدة لاصقة قوية وتصميم معدني فاخر. يثبت جوالك بثبات على لوحة القيادة أو الشاشة، مع زاوية قابلة للتعديل عشان تشوف الشاشة بوضوح بدون ما تغطي على الطريق.",
    ingredients: [
      { name: "مغناطيس نيوديميوم", benefit: "ثبات قوي حتى على الطرق الوعرة" },
      { name: "قاعدة لاصقة 3M", benefit: "ما تنفك بحرارة الشمس السعودية" },
      { name: "ذراع دوّارة", benefit: "زاوية مثالية للسائق والراكب" },
    ],
    usageSteps: [
      "نظّف السطح من الغبار والزيوت",
      "لصق القاعدة واضغط ٣٠ ثانية",
      "ثبّت اللوحة المغناطيسية على ظهر الجوال",
      "عدّل الزاوية على مزاجك وانطلق",
    ],
    offers: buildOffers(99),
    defaultOffer: 1,
    crossSellIds: ["car-gap-filler", "neck-fan"],
    reviewCount: 9,
    rating: 4.7,
    reviews: [
      {
        name: "j***j",
        flag: "🇩🇪",
        city: "ألمانيا",
        rating: 5,
        date: "مارس 2025",
        verified: true,
        text: "Absolutely fantastic! Excellent service, high quality, and a great overall experience. I highly recommend it!",
      },
      {
        name: "M***n",
        flag: "🇬🇧",
        city: "المملكة المتحدة",
        rating: 5,
        date: "مارس 2024",
        verified: true,
        text: "Highly recommend, Great communication and product.",
      },
      {
        name: "k***a",
        flag: "🇯🇵",
        city: "اليابان",
        rating: 5,
        date: "يناير 2026",
        verified: true,
        text: "Thank you as always. It's a great item.",
      },
      {
        name: "R***g",
        flag: "🇺🇸",
        city: "الولايات المتحدة",
        rating: 5,
        date: "مارس 2025",
        verified: true,
        text: "La qualité est bonne. Satisfait du produit. Surtout la livraison dans un délai raisonnable.",
      },
      {
        name: "M***j",
        flag: "🇺🇸",
        city: "الولايات المتحدة",
        rating: 5,
        date: "يونيو 2025",
        verified: true,
        text: "bien",
      },
      {
        name: "i***r",
        flag: "🇺🇦",
        city: "أوكرانيا",
        rating: 5,
        date: "أكتوبر 2025",
        verified: true,
        text: "أعطيت المنتج 5 نجوم للتسليم السريع. لا أعرف ماذا أفعل به، لكنني سأستخدمه في مكان ما في المنزل.",
      },
      {
        name: "M***j",
        flag: "🇹🇬",
        city: "توغو",
        rating: 4,
        date: "يناير 2026",
        verified: true,
        text: "c'est cool",
      },
      {
        name: "Ф***й",
        flag: "🇷🇺",
        city: "روسيا",
        rating: 4,
        date: "ديسمبر 2025",
        verified: true,
        text: "لون: فضي — وصل بحالة ممتازة.",
      },
      {
        name: "6***ч",
        flag: "🇷🇺",
        city: "روسيا",
        rating: 4,
        date: "ديسمبر 2025",
        verified: true,
        text: "لون: فضي — منتج جيد.",
      },
    ],
    faqs: [
      {
        question: "يناسب أي جوال؟",
        answer: "نعم، مع اللوحة المغناطيسية يناسب أغلب الجوالات من ٤ إلى ٧ بوصة.",
      },
      {
        question: "هل يخدش الجوال؟",
        answer: "لا، اللوحة المغناطيسية تلصق على الكفر وما تلمس الشاشة.",
      },
      {
        question: "يتحمل حرارة الصيف؟",
        answer: "اللاصق مصمم لتحمل درجات الحرارة العالية داخل السيارة.",
      },
    ],
    imagePlaceholder: "/images/products/car-phone-holder.jpg",
    ingredientsImage: "/images/products/car-phone-holder-magnets.jpg",
    usageImage: "/images/products/car-phone-holder-views.jpg",
    scienceImage: "/images/products/car-phone-holder-science.jpg",
    imageColor: "#8C8C8C",
  },
  {
    id: "neck-fan",
    slug: "neck-fan",
    sku: "MP-UFVILGUCUBKG",
    categoryId: "electronics",
    arabicName: "مروحة الرقبة المحمولة — برودة وين ما كنت",
    shortHeading: "مروحة الرقبة: هواء بارد بدون يدين",
    subheading: "تنفع للمشي، السوق، والسيارة — بطارية طويلة وتصميم خفيف ينطوي.",
    emotionalHeadline: "الحر ما يوقف يومك",
    painBullets: [
      "الحر يضايقك بره البيت والسيارة",
      "المروحة اليدوية تعبك مع الوقت",
      "تبغى شي خفيف تنقله معك كل مكان",
    ],
    mechanism:
      "مروحة رقبة بدون شفرات بتيار هواء مريح على الرقبة والوجه. بطارية قابلة للشحن تعيش ساعات، وشاشة رقمية تعرض البطارية. تصميم قابل للطي ينحفظ في الحقيبة بسهولة.",
    ingredients: [
      { name: "محرك بدون شفرات", benefit: "هواء بارد بدون صوت مزعج" },
      { name: "بطارية ليثيوم", benefit: "شحن سريع واستخدام طويل" },
      { name: "تصميم قابل للطي", benefit: "خفيف ومناسب للسفر والمشاوير" },
    ],
    usageSteps: [
      "اشحن المروحة قبل أول استخدام",
      "لبسها على رقبتك واضبط الزاوية",
      "اختر مستوى الرياح المناسب",
      "بعد الاستخدام اطويها واحفظها في الحقيبة",
    ],
    offers: buildOffers(119),
    defaultOffer: 1,
    crossSellIds: ["desk-lamp", "quran-speaker"],
    reviewCount: 28,
    rating: 4.4,
    reviews: [
      {
        name: "O***u",
        flag: "🇬🇧",
        city: "المملكة المتحدة",
        rating: 5,
        date: "أبريل 2026",
        verified: true,
        text: "As Wind Speed: I love the way the fan blows.",
      },
      {
        name: "G***u",
        flag: "🇳🇬",
        city: "نيجيريا",
        rating: 5,
        date: "مارس 2026",
        verified: true,
        text: "The product was very nice and sturdy. I highly recommend.",
      },
      {
        name: "M***o",
        flag: "🇲🇿",
        city: "موزمبيق",
        rating: 5,
        date: "فبراير 2026",
        verified: true,
        text: "Excellent product of very high quality. I liked it a lot.",
      },
      {
        name: "T***i",
        flag: "🇮🇹",
        city: "إيطاليا",
        rating: 5,
        date: "فبراير 2026",
        verified: true,
        text: "⭐⭐⭐⭐⭐ — منتج رائع، استلمته بحالة ممتازة.",
      },
      {
        name: "G***s",
        flag: "🇬🇭",
        city: "غانا",
        rating: 5,
        date: "مايو 2026",
        verified: true,
        text: "amazing product 👌",
      },
      {
        name: "A***a",
        flag: "🇺🇸",
        city: "الولايات المتحدة",
        rating: 5,
        date: "يناير 2026",
        verified: true,
        text: "very good quality",
      },
      {
        name: "m***j",
        flag: "🇴🇲",
        city: "عُمان",
        rating: 5,
        date: "أبريل 2025",
        verified: true,
        text: "very good excellent",
      },
      {
        name: "L***u",
        flag: "🇨🇩",
        city: "الكونغو",
        rating: 5,
        date: "أكتوبر 2025",
        verified: true,
        text: "mon colis est arrivé chez moi, et c'est de très bonnes qualités.",
      },
      {
        name: "P***j",
        flag: "🇹🇬",
        city: "توغو",
        rating: 5,
        date: "سبتمبر 2025",
        verified: true,
        text: "C'est bon pour des gens qui font des sport.",
      },
      {
        name: "N***z",
        flag: "🇩🇪",
        city: "ألمانيا",
        rating: 4,
        date: "يوليو 2025",
        verified: true,
        text: "gut",
      },
      {
        name: "A***s",
        flag: "🇩🇪",
        city: "ألمانيا",
        rating: 4,
        date: "يونيو 2025",
        verified: true,
        text: "für den Preis 😉 ist es okay.",
      },
      {
        name: "R***t",
        flag: "🇬🇭",
        city: "غانا",
        rating: 4,
        date: "يونيو 2026",
        verified: true,
        text: "cool..but you can't know the battery percentage for it, which is sad.",
      },
    ],
    faqs: [
      {
        question: "كم ساعة تشتغل؟",
        answer: "حسب المستوى، من ٤ إلى ٨ ساعات بعد شحن كامل.",
      },
      {
        question: "آمنة للأطفال؟",
        answer: "نعم، بدون شفرات خارجية — آمنة للاستخدام العائلي.",
      },
      {
        question: "تنفع للرياضة؟",
        answer: "نعم، خفيفة ومريحة للمشي والجري الخفيف.",
      },
    ],
    imagePlaceholder: "/images/products/neck-fan.jpg",
    videoUrl: "/videos/neck-fan-demo.mp4",
    scienceImage: "/images/products/neck-fan-science.jpg",
    ingredientsImage: "/images/products/neck-fan-features.jpg",
    usageImage: "/images/products/neck-fan-dimensions.jpg",
    imageColor: "#E8E8E8",
    isNew: true,
  },
  {
    id: "quran-speaker",
    slug: "quran-speaker",
    sku: "MP-GTW9WHZOJ3NL",
    categoryId: "electronics",
    arabicName: "مكبر قرآن للحائط — أجواء إيمانية في بيتك",
    shortHeading: "مكبر القرآن: وضوح وروحانية بضغطة زر",
    subheading: "يتوصل مباشرة بالكهرباء مع ريموت تحكم — صوت نقي لكل غرفة.",
    emotionalHeadline: "بيتك يستاهل أجواء هادئة ومطمئنة",
    painBullets: [
      "تبغى تسمع القرآن بوضوح بدون تعقيد",
      "الجوالات مو دائماً مناسبة للاستماع المنزلي",
      "تبغى جهاز ثابت يشتغل بضغطة زر",
    ],
    mechanism:
      "مكبر قرآن يتوصل مباشرة بمقبس الكهرباء السعودي. صوت واضح مع ريموت للتحكم بالسور والصوت. تصميم أنيق يناسب ديكور أي غرفة أو مجلس.",
    ingredients: [
      { name: "سماعة عالية الوضوح", benefit: "صوت نقي للتلاوة والأذكار" },
      { name: "ريموت تحكم", benefit: "تغيير السورة والصوت من مكانك" },
      { name: "توصيل مباشر", benefit: "بدون أسلاك معقدة — شغّل واستمتع" },
    ],
    usageSteps: [
      "وصّل الجهاز بمقبس الكهرباء",
      "استخدم الريموت لاختيار السورة",
      "اضبط مستوى الصوت على راحتك",
      "خلّه ثابت في المكان اللي تسمع فيه كل يوم",
    ],
    offers: buildOffers(199),
    defaultOffer: 1,
    crossSellIds: ["desk-lamp", "neck-fan"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "هل يشتغل على الكهرباء السعودية؟",
        answer: "نعم، مقبس ثلاثي الفتحات متوافق مع المملكة.",
      },
      {
        question: "هل فيه بطاقة ذاكرة؟",
        answer: "نعم، يدعم بطاقة TF لتحميل محتوى إضافي.",
      },
      {
        question: "هل الريموت مشمول؟",
        answer: "نعم، ريموت تحكم كامل مع الطلب.",
      },
    ],
    imagePlaceholder: "/images/products/quran-speaker.jpg",
    usageImage: "/images/products/quran-speaker-plug.jpg",
    imageColor: "#F5F0E8",
  },
  {
    id: "desk-lamp",
    slug: "desk-lamp",
    sku: "MP-ZSWU29NOQK1F",
    categoryId: "home",
    arabicName: "مصباح مكتب ذكي — إضاءة وشحن لاسلكي",
    shortHeading: "مصباح المكتب: ضوء مريح وشحن بنفس المكان",
    subheading: "إضاءة LED دافئة مع شاحن لاسلكي وحامل أقلام — مكتبك كله بجهاز واحد.",
    emotionalHeadline: "مكتب مرتب يزيد إنتاجيتك",
    painBullets: [
      "مكتبك فوضى بين الشاحن والمصباح والأقلام",
      "الإضاءة الضعيفة تتعب عينك",
      "تبغى حل واحد يرتب مكان شغلك",
    ],
    mechanism:
      "مصباح LED بإضاءة دافئة مريحة للعين مع قاعدة شحن لاسلكي للجوال. حامل أقلام مدمج يخلي مكتبك مرتب. تصميم أبيض عصري يناسب أي غرفة عمل أو دراسة.",
    ingredients: [
      { name: "LED دافئ", benefit: "إضاءة مريحة للقراءة والشغل الطويل" },
      { name: "شحن لاسلكي ١٠ واط", benefit: "اشحن جوالك بدون أسلاك" },
      { name: "حامل أقلام", benefit: "مكتب مرتب بأداة واحدة" },
    ],
    usageSteps: [
      "وصّل المصباح بالكهرباء",
      "حط جوالك على قاعدة الشحن اللاسلكي",
      "اضبط زاوية الإضاءة على مزاجك",
      "رتّب أقلامك في الحامل المدمج",
    ],
    offers: buildOffers(179),
    defaultOffer: 1,
    crossSellIds: ["electric-chopper", "neck-fan"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "يناسب أي جوال؟",
        answer: "أغلب الجوالات اللي تدعم الشحن اللاسلكي Qi.",
      },
      {
        question: "هل الإضاءة قابلة للتعديل؟",
        answer: "نعم، رقبة مرنة وزاوية قابلة للتعديل.",
      },
      {
        question: "كم استهلاك الكهرباء؟",
        answer: "LED موفر — استهلاك منخفض جداً.",
      },
    ],
    imagePlaceholder: "/images/products/desk-lamp.jpg",
    scienceImage: "/images/products/desk-lamp-science.jpg",
    ingredientsImage: "/images/products/desk-lamp-features.jpg",
    usageImage: "/images/products/desk-lamp-usage.jpg",
    imageColor: "#FFFFFF",
    isNew: true,
  },
  {
    id: "electric-chopper",
    slug: "electric-chopper",
    sku: "MP-WH8QUFVD3TEY",
    categoryId: "home",
    arabicName: "فرامة خضار كهربائية — تجهيز سريع بدون تعب",
    shortHeading: "فرامة الخضار: قطع موحّد بضغطة زر",
    subheading: "فرامة يدوية لاسلكية — تفرم الخضار والفواكه بسرعة وتوفّر وقتك بالمطبخ.",
    emotionalHeadline: "طبخك يصير أسرع وأمتع",
    painBullets: [
      "تقطيع الخضار ياخذ وقت طويل كل يوم",
      "السكين ما يعطيك قطع موحّد",
      "تبغى شي سريع ونظيف بالمطبخ",
    ],
    mechanism:
      "فرامة كهربائية لاسلكية بشفرات حادة تقطع الخضار والفواكه بسرعة وبدون مجهود. حجم مريغ يناسب التحضير اليومي، وسهل التنظيف بعد الاستخدام.",
    ingredients: [
      { name: "شفرات ستانلس", benefit: "قطع حاد ومتساوي" },
      { name: "بطارية لاسلكية", benefit: "حرية حركة بدون أسلاك" },
      { name: "وعاء شفاف", benefit: "تشوف الكمية وتتحكم بالتقطيع" },
    ],
    usageSteps: [
      "اشحن الجهاز قبل الاستخدام",
      "حط الخضار في الوعاء",
      "اضغط الزر وحرّك بحركة دائرية خفيفة",
      "افرغ المحتوى واغسل الوعاء بالماء",
    ],
    offers: buildOffers(129),
    defaultOffer: 1,
    crossSellIds: ["desk-lamp", "black-sheila"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "تفرم البصل والثوم؟",
        answer: "نعم، مناسبة للخضار والفواكه الطرية والبصل.",
      },
      {
        question: "هل هي آمنة؟",
        answer: "نعم، مع غطاء حماية وتشغيل بالضغط فقط.",
      },
      {
        question: "كيف أنظفها؟",
        answer: "الوعاء والشفرات تنغسل بالماء والصابون بسهولة.",
      },
    ],
    imagePlaceholder: "/images/products/electric-chopper.jpg",
    ingredientsImage: "/images/products/electric-chopper-action.jpg",
    usageImage: "/images/products/electric-chopper-parts.jpg",
    imageColor: "#A8D5BA",
  },
  {
    id: "perfume-intense",
    slug: "perfume-intense",
    sku: "MP-KVJEQYF3EWOC",
    categoryId: "style",
    arabicName: "عطر قصة Pink & Rose — أنوثة وفخامة في رشّة",
    shortHeading: "عطر قصة Pink: ورد وعود يثبت طوال اليوم",
    subheading: "Eau de Parfum فاخر بتركيبة وردية دافئة — للمرأة العصرية اللي تبغى حضور لا يُنسى.",
    emotionalHeadline: "ريحتك هي أول شيء يتذكرونه عنك",
    painBullets: [
      "العطور الرخيصة تروح بعد ساعة وتخذلك",
      "تبغى ريحة أنثوية فاخرة تفرق فيك",
      "تعبتِ من العطور اللي ما تدوم مع الحر السعودي",
    ],
    mechanism:
      "عطر GISSAH Pink & Rose هو Eau de Parfum Intense بتركيبة أنثوية فاخرة تجمع بين نضارة الورد الفرنسي وعمق العود الشرقي. القمة تفتح بالورد والبرغموت، ثم تستقر على قلب من الياسمين والفاوانيا، وتختم بقاعدة دافئة من المسك والعنبر والصندل. صُمّم ليدوم على بشرتك من الصباح حتى آخر الليل.",
    ingredients: [
      { name: "قمة: ورد فرنسي وبرغموت وردي", benefit: "انطلاقة منعشة وأنثوية من أول رشة" },
      { name: "قلب: ياسمين وفاوانيا وعود", benefit: "عمق شرقي فاخر يميزك أينما كنتِ" },
      { name: "قاعدة: مسك أبيض وعنبر وصندل", benefit: "ثبات يدوم ساعات على البشرة والملابس" },
    ],
    usageSteps: [
      "رشّي على نقاط النبض — المعصم والرقبة وخلف الأذنين",
      "لا تفركي — خلّي العطر يتنفس ويثبت طبيعي على بشرتك",
      "للثبات الأطول، رشّي خفيفاً على الملابس من الداخل",
      "احفظيه بعيد عن الشمس والحرارة للحفاظ على التركيبة",
    ],
    offers: buildOffers(299),
    defaultOffer: 1,
    crossSellIds: ["black-sheila", "neck-fan"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "كم ساعة يدوم العطر؟",
        answer: "من ٨ إلى ١٢ ساعة حسب نوع البشرة — يدوم أطول على البشرة الدهنية.",
      },
      {
        question: "هل هو مناسب للمرأة فقط؟",
        answer: "تركيبته أنثوية بامتياز — ورد وياسمين ومسك — مصمم للمرأة العصرية.",
      },
      {
        question: "ما هو الحجم؟",
        answer: "١٠٠ مل Eau de Parfum Intense — كمية تكفي لأشهر من الاستخدام اليومي.",
      },
      {
        question: "يتحمل الحر السعودي؟",
        answer: "نعم، القاعدة المسكية والعنبرية تثبته حتى في الأجواء الحارة.",
      },
    ],
    imagePlaceholder: "/images/products/perfume-intense.jpg",
    ingredientsImage: "/images/products/perfume-notes.jpg",
    usageImage: "/images/products/perfume-collection.jpg",
    scienceImage: "/images/products/perfume-science.jpg",
    imageColor: "#1A1A1A",
    isNew: true,
  },
  {
    id: "black-sheila",
    slug: "black-sheila",
    sku: "MP-FMER4W5JZBAG",
    categoryId: "style",
    arabicName: "شيلة سوداء فاخرة — إطلالة أنيقة كل يوم",
    shortHeading: "الشيلة السوداء: نعومة وفخامة بكل لفّة",
    subheading: "قماش شيفون خفيف وناعم بقصة مريحة — للدوام والخروج والمناسبات.",
    emotionalHeadline: "إطلالتك تبدأ من التفاصيل",
    painBullets: [
      "الشيلات الرخيصة ما تعطي شكل أنيق",
      "القماش الخشن يضايقك بالحر",
      "تبغى شيلة تخدمك كل يوم",
    ],
    mechanism:
      "شيلة سوداء من قماش شيفون خفيف وشفاف بشكل أنيق. ناعمة على البشرة وما تسبب حرارة زائدة. قصة مريحة تثبت على الرأس بدون حاجة لتعديل مستمر.",
    ingredients: [
      { name: "شيفون فاخر", benefit: "خفة ونعومة طوال اليوم" },
      { name: "لون أسود ثابت", benefit: "ما يبهت مع الغسيل المتكرر" },
      { name: "قصة واسعة", benefit: "تغطية مريحة وأنيقة" },
    ],
    usageSteps: [
      "لفّ الشيلة على رأسك بالطريقة اللي تفضلها",
      "ثبّتها بدبوس أو بأطراف مريحة",
      "للمناسبات، زيّنيها ببروش بسيط",
      "اغسليها يدوياً أو على دورة خفيفة",
    ],
    offers: buildOffers(79),
    defaultOffer: 1,
    crossSellIds: ["perfume-intense", "electric-chopper"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "هل القماش شفاف؟",
        answer: "شفافية خفيفة أنيقة — مناسب للطبقات.",
      },
      {
        question: "كم المقاس؟",
        answer: "مقاس قياسي واسع يناسب أغلب الاستخدامات.",
      },
      {
        question: "كيف أغسلها؟",
        answer: "غسيل يدوي بماء بارد أو دورة خفيفة — تجفيف طبيعي.",
      },
    ],
    imagePlaceholder: "/images/products/black-sheila.jpg",
    imageColor: "#1A1A1A",
  },
  {
    id: "car-seat-cushion",
    slug: "car-seat-cushion",
    sku: "MP-CSCUSH7K2M9Q",
    categoryId: "car",
    arabicName: "مسند ظهر شبكي — راحة ووضعية صحيحة",
    shortHeading: "مسند الظهر: سند قطني يخفّف ألم الجلوس الطويل",
    subheading: "شبكة قابلة للتنفس مع أحزمة تثبيت — للسيارة والمكتب.",
    emotionalHeadline: "ظهرك يستاهل سند يريّحك طول اليوم",
    painBullets: [
      "الجلوس الطويل يخلّي ظهرك يوجعك في السيارة والمكتب",
      "المقاعد العادية ما تدعم أسفل الظهر صح",
      "تعبت من الانحناء والوضعية الخاطئة أثناء القيادة",
    ],
    mechanism:
      "مسند ظهر شبكي بتصميم منحني يطابق تقوّس العمود الفقري. الشبكة تسمح بمرور الهواء فما تحس بحرارة أو تعرّق، والأحزمة المرنة تثبّته على أي مقعد سيارة أو كرسي مكتب خلال ثوانٍ. الدعم المركز على أسفل الظهر يقلّل الضغط ويرجّع وضعيتك طبيعية.",
    ingredients: [
      { name: "شبكة قابلة للتنفس", benefit: "تهوية مستمرة بدون تعرّق الظهر" },
      { name: "إطار داعم مرن", benefit: "يحافظ على تقوّس أسفل الظهر الطبيعي" },
      { name: "أحزمة مطاطية قابلة للتعديل", benefit: "تثبيت سريع على أغلب المقاعد" },
    ],
    usageSteps: [
      "لفّ الحزام حول ظهر المقعد وثبّته",
      "عدّل ارتفاع المسند ليصير مقابل أسفل ظهرك",
      "اجلس بشكل طبيعي وخلّ المسند يسندك",
      "انقله بين السيارة والمكتب بسهولة متى ما احتجت",
    ],
    offers: buildOffers(89),
    defaultOffer: 1,
    crossSellIds: ["car-comfort-set", "car-phone-holder", "wireless-car-charger"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "يناسب سيارة ومكتب مع بعض؟",
        answer: "نعم — الأحزمة المرنة تثبّته على مقاعد السيارات وكراسي المكاتب.",
      },
      {
        question: "هل يسبب حرارة في الصيف؟",
        answer: "لا، الشبكة المفتوحة تسمح بمرور الهواء وتحافظ على ظهرك بارد.",
      },
      {
        question: "كم يستغرق التركيب؟",
        answer: "أقل من دقيقة — لفّ الحزام وعدّل الارتفاع واجلس.",
      },
    ],
    imagePlaceholder: "/images/products/car-seat-cushion.jpg",
    imageColor: "#E8E8E8",
    isNew: true,
  },
  {
    id: "prostration-chair",
    slug: "prostration-chair",
    sku: "MP-PRCHAIR4N8WX",
    categoryId: "home",
    arabicName: "كرسي السجود — راحة في الصلاة بدون مشقة",
    shortHeading: "كرسي السجود: دعم للركبتين والقدمين أثناء الصلاة",
    subheading: "مقعد مبطّن بإطار معدني خفيف — لمن يحتاج سنداً في الجلوس والسجود.",
    emotionalHeadline: "صلاتك أهم… وراحتك جزء منها",
    painBullets: [
      "ألم الركبتين أو القدمين يضايقك أثناء الجلوس في الصلاة",
      "صعب تجلس على الأرض لفترات طويلة",
      "تبغى حل شرعي مريح بدون ما تترك الخشوع",
    ],
    mechanism:
      "كرسي سجود منخفض بإطار معدني متين ومقعد مبطّن أحمر. يرفع جسمك قليلاً عن الأرض فيخفّف الضغط عن الركبتين والقدمين أثناء الجلوس بين السجدتين. خفيف ومحمول، مناسب للمسجد والبيت والسفر.",
    ingredients: [
      { name: "مقعد مبطّن مريح", benefit: "جلوس ناعم بدون ضغط على العظام" },
      { name: "إطار معدني متين", benefit: "ثبات على الأرض بدون اهتزاز" },
      { name: "تصميم منخفض ومحمول", benefit: "سهل الحمل من البيت للمسجد" },
    ],
    usageSteps: [
      "ضع الكرسي على السجادة في موضع الجلوس",
      "اجلس عليه بين السجدات وعند التشهد",
      "عدّل وضعيتك حتى تشعر بالثبات والراحة",
      "اطوه أو احمله بسهولة بعد الصلاة",
    ],
    offers: buildOffers(129),
    defaultOffer: 1,
    crossSellIds: ["quran-speaker", "desk-lamp"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "هل استخدامه جائز في الصلاة؟",
        answer: "نعم لمن لديه عذر يمنع الجلوس على الأرض — استشر إمام مسجدك إن احتجت تفصيلاً.",
      },
      {
        question: "هل يصلح لكبار السن؟",
        answer: "مصمم خصيصاً لمن يعاني من صعوبة في الجلوس على الأرض أو ألم المفاصل.",
      },
      {
        question: "هل هو ثقيل للحمل؟",
        answer: "خفيف ومحمول — تحمله بيد واحدة من البيت إلى المسجد.",
      },
    ],
    imagePlaceholder: "/images/products/prostration-chair.jpg",
    imageColor: "#C41E3A",
    isNew: true,
  },
  {
    id: "car-comfort-set",
    slug: "car-comfort-set",
    sku: "MP-CCSET9P3L7VR",
    categoryId: "car",
    arabicName: "طقم راحة السيارة — مخدة رقبة + مسند قطني",
    shortHeading: "طقم الراحة: سند كامل من الرقبة لأسفل الظهر",
    subheading: "قطعتان من الفوم الذكي — لتقليل إجهاد القيادة الطويلة.",
    emotionalHeadline: "قيادة أطول… وإجهاد أقل",
    painBullets: [
      "الرقبة تتيبس بعد ساعة في الطريق",
      "أسفل ظهرك يؤلمك مع كل مشوار طويل",
      "مقاعد السيارة ما تعطي سنداً كاملاً للجسم",
    ],
    mechanism:
      "طقم راحة من قطعتين: مخدة رقبة بشكل فراشة تثبّت على مسند الرأس، ومسند قطني عريض يسند أسفل الظهر. الفوم الذكي يتأقلم مع شكل جسمك ويوزّع الضغط، فيقلّل الإجهاد أثناء القيادة الطويلة داخل المدينة أو على الخطوط.",
    ingredients: [
      { name: "فوم ذكي عالي الكثافة", benefit: "يتأقلم مع جسمك ويرجع لشكله" },
      { name: "مخدة رقبة بشكل فراشة", benefit: "تثبيت مريح للرقبة بدون ضغط" },
      { name: "مسند قطني عريض", benefit: "دعم أسفل الظهر والجوانب" },
    ],
    usageSteps: [
      "ثبّت مخدة الرقبة على مسند رأس المقعد",
      "ضع المسند القطني مقابل أسفل ظهرك",
      "عدّل الموضع حتى تشعر بسند متوازن",
      "استخدم الطقم في أي سيارة بمقاعد قياسية",
    ],
    offers: buildOffers(119),
    defaultOffer: 1,
    crossSellIds: ["car-seat-cushion", "car-gap-filler", "wireless-car-charger"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "هل الطقم يشمل القطعتين؟",
        answer: "نعم — مخدة رقبة + مسند قطني في طلب واحد.",
      },
      {
        question: "يناسب كل السيارات؟",
        answer: "نعم، مصمم لمقاعد السيارات القياسية بمعظم الموديلات.",
      },
      {
        question: "هل الفوم يتشوّه مع الوقت؟",
        answer: "الفوم عالي الكثافة يرجع لشكله بعد كل استخدام.",
      },
    ],
    imagePlaceholder: "/images/products/car-comfort-set.jpg",
    imageColor: "#2C2C2C",
    isNew: true,
  },
  {
    id: "mens-hair-styler",
    slug: "mens-hair-styler",
    sku: "MP-MHSTYLE5Q8KD",
    categoryId: "style",
    arabicName: "فرشاة تمليس للرجال — شعر ولحية بضغطة",
    shortHeading: "فرشاة التمليس: تسريحة مرتبة في دقائق",
    subheading: "لوحة تسخين مع أسنان تمشيط — للشعر واللحية معاً.",
    emotionalHeadline: "إطلالة مرتبة تبدأ من التفاصيل",
    painBullets: [
      "شعرك أو لحيتك ما تطلع مرتبة بعد الحمام",
      "الأدوات العادية تاخذ وقت وما تعطي نتيجة ثابتة",
      "تبغى تسريحة سريعة قبل الدوام أو الخروج",
    ],
    mechanism:
      "فرشاة تمليس رجالية بتصميم مزدوج: لوحة تسخين تملّس الشعرة، وأسنان تمشيط توزّع الحرارة بالتساوي. مناسبة للشعر واللحية — تمنحك مظهراً مرتباً في دقائق بدون صالون. المقبض مريح والرأس ينزلق بسلاسة على الشعر.",
    ingredients: [
      { name: "لوحة تسخين سريعة", benefit: "حرارة متساوية لتمليس فعّال" },
      { name: "أسنان تمشيط متينة", benefit: "توزيع الحرارة بدون شدّ مؤلم" },
      { name: "مقبض مريح مضاد للانزلاق", benefit: "تحكم سهل بيد واحدة" },
    ],
    usageSteps: [
      "وصّل الجهاز وانتظر حتى يسخن",
      "مرّر الفرشاة من الجذور للأطراف ببطء",
      "للحية: مشّط باتجاه نمو الشعر",
      "اطفئ الجهاز بعد الاستخدام واتركه يبرد",
    ],
    offers: buildOffers(99),
    defaultOffer: 1,
    crossSellIds: ["perfume-intense", "black-sheila", "desk-lamp"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "هل تصلح للشعر واللحية؟",
        answer: "نعم — مصممة للاستخدام على شعر الرأس واللحية معاً.",
      },
      {
        question: "كم تستغرق التسريحة؟",
        answer: "عادة من ٣ إلى ٥ دقائق حسب كثافة الشعر.",
      },
      {
        question: "هل تسبب ضرر للشعر؟",
        answer: "استخدم حرارة مناسبة ولا تكرر التمرير كثيراً على نفس المنطقة.",
      },
    ],
    imagePlaceholder: "/images/products/mens-hair-styler.jpg",
    imageColor: "#1A1A1A",
    isNew: true,
  },
  {
    id: "wireless-car-charger",
    slug: "wireless-car-charger",
    sku: "MP-WCCARGE2H6TN",
    categoryId: "electronics",
    arabicName: "شاحن سيارة لاسلكي — تثبيت وشحن بيد واحدة",
    shortHeading: "الشاحن اللاسلكي: جوالك ثابت ومشحون وأنت تقود",
    subheading: "حامل مغناطيسي/ذراعين مع شحن لاسلكي سريع — لرحلة آمنة.",
    emotionalHeadline: "ركز على الطريق… وجوالك يتشحن لحاله",
    painBullets: [
      "الكابل يعلق ويضايقك وأنت تقود",
      "الجوال يسقط من الحامل مع كل مطبّ",
      "تبغى شحن سريع بدون ما توصل سلك كل مرة",
    ],
    mechanism:
      "حامل شاحن لاسلكي للسيارة بذراعين جانبيين وقاعدة سفلية تثبت الجوال بإحكام. ضع جوالك فيتصحّن لاسلكياً بدون كابل ظاهر. تصميم أنيق أسود وذهبي يناسب داخلية السيارة، ويثبت على فتحة التهوية أو القاعدة حسب التركيب.",
    ingredients: [
      { name: "شحن لاسلكي سريع", benefit: "طاقة مستمرة بدون توصيل كابل" },
      { name: "ذراعا تثبيت معدنيان", benefit: "إمساك محكم حتى على الطرق الوعرة" },
      { name: "تصميم أسود وذهبي", benefit: "مظهر فاخر يتماشى مع داخلية السيارة" },
    ],
    usageSteps: [
      "ثبّت الحامل على فتحة التهوية أو القاعدة",
      "وصّل كابل الطاقة بمخرج السيارة",
      "ضع جوالك بين الذراعين حتى يثبت",
      "الشحن يبدأ تلقائياً — ركّز على الطريق",
    ],
    offers: buildOffers(175),
    defaultOffer: 1,
    crossSellIds: ["car-phone-holder", "car-gap-filler", "car-comfort-set"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "هل يعمل مع كل الجوالات؟",
        answer: "يعمل مع أي جوال يدعم الشحن اللاسلكي (Qi). الجوالات بدون Qi تحتاج غطاء أو قاعدة متوافقة.",
      },
      {
        question: "أين يُركَّب في السيارة؟",
        answer: "على فتحة التهوية أو قاعدة التثبيت حسب نوع التركيب المرفق.",
      },
      {
        question: "هل يثبت الجوال بقوة؟",
        answer: "الذراعان والقاعدة السفلية يمسكان الجوال بإحكام أثناء الفرملة والمطبات.",
      },
    ],
   imagePlaceholder: "/images/products/wireless-car-charger.jpg",
 videoUrl: "/videos/wireless-car-charger-demo.mp4"
painImage: "/images/products/wireless-car-charger-pain.jpg",
scienceImage: "/images/products/wireless-car-charger-science.jpg",
usageImage: "/images/products/wireless-car-charger-usage.jpg",
ingredientsImage: "/images/products/wireless-car-charger-features.jpg",

imageColor: "#1A1A1A",
    isNew: true,
  },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.categoryId === categoryId);
}

export function getProductSectionImage(
  product: Product,
  section: "ingredients" | "usage" | "science"
): string {
  if (section === "ingredients" && product.ingredientsImage) {
    return product.ingredientsImage;
  }
  if (section === "usage" && product.usageImage) {
    return product.usageImage;
  }
  if (section === "science" && product.scienceImage) {
    return product.scienceImage;
  }
  return product.imagePlaceholder;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCrossSells(product: Product): Product[] {
  return product.crossSellIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));
}

export function getOfferByPieces(product: Product, pieces: 1 | 2 | 3): Offer {
  return product.offers.find((o) => o.pieces === pieces)!;
}

export function getLatestProducts(limit = 8): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)))
    .slice(0, limit);
}
