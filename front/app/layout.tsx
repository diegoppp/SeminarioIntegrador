import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Rewind — Viví lo que te mueve',
  description: 'Encontrá eventos, elegí tu lugar y asegurá tu entrada en un solo lugar.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050505',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="bg-background">
      <body className="antialiased">
        {children}
        <Toaster richColors closeButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
