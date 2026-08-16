import "./globals.css";
import "./visual-overrides.css";
import HomeCommunityInjector from "./HomeCommunityInjector";

export const metadata = {
  title: "همنواز | موسیقی را با هم بسازیم",
  description:
    "پیدا کردن نوازنده، گروه، مدرس، اجرا و فرصت‌های موسیقی در همنواز",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
        <HomeCommunityInjector />
      </body>
    </html>
  );
}
