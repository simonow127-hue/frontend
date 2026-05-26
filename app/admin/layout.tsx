import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | riads",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="font-body">{children}</div>;
}
