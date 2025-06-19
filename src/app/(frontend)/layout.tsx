// File: layout.tsx
import React from 'react'
import './globals.css'
import Navbar from './components/navbar'
import { ThemeProvider } from 'next-themes';

export const metadata = {
  description: 'Description Page',
  title: 'SMK Negeri 1 Adiwerna',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {/* Tambahkan div pembungkus dengan padding atas yang sesuai */}
          <div className="pt-16 lg:pt-20"> {/* pt-16 untuk mobile, pt-20 untuk desktop */}
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}