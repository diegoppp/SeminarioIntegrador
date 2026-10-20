'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, CheckCircle2, TriangleAlert, House, LogIn, RefreshCw } from 'lucide-react'
import { useVerifyEmail } from '@/hooks/useVerifyEmail'
import AuthShell from '@/components/AuthShell'
import Eyebrow from '@/components/Eyebrow'
import PrimaryAction from '@/components/PrimaryAction'

function VerifyEmailContent() {
  const token = useSearchParams().get('token')
  const { status, error, canResend, resend } = useVerifyEmail(token)
  const [sending, setSending] = useState(false)

  const handleResend = async () => {
    setSending(true)
    const result = await resend()
    if (result.ok) toast.success(result.message)
    else toast.error(result.message)
    setSending(false)
  }

  return (
    <AuthShell brandIcon={<House size={19} />} cardClassName="text-center">
      <>
        {status === 'loading' && (
          <>
            <Loader2 size={42} className="mx-auto animate-spin text-primary" />
            <h1 className="mt-4 font-serif text-3xl font-normal tracking-tight">Verificando tu email…</h1>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 size={42} className="mx-auto text-[#4c9b61]" />
            <h1 className="mt-4 font-serif text-3xl font-normal tracking-tight">Email verificado correctamente</h1>
            <p className="my-3 text-sm leading-relaxed text-muted-foreground">Tu cuenta ya está activa.</p>
            <PrimaryAction href="/" className="mt-3 flex w-full items-center justify-center gap-2 rounded-[7px] py-3.5 no-underline">
              Ir al inicio <House size={17} />
            </PrimaryAction>
          </>
        )}

        {status === 'error' && (
          <>
            <TriangleAlert size={42} className="mx-auto text-[#d96b5f]" />
            <h1 className="mt-4 font-serif text-3xl font-normal tracking-tight">Error de verificación</h1>
            <p className="my-3 text-sm leading-relaxed text-muted-foreground">{error}</p>

            {canResend ? (
              <PrimaryAction
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-[7px] py-3.5 disabled:cursor-default disabled:opacity-60"
                onClick={handleResend}
                disabled={sending}
              >
                {sending ? 'Reenviando…' : 'Reenviar email'} <RefreshCw size={17} />
              </PrimaryAction>
            ) : (
              <p className="my-3 text-xs text-muted-foreground">Para reenviar el email, primero iniciá sesión.</p>
            )}

            <Link href="/" className="mt-4 block text-center text-[13px] font-bold text-primary no-underline">
              Ir al inicio
            </Link>
            {!canResend && (
              <Link href="/login" className="mt-3 block text-center text-[13px] font-bold text-primary no-underline">
                <LogIn size={14} className="mr-1 inline" />
                Ir a iniciar sesión
              </Link>
            )}
          </>
        )}
      </>
    </AuthShell>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  )
}