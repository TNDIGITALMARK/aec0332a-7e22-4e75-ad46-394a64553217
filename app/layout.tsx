import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../src/app/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Культура - Russian Cultural Language Learning',
  description: 'Discover Russian culture and language through immersive experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-inter antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-russian-cream to-white">
          {children}
        </div>
      </body>
    </html>
  )
}