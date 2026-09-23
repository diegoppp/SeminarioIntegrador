import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

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

    // TODO: conectar con el back cuando exista el endpoint real.
    // Ejemplo:
    // const res = await fetch('http://localhost:3000/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })
    // if (!res.ok) {
    //   setError('Credenciales inválidas.')
    //   setLoading(false)
    //   return
    // }

    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    router.push('/')
  }

  const toggleShowPassword = () => setShowPassword(s => !s)

  return { email, setEmail, password, setPassword, showPassword, toggleShowPassword, error, loading, handleSubmit }
}