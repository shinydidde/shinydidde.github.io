import './globals.css'
import type { ReactNode } from 'react'
export const metadata = { title: 'Portfolio', description: '' }
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen p-4">
        {children}
      </body>
    </html>
  )
}
