import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header/Header'
import { Suspense } from 'react'
import Loading from './loading'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Fake store',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
          <Header />
          <main>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>
          <Toaster position="bottom-center" reverseOrder={false} />
        </body>
    </html>
  )
}
