import type { ReactNode } from 'react'

export default function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#6a696e]">
      {children}
    </span>
  )
}
