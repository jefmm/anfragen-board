'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { browserClient, type Anfrage } from '@/lib/supabase';

const STUFEN: { wert: Anfrage['status']; text: string }[] = [
  { wert: 'neu', text: 'Neu' },
  { wert: 'in_arbeit', text: 'In Arbeit' },
  { wert: 'erledigt', text: 'Erledigt' },
];

export function StatusSchalter({
  anfrageId,
  status,
}: {
  anfrageId: string;
  status: Anfrage['status'];
}) {
  const router = useRouter();
  const [aktuell, setAktuell] = useState(status);
  const [laeuft, setLaeuft] = useState(false);

  async function setzen(neu: Anfrage['status']) {
    setLaeuft(true);
    const supabase = browserClient();
    const { error } = await supabase.from('anfragen').update({ status: neu }).eq('id', anfrageId);
    setLaeuft(false);
    if (error) {
      alert('Der Status konnte nicht geändert werden.');
      return;
    }
    setAktuell(neu);
    router.refresh();
  }

  return (
    <div>
      <p style={{ marginTop: 0 }}>Status</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {STUFEN.map((s) => (
          <button
            key={s.wert}
            type="button"
            className={s.wert === aktuell ? '' : 'stumm'}
            disabled={laeuft}
            onClick={() => setzen(s.wert)}
          >
            {s.text}
          </button>
        ))}
      </div>
    </div>
  );
}
