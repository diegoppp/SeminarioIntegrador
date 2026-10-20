'use client'

import Link from 'next/link'
import { ArrowRight, CalendarDays, CreditCard, Lock, Mail, MapPin, Phone, Ticket, User } from 'lucide-react'
import { useRegister } from '@/hooks/useRegister'
import InputField from '@/components/InputField'
import PasswordVisibilityToggle from '@/components/PasswordVisibilityToggle'
import AuthShell from '@/components/AuthShell'
import Eyebrow from '@/components/Eyebrow'
import PrimaryAction from '@/components/PrimaryAction'

export default function RegisterPage() {
  const {
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
  } = useRegister()

  return (
    <AuthShell brandIcon={<Ticket size={19} />}>
      <>
        <Eyebrow>Empieza acá</Eyebrow>
        <h1 className="mt-2 font-serif text-4xl font-normal leading-tight tracking-tight">Creá tu cuenta</h1>
        <p className="my-2.5 mb-6 text-sm leading-relaxed text-muted-foreground">Registrate para comprar entradas y descubrir tus próximas experiencias.</p>

        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Nombre"
            icon={<User size={17} />}
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Juan"
            autoComplete="given-name"
          />

          <InputField
            label="Apellido"
            icon={<User size={17} />}
            value={apellido}
            onChange={e => setApellido(e.target.value)}
            placeholder="Pérez"
            autoComplete="family-name"
            required
          />

          <InputField
            label="DNI"
            icon={<CreditCard size={17} />}
            value={dni}
            onChange={e => setDni(e.target.value)}
            placeholder="34567890"
            autoComplete="off"
            maxLength={20}
            required
          />

          <InputField
            label="Fecha de nacimiento"
            icon={<CalendarDays size={17} />}
            type="date"
            value={fechaNacimiento}
            onChange={e => setFechaNacimiento(e.target.value)}
          />

          <InputField
            label="Provincia"
            icon={<MapPin size={17} />}
            value={provincia}
            onChange={e => setProvincia(e.target.value)}
            placeholder="Buenos Aires"
          />

          <InputField
            label="Teléfono"
            icon={<Phone size={17} />}
            type="tel"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            placeholder="11 2345 6789"
            autoComplete="tel"
            maxLength={30}
          />

          <InputField
            label="Email"
            icon={<Mail size={17} />}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
            required
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
            autoComplete="new-password"
            minLength={8}
            required
          />

          <InputField
            label="Confirmar contraseña"
            icon={<Lock size={17} />}
            rightSlot={
              <PasswordVisibilityToggle
                showPassword={showPassword}
                onToggle={toggleShowPassword}
                label="la confirmación"
              />
            }
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            minLength={8}
            required
          />

          {error && <p className="mb-3.5 text-xs text-[#d96b5f]">{error}</p>}

          <PrimaryAction className="mt-1 flex w-full items-center justify-center gap-2 rounded-[7px] py-3.5 disabled:cursor-default disabled:opacity-60" disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Crear cuenta'} <ArrowRight size={17} />
          </PrimaryAction>
        </form>

        <p className="mt-6 text-center text-[13px] text-muted-foreground">¿Ya tenés cuenta? <Link href="/login" className="font-bold text-primary no-underline">Ingresá</Link></p>
      </>
    </AuthShell>
  )
}