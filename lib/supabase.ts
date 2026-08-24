/**
 * Zugang zur Datenbank.
 *
 * Zwei Wege: einer fuer den Browser, einer fuer den Server.
 */
import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/**
 * Client fuer den Browser. Wird in Client-Komponenten benutzt, damit die
 * Oberflaeche Daten aendern kann, ohne dass die Seite neu geladen wird.
 */
export function browserClient() {
  return createClient(URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!);
}

/** Client fuer Server-Komponenten und Server-Aktionen. */
export function serverClient() {
  return createClient(URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
}

export type Anfrage = {
  id: string;
  name: string;
  email: string;
  telefon: string | null;
  betreff: string;
  nachricht: string;
  status: 'neu' | 'in_arbeit' | 'erledigt';
  created_at: string;
};

export type Notiz = {
  id: string;
  anfrage_id: string;
  text: string;
  created_at: string;
};
