
import { Check, Clock3, Users } from 'lucide-react'

const benefits = [
  {
    icon: Check,
    title: 'Compra segura',
    description: 'Tus datos están protegidos',
  },
  {
    icon: Clock3,
    title: 'Reserva temporal',
    description: 'Tu lugar queda guardado',
  },
  {
    icon: Users,
    title: 'Soporte humano',
    description: 'Estamos para ayudarte',
  },
]

export default function Benefits() {
  return (
    <section
      id="como-funciona"
      className="mx-auto flex max-w-310 items-center gap-11.25 border-t border-[#dfded8] px-10 pb-16.25 pt-7.75 max-[800px]:mx-5.5 max-[800px]:flex-wrap max-[800px]:gap-5 max-[800px]:px-0 max-[800px]:pb-12.5 max-[800px]:pt-7"
    >
      {benefits.map(({ icon: Icon, title, description }) => (
        <div key={title} className="flex items-center gap-2.75">
          <span className="grid size-8.5 place-items-center rounded-full bg-[#ece6ff] text-[#7468ac]">
            <Icon size={18} />
          </span>

          <div>
            <strong className="block text-xs">{title}</strong>
            <small className="mt-0.75 block text-xs text-[#898b87]">
              {description}
            </small>
          </div>
        </div>
      ))}
    </section>
  )
}
