import type { Review } from "./products";

const STORAGE_PREFIX = "riads:user-reviews:v2:";

function isBlockedReview(review: Review): boolean {
  const name = review.name.trim().toLowerCase();
  const text = review.text.trim();

  if (["ilyas", "ilyasse", "ilyasse ilyas"].includes(name)) return true;
  if (/^رائع جدا\s*ا+$/u.test(text)) return true;

  return false;
}

function sanitizeReviews(reviews: Review[]): Review[] {
  return reviews.filter((review) => !isBlockedReview(review));
}

export function loadUserReviews(productId: string): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${productId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Review[];
    if (!Array.isArray(parsed)) return [];
    return sanitizeReviews(parsed);
  } catch {
    return [];
  }
}

export function saveUserReview(productId: string, review: Review): Review[] {
  if (isBlockedReview(review)) {
    return loadUserReviews(productId);
  }
  const existing = loadUserReviews(productId);
  const next = [review, ...existing];
  localStorage.setItem(`${STORAGE_PREFIX}${productId}`, JSON.stringify(next));
  return next;
}

export function formatReviewDate(date = new Date()): string {
  return date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
