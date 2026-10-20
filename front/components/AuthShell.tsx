import type { ReactNode } from 'react'
import BrandLogo from '@/components/BrandLogo'

interface AuthShellProps {
  brandIcon: ReactNode
  children: ReactNode
  cardClassName?: string
}

export const authCardClassName =
  'w-[min(420px,100%)] rounded-[7px] border border-border bg-card px-8.5 py-9'

export default function AuthShell({
  brandIcon,
  children,
  cardClassName = '',
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8.5 px-5 py-8">
      <BrandLogo icon={brandIcon} />
      <div className={`${authCardClassName} ${cardClassName}`}>{children}</div>
    </main>
  )
}
