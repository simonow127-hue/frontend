import { getProductById } from "@/lib/products";

export type SheetLineItem = {
  product_id: string;
  name: string;
  offer_pieces: number;
};

export type SheetCustomer = {
  full_name: string;
  phone: string;
};

function sheetWebhookUrl(): string | null {
  const url = (process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || "").trim();
  if (!url) return null;
  return url.includes("/dev") ? url.replace("/dev", "/exec") : url;
}

function formatSheetDate(date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Casablanca",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function buildSheetPayload(
  orderCode: string,
  customer: SheetCustomer,
  items: SheetLineItem[],
  totalMad: number
): Record<string, string | number> {
  const names: string[] = [];
  const skus: string[] = [];
  const quantities: string[] = [];

  for (const item of items) {
    const product = getProductById(item.product_id);
    names.push(product?.arabicName ?? item.name);
    skus.push(product?.sku ?? item.product_id);
    quantities.push(String(item.offer_pieces));
  }

  return {
    date: formatSheetDate(),
    orderid: orderCode,
    country: "Morocco",
    name: customer.full_name,
    phone: customer.phone,
    product: names.join("/"),
    sku: skus.join("/"),
    quantity: quantities.join("/"),
    total_price: totalMad,
    currency: "MAD",
    status: "",
  };
}

/** Fire-and-forget POST to Google Apps Script (works from browser with text/plain + no-cors). */
export async function sendOrderToGoogleSheet(
  orderCode: string,
  customer: SheetCustomer,
  items: SheetLineItem[],
  totalMad: number
): Promise<void> {
  const url = sheetWebhookUrl();
  if (!url) return;

  const dedupeKey = `riads-sheet:${orderCode}:${totalMad}:${items.map((i) => i.product_id).join(",")}`;
  if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(dedupeKey)) {
    return;
  }

  const payload = buildSheetPayload(orderCode, customer, items, totalMad);

  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(dedupeKey, "1");
    }
  } catch {
    // Non-blocking — DB order already saved
  }
}
