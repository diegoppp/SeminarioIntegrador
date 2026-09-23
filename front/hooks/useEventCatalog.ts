import { useMemo, useState } from 'react'
import type { Event } from '@/components/EventCard'

export function useEventCatalog(events: Event[]) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const [favorites, setFavorites] = useState<number[]>([])

  const filtered = useMemo(
    () => events.filter(e => (category === 'Todos' || e.category === category) && `${e.title} ${e.artist} ${e.city}`.toLowerCase().includes(query.toLowerCase())),
    [events, query, category],
  )

  const toggleFavorite = (id: number) =>
    setFavorites(f => (f.includes(id) ? f.filter(x => x !== id) : [...f, id]))

  return { query, setQuery, category, setCategory, favorites, toggleFavorite, filtered }
}