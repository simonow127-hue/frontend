/** Store WhatsApp — digits only for wa.me (no +) */
export const WHATSAPP_NUMBER = "212773236730";

export const WHATSAPP_DISPLAY = "+212 773 236 730";

export const WHATSAPP_DEFAULT_MESSAGE =
  "السلام عليكم، بغيت نعرف أكثر على منتجات رياض 🌿";

export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
