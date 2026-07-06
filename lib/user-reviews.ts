import type { Review } from "./products";

const STORAGE_PREFIX = "riads:user-reviews:";

export function loadUserReviews(productId: string): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${productId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Review[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUserReview(productId: string, review: Review): Review[] {
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
