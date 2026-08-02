"use client";

import { useState } from "react";
import type { Review } from "@/lib/products";
import { formatReviewDate } from "@/lib/user-reviews";
import { submitReview } from "@/lib/api";
import { Star, Send, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

type AddReviewFormProps = {
  productId: string;
  productName: string;
  onSubmitted: (review: Review) => void;
};

export default function AddReviewForm({
  productId,
  productName,
  onSubmitted,
}: AddReviewFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setRating(5);
    setText("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedText = text.trim();
  
    if (trimmedName.length < 2) {
      setError("اكتب اسمك (حرفين على الأقل)");
      return;
    }
    if (trimmedText.length < 10) {
      setError("اكتب تجربتك (10 أحرف على الأقل)");
      return;
    }

    setLoading(true);
    const review: Review = {
      name: trimmedName,
      text: trimmedText,
      rating,
      date: formatReviewDate(),
      verified: false,
    };

    try {
      await submitReview({
        product_id: productId,
        product_name: productName,
        review,
        event_id: `review-${productId}-${Date.now()}`,
      });
    } catch {
      // Still show locally if the API is unreachable
    }

    onSubmitted(review);
    setDone(true);
    reset();
    setOpen(false);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="text-center py-3 px-4 rounded-xl bg-status-success/10 border border-status-success/25 text-status-success text-sm font-bold">
        شكراً! تقييمك وصل — يظهر الآن في القائمة.
      </div>
    );
  }

  return (
    <div className="w-full">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-brand-primary transition-colors border-b border-brand-gold/40 hover:border-brand-primary pb-0.5"
        >
          <Send size={14} />
          أضف تقييمك
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-2 text-right bg-brand-ivory rounded-2xl border border-brand-border p-5 flex flex-col gap-4 shadow-sm"
        >
          <p className="font-bold text-brand-espresso text-sm">شاركنا تجربتك مع {productName}</p>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="review-name" className="text-xs font-bold text-brand-espresso/70">
              الاسم *
            </label>
            <input
              id="review-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-espresso focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
              placeholder="مثال: أحمد"
              maxLength={60}
              required
            />
          </div>


          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-brand-espresso/70">تقييمك *</span>
            <div className="flex gap-1 justify-end">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`${value} نجوم`}
                  className="p-1 rounded-lg hover:bg-brand-cream transition-colors"
                >
                  <Star
                    size={22}
                    className={
                      value <= rating
                        ? "text-brand-gold fill-brand-gold"
                        : "text-brand-border"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="review-text" className="text-xs font-bold text-brand-espresso/70">
              تجربتك *
            </label>
            <textarea
              id="review-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-espresso resize-none focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
              placeholder="اكتب رأيك الحقيقي بعد استخدام المنتج..."
              maxLength={500}
              required
            />
          </div>

          {error && (
            <p className="text-status-error text-xs font-medium">{error}</p>
          )}

          <div className="flex flex-wrap gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setError("");
              }}
              className="text-sm font-medium text-brand-espresso/60 hover:text-brand-espresso px-4 py-2"
            >
              إلغاء
            </button>
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              إرسال التقييم
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
