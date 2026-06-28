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
      badge: "الأكثر طلباً",
    },
  ];
}

export const PRODUCTS: Product[] = [
  {
    id: "car-gap-filler",
    slug: "car-gap-filler",
    sku: "car-gap-filler",
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
    reviewCount: 214,
    rating: 4.7,
    reviews: [
      { name: "فهد العتيبي", city: "الرياض", text: "والله اشتريته وما ندمت — جوالي وعملاتي ما طاحت من يوم ما ركبته.", rating: 5 },
      { name: "سلطان الغامدي", city: "جدة", text: "جربت منتجات ثانية وما نفعت، هذا ثبت زين وما تحرك.", rating: 5 },
      { name: "منصور الدوسري", city: "الدمام", text: "تركيبه سهل وشكله أنيق داخل السيارة — ممتاز.", rating: 4 },
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
    imagePlaceholder: "/images/products/car-gap-filler.jpg",
    imageColor: "#2D2D2D",
    isNew: true,
  },
  {
    id: "car-phone-holder",
    slug: "car-phone-holder",
    sku: "car-phone-holder",
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
    reviewCount: 389,
    rating: 4.8,
    reviews: [
      { name: "خالد الزهراني", city: "جدة", text: "أفضل حامل جربته — المغناطيس قوي جداً والشكل فاخر.", rating: 5 },
      { name: "عبدالله القحطاني", city: "الرياض", text: "ما تزحزح من مكانه حتى على الطرق السريعة، ممتاز.", rating: 5 },
      { name: "يوسف الشهري", city: "مكة", text: "سهل التركيب وشكله كلاسيكي ما يعيق النظر.", rating: 4 },
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
    usageImage: "/images/products/car-phone-holder-usage.jpg",
    imageColor: "#8C8C8C",
  },
  {
    id: "neck-fan",
    slug: "neck-fan",
    sku: "neck-fan",
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
    reviewCount: 512,
    rating: 4.9,
    reviews: [
      { name: "نورة السالم", city: "الرياض", text: "اشتريتها للمول والحمدلله ما تعبت من الحر — خففت عني كثير.", rating: 5 },
      { name: "ريم العنزي", city: "القصيم", text: "هدية لأختي وانبسطت فيها — خفيفة وهادية ومريحة.", rating: 5 },
      { name: "أحمد الرشيدي", city: "تبوك", text: "فكرة ذكية وتصميم عملي، استخدمتها في الجوالة وكانت رائعة.", rating: 5 },
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
    ingredientsImage: "/images/products/neck-fan-features.jpg",
    imageColor: "#E8E8E8",
    isNew: true,
  },
  {
    id: "quran-speaker",
    slug: "quran-speaker",
    sku: "quran-speaker",
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
    reviewCount: 176,
    rating: 4.8,
    reviews: [
      { name: "أم محمد", city: "المدينة", text: "حطيته في غرفة الجلوس والبيت صار فيه روحانية — ما شاء الله.", rating: 5 },
      { name: "عبدالرحمن المطيري", city: "الطائف", text: "الصوت نقي وواضح حتى من غرفة ثانية، أنصح فيه.", rating: 5 },
      { name: "سعد البقمي", city: "أبها", text: "هدية مميزة لأهلي — انبسطوا فيها وكانت بسعر مناسب.", rating: 4 },
    ],
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
    sku: "desk-lamp",
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
    reviewCount: 298,
    rating: 4.8,
    reviews: [
      { name: "لجين الحارثي", city: "جدة", text: "حطيته على مكتب الدراسة وصار أنيق جداً — والشحن اللاسلكي ممتاز.", rating: 5 },
      { name: "تركي الجهني", city: "الرياض", text: "قيمة ممتازة مقابل السعر، شغله سلس وتصميمه عصري.", rating: 5 },
      { name: "ندى المالكي", city: "المدينة", text: "اشتريته هدية ووصل بتغليف نظيف — أعجب من أهديته.", rating: 4 },
    ],
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
    ingredientsImage: "/images/products/desk-lamp-dark.jpg",
    usageImage: "/images/products/desk-lamp-base.jpg",
    imageColor: "#FFFFFF",
    isNew: true,
  },
  {
    id: "electric-chopper",
    slug: "electric-chopper",
    sku: "electric-chopper",
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
    reviewCount: 341,
    rating: 4.7,
    reviews: [
      { name: "أم فيصل", city: "الرياض", text: "وفّرت عليّ وقت طويل كل يوم في المطبخ — قطع الخضار صار أسهل بكثير.", rating: 5 },
      { name: "سارة الغامدي", city: "جدة", text: "سريعة ونظيفة وما تتعب — أنصح فيها لكل بيت.", rating: 5 },
      { name: "هنوف الشمري", city: "بريدة", text: "خذيتها لأمي وانبسطت فيها كثير، سهلت عليها الطبخ.", rating: 4 },
    ],
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
    sku: "perfume-intense",
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
    reviewCount: 427,
    rating: 4.9,
    reviews: [
      { name: "دلال القرني", city: "جدة", text: "رائحة فاخرة جداً وتدوم من الصبح للليل — ما توقعت تكون بهالجودة.", rating: 5 },
      { name: "العنود الفيفي", city: "الرياض", text: "اشتريته هدية وما شاء الله كل من شمته سأل عنه، أحسنت الاختيار.", rating: 5 },
      { name: "ليلى السبيعي", city: "المدينة", text: "خامة رفيعة وريحة تمشي معك — أنصح فيه بشدة.", rating: 5 },
    ],
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
        answer: "نعم، نضمن أصالة المنتج مع ضمان الاسترجاع.",
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
    sku: "black-sheila",
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
    reviewCount: 563,
    rating: 4.8,
    reviews: [
      { name: "رنا الأسمري", city: "الطائف", text: "خامة خفيفة ومريحة وسعرها مناسب — اشتريت منها ثلاث شيلات.", rating: 5 },
      { name: "مي السلمي", city: "الرياض", text: "أنيقة جداً وتثبت بدون عناء — تستاهل أكثر من سعرها.", rating: 5 },
      { name: "شهد العمري", city: "جدة", text: "اشتريتها للمناسبة وما شاء الله كانت مميزة — شكراً رياض.", rating: 5 },
    ],
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
