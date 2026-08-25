'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { browserClient } from '@/lib/supabase';

type NotizFormularProps = {
  anfrageId: string;
};

export function NotizFormular({ anfrageId }: NotizFormularProps) {
  const router = useRouter();
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'bereit' | 'speichern' | 'fehler'>('bereit');
  const [fehler, setFehler] = useState('');

  async function notizAbsenden(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const bereinigterText = text.trim();

    if (!bereinigterText) {
      setFehler('Bitte gib zuerst eine Notiz ein.');
      setStatus('fehler');
      return;
    }

    setStatus('speichern');
    setFehler('');

    const { error } = await browserClient()
      .from('notizen')
      .insert({
        anfrage_id: anfrageId,
        text: bereinigterText,
      });

    if (error) {
      setFehler(`Die Notiz konnte nicht gespeichert werden: ${error.message}`);
      setStatus('fehler');
      return;
    }

    setText('');
    setStatus('bereit');

    // Lädt die Server-Seite erneut und zeigt die neue Notiz an.
    router.refresh();
  }

  return (
    <form onSubmit={notizAbsenden} className="notiz-formular">
      <label htmlFor="notiz">
        Neue Notiz hinzufügen

      </label>

      <textarea
        id="notiz"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Notiz eingeben ..."
        rows={4}
        disabled={status === 'speichern'}
      />

      <button type="submit" disabled={status === 'speichern'}>
        {status === 'speichern' ? 'Wird gespeichert ...' : 'Notiz speichern'}
      </button>

      {fehler ? <p role="alert">{fehler}</p> : null}
    </form>
  );
}