import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch, apiErrorMessage } from '@/lib/api'
import { setToken } from '@/lib/auth'

export function useLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Completá tu email y contraseña.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        setError(await apiErrorMessage(res, 'Credenciales inválidas.'))
        return
      }

      const data = await res.json()
      setToken(data.access_token)
      router.push('/')
    } catch {
      setError('No se pudo conectar con el servidor. Intentalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const toggleShowPassword = () => setShowPassword(s => !s)

  return { email, setEmail, password, setPassword, showPassword, toggleShowPassword, error, loading, handleSubmit }
}