import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, Offer } from "./products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  offerPieces: 1 | 2 | 3;
  quantity: number;
  unitBundlePrice: number;
  total: number;
};

type CartState = {
  items: CartItem[];
  isDrawerOpen: boolean;
  isCheckoutOpen: boolean;

  addItem: (
    product: Product,
    offer: Offer
  ) => void;

  removeItem: (
    productId: string
  ) => void;

  updateQuantity: (
    productId: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  openDrawer: () => void;
  closeDrawer: () => void;

  openCheckout: () => void;
  closeCheckout: () => void;

  getTotalPrice: () => number;
  getTotalItems: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      isDrawerOpen: false,
      isCheckoutOpen: false,

      addItem: (product, offer) => {
        set((state) => {
          const existing = state.items.find(
            (item) =>
              item.productId === product.id
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? {
                      ...item,
                      offerPieces: offer.pieces,
                      unitBundlePrice: offer.price,
                      total:
                        offer.price *
                        item.quantity,
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.arabicName,
                offerPieces: offer.pieces,
                quantity: 1,
                unitBundlePrice: offer.price,
                total: offer.price,
              },
            ],
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              item.productId !== productId
          ),
        })),

      updateQuantity: (
        productId,
        quantity
      ) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity,
                  total:
                    item.unitBundlePrice *
                    quantity,
                }
              : item
          ),
        })),

      clearCart: () =>
        set({
          items: [],
        }),

      openDrawer: () =>
        set({
          isDrawerOpen: true,
          isCheckoutOpen: false,
        }),

      closeDrawer: () =>
        set({
          isDrawerOpen: false,
        }),

      openCheckout: () =>
        set({
          isCheckoutOpen: true,
          isDrawerOpen: false,
        }),

      closeCheckout: () =>
        set({
          isCheckoutOpen: false,
        }),

      getTotalPrice: () =>
        get().items.reduce(
          (sum, item) =>
            sum + item.total,
          0
        ),

      getTotalItems: () =>
        get().items.reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        ),
    }),
    {
      name: "riads-cart",

      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
