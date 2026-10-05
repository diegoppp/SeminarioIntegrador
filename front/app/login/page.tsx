'use client'

import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Lock, Mail, Ticket } from 'lucide-react'
import { useLogin } from '@/hooks/useLogin'
import InputField from '@/components/InputField'

export default function LoginPage() {
  const { email, setEmail, password, setPassword, showPassword, toggleShowPassword, error, loading, handleSubmit } = useLogin()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[34px] px-5 py-8">
      <Link href="/" className="brand flex items-center gap-2 text-2xl font-extrabold tracking-tight text-foreground no-underline">
        <span className="brand-mark"><Ticket size={19} /></span>Rewind<span className="brand-dot">.</span>
      </Link>

      <div className="w-[min(420px,100%)] rounded-[7px] border border-border bg-card px-[34px] py-9">
        <span className="eyebrow accent">Bienvenido de nuevo</span>
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
              <button
                type="button"
                className="grid place-items-center border-0 bg-transparent p-0 text-[#6a6c67]"
                onClick={toggleShowPassword}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            }
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          {error && <p className="mb-3.5 text-xs text-[#d96b5f]">{error}</p>}

          <button className="primary-button mt-1 flex w-full items-center justify-center gap-2 rounded-[7px] py-3.5 disabled:cursor-default disabled:opacity-60" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'} <ArrowRight size={17} />
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-muted-foreground">¿No tenés cuenta? <Link href="/register" className="font-bold text-primary no-underline">Registrate</Link></p>
      </div>
    </main>
  )
}