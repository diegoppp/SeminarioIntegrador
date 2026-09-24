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

const tagColors: Record<string, string> = {
  coral: 'text-primary',
  blue: 'text-[#4265a0]',
  yellow: 'text-[#987a15]',
  purple: 'text-[#7255b0]',
  green: 'text-[#347250]',
  pink: 'text-[#c04c77]',
}

export function EventCard({ event, onSelect, favorite, onFavorite }: { event: Event, onSelect: () => void, favorite: boolean, onFavorite: () => void }) {
  return <article className="group">
    <div className="relative block h-[208px] w-full overflow-hidden rounded-md bg-[#ddd] max-[800px]:h-[220px]" onClick={onSelect} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect() }} role="button" tabIndex={0} aria-label={`Ver ${event.title}`}>
      <img className="h-full w-full object-cover transition-transform duration-[350ms] group-hover:scale-[1.04]" src={event.image} alt="" />
      <span className={`absolute left-[13px] top-[13px] rounded-[3px] bg-white px-[9px] py-[6px] text-[10px] font-extrabold text-[#454643] ${tagColors[event.color]}`}>{event.tag}</span>
      <button className={`absolute right-3 top-3 grid size-8 place-items-center rounded-full border-0 bg-white/85 text-[#444] ${favorite ? 'text-primary' : ''}`} onClick={(e) => { e.stopPropagation(); onFavorite() }} aria-label="Agregar a favoritos"><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button>
      <div className="absolute bottom-3 left-[13px] grid h-12 w-[45px] place-items-center rounded-[4px] bg-card p-[5px] leading-none"><strong className="text-lg">{event.date.split(' ')[0]}</strong><span className="text-[10px] font-bold text-primary">{event.date.split(' ')[1]}</span></div>
    </div>
    <div className="flex items-start justify-between gap-2.5 pb-[13px] pt-4"><div><span className="eyebrow">{event.category}</span><h3 className="mb-1 mt-[5px] text-lg tracking-[-0.4px]">{event.title}</h3><p className="m-0 text-xs text-[#797b77]">{event.artist}</p></div><strong className="whitespace-nowrap pt-[19px] text-xs">Desde {formatPrice(event.price)}</strong></div>
    <div className="flex gap-[15px] border-t border-[#e1e0da] pt-[11px] text-[11px] text-[#7a7c78]"><span className="flex items-center gap-[5px]"><MapPin size={14} />{event.city}</span><span className="flex items-center gap-[5px]"><CalendarDays size={14} />{event.date}</span></div>
  </article>
}