import { useMemo, useState } from 'react'
import type { Event } from '@/components/EventCard'

export interface CartItem {
  event: Event
  quantity: number
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const count = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.event.price * item.quantity, 0), [cart])
  const service = useMemo(() => Math.round(total * 0.1), [total])

  const addToCart = (event: Event, quantity = 1) => {
    setCart(current => {
      const found = current.find(x => x.event.id === event.id)
      return found
        ? current.map(x => (x.event.id === event.id ? { ...x, quantity: x.quantity + quantity } : x))
        : [...current, { event, quantity }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (id: number, delta: number) =>
    setCart(current => current.map(x => (x.event.id === id ? { ...x, quantity: Math.max(1, x.quantity + delta) } : x)))

  return { cart, cartOpen, count, total, service, addToCart, updateQuantity, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false) }
}