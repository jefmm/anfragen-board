import type { Metadata } from 'next';
import type { Viewport } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anfragen-Board',
  description: 'Eingehende Kundenanfragen an einer Stelle.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="kopf">
          <Link href="/" className="marke">
            Anfragen-Board
          </Link>
          <nav>
            <Link href="/anfragen">Übersicht</Link>
            <Link href="/neu">Neue Anfrage</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
