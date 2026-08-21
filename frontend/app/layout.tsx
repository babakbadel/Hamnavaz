import type { Metadata } from "next";
import "./globals.css";
import "./home-neon.css";
import "./neon-override.css";
import HamnavazNav from "./components/HamnavazNav";

export const metadata: Metadata = {
  title: "همنواز | پیدا کردن هم‌نواز و موسیقی‌دان",
  description: "همنواز؛ پیدا کردن نوازنده، هم‌نواز، استاد و فرصت‌های همکاری موسیقی.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <HamnavazNav />
        {children}
      </body>
    </html>
  );
}
