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

  const cleaned = raw.trim().replace(/\s|-|\(|\)/g, "");

  try {
    const isValid = isValidPhoneNumber(cleaned, "SA");
    if (!isValid) {
      return { valid: false, error: "الرجاء إدخال رقم جوال سعودي صحيح" };
    }

    const parsed = parsePhoneNumber(cleaned, "SA");
    const e164 = parsed.format("E.164");
    const digitsSA = e164.replace("+", "");

    const national = parsed.nationalNumber;
    if (!national.startsWith("5")) {
      return { valid: false, error: "الرجاء إدخال رقم جوال سعودي يبدأ بـ 05" };
    }

    return { valid: true, e164, digitsSA };
  } catch {
    return { valid: false, error: "الرجاء إدخال رقم جوال سعودي صحيح" };
  }
}

/** @deprecated use validateSaudiPhone */
export const validateMoroccanPhone = validateSaudiPhone;

export function formatPhoneAsYouType(value: string): string {
  const formatter = new AsYouType("SA");
  return formatter.input(value);
}
