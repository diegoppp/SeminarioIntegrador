export const TOKEN_COOKIE = 'access_token'

export interface JwtPayload {
  sub?: string
  role?: string
  exp?: number
  [key: string]: unknown
}

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
  const binary = atob(padded)
  return decodeURIComponent(
    binary
      .split('')
      .map(c => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
      .join(''),
  )
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    return JSON.parse(base64UrlDecode(payload)) as JwtPayload
  } catch {
    return null
  }
}

export function getToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_COOKIE}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function setToken(token: string): void {
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; SameSite=Lax`
}

export function clearToken(): void {
  document.cookie = `${TOKEN_COOKIE}=; path=/; Max-Age=0`
}

export function getSession() {
  const token = getToken()
  if (!token) return { token: null, payload: null, isAuthenticated: false, isAdmin: false }

  const payload = decodeJwt(token)
  const valid = !!payload && typeof payload.exp === 'number' && payload.exp * 1000 > Date.now()

  return {
    token,
    payload,
    isAuthenticated: valid,
    isAdmin: valid && payload?.role === 'ADMIN',
  }
}