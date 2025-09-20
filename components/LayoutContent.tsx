'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}