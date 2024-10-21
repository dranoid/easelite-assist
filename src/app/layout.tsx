import './globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Easelite Assist - Student Grants and Community Deals',
  description: 'Decentralizing student support and community deals, all on-chain.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
