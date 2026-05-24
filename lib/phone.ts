import { parsePhoneNumber, isValidPhoneNumber, AsYouType } from "libphonenumber-js";

export function validateMoroccanPhone(raw: string): {
  valid: boolean;
  e164?: string;
  digitsMA?: string;
  error?: string;
} {
  if (!raw || raw.trim().length === 0) {
    return { valid: false, error: "المرجو إدخال رقم الهاتف" };
  }

  const cleaned = raw.trim().replace(/\s|-|\(|\)/g, "");

  try {
    const isValid = isValidPhoneNumber(cleaned, "MA");
    if (!isValid) {
      return { valid: false, error: "المرجو إدخال رقم هاتف مغربي صحيح" };
    }

    const parsed = parsePhoneNumber(cleaned, "MA");
    const e164 = parsed.format("E.164"); // +212612345678
    const digitsMA = e164.replace("+", ""); // 212612345678

    // Must be Moroccan mobile (06 or 07)
    const national = parsed.nationalNumber;
    if (!national.startsWith("6") && !national.startsWith("7")) {
      return { valid: false, error: "المرجو إدخال رقم هاتف مغربي صحيح (06 أو 07)" };
    }

    return { valid: true, e164, digitsMA };
  } catch {
    return { valid: false, error: "المرجو إدخال رقم هاتف مغربي صحيح" };
  }
}

export function formatPhoneAsYouType(value: string): string {
  const formatter = new AsYouType("MA");
  return formatter.input(value);
}
