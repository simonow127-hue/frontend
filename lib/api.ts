type OrderPayload = {
  customer: {
    full_name: string;
    phone: string;
    phone_e164: string;
    country: "SA" | "AE";
  };
  items: {
    product_id: string;
    slug: string;
    sku: string;
    name: string;
    offer_pieces: number;
    quantity: number;
    unit_bundle_price: number;
    total: number;
  }[];
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
    currency: "SAR" | "AED";
  };
  source?: Record<string, string | undefined>;
  tracking?: {
    event_id?: string;
    fbp?: string;
    fbc?: string;
    ttp?: string;
    scid?: string;
  };
};
