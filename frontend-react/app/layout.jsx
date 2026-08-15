import './globals.css'

export const metadata = {
  title: 'همنواز | موسیقی، انسان، همدلی',
  description: 'پیدا کردن همنواز، ساختن گروه و ساختن یک اثر انسانی با موسیقی.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
