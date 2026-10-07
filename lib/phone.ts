export function validatePhone(
  raw: string,
  country: "SA" | "AE"
): {
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

  const code = country === "SA" ? "966" : "971";
  const countryName = country === "SA" ? "سعودي" : "إماراتي";

  // Local format: 05XXXXXXXX
  if (/^05\d{8}$/.test(cleaned)) {
    const e164 = "+" + code + cleaned.slice(1);

    return {
      valid: true,
      e164,
      digits: code + cleaned.slice(1),
      country,
    };
  }

  // International format: +9665XXXXXXXX / +9715XXXXXXXX
  const internationalRegex = new RegExp(
    `^(\\+${code}|${code})5\\d{8}$`
  );

  if (internationalRegex.test(cleaned)) {
    const e164 = cleaned.startsWith("+")
      ? cleaned
      : "+" + cleaned;

    return {
      valid: true,
      e164,
      digits: e164.replace("+", ""),
      country,
    };
  }

  return {
    valid: false,
    error: `الرجاء إدخال رقم جوال ${countryName} صحيح`,
  };
}
