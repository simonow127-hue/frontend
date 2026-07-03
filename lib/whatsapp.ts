/** Store WhatsApp — digits only for wa.me (no +) */
export const WHATSAPP_NUMBER = "966500000000";

export const WHATSAPP_DISPLAY = "+966 50 000 0000";

export const WHATSAPP_DEFAULT_MESSAGE =
  "السلام عليكم، أبي أستفسر عن منتجات رياض";

export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
