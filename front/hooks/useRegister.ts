import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch, apiErrorMessage } from '@/lib/api'
import { setToken } from '@/lib/auth'

export function useRegister() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dni, setDni] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [provincia, setProvincia] = useState('')
  const [telefono, setTelefono] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!apellido || !dni || !email || !password) {
      setError('Completá los campos obligatorios.')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nombre: nombre || undefined,
          apellido,
          dni,
          email,
          password,
          fechaNacimiento: fechaNacimiento || undefined,
          provincia: provincia || undefined,
          telefono: telefono || undefined,
        }),
      })

      if (!res.ok) {
        setError(await apiErrorMessage(res, 'No se pudo crear la cuenta. Probá de nuevo.'))
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

  return {
    nombre, setNombre,
    apellido, setApellido,
    dni, setDni,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    fechaNacimiento, setFechaNacimiento,
    provincia, setProvincia,
    telefono, setTelefono,
    showPassword, toggleShowPassword,
    error, loading, handleSubmit,
  }
}