import { NextRequest, NextResponse } from 'next/server'
import { TOKEN_COOKIE, decodeJwt, type JwtPayload } from './lib/auth'

function isValidToken(payload: JwtPayload | null): payload is JwtPayload {
  return (
    !!payload &&
    typeof payload.exp === 'number' &&
    payload.exp * 1000 > Date.now()
  )
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(TOKEN_COOKIE)?.value ?? null
  const payload = token ? decodeJwt(token) : null
  const authenticated = isValidToken(payload)

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
  matcher: ['/perfil/:path*', '/admin/:path*'],
}