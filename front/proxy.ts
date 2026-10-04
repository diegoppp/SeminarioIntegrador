import { NextRequest, NextResponse } from 'next/server'
import { TOKEN_COOKIE, decodeJwt, type JwtPayload } from './lib/auth'

function isValidToken(payload: JwtPayload | null): payload is JwtPayload {
  return (
    !!payload &&
    typeof payload.exp === 'number' &&
    payload.exp * 1000 > Date.now()
  )
}

// Páginas por las que un usuario no verificado puede pasar sin problema
const PUBLIC_UNVERIFIED = new Set([
  '/',
  '/login',
  '/register',
  '/verify-email',
  '/verify-pending',
])

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(TOKEN_COOKIE)?.value ?? null
  const payload = token ? decodeJwt(token) : null
  const authenticated = isValidToken(payload)

  // Token sin isVerified (emitido antes del cambio) se trata como verificado
  const verified = authenticated ? payload!.isVerified !== false : false

  // Usuario logueado pero sin email verificado: solo rutas públicas (verificación)
  if (authenticated && !verified && !PUBLIC_UNVERIFIED.has(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = '/verify-pending'
    return NextResponse.redirect(url)
  }

  if (!authenticated && pathname.startsWith('/perfil')) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  if (pathname.startsWith('/admin')) {
    if (!authenticated) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
    if (payload?.role !== 'ADMIN') {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}