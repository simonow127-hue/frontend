export type PhoneCountry = "SA" | "AE";

export function validatePhone(
  raw: string,
  country: PhoneCountry
): {
  valid: boolean;
  e164?: string;
  digits?: string;
  country?: PhoneCountry;
  error?: string;
} {
  if (!raw || raw.trim().length === 0) {
    return {
      valid: false,
      error: "الرجاء إدخال رقم الجوال",
    };
  }

  const cleaned = raw.trim().replace(/[\s\-()]/g, "");

  const code = country === "SA" ? "966" : "971";
  const countryName = country === "SA" ? "سعودي" : "إماراتي";

  // Local format:
  // Saudi: 05XXXXXXXX
  // UAE:    05XXXXXXXX
  if (/^05\d{8}$/.test(cleaned)) {
    const e164 = `+${code}${cleaned.slice(1)}`;

    return {
      valid: true,
      e164,
      digits: e164.replace("+", ""),
      country,
    };
  }

  // International format:
  // +9665XXXXXXXX / 9665XXXXXXXX
  // +9715XXXXXXXX / 9715XXXXXXXX
  const internationalRegex = new RegExp(
    `^(\\+${code}|${code})5\\d{8}$`
  );

  if (internationalRegex.test(cleaned)) {
    const e164 = cleaned.startsWith("+")
      ? cleaned
      : `+${cleaned}`;

    return {
      valid: true,
      e164,
      digits: e164.replace("+", ""),
      country,
    };
  }

  return {
    valid: false,
    error: `الرجاء إدخال رقم جوال ${countryName} صحيح — مثال: 05XXXXXXXX`,
  };
}

/**
 * Backward compatibility:
 * أي ملف قديم مازال كيستعمل validateSaudiPhone
 * غادي يبقى خدام.
 */
export function validateSaudiPhone(raw: string) {
  return validatePhone(raw, "SA");
}

/**
 * @deprecated
 * Kept for compatibility with older code.
 */
export const validateMoroccanPhone = validateSaudiPhone;


/**
 * Format phone number while typing.
 *
 * Examples:
 * 966512345678
 * → +966 51 234 5678
 *
 * 971501234567
 * → +971 50 123 4567
 *
 * 0512345678
 * → 0512 345 678
 */
export function formatPhoneAsYouType(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 12);

  // Saudi international
  if (digits.startsWith("966")) {
    const local = digits.slice(3);

    if (local.length <= 2) {
      return `+966 ${local}`;
    }

    if (local.length <= 5) {
      return `+966 ${local.slice(0, 2)} ${local.slice(2)}`;
    }

    return `+966 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
  }

  // UAE international
  if (digits.startsWith("971")) {
    const local = digits.slice(3);

    if (local.length <= 2) {
      return `+971 ${local}`;
    }

    if (local.length <= 5) {
      return `+971 ${local.slice(0, 2)} ${local.slice(2)}`;
    }

    return `+971 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
  }

  // Saudi / UAE local format
  if (digits.startsWith("05")) {
    if (digits.length <= 4) {
      return digits;
    }

    if (digits.length <= 7) {
      return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    }

    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  return value;
}
