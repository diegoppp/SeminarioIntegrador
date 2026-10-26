import { CalendarDays, Heart, MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Eyebrow from '@/components/Eyebrow'
import { Evento } from '@/hooks/useEvent'

const tagColors: Record<string, string> = {
  coral: 'text-primary',
  blue: 'text-[#4265a0]',
  yellow: 'text-[#987a15]',
  purple: 'text-[#7255b0]',
  green: 'text-[#347250]',
  pink: 'text-[#c04c77]',
}

export function EventCard({ event, onSelect, favorite, onFavorite }: { event: Evento, onSelect: () => void, favorite: boolean, onFavorite: () => void }) {
  return <article className="group">
    <div className="relative block h-52 w-full overflow-hidden rounded-md bg-[#ddd] max-[800px]:h-55" onClick={onSelect} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect() }} role="button" tabIndex={0} aria-label={`Ver ${event.title}`}>
      <img className="h-full w-full object-cover transition-transform duration-350 group-hover:scale-[1.04]" src={event.image} alt="" />
      <span className={`absolute left-3.25 top-3.25 rounded-[3px] bg-white px-2.25 py-1.5 text-[10px] font-extrabold text-[#454643] ${tagColors[event.color]}`}>{event.tag}</span>
      <button className={`absolute right-3 top-3 grid size-8 place-items-center rounded-full border-0 bg-white/85 text-[#444] ${favorite ? 'text-primary' : ''}`} onClick={(e) => { e.stopPropagation(); onFavorite() }} aria-label="Agregar a favoritos"><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button>
      <div className="absolute bottom-3 left-3.25 grid h-12 w-11.25 place-items-center rounded-sm bg-card p-1.25 leading-none"><strong className="text-lg">{event.date.split(' ')[0]}</strong><span className="text-[10px] font-bold text-primary">{event.date.split(' ')[1]}</span></div>
    </div>
    <div className="flex items-start justify-between gap-2.5 pb-3.25 pt-4"><div><Eyebrow>{event.category}</Eyebrow><h3 className="mb-1 mt-1.25 text-lg tracking-[-0.4px]">{event.title}</h3><p className="m-0 text-xs text-[#797b77]">{event.artist}</p></div><strong className="whitespace-nowrap pt-4.75 text-xs">Desde {formatPrice(event.price)}</strong></div>
    <div className="flex gap-3.75 border-t border-[#e1e0da] pt-2.75 text-[11px] text-[#7a7c78]"><span className="flex items-center gap-1.25"><MapPin size={14} />{event.city}</span><span className="flex items-center gap-1.25"><CalendarDays size={14} />{event.date}</span></div>
  </article>
}