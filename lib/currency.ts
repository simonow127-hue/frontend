export const CURRENCY_CODE = "SAR" as const;
export const CURRENCY_LABEL = "ريال" as const;

export function formatPrice(amount: number): string {
  return `${amount} ${CURRENCY_LABEL}`;
}
