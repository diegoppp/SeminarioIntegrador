'use client'

import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  LayoutDashboard,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Ticket,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { EventCard, type Event } from '@/components/EventCard'
import BrandLogo from '@/components/BrandLogo'
import Eyebrow from '@/components/Eyebrow'
import Overlay from '@/components/Overlay'
import PrimaryAction from '@/components/PrimaryAction'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { useEventCatalog } from '@/hooks/useEventCatalog'
import { usePageUI } from '@/hooks/usePageUI'
import { useEvent } from '@/hooks/useEvent'

export default function Page() {
  const { events, loading, error } = useEvent()
  const { query, setQuery, category, setCategory, favorites, toggleFavorite, filtered } = useEventCatalog(events)
  const { cart, cartOpen, count, total, service, addToCart, updateQuantity, openCart, closeCart } = useCart()
  const { selected, setSelected, organizer, setOrganizer, menuOpen, setMenuOpen, openOrganizer } = usePageUI()
  if (loading) {return <p>Cargando eventos...</p>}
  if (error) {return <p>Error: {error}</p>}

  return (
    <main className="min-h-screen">
      <header className="relative z-3 flex h-19 items-center justify-between border-b border-border bg-background px-[5.5vw] max-[800px]:px-5">
        <BrandLogo href="#inicio" icon={<Ticket size={19} />} />
        <nav className={`${menuOpen ? 'max-[800px]:flex' : 'max-[800px]:hidden'} ml-[9%] flex items-center gap-8.5 max-[800px]:absolute max-[800px]:left-0 max-[800px]:right-0 max-[800px]:top-19 max-[800px]:m-0 max-[800px]:flex-col max-[800px]:items-start max-[800px]:gap-5 max-[800px]:border-b max-[800px]:border-border max-[800px]:bg-background max-[800px]:p-5`}>
          <a href="#eventos" className="flex items-center gap-1.75 text-sm text-[#62645f] no-underline hover:text-foreground">Descubrir eventos</a>
          <a href="#como-funciona" className="flex items-center gap-1.75 text-sm text-[#62645f] no-underline hover:text-foreground">¿Cómo funciona?</a>
          <button className="flex items-center gap-1.75 border-0 bg-transparent text-sm text-[#62645f] hover:text-foreground" onClick={openOrganizer}>
            <LayoutDashboard size={16} />Soy organizador
          </button>
        </nav>
        <div className="flex items-center gap-5.75">
          <Link href="/login" className="border-0 bg-transparent text-sm text-[#5e625e] no-underline max-[800px]:hidden">Ingresar</Link>
          <button className="relative border-0 bg-transparent text-foreground" onClick={openCart} aria-label="Abrir carrito">
            <ShoppingBag size={19} />
            <span className="absolute -right-2.25 -top-2 grid size-4.25 place-items-center rounded-full bg-primary text-[10px] text-white">{count}</span>
          </button>
          <button className="hidden border-0 bg-transparent text-foreground max-[800px]:block" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            <Menu size={20} />
          </button>
        </div>
      </header>

      {organizer ? (
        <section className="mx-auto max-w-310 px-10 pb-22.5 pt-10.5 max-[800px]:px-5.5 max-[800px]:py-7.5">
          <div className="flex items-center justify-between">
            <button className="border-0 bg-transparent text-[13px] text-[#777974]" onClick={() => setOrganizer(false)}>← Volver a eventos</button>
            <span className="flex items-center gap-1.5 rounded-full bg-[#e3f2e5] px-2.75 py-1.75 text-[11px] text-[#468359]">
              <span className="size-1.5 rounded-full bg-[#4c9b61]" />Cuenta verificada
            </span>
          </div>
          <div className="mb-10 mt-13.75 flex items-end justify-between max-[800px]:mb-7.5 max-[800px]:mt-11.25 max-[800px]:block">
            <div>
              <Eyebrow>Panel de organizador</Eyebrow>
              <h1 className="mt-2.75 font-serif text-[51px] font-normal leading-none tracking-[-1.5px] max-[800px]:text-[41px]">
                Buen día, <em className="not-italic text-primary">Productora Norte.</em>
              </h1>
              <p className="mt-3 text-[#80827d]">Este es el resumen de tus eventos y ventas.</p>
            </div>
            <PrimaryAction className="max-[800px]:mt-5.5">+ Crear evento</PrimaryAction>
          </div>
          <div className="grid grid-cols-4 gap-3.75 max-[800px]:grid-cols-2">
            <div className="rounded-md bg-card p-5.5 max-[800px]:p-3.75"><span className="block text-[11px] text-[#777974]">Ingresos generados</span><strong className="my-3.5 block text-[27px] tracking-[-1px] max-[800px]:text-[21px]">$ 18.420.500</strong><small className="text-[11px] text-[#468359]">↑ 12,8% vs. mes anterior</small></div>
            <div className="rounded-md bg-card p-5.5 max-[800px]:p-3.75"><span className="block text-[11px] text-[#777974]">Entradas vendidas</span><strong className="my-3.5 block text-[27px] tracking-[-1px] max-[800px]:text-[21px]">2.846</strong><small className="text-[11px] text-[#468359]">↑ 8,2% vs. mes anterior</small></div>
            <div className="rounded-md bg-card p-5.5 max-[800px]:p-3.75"><span className="block text-[11px] text-[#777974]">Ocupación promedio</span><strong className="my-3.5 block text-[27px] tracking-[-1px] max-[800px]:text-[21px]">78,4%</strong><small className="text-[11px] text-[#777974]">En 6 eventos activos</small></div>
            <div className="rounded-md bg-card p-5.5 max-[800px]:p-3.75"><span className="block text-[11px] text-[#777974]">Asistencia total</span><strong className="my-3.5 block text-[27px] tracking-[-1px] max-[800px]:text-[21px]">94,2%</strong><small className="text-[11px] text-[#777974]">Promedio histórico</small></div>
          </div>
          <div className="mt-5.5 overflow-hidden rounded-md bg-card p-6.25 max-[800px]:p-4.25">
            <div className="flex items-start justify-between">
              <div><Eyebrow>Rendimiento</Eyebrow><h2 className="my-1.5 text-xl">Ventas de entradas</h2></div>
              <button className="flex items-center gap-2.25 rounded-[5px] border border-[#c7c6c0] bg-transparent px-3.75 py-2.75 text-[13px] text-[#4d504d] max-[800px]:text-[11px]">Últimos 30 días <ChevronDown size={15} /></button>
            </div>
            <div className="flex h-68.75 min-w-142.5 pt-7 pr-2.5">
              <div className="flex flex-col justify-between pb-6 text-[10px] text-[#999]"><span>$1.2M</span><span>$800K</span><span>$400K</span><span>$0</span></div>
              <div className="ml-3.75 flex flex-1 items-end justify-around border-b border-[#ddd] bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_67px,#ecebe6_68px)]">
                {[35, 48, 42, 58, 52, 67, 62, 76, 69, 81, 77, 94].map((v, i) => (
                  <div className="flex h-full w-[6%] flex-col items-center justify-end gap-2.25" key={i}>
                    <div className="max-h-[calc(100%-24px)] w-5.5 rounded-t-[3px] bg-primary" style={{ height: `${v}%` }} />
                    <small className="text-[10px] text-[#999]">{['01', '03', '05', '07', '09', '11', '13', '15', '17', '19', '21', '23'][i]}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section
            className="relative min-h-119.5 overflow-hidden bg-[#181818] after:absolute after:bottom-[-28%] after:right-[-8vw] after:z-0 after:h-[58%] after:w-[51vw] after:rotate-[-5deg] after:rounded-[50%_0_0_0] after:bg-primary after:content-[''] max-[800px]:after:h-[30%] max-[800px]:after:w-[80vw]"
            id="inicio"
          >
            <div className="relative z-1 mx-auto max-w-310 px-10 py-19.5 max-[800px]:px-5.5 max-[800px]:pb-27.5 max-[800px]:pt-15">
              <div className="max-w-150">
                <span className="mb-5 flex items-center gap-1.75 text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#595375]">
                  <Zap size={14} fill="currentColor" />Tu próxima experiencia empieza acá
                </span>
                <h1 className="m-0 font-serif text-[76px] font-normal leading-[.94] tracking-[-3px] max-[800px]:text-[59px]">
                  Viví lo que<br /><em className="not-italic text-primary">te mueve.</em>
                </h1>
                <p className="my-6.5 max-w-102.5 text-[17px] leading-[1.55] text-[#56565e]">
                  Encontrá eventos, elegí tu lugar y asegurá tu entrada en un solo lugar.
                </p>
                <div className="flex max-w-136.25 items-center gap-2.75 rounded-lg bg-card py-1.75 pl-4.5 pr-2 shadow-[0_10px_28px_#8d82bd31]">
                  <Search size={20} className="shrink-0 text-[#96949d]" />
                  <input className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscá por artista, evento o ciudad..." />
                  <PrimaryAction className="rounded-md px-5.25 py-3.25">Buscar</PrimaryAction>
                </div>
                <div className="mt-3.75 flex items-center gap-3.25 text-[11px] text-[#686673]">
                  <span>Popular:</span>
                  <button className="border-0 bg-transparent p-0 text-[11px] text-[#565375] underline" onClick={() => setQuery('Música')}>Música</button>
                  <button className="border-0 bg-transparent p-0 text-[11px] text-[#565375] underline" onClick={() => setQuery('Buenos Aires')}>Buenos Aires</button>
                  <button className="border-0 bg-transparent p-0 text-[11px] text-[#565375] underline" onClick={() => setQuery('Fútbol')}>Fútbol</button>
                </div>
              </div>
              <div className="absolute bottom-17.5 right-[16%] z-2 flex items-center gap-3.5 text-white max-[800px]:bottom-8.75 max-[800px]:right-[10%]">
                <span className="h-px w-11 bg-white/60" />
                <div><strong className="block">Más de 2.000 eventos</strong><small className="mt-0.75 block opacity-80">para elegir este año</small></div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-310 px-10 pb-22.5 pt-19 max-[800px]:px-5.5 max-[800px]:py-13.75" id="eventos">
            <div className="mb-10.75 flex items-end justify-between max-[800px]:block">
              <div>
                <Eyebrow>Elegí tu próxima salida</Eyebrow>
                <h2 className="mt-2.75 font-serif text-[47px] font-normal leading-none tracking-[-1.5px] max-[800px]:text-[38px]">
                  Eventos que no te<br /><em className="not-italic text-primary">vas a querer perder.</em>
                </h2>
              </div>
              <button className="flex items-center gap-2.25 rounded-[5px] border border-[#c7c6c0] bg-transparent px-3.75 py-2.75 text-[13px] text-[#4d504d] max-[800px]:mt-5.5">
                Ver todos los eventos <ArrowRight size={17} />
              </button>
            </div>
            <div className="mb-6.5 flex items-center gap-2.5 overflow-auto pb-0.75">
              <div className="flex min-w-max flex-1 gap-1.25">
                {categories.map(item => (
                  <button
                    className={`rounded p-[9px_13px] text-[13px] ${category === item ? 'bg-foreground text-white' : 'border-0 bg-transparent text-[#787b76]'}`}
                    onClick={() => setCategory(item)}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button className="flex min-w-max items-center gap-2.25 rounded-[5px] border border-[#c7c6c0] bg-transparent px-3.75 py-2.75 text-[13px] text-[#4d504d]">
                <CalendarDays size={16} />Fecha <ChevronDown size={14} />
              </button>
              <button className="flex min-w-max items-center gap-2.25 rounded-[5px] border border-[#c7c6c0] bg-transparent px-3.75 py-2.75 text-[13px] text-[#4d504d]">
                <MapPin size={16} />Ubicación <ChevronDown size={14} />
              </button>
            </div>
            {filtered.length ? (
              <div className="grid grid-cols-3 gap-x-5 gap-y-10.5 max-[800px]:grid-cols-1 max-[800px]:gap-y-7.5">
                {filtered.map(event => (
                  <EventCard key={event.id} event={event} onSelect={() => setSelected(event)} favorite={favorites.includes(event.id)} onFavorite={() => toggleFavorite(event.id)} />
                ))}
              </div>
            ) : (
              <div className="px-5 py-17.5 text-center text-[#82847f]">
                <Search size={26} className="mx-auto text-primary" />
                <h3 className="my-3.75 mb-1.25 text-foreground">No encontramos eventos</h3>
                <p className="mb-5.5 text-[13px]">Probá con otro artista, ciudad o categoría.</p>
              </div>
            )}
          </section>

          <section className="mx-auto flex max-w-310 items-center gap-11.25 border-t border-[#dfded8] px-10 pb-16.25 pt-7.75 max-[800px]:mx-5.5 max-[800px]:flex-wrap max-[800px]:gap-5 max-[800px]:px-0 max-[800px]:pb-12.5 max-[800px]:pt-7" id="como-funciona">
            <div className="flex items-center gap-2.75"><span className="grid size-8.5 place-items-center rounded-full bg-[#ece6ff] text-[#7468ac]"><Check size={18} /></span><div><strong className="block text-xs">Compra segura</strong><small className="mt-0.75 block text-xs text-[#898b87]">Tus datos están protegidos</small></div></div>
            <div className="flex items-center gap-2.75"><span className="grid size-8.5 place-items-center rounded-full bg-[#ece6ff] text-[#7468ac]"><Clock3 size={18} /></span><div><strong className="block text-xs">Reserva temporal</strong><small className="mt-0.75 block text-xs text-[#898b87]">Tu lugar queda guardado</small></div></div>
            <div className="flex items-center gap-2.75"><span className="grid size-8.5 place-items-center rounded-full bg-[#ece6ff] text-[#7468ac]"><Users size={18} /></span><div><strong className="block text-xs">Soporte humano</strong><small className="mt-0.75 block text-xs text-[#898b87]">Estamos para ayudarte</small></div></div>
            <div className="ml-auto flex flex-col items-end gap-1.25 max-[800px]:ml-0 max-[800px]:items-start">
              <span className="text-[11px] text-[#858781]">¿Organizás eventos?</span>
              <button className="flex items-center gap-1.5 border-0 bg-transparent text-xs font-bold text-primary" onClick={() => setOrganizer(true)}>
                Conocé Entrada para organizadores <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </>
      )}

      {selected && (
        <Overlay onClick={() => setSelected(null)}>
          <div className="relative max-h-[90vh] w-full max-w-190 overflow-auto rounded-[9px] bg-background" onClick={e => e.stopPropagation()}>
            <button className="absolute right-4 top-4 z-1 grid size-8.5 place-items-center rounded-full border-0 bg-[#1f1f1f] text-[#50514d]" onClick={() => setSelected(null)}><X size={20} /></button>
            <img className="h-57.5 w-full object-cover" src={selected.image} alt="" />
            <div className="p-7 px-8 max-[800px]:p-5.75">
              <Eyebrow>{selected.category}</Eyebrow>
              <h2 className="mt-2 font-serif text-[42px] font-normal">{selected.title}</h2>
              <p className="mb-5.75 mt-1 text-[#777974]">{selected.artist}</p>
              <div className="flex gap-8.75 border-y border-border py-4.25 max-[800px]:flex-col max-[800px]:gap-3.75">
                <span className="flex flex-col gap-1.25 text-xs"><CalendarDays size={17} className="text-primary" /><b>{selected.fullDate}</b></span>
                <span className="flex flex-col gap-1.25 text-xs"><MapPin size={17} className="text-primary" /><b>{selected.place}</b><small className="ml-6.25 text-[#888]">{selected.city}</small></span>
              </div>
              <div className="mt-4.75 rounded-md bg-[#1f1f1f] p-4.25">
                <div className="flex justify-between text-xs"><span>Campo general</span><strong className="text-[#4b8c63]">Disponible</strong></div>
                <div className="my-3 h-1.5 overflow-hidden rounded-[5px] bg-[#d7d4cc]">
                  <i className="block h-full rounded-[5px] bg-[#71ac7e]" style={{ width: '68%' }} />
                </div>
                <small className="text-[11px] text-[#878983]">Quedan más de 500 entradas</small>
              </div>
              <div className="mt-6 flex items-end justify-between max-[800px]:flex-col max-[800px]:items-stretch max-[800px]:gap-3.5">
                <div><small className="block text-[11px] text-[#888]">Desde</small><strong className="mt-0.75 block text-[22px]">{formatPrice(selected.price)}</strong><span className="block text-[10px] text-[#888]">+ cargos de servicio</span></div>
                <PrimaryAction className="flex items-center justify-center gap-2" onClick={() => { addToCart(selected); setSelected(null) }}>
                  Elegir entradas <ArrowRight size={17} />
                </PrimaryAction>
              </div>
            </div>
          </div>
        </Overlay>
      )}

      {cartOpen && (
        <Overlay className="items-stretch justify-end p-0" onClick={() => closeCart()}>
          <aside className="h-full w-[min(470px,100%)] overflow-auto bg-background px-7.25 py-7.75 shadow-[-10px_0_30px_#2222]" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div><Eyebrow>Tu selección</Eyebrow><h2 className="mb-6.25 mt-1.25 font-serif text-[39px] font-normal">Carrito <span className="font-sans text-sm text-[#898b87]">({count})</span></h2></div>
              <button className="grid size-8.5 place-items-center rounded-full border-0 bg-[#1f1f1f] text-[#50514d]" onClick={() => closeCart()}><X size={20} /></button>
            </div>
            {cart.length ? (
              <>
                <div className="flex items-center gap-2.25 rounded-[5px] bg-[#2a1d05] p-3.25 text-xs text-[#a84c40]">
                  <Clock3 size={17} /><span>Tu selección está reservada por <strong>09:42</strong> minutos</span>
                </div>
                <div className="mt-5">
                  {cart.map(item => (
                    <div className="flex items-start gap-3 border-b border-border py-4.25" key={item.event.id}>
                      <div className={`grid h-11.25 w-10.75 shrink-0 place-items-center rounded bg-[#181818] ${item.event.color === 'coral' ? 'bg-[#3a2504]' : ''} ${item.event.color === 'blue' ? 'bg-[#c9d9f7]' : ''} ${item.event.color === 'yellow' ? 'bg-[#f8e7a4]' : ''}`}>
                        <b className="text-[17px]">{item.event.date.split(' ')[0]}</b><small className="text-[9px] font-bold text-primary">{item.event.date.split(' ')[1]}</small>
                      </div>
                      <div className="flex-1">
                        <strong className="block text-[13px]">{item.event.title}</strong>
                        <small className="mt-0.75 block text-[11px] text-[#858781]">Entrada general · {item.event.city}</small>
                        <div className="mt-2.5 flex items-center gap-2.75">
                          <button className="grid size-5.75 place-items-center rounded-[3px] border border-border bg-transparent" onClick={() => updateQuantity(item.event.id, -1)}><Minus size={13} /></button>
                          <span className="text-xs">{item.quantity}</span>
                          <button className="grid size-5.75 place-items-center rounded-[3px] border border-border bg-transparent" onClick={() => updateQuantity(item.event.id, 1)}><Plus size={13} /></button>
                        </div>
                      </div>
                      <strong className="text-[13px]">{formatPrice(item.event.price * item.quantity)}</strong>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-t border-border pt-5">
                  <div className="my-2.5 flex justify-between text-xs text-[#777974]"><span>Subtotal</span><strong>{formatPrice(total)}</strong></div>
                  <div className="my-2.5 flex justify-between text-xs text-[#777974]"><span>Cargos de servicio (10%)</span><strong>{formatPrice(service)}</strong></div>
                  <div className="mt-4 flex justify-between border-t border-border pt-3.75 text-[15px]"><span>Total</span><strong className="text-[22px]">{formatPrice(total + service)}</strong></div>
                  <PrimaryAction className="mt-2.5 w-full" onClick={() => alert('Checkout simulado: tus entradas están listas para continuar.')}>
                    Continuar al pago <ArrowRight size={17} />
                  </PrimaryAction>
                  <small className="mt-3 flex items-center justify-center gap-1.25 text-[11px] text-[#82847f]"><Check size={13} />Pago seguro y protegido</small>
                </div>
              </>
            ) : (
              <div className="px-5 py-17.5 text-center text-[#82847f]">
                <ShoppingBag size={28} className="mx-auto text-primary" />
                <h3 className="mb-1.25 mt-3.75 text-foreground">Tu carrito está vacío</h3>
                <p className="mb-5.5 text-[13px]">Elegí un evento y empezá a armar tu próxima experiencia.</p>
                <button className="flex items-center gap-2.25 rounded-[5px] border border-[#c7c6c0] bg-transparent px-3.75 py-2.75 text-[13px] text-[#a3a3a3]" onClick={() => closeCart()}>Descubrir eventos</button>
              </div>
            )}
          </aside>
        </Overlay>
      )}
    </main>
  )
}
