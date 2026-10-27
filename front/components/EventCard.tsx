import { CalendarDays, Heart, MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Eyebrow from '@/components/Eyebrow'
import { Evento } from '@/hooks/useEvent'

const fallbackImage = 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

function formatDay(dateStr: string) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-AR', { day: '2-digit' })
  } catch {
    return '--'
  }
}

function formatMonth(dateStr: string) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '').toUpperCase()
  } catch {
    return '---'
  }
}

function formatFullDate(dateStr: string) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return dateStr
  }
}

function getMinPrice(event: Evento) {
  const tarifas = event.tarifasEntrada || []
  if (tarifas.length > 0) {
    const prices = tarifas.map((t) => Number(t.monto || 0)).filter((p) => !Number.isNaN(p))
    if (prices.length > 0) return Math.min(...prices)
  }
  return 0
}

export function EventCard({ event, onSelect, favorite, onFavorite }: { event: Evento, onSelect: () => void, favorite: boolean, onFavorite: () => void }) {
  const image = event.imagenUrl || fallbackImage
  const day = formatDay(event.fechaHoraInicio)
  const month = formatMonth(event.fechaHoraInicio)
  const dateLabel = `${day} ${month}`
  const city = event.ubicacionEvento?.nombre || 'Sin ubicación'
  const category = event.tipoEvento?.nombre || event.tipoEventoNombre || 'Evento'
  const price = getMinPrice(event)
  const hasTarifas = (event.tarifasEntrada && event.tarifasEntrada.length > 0) || (event.entradas && event.entradas.length > 0)

  return <article className="group">
    <div className="relative block h-52 w-full overflow-hidden rounded-md bg-[#ddd] max-[800px]:h-55" onClick={onSelect} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect() }} role="button" tabIndex={0} aria-label={`Ver ${event.nombre}`}>
      <img className="h-full w-full object-cover transition-transform duration-350 group-hover:scale-[1.04]" src={image} alt={event.nombre} />
      <span className="absolute left-3.25 top-3.25 rounded-[3px] bg-white px-2.25 py-1.5 text-[10px] font-extrabold text-primary">{category}</span>
      <button className={`absolute right-3 top-3 grid size-8 place-items-center rounded-full border-0 bg-white/85 text-[#444] ${favorite ? 'text-primary' : ''}`} onClick={(e) => { e.stopPropagation(); onFavorite() }} aria-label="Agregar a favoritos"><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button>
      <div className="absolute bottom-3 left-3.25 grid h-12 w-11.25 place-items-center rounded-sm bg-card p-1.25 leading-none"><strong className="text-lg">{day}</strong><span className="text-[10px] font-bold text-primary">{month}</span></div>
    </div>
    <div className="flex items-start justify-between gap-2.5 pb-3.25 pt-4"><div><Eyebrow>{category}</Eyebrow><h3 className="mb-1 mt-1.25 text-lg tracking-[-0.4px]">{event.nombre}</h3><p className="m-0 text-xs text-[#797b77]">{event.descripcion?.slice(0, 60)}{event.descripcion && event.descripcion.length > 60 ? '...' : ''}</p></div><strong className="whitespace-nowrap pt-4.75 text-xs">{hasTarifas ? `Desde ${formatPrice(price)}` : 'Sin tarifas'}</strong></div>
    <div className="flex gap-3.75 border-t border-[#e1e0da] pt-2.75 text-[11px] text-[#7a7c78]"><span className="flex items-center gap-1.25"><MapPin size={14} />{city}</span><span className="flex items-center gap-1.25"><CalendarDays size={14} />{dateLabel}</span></div>
  </article>
}

export type Event = Evento & {
  title?: string
  image?: string
  tag?: string
  color?: string
  category?: string
  artist?: string
  date?: string
  price?: number
  city?: string
  fullDate?: string
  place?: string
}

export function mapEventoToCard(event: Evento) {
  const image = event.imagenUrl || fallbackImage
  return {
    ...event,
    title: event.nombre,
    image,
    tag: event.tipoEvento?.nombre || event.tipoEventoNombre,
    color: 'coral',
    category: event.tipoEvento?.nombre || event.tipoEventoNombre,
    artist: event.ubicacionEvento?.direccion || '',
    date: formatFullDate(event.fechaHoraInicio),
    price: 0,
    city: event.ubicacionEvento?.nombre || '',
    fullDate: formatFullDate(event.fechaHoraInicio),
    place: event.ubicacionEvento?.direccion || event.ubicacionEvento?.nombre || '',
  } as Event
}