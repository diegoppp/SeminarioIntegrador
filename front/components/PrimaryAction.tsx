import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

interface PrimaryLinkProps {
  href: string
  children: ReactNode
  className?: string
}

const baseClassName =
  'border-0 rounded-md bg-primary px-5.25 py-3.25 text-[13px] font-bold text-white'

export default function PrimaryAction(props: PrimaryButtonProps | PrimaryLinkProps) {
  if ('href' in props) {
    const { href, children, className = '' } = props
    return (
      <Link href={href} className={cn(baseClassName, className)}>
        {children}
      </Link>
    )
  }

  const { children, className = '', ...buttonProps } = props
  return (
    <button className={cn(baseClassName, className)} {...buttonProps}>
      {children}
    </button>
  )
}
