import { getToken } from './auth'

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4200'

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken()

  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return fetch(`${API_URL}${path}`, { ...options, headers })
}

export async function apiErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json()
    if (typeof data?.message === 'string') return data.message
    if (Array.isArray(data?.message) && data.message.length) return data.message[0]
    return fallback
  } catch {
    return fallback
  }
}