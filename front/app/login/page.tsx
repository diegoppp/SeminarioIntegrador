'use client'

import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Lock, Mail, Ticket } from 'lucide-react'
import { useLogin } from '@/hooks/useLogin'

export default function LoginPage() {
  const { email, setEmail, password, setPassword, showPassword, toggleShowPassword, error, loading, handleSubmit } = useLogin()

  return (
    <main className="auth-page">
      <Link href="/" className="brand auth-brand">
        <span className="brand-mark"><Ticket size={19} /></span>entrada<span className="brand-dot">.</span>
      </Link>

      <div className="auth-card">
        <span className="eyebrow accent">Bienvenido de nuevo</span>
        <h1>Ingresá a tu cuenta</h1>
        <p className="auth-subtitle">Entrá para comprar entradas y seguir tus eventos favoritos.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="auth-field">
            <span>Email</span>
            <div className="auth-input">
              <Mail size={17} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                autoComplete="email"
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Contraseña</span>
            <div className="auth-input">
              <Lock size={17} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-eye"
                onClick={toggleShowPassword}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button className="primary-button auth-submit" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'} <ArrowRight size={17} />
          </button>
        </form>

        <p className="auth-footer">¿No tenés cuenta? <a href="#">Registrate</a></p>
      </div>
    </main>
  )
}