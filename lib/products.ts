import type { Category } from "./categories";

export type Offer = {
  pieces: 1 | 2 | 3;
  price: number;
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
  imageColor: string;
  isNew?: boolean;
};

function buildOffers(unitPrice: number): Offer[] {
  const two = Math.round(unitPrice * 1.82);
  const three = Math.round(unitPrice * 2.55);
  return [
    {
      pieces: 1,
      price: unitPrice,
      label: "قطعة واحدة",
      sublabel: "للتجربة",
    },
    {
      pieces: 2,
      price: two,
      label: "قطعتين",
      sublabel: "للاستخدام اليومي",
    },
    {
      pieces: 3,
      price: three,
      label: "٣ قطع",
      sublabel: "أفضل قيمة",
      badge: "أفضل قيمة",
    },
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
    reviewCount: 0,
    rating: 0,
    reviews: [],
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
    imagePlaceholder: "/images/products/car-gap-filler.jpg",
    scienceImage: "/images/products/car-gap-filler-science.jpg",
    usageImage: "/images/products/car-gap-filler-usage.jpg",
    ingredientsImage: "/images/products/car-gap-filler-features.jpg",
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
    offers: buildOffers(149),
    defaultOffer: 1,
    crossSellIds: ["desk-lamp", "quran-speaker"],
    reviewCount: 28,
    rating: 4.4,
    reviews: [
      {
        name: "j***h",
        flag: "🇮🇳",
        city: "الهند",
        rating: 5,
        date: "أبريل 2026",
        verified: true,
        text: "They are simple awesome. Very professional & Great product. Completely satisfied with the service.",
      },
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
        name: "J***a",
        flag: "🇦🇷",
        city: "الأرجنتين",
        rating: 5,
        date: "مارس 2026",
        verified: true,
        text: "Good product and quality, punctual delivery and good service. My overall rating is positive and I am satisfied.",
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
    arabicName: "عطر قصة الفاخر ٢٠٠ مل — حضور يبقى معك",
    shortHeading: "عطر قصة: فوحان قوي وثبات طوال اليوم",
    subheading: "Eau de Parfum بتركيبة فاخرة بخشب العود والمسك — للمناسبات واليوميات.",
    emotionalHeadline: "أول انطباع يبقى",
    painBullets: [
      "العطور الرخيصة ما تثبت ساعة",
      "تبغى ريحة ترفع حضورك",
      "تبغى حجم كبير يكفيك فترة طويلة",
    ],
    mechanism:
      "عطر Eau de Parfum بتركيز ٨٢٪ بحجم ٢٠٠ مل. تركيبة فاخرة بقاعدة عطرية غنية من العود والمسك والعنبر تدوم ساعات. عبوة سوداء فاخرة بتفاصيل ذهبية تناسب الهدايا والاستخدام اليومي.",
    ingredients: [
      { name: "زيوت عطرية مركزة", benefit: "فوحان قوي من أول رشة" },
      { name: "قاعدة خشبية دافئة", benefit: "ثبات يدوم طوال اليوم" },
      { name: "عبوة ٢٠٠ مل", benefit: "قيمة عالية تكفيك شهور" },
    ],
    usageSteps: [
      "رش على نقاط النبض: المعصم والرقبة",
      "لا تفرك — خل العطر يثبت طبيعي",
      "للثبات الأطول، رش على الملابس من الداخل",
      "احفظه بعيد عن الشمس والحرارة",
    ],
    offers: buildOffers(299),
    defaultOffer: 1,
    crossSellIds: ["black-sheila", "neck-fan"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "كم يدوم العطر؟",
        answer: "حسب نوع البشرة، من ٦ إلى ١٠ ساعات بشكل عام.",
      },
      {
        question: "يناسب الرجال والنساء؟",
        answer: "نعم، تركيبة محايدة فاخرة تناسب الجميع.",
      },
      {
        question: "هل العبوة أصلية؟",
        answer: "نوضح مواصفات المنتج في صفحة الطلب. إذا وصلك شيء مختلف عن الوصف، تواصل معنا حسب سياسة الاسترجاع.",
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
