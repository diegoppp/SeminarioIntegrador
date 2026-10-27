import { useState, useEffect, useCallback } from 'react'
import { apiFetch, apiErrorMessage } from '../lib/api'

export interface TipoEvento {
  nombre: string
  descripcion: string
}

export interface UbicacionEvento {
  idUbicacion: number
  nombre: string
  direccion: string
  capacidad: number
}

export interface Sector {
  id: number
  nombre: string
  capacidad: number
}

export interface TarifaEntrada {
  id: number
  eventoId: number
  sectorId: number
  monto: number | string
  sector?: Sector
  evento?: Evento
}

export interface Entrada {
  id: number
  fechaEmision: string
  codigoQR?: string | null
  eventoId: number
  sectorId: number
  tarifaEntradaId?: number | null
  sector?: Sector
  tarifaEntrada?: TarifaEntrada | null
}

export interface Evento {
  id: number
  nombre: string
  descripcion: string
  fechaHoraInicio: string
  fechaHoraFin: string
  tipoEventoNombre: string 
  tipoEvento: TipoEvento
  estadoEvento: string
  ubicacionEvento: UbicacionEvento
  entradas?: Entrada[]
  tarifasEntrada?: TarifaEntrada[]
  imagenUrl?: string | null
}

export type CreateEventoInput = Omit<
  Evento,
  'id' | 'tipoEvento' | 'ubicacionEvento'
> & {
  idUbicacion: number
}

export function useEvent() {
  const [events, setEvents] = useState<Evento[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFetch('/eventos')

      if (!res.ok) {
        const msg = await apiErrorMessage(res, 'Error al cargar los eventos')
        throw new Error(msg)
      }

      const data: Evento[] = await res.json()
      setEvents(data)
    } catch (err: any) {
      setError(err.message || 'Error de conexión')
    } finally {
      setLoading(false)
    }
  }, []) 
  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const createEvent = async (
    eventData: CreateEventoInput
  ): Promise<Evento | null> => {
    setError(null)
    try {
      const res = await apiFetch('/eventos', {
        method: 'POST',
        body: JSON.stringify(eventData),
      })

      if (!res.ok) {
        const msg = await apiErrorMessage(res, 'No se pudo crear el evento')
        throw new Error(msg)
      }

      const newEvent: Evento = await res.json()
      setEvents((prev) => [...prev, newEvent])
      return newEvent
    } catch (err: any) {
      setError(err.message)
      return null
    }
  }

  const deleteEvent = async (id: number): Promise<boolean> => {
    setError(null)
    try {
      const res = await apiFetch(`/eventos/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const msg = await apiErrorMessage(res, 'No se pudo eliminar el evento')
        throw new Error(msg)
      }

      setEvents((prev) => prev.filter((event) => event.id !== id))
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    }
  }

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
    createEvent,
    deleteEvent,
  }
}