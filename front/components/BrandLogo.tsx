import Link from 'next/link'
import type { ReactNode } from 'react'

interface BrandLogoProps {
  icon: ReactNode
  href?: string
}

export default function BrandLogo({ icon, href = '/' }: BrandLogoProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.75 text-[23px] font-extrabold tracking-[-1.5px] text-foreground no-underline"
    >
      <span className="grid size-7.5 place-items-center rounded-[9px_9px_9px_2px] bg-primary text-white">
        {icon}
      </span>
      Rewind<span className="text-primary">.</span>
    </Link>
  )
}
