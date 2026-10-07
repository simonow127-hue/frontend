export function validatePhone(raw: string): {
  valid: boolean;
  e164?: string;
  digits?: string;
  country?: "SA" | "AE";
  error?: string;
} {
  if (!raw || raw.trim().length === 0) {
    return { valid: false, error: "الرجاء إدخال رقم الجوال" };
  }

  const cleaned = raw.trim().replace(/[\s\-()]/g, "");

  // 🇸🇦 Saudi Arabia
  if (/^05\d{8}$/.test(cleaned)) {
    const e164 = "+966" + cleaned.slice(1);
    return {
      valid: true,
      e164,
      digits: "966" + cleaned.slice(1),
      country: "SA",
    };
  }

  if (/^(\+966|966)5\d{8}$/.test(cleaned)) {
    const e164 = cleaned.startsWith("+") ? cleaned : "+" + cleaned;
    return {
      valid: true,
      e164,
      digits: e164.replace("+", ""),
      country: "SA",
    };
  }

  // 🇦🇪 UAE
  if (/^05\d{8}$/.test(cleaned)) {
    const e164 = "+971" + cleaned.slice(1);
    return {
      valid: true,
      e164,
      digits: "971" + cleaned.slice(1),
      country: "AE",
    };
  }

  if (/^(\+971|971)5\d{8}$/.test(cleaned)) {
    const e164 = cleaned.startsWith("+") ? cleaned : "+" + cleaned;
    return {
      valid: true,
      e164,
      digits: e164.replace("+", ""),
      country: "AE",
    };
  }

  return {
    valid: false,
    error: "الرجاء إدخال رقم جوال سعودي أو إماراتي صحيح",
  };
}
