"use client";
import { clsx } from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "cta";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: any;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", fullWidth = false, loading = false, className, children, disabled, as: Component, href, ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

    const variants: Record<Variant, string> = {
      primary: "bg-brand-primary text-brand-ivory hover:bg-opacity-90 active:scale-95",
      cta: "bg-brand-cta text-white hover:bg-brand-cta-hover active:bg-brand-cta-hover active:scale-95 shadow-md",
      secondary: "bg-brand-ivory text-brand-primary border-2 border-brand-primary hover:bg-brand-cream active:scale-95",
      ghost: "text-brand-espresso hover:text-brand-primary hover:bg-brand-cream",
    };

    const sizes: Record<Size, string> = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const allClasses = clsx(base, variants[variant], sizes[size], fullWidth && "w-full", className);

    const content = loading ? (
      <span className="flex items-center gap-2">
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        جاري المعالجة...
      </span>
    ) : (
      children
    );

    if (Component) {
      return (
        <Component href={href} className={allClasses} {...props}>
          {content}
        </Component>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={allClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
