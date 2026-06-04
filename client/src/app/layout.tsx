import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'
import { Web3Provider } from './providers'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RideFlow',
  description: 'Premium car rental with crypto payments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white`}>
        <Web3Provider>
          <SessionProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
          </SessionProvider>
        </Web3Provider>
      </body>
    </html>
  )
}