import { Eye, EyeOff } from 'lucide-react'

interface PasswordVisibilityToggleProps {
  showPassword: boolean
  onToggle: () => void
  label: string
}

export default function PasswordVisibilityToggle({
  showPassword,
  onToggle,
  label,
}: PasswordVisibilityToggleProps) {
  return (
    <button
      type="button"
      className="grid place-items-center border-0 bg-transparent p-0 text-[#6a6c67]"
      onClick={onToggle}
      aria-label={`${showPassword ? 'Ocultar' : 'Mostrar'} ${label}`}
    >
      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
    </button>
  )
}
