import { Product } from "@/lib/products";
import clsx from "clsx";

export type ProductBottleLabelSize = "hero" | "card" | "thumb";

export default function ProductBottleLabelOverlay({
  product,
  size = "card",
}: {
  product: Product;
  size?: ProductBottleLabelSize;
}) {
  const title = product.shortHeading.split(":")[0];

  const meta = (() => {
    if (product.id === "jadr") {
      return { subtitle: "زيت تطويل الشعر", amount: "50ml" };
    }
    if (product.id === "nour") {
      return { subtitle: "كريم الرتينول", amount: "50ml" };
    }
    if (product.id === "naqaa") {
      return { subtitle: "كريم مزيل العرق", amount: "50g" };
    }
    return { subtitle: "", amount: "" };
  })();

  const box = (() => {
    if (size === "hero") {
      return { w: "w-[92%]", pad: "px-4 py-3", title: "text-[28px]", subtitle: "text-[14px]" };
    }
    if (size === "thumb") {
      return { w: "w-[88%]", pad: "px-3 py-2", title: "text-[14px]", subtitle: "text-[10px]" };
    }
    return { w: "w-[88%]", pad: "px-3.5 py-2.5", title: "text-[20px]", subtitle: "text-[12px]" };
  })();

  return (
    <div
      className={clsx(
        "rounded-xl border-2 bg-brand-ivory/95 backdrop-blur-sm text-center shadow-sm",
        box.w,
        box.pad,
      )}
      style={{ borderColor: product.imageColor }}
    >
      <div className="flex flex-col items-center gap-0.5">
        <div className="text-[10px] font-bold text-brand-espresso/70 uppercase leading-none">
          للجمال رياض
        </div>
        <div
          className="text-[10px] font-extrabold ltr-text leading-none"
          style={{ color: product.imageColor }}
        >
          riads
        </div>
      </div>

      <div className={clsx("font-extrabold text-brand-espresso font-arabic mt-1", box.title)}>{title}</div>
      {meta.subtitle ? (
        <div className={clsx("font-bold text-brand-espresso/70 mt-1", box.subtitle)}>{meta.subtitle}</div>
      ) : null}

      {meta.amount ? (
        <div className="text-[10px] font-bold text-brand-espresso/60 mt-2">{meta.amount}</div>
      ) : null}
    </div>
  );
}

