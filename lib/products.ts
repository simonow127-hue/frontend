import { STORE_IMAGES } from "./store-images";

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
  text: string;
  rating: number;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
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
  painImage?: string;
  scienceImage?: string;
  ingredientsImage?: string;
  usageImage?: string;
  imageColor: string;
};

export const OFFERS: Offer[] = [
  {
    pieces: 1,
    price: 179,
    label: "قطعة واحدة",
    sublabel: "للتجربة",
  },
  {
    pieces: 2,
    price: 299,
    label: "قطعتان",
    sublabel: "للاستمرارية — وفر/ي 59 درهم",
  },
  {
    pieces: 3,
    price: 379,
    label: "3 قطع",
    sublabel: "أفضل قيمة — وفر/ي 158 درهم",
    badge: "الأكثر طلباً",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "jadr",
    slug: "jadr-hair-serum",
    sku: "growth-hair",
    arabicName: "جدر — زيت تطويل الشعر الفاخر لنمو أكثف وأقوى",
    shortHeading: "جدر: منبت الثقة للشعر الخفيف",
    subheading: "زيت فاخر بمكونات طبيعية من المغرب — يغذي الفروة ويحفز نمو شعر أطول وأكثف.",
    emotionalHeadline: "من الجذور تبدأ العناية الحقيقية",
    painBullets: [
      "الشعر خفيف وتساقطه مزعج",
      "الفروة جافة ومحتاجة تغذية من الجذور",
      "بغيت/ي شعراً أكثف وأصح بروتين طبيعي",
    ],
    mechanism:
      "جدر زيت مبتكر مصمم لتعزيز نمو الشعر وتقويته بفعالية. يجمع بين مكونات طبيعية غنية كزيت الأرغان وزيت الخروع، تعمل على تغذية فروة الرأس وتحفيز نمو الشعر من الجذور حتى الأطراف. يساعد في تقليل التساقط ويمنح الشعر كثافة وصحة، كما يعزز لمعانه ومرونته. تركيبته الخفيفة تمتص بسرعة دون أثر دهني. صُنع في المغرب — الحجم: 50 مل.",
    ingredients: [
      { name: "زيت الخروع النقي", benefit: "يحفز الدورة الدموية الدقيقة في الفروة ويقوي البصيلات من الجذور" },
      { name: "زيت الأرغان", benefit: "يرطب بعمق ويحمي الشعر من الجفاف والتكسر الناتج عن الحرارة" },
      { name: "البيوتين (فيتامين B7)", benefit: "يعزز بنية الكيراتين الأساسية لزيادة كثافة الشعر ومرونته" },
    ],
    usageSteps: [
      "بعد غسل الشعر بالشامبو، ضعي الزيت على فروة الرأس والشعر المبلل",
      "دلكي برفق بحركات دائرية لمدة دقيقتين لتحفيز الدورة الدموية",
      "اتركيه لمدة 30 دقيقة أو أكثر لتتشبع البصيلات بالكامل ثم اغسليه جيداً",
      "للحصول على أفضل النتائج، استعمليه مرتين أسبوعياً",
    ],
    offers: OFFERS,
    defaultOffer: 1,
    crossSellIds: ["nour", "naqaa"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "كيف أستعمل زيت جدر؟",
        answer: "ضعيه على فروة الرأس والشعر المبلل بعد الشامبو، دلكي بحركات دائرية، واتركيه 30 دقيقة ثم اغسليه. يُفضل مرتين أسبوعياً للحصول على أفضل النتائج.",
      },
      {
        question: "هل هو مناسب لجميع أنواع الشعر؟",
        answer: "نعم، الزيت مناسب لجميع أنواع الشعر، خاصة المعرض للجفاف بسبب المناخ أو تكييف الهواء، بفضل تركيبته الخفيفة سريعة الامتصاص.",
      },
      {
        question: "واش فيه تحذيرات استعمال؟",
        answer: "لا يُنصح باستعماله لمن لديهم حساسية للزيوت الطبيعية، ولا يُستعمل على فروة الرأس المتهيجة.",
      },
      {
        question: "كم باك 3 يكفيني؟",
        answer: "مع الاستعمال مرتين أسبوعياً، الباك 3 يكفي لأكثر من شهرين.",
      },
    ],
    imagePlaceholder: "/images/products/jadr-hero.png",
    painImage: "/images/products/jadr-pain.png",
    scienceImage: "/images/products/jadr-science.png",
    ingredientsImage: "/images/products/jadr-ingredients.png",
    usageImage: "/images/products/jadr-usage.png",
    imageColor: "#9A4E36",
  },
  {
    id: "nour",
    slug: "nour-skin-serum",
    sku: "creme-retanoltube",
    arabicName: "نور — كريم الرتينول لتجديد البشرة وتقليل التجاعيد",
    shortHeading: "نور: إشراقة متجددة لوجهك",
    subheading: "كريم رتينول متقدم يجدد البشرة ويقلل التجاعيد والبقع الداكنة — مصنوع في المغرب.",
    emotionalHeadline: "البشرة المنورة تبدا بروتين خفيف ومستمر",
    painBullets: [
      "الخطوط الدقيقة والتجاعيد تزعجك",
      "البشرة باهتة وتحتاج إشراقة وتوحيد اللون",
      "بغيت/ي كريم فعّال بمكونات موثوقة",
    ],
    mechanism:
      "نور كريم رتينول متقدم يهدف إلى تجديد وتحسين مظهر البشرة. يحتوي على رتينول بتركيز فعال يساعد في تعزيز إنتاج الكولاجين وتقليل ظهور التجاعيد والبقع الداكنة. يعمل على تحسين نسيج البشرة وجعلها تبدو أكثر إشراقاً وشباباً. يُستعمل مساءً ويُحفظ في مكان بارد وجاف بعيداً عن الضوء المباشر. صُنع في المغرب.",
    ingredients: [
      { name: "الرتينول النقي", benefit: "يعزز تجدد خلايا الجلد ويحفز الكولاجين لتقليل الخطوط الدقيقة" },
      { name: "فيتامين سي + حمض اللاكتيك", benefit: "يعملان معاً لتوحيد لون البشرة وتقشيرها بلطف" },
      { name: "جل الألوفيرا", benefit: "يرطب البشرة ويهدئها بعمق لموازنة نشاط الرتينول" },
    ],
    usageSteps: [
      "نظفي الوجه والرقبة جيداً في المساء",
      "ضعي الكريم على الوجه والرقبة مع تجنب منطقة محيط العين",
      "استعمليه بانتظام في المساء للحصول على نتائج واضحة",
      "تأكدي من وضع واقي الشمس نهاراً لحماية البشرة المجددة",
    ],
    offers: OFFERS,
    defaultOffer: 1,
    crossSellIds: ["jadr", "naqaa"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "متى ألاحظ الفرق مع كريم نور؟",
        answer: "الاستمرارية هي المفتاح. مع الاستعمال المنتظم مساءً، سيبدأ التحسن بالظهور تدريجياً على نسيج البشرة ولونها وإشراقتها.",
      },
      {
        question: "هل واقي الشمس ضروري؟",
        answer: "نعم، الرتينول يجعل البشرة أكثر حساسية لأشعة الشمس، خاصة في أجوائنا المشمسة. من الضروري جداً استعمال واقي شمس مناسب نهاراً.",
      },
      {
        question: "واش مناسب لكل أنواع البشرة؟",
        answer: "مناسب لأغلب أنواع البشرة. ننصح بتجربة كمية صغيرة أولاً، وتجنب منطقة العين. يُخزن في مكان بارد وجاف بعيداً عن الضوء المباشر.",
      },
      {
        question: "كيفاش ندمجه مع باقي منتجات رياض؟",
        answer: "استعمل/يه مساءً بعد الغسيل. يتكامل مع زيت جدر (للشعر) وكريم نقاء (للانتعاش) لروتين عناية متكامل.",
      },
    ],
    imagePlaceholder: "/images/products/nour-hero.png",
    imageColor: "#C9A45C",
  },
  {
    id: "naqaa",
    slug: "naqaa-roll-on",
    sku: "deodorant",
    arabicName: "نقاء — كريم مزيل العرق الطبيعي للحماية اليومية من الروائح",
    shortHeading: "نقاء: انتعاش وثقة طوال النهار",
    subheading: "كريم مزيل عرق طبيعي يوفر حماية طويلة الأمد في الأجواء الحارة دون تهيج البشرة.",
    emotionalHeadline: "نهارك يبدا بانتعاش — بلا قلق",
    painBullets: [
      "تهيج الجلد بسبب مزيلات العرق الكيميائية",
      "الحاجة إلى حماية تدوم طوال اليوم",
      "حساسيات تجاه المكونات الاصطناعية",
    ],
    mechanism:
      "نقاء كريم مبتكر يهدف إلى توفير حماية فعّالة ضد التعرق والروائح مع العناية بالبشرة. يحتوي على مكونات طبيعية ومهدئة تعمل على التحكم في التعرق وتقليل نمو البكتيريا، مما يساهم في توفير انتعاش يدوم طويلاً. تركيبته خفيفة وسهلة الامتصاص، مما يضمن راحة ونعومة للبشرة طوال اليوم.",
    ingredients: [
      { name: "الزنك الفعال", benefit: "يتحكم في البكتيريا المسببة للرائحة ويوفر حماية طويلة الأمد" },
      { name: "زيت جوز الهند", benefit: "يرطب البشرة الحساسة بعمق ويقلل من فرص التهيج" },
      { name: "مستخلصات نباتية مهدئة", benefit: "تمنح إحساساً طبيعياً بالانتعاش والراحة" },
    ],
    usageSteps: [
      "تأكدي من نظافة وجفاف الجلد تماماً",
      "ضعي كمية مناسبة على المنطقة المراد معالجتها",
      "دعيه يمتص قليلاً قبل ارتداء الملابس",
      "استعمليه يومياً لضمان الحماية والانتعاش",
    ],
    offers: OFFERS,
    defaultOffer: 1,
    crossSellIds: ["nour", "jadr"],
    reviewCount: 0,
    rating: 0,
    reviews: [],
    faqs: [
      {
        question: "هل نقاء مناسب للاستعمال في الأجواء شديدة الحرارة؟",
        answer: "نعم، تركيبته مصممة لتوفير حماية طويلة الأمد والتحكم في البكتيريا المسببة للروائح حتى في أصعب الظروف المناخية.",
      },
      {
        question: "هل يسبب اسمرار البشرة؟",
        answer: "لا، نقاء خالي من المواد الكيميائية القاسية التي تسبب الاسمرار. على العكس، المكونات المهدئة كزيت جوز الهند تعتني بالبشرة.",
      },
      {
        question: "واش يمكن استعماله مع العطر؟",
        answer: "نعم، يمكن استعماله مع العطر لأنه خفيف وغير مسيطر.",
      },
      {
        question: "كم يكفي الباك 3؟",
        answer: "مع الاستعمال اليومي، الباك 3 يكفي لأكثر من شهرين.",
      },
    ],
    imagePlaceholder: "/images/products/naqaa-hero.png",
    painImage: "/images/products/naqaa-pain.png",
    scienceImage: "/images/products/naqaa-science.png",
    ingredientsImage: "/images/products/naqaa-ingredients.png",
    usageImage: "/images/products/naqaa-usage.png",
    imageColor: "#7A8061",
  },
];

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
  if (product.id === "nour") {
    if (section === "science") return STORE_IMAGES.sectionScience;
    if (section === "ingredients") return STORE_IMAGES.sectionIngredients;
    if (section === "usage") return STORE_IMAGES.sectionUsage;
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

export function getOfferByPieces(pieces: 1 | 2 | 3): Offer {
  return OFFERS.find((o) => o.pieces === pieces)!;
}
