import { useCallback, useEffect, useState } from 'react'
import { apiFetch, apiErrorMessage } from '@/lib/api'
import { getSession, setToken } from '@/lib/auth'

export type VerifyStatus = 'loading' | 'success' | 'error'

export function useVerifyEmail(token: string | null) {
  const [status, setStatus] = useState<VerifyStatus>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setError('Token no encontrado en la URL.')
      return
    }

    let cancelled = false

    const verify = async () => {
      try {
        const res = await apiFetch('/auth/verify-email', {
          method: 'POST',
          body: JSON.stringify({ token }),
        })

        if (!res.ok) {
          const message = await apiErrorMessage(res, 'Token inválido o expirado.')
          if (!cancelled) {
            setStatus('error')
            setError(message)
          }
          return
        }

        const data = await res.json()
        if (!cancelled) {
          if (data.access_token) setToken(data.access_token)
          setStatus('success')
        }
      } catch {
        if (!cancelled) {
          setStatus('error')
          setError('No se pudo conectar con el servidor. Intentalo de nuevo.')
        }
      }
    }

    verify()

    return () => {
      cancelled = true
    }
  }, [token])

  const canResend = getSession().isAuthenticated

  const resend = useCallback(async (): Promise<{ ok: boolean; message: string }> => {
    try {
      const res = await apiFetch('/auth/resend-verification', { method: 'POST' })
      if (!res.ok) {
        const message = await apiErrorMessage(res, 'No se pudo reenviar el email. Iniciá sesión e intentá de nuevo.')
        return { ok: false, message }
      }
      return { ok: true, message: 'Email reenviado. Revisá tu bandeja.' }
    } catch {
      return { ok: false, message: 'No se pudo conectar con el servidor. Intentalo de nuevo.' }
    }
  }, [])

  return { status, error, canResend, resend }
}