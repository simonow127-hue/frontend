import { parsePhoneNumber, isValidPhoneNumber, AsYouType } from "libphonenumber-js";

export function validateSaudiPhone(raw: string): {
  valid: boolean;
  e164?: string;
  digitsSA?: string;
  error?: string;
} {
  if (!raw || raw.trim().length === 0) {
    return { valid: false, error: "الرجاء إدخال رقم الجوال" };
  }

  const cleaned = raw.trim().replace(/[\s\-\(\)]/g, "");

  // Try libphonenumber-js first
  try {
    if (isValidPhoneNumber(cleaned, "SA")) {
      const parsed = parsePhoneNumber(cleaned, "SA");
      const e164 = parsed.format("E.164");
      const digitsSA = e164.replace("+", "");
      return { valid: true, e164, digitsSA };
    }
  } catch {
    // fall through to manual check
  }

  // Manual fallback: accept 05XXXXXXXX (10 digits) — covers all SA operators incl. 057
  if (/^05\d{8}$/.test(cleaned)) {
    const e164 = "+966" + cleaned.slice(1);
    const digitsSA = "966" + cleaned.slice(1);
    return { valid: true, e164, digitsSA };
  }

  // Accept +9665XXXXXXXX or 9665XXXXXXXX
  if (/^(\+966|966)5\d{8}$/.test(cleaned)) {
    const e164 = cleaned.startsWith("+") ? cleaned : "+" + cleaned;
    const digitsSA = e164.replace("+", "");
    return { valid: true, e164, digitsSA };
  }

  return { valid: false, error: "الرجاء إدخال رقم جوال سعودي صحيح — مثال: 0512345678" };
}

/** @deprecated use validateSaudiPhone */
export const validateMoroccanPhone = validateSaudiPhone;

export function formatPhoneAsYouType(value: string): string {
  const formatter = new AsYouType("SA");
  return formatter.input(value);
}
