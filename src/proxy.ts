import { NextRequest, NextResponse } from 'next/server';

// Middleware semplificato - demo mode senza auth
export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
