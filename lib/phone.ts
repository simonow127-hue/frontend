export function validateSaudiPhone(raw: string): {
  valid: boolean;
  e164?: string;
  digitsSA?: string;
  error?: string;
} {
  if (!raw || raw.trim().length === 0) {
    return { valid: false, error: "الرجاء إدخال رقم الجوال" };
  }

  const cleaned = raw.trim().replace(/[\s\-()]/g, "");

  if (/^05\d{8}$/.test(cleaned)) {
    const e164 = "+966" + cleaned.slice(1);
    return { valid: true, e164, digitsSA: "966" + cleaned.slice(1) };
  }

  if (/^(\+966|966)5\d{8}$/.test(cleaned)) {
    const e164 = cleaned.startsWith("+") ? cleaned : "+" + cleaned;
    return { valid: true, e164, digitsSA: e164.replace("+", "") };
  }

  return { valid: false, error: "الرجاء إدخال رقم جوال سعودي صحيح — مثال: 0512345678" };
}

/** @deprecated use validateSaudiPhone */
export const validateMoroccanPhone = validateSaudiPhone;

export function formatPhoneAsYouType(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  if (digits.startsWith("966")) {
    const local = digits.slice(3);
    if (local.length <= 2) return `+966 ${local}`;
    if (local.length <= 5) return `+966 ${local.slice(0, 2)} ${local.slice(2)}`;
    return `+966 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
  }
  if (digits.startsWith("05")) {
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return value;
}
