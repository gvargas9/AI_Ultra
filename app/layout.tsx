import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
 
const inter = Inter({ subsets: ['latin'] })
 
export const metadata: Metadata = {
  title: 'Gios Personal Assistant',
  description: 'A realtime application using OpenAI, Ultravox and WebRTC',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
