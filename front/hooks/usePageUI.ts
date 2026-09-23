import { useState } from 'react'
import type { Event } from '@/components/EventCard'

export function usePageUI() {
  const [selected, setSelected] = useState<Event | null>(null)
  const [organizer, setOrganizer] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const openOrganizer = () => {
    setOrganizer(true)
    setMenuOpen(false)
  }

  return { selected, setSelected, organizer, setOrganizer, menuOpen, setMenuOpen, openOrganizer }
}