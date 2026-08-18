import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "همنواز | پیدا کردن هم‌نواز و موسیقی‌دان",
  description: "همنواز؛ پیدا کردن نوازنده، هم‌نواز، استاد و فرصت‌های همکاری موسیقی.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
