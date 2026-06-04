import { auth } from './auth';
import { NextResponse } from 'next/server';

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const session = request.auth;

  if (pathname.startsWith('/admin') && session?.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
  }

  if (pathname === '/dashboard' && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/dashboard'],
};
