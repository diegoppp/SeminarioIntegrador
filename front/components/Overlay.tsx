import type { MouseEventHandler, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface OverlayProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

export default function Overlay({ children, className = '', onClick }: OverlayProps) {
  return (
    <div
      className={cn('fixed inset-0 z-10 flex items-center justify-center bg-[#22221f7a] p-5', className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
