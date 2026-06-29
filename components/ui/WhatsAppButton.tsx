"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="mailto:riads.shop@gmail.com"
      aria-label="تواصل معنا عبر الإيميل"
      className="fixed bottom-20 right-4 left-auto z-40 flex items-center gap-2 bg-brand-primary text-white rounded-full shadow-lg px-3 py-3 sm:px-4 sm:bottom-6 sm:right-6 hover:bg-brand-gold transition-all duration-300 hover:scale-105 group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      <span className="text-sm font-bold hidden sm:inline">راسلنا</span>
    </a>
  );
}
