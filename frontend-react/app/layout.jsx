import './globals.css'
import { Manrope, Vazirmatn } from 'next/font/google'

const faFont = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-fa',
  preload: true,
})

const latinFont = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-latin',
  preload: true,
})

export const metadata = {
  title: 'همنواز | موسیقی، انسان، همدلی',
  description: 'پیدا کردن همنواز، ساختن گروه و ساختن یک اثر انسانی با موسیقی.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${faFont.variable} ${latinFont.variable}`}>{children}</body>
    </html>
  )
}
