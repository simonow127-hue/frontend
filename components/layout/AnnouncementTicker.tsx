"use client";

const MESSAGES = [
  "جمال من اختيارك",
  "التوصيل مجاني",
  "الدفع عند الاستلام",
  "تأكيد الطلب بالهاتف",
  "عناية مغربية موثوقة",
  "منتجات طبيعية مختارة",
];

function TickerTrack() {
  return (
    <div dir="rtl" className="flex shrink-0 items-center">
      {MESSAGES.map((msg) => (
        <span
          key={msg}
          className="inline-flex items-center px-8 text-sm font-bold text-brand-cream whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold me-3 shrink-0" aria-hidden />
          {msg}
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementTicker() {
  return (
    <div
      className="bg-brand-espresso border-b border-brand-primary/20 overflow-hidden"
      role="marquee"
      aria-live="off"
      aria-label="عروض وخدمات رياض"
    >
      {/* dir=ltr للحركة الأفقية السلسة؛ النص داخل كل مسار يبقى RTL */}
      <div dir="ltr" className="overflow-hidden">
        <div className="flex w-max py-2.5 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          <TickerTrack />
          <TickerTrack />
        </div>
      </div>
    </div>
  );
}
