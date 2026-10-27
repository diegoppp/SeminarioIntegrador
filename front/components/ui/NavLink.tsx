import Link from 'next/link'
import type { ReactNode } from 'react'

interface NavLinkProps {
  href: string
  children: ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  const styles =
    'flex items-center gap-1.75 text-sm text-[#62645f] no-underline hover:text-foreground'

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  )
}
