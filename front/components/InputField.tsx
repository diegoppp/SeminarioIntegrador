'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  icon?: ReactNode
  rightSlot?: ReactNode
  error?: string
}

export default function InputField({ label, icon, rightSlot, error, ...inputProps }: InputFieldProps) {
  return (
    <label className="mb-4.5 block">
      <span className="mb-2 block text-xs font-bold text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 focus-within:border-primary [&_svg]:shrink-0 [&_svg]:text-[#6a6c67]">
        {icon}
        <input {...inputProps} className="min-w-0 flex-1 bg-transparent py-3.25 text-sm text-foreground outline-none" />
        {rightSlot}
      </div>
      {error && <p className="mt-2 text-xs text-[#d96b5f]">{error}</p>}
    </label>
  )
}