import { CalendarDays, Heart, MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export interface Event {
  id: number
  title: string
  artist: string
  category: string
  date: string
  fullDate: string
  place: string
  city: string
  price: number
  color: string
  tag: string
  image: string
}

export function EventCard({ event, onSelect, favorite, onFavorite }: { event: Event, onSelect: () => void, favorite: boolean, onFavorite: () => void }) {
  return <article className="event-card">
    <div className="event-image" onClick={onSelect} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect() }} role="button" tabIndex={0} aria-label={`Ver ${event.title}`}>
      <img src={event.image} alt="" />
      <span className={`event-tag ${event.color}`}>{event.tag}</span>
      <button className={`heart-button ${favorite ? 'is-favorite' : ''}`} onClick={(e) => { e.stopPropagation(); onFavorite() }} aria-label="Agregar a favoritos"><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button>
      <div className="date-block"><strong>{event.date.split(' ')[0]}</strong><span>{event.date.split(' ')[1]}</span></div>
    </div>
    <div className="event-copy"><div><span className="eyebrow">{event.category}</span><h3>{event.title}</h3><p>{event.artist}</p></div><strong className="event-price">Desde {formatPrice(event.price)}</strong></div>
    <div className="event-meta"><span><MapPin size={14} />{event.city}</span><span><CalendarDays size={14} />{event.date}</span></div>
  </article>
}