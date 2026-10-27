import { useMemo, useState } from 'react'
import { Evento } from './useEvent'

export function useEventCatalog(events: Evento[]) {
  const [query, setQuery] = useState('')
  const [tipoEvento, setTipoEvento] = useState('Todos')
  const [favorites, setFavorites] = useState<number[]>([])

  const filtered = useMemo(
    () =>
      events.filter((evento) => {
        const coincideTipo =
          tipoEvento === 'Todos' ||
          (evento.tipoEvento?.nombre || evento.tipoEventoNombre) === tipoEvento

        const textoBusqueda = [
          evento.nombre,
          evento.descripcion,
          evento.tipoEvento?.nombre || evento.tipoEventoNombre,
          evento.ubicacionEvento?.nombre || '',
          evento.ubicacionEvento?.direccion || '',
        ]
          .join(' ')
          .toLowerCase()

        const coincideBusqueda = textoBusqueda.includes(
          query.toLowerCase().trim(),
        )

        return coincideTipo && coincideBusqueda
      }),
    [events, query, tipoEvento],
  )

  const toggleFavorite = (id: number) =>
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id],
    )

  return {
    query,
    setQuery,
    tipoEvento,
    setTipoEvento,
    favorites,
    toggleFavorite,
    filtered,
  }
}
