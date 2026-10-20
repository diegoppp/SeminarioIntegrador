'use client'

import Link from 'next/link'
import { ArrowRight, Lock, Mail, Ticket } from 'lucide-react'
import { useLogin } from '@/hooks/useLogin'
import InputField from '@/components/InputField'
import PasswordVisibilityToggle from '@/components/PasswordVisibilityToggle'
import AuthShell from '@/components/AuthShell'
import Eyebrow from '@/components/Eyebrow'
import PrimaryAction from '@/components/PrimaryAction'

export default function LoginPage() {
  const { email, setEmail, password, setPassword, showPassword, toggleShowPassword, error, loading, handleSubmit } = useLogin()

  return (
    <AuthShell brandIcon={<Ticket size={19} />}>
      <>
        <Eyebrow>Bienvenido de nuevo</Eyebrow>
        <h1 className="mt-2 font-serif text-4xl font-normal leading-tight tracking-tight">Ingresá a tu cuenta</h1>
        <p className="my-2.5 mb-6 text-sm leading-relaxed text-muted-foreground">Entrá para comprar entradas y seguir tus eventos favoritos.</p>

        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Email"
            icon={<Mail size={17} />}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
          />

          <InputField
            label="Contraseña"
            icon={<Lock size={17} />}
            rightSlot={
              <PasswordVisibilityToggle
                showPassword={showPassword}
                onToggle={toggleShowPassword}
                label="la contraseña"
              />
            }
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          {error && <p className="mb-3.5 text-xs text-[#d96b5f]">{error}</p>}

          <PrimaryAction className="mt-1 flex w-full items-center justify-center gap-2 rounded-[7px] py-3.5 disabled:cursor-default disabled:opacity-60" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'} <ArrowRight size={17} />
          </PrimaryAction>
        </form>

        <p className="mt-6 text-center text-[13px] text-muted-foreground">¿No tenés cuenta? <Link href="/register" className="font-bold text-primary no-underline">Registrate</Link></p>
      </>
    </AuthShell>
  )
}