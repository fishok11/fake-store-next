import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}