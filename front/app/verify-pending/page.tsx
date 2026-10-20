'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { MailCheck, RefreshCw, Ticket } from 'lucide-react'
import { apiFetch, apiErrorMessage } from '@/lib/api'
import { getSession } from '@/lib/auth'
import AuthShell from '@/components/AuthShell'
import PrimaryAction from '@/components/PrimaryAction'

export default function VerifyPendingPage() {
  const router = useRouter()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const isAuthenticated = getSession().isAuthenticated

  const handleResend = async () => {
    if (!isAuthenticated) {
      toast.error('Iniciá sesión para reenviar el email.')
      return
    }
    setSending(true)
    try {
      const res = await apiFetch('/auth/resend-verification', { method: 'POST' })
      if (!res.ok) {
        toast.error(await apiErrorMessage(res, 'No se pudo reenviar el email. Intentalo de nuevo.'))
        return
      }
      setSent(true)
      toast.success('Email reenviado. Revisá tu bandeja.')
    } catch {
      toast.error('No se pudo conectar con el servidor. Intentalo de nuevo.')
    } finally {
      setSending(false)
    }
  }

  return (
    <AuthShell brandIcon={<Ticket size={19} />} cardClassName="text-center">
      <>
        <MailCheck size={42} className="mx-auto text-primary" />
        <h1 className="mt-4 font-serif text-3xl font-normal tracking-tight">Revisá tu email</h1>
        <p className="my-3 text-sm leading-relaxed text-muted-foreground">
          Te enviamos un link de verificación a tu correo electrónico. Hacé clic en el link para activar tu cuenta.
        </p>

        {sent && (
          <p className="mb-3 rounded-[7px] border border-border bg-muted px-3 py-2.5 text-xs text-[#4c9b61]">
            Email reenviado correctamente.
          </p>
        )}

        <PrimaryAction
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-[7px] py-3.5 disabled:cursor-default disabled:opacity-60"
          onClick={handleResend}
          disabled={sending}
        >
          {sending ? 'Reenviando…' : 'Reenviar email'} <RefreshCw size={17} />
        </PrimaryAction>

        <button
          className="mt-4 w-full border-0 bg-transparent text-[13px] text-muted-foreground"
          onClick={() => router.push('/login')}
        >
          Volver a iniciar sesión
        </button>
      </>
    </AuthShell>
  )
}