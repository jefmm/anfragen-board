/**
 * Sicherheits-Header fuer alle Seiten.
 *
 * Ohne diese Header laesst sich die Anwendung in einen fremden Rahmen
 * einbetten und der Browser raet bei unklaren Dateitypen selbst herum.
 * Beides wollen wir nicht.
 */
import { NextResponse } from 'next/server';

export function middleware() {
  const antwort = NextResponse.next();

  // Kein Einbetten in fremde Seiten (Clickjacking).
  antwort.headers.set('X-Frame-Options', 'DENY');
  // Der Browser soll Dateitypen nicht selbst erraten.
  antwort.headers.set('X-Content-Type-Options', 'nosniff');
  // Beim Verlassen der Seite nicht die volle Adresse mitschicken.
  antwort.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return antwort;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
