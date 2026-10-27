'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Image as ImageIcon, MapPin, Tag, Ticket, Users } from 'lucide-react'
import { useEvent } from '@/hooks/useEvent'
import { API_URL } from '@/lib/api'

export default function CrearEventoPage() {
  const { createEvent, error, loading } = useEvent()
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    tipoEventoNombre: 'Concierto',
    estadoEvento: 'ACTIVO',
    idUbicacion: 1,
    imagenUrl: '',
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'idUbicacion' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)
    const result = await createEvent({
      nombre: form.nombre,
      descripcion: form.descripcion,
      fechaHoraInicio: form.fechaHoraInicio,
      fechaHoraFin: form.fechaHoraFin,
      tipoEventoNombre: form.tipoEventoNombre,
      estadoEvento: form.estadoEvento,
      idUbicacion: form.idUbicacion,
      imagenUrl: form.imagenUrl || undefined,
    } as any)
    if (result) {
      setSuccess(true)
      setForm((prev) => ({ ...prev, nombre: '', descripcion: '', imagenUrl: '' }))
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="flex h-19 items-center justify-between border-b border-border px-[5.5vw]">
        <Link href="/" className="flex items-center gap-2 text-sm text-[#62645f] no-underline">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Ticket size={18} /> Crear evento
        </div>
      </header>

      <div className="mx-auto max-w-225 px-5 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-4xl tracking-tight">Crear nuevo evento</h1>
          <p className="mt-2 text-sm text-muted-foreground">Completá los datos para publicar tu evento en la plataforma.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 rounded-lg border border-border bg-card p-8">
          <div className="grid gap-2">
            <label className="flex items-center gap-2 text-sm"><Tag size={16} />Nombre del evento</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm">Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required rows={4} className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="flex items-center gap-2 text-sm"><Calendar size={16} />Fecha y hora de inicio</label>
              <input type="datetime-local" name="fechaHoraInicio" value={form.fechaHoraInicio} onChange={handleChange} required className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="grid gap-2">
              <label className="flex items-center gap-2 text-sm"><Calendar size={16} />Fecha y hora de fin</label>
              <input type="datetime-local" name="fechaHoraFin" value={form.fechaHoraFin} onChange={handleChange} required className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm">Tipo de evento</label>
              <select name="tipoEventoNombre" value={form.tipoEventoNombre} onChange={handleChange} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
                <option value="Concierto">Concierto</option>
                <option value="Teatro">Teatro</option>
                <option value="Deportivo">Deportivo</option>
                <option value="Festival">Festival</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Estado</label>
              <select name="estadoEvento" value={form.estadoEvento} onChange={handleChange} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <label className="flex items-center gap-2 text-sm"><MapPin size={16} />ID de ubicación</label>
            <input type="number" name="idUbicacion" value={form.idUbicacion} onChange={handleChange} required className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </div>

          <div className="grid gap-2">
            <label className="flex items-center gap-2 text-sm"><ImageIcon size={16} />URL de imagen (opcional)</label>
            <input name="imagenUrl" value={form.imagenUrl} onChange={handleChange} placeholder="https://..." className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
            <p className="text-xs text-muted-foreground">Podés usar una URL externa por ahora. Más adelante podemos agregar subida directa.</p>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-emerald-400">Evento creado correctamente.</p>}

          <button type="submit" disabled={loading} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? 'Creando...' : 'Crear evento'}
          </button>
        </form>
      </div>
    </main>
  )
}
