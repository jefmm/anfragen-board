import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serverClient, type Anfrage, type Notiz } from '@/lib/supabase';
import { StatusSchalter } from '@/components/StatusSchalter';

function zeitpunkt(wert: string): string {
  return new Date(wert).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function AnfrageSeite({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = serverClient();

  const { data: anfrage } = await supabase.from('anfragen').select('*').eq('id', id).single();
  if (!anfrage) notFound();

  const { data: notizen } = await supabase
    .from('notizen')
    .select('*')
    .eq('anfrage_id', id)
    .order('created_at', { ascending: true });

  const eintraege = (notizen ?? []) as Notiz[];
  const a = anfrage as Anfrage;

  return (
    <>
      <p style={{ margin: '0 0 1.5rem' }}>
        <Link href="/anfragen" className="zurueck">
          ← Zurück zur Übersicht
        </Link>
      </p>

      <h1>{a.betreff}</h1>
      <p className="absender">
        <span>
          von <strong>{a.name}</strong>
        </span>
        <span>{a.email}</span>
        {a.telefon ? <span>{a.telefon}</span> : null}
        <span>eingegangen am {zeitpunkt(a.created_at)}</span>
      </p>

      <div className="karte">
        <p className="nachricht">{a.nachricht}</p>
      </div>

      <div className="karte">
        <StatusSchalter anfrageId={a.id} status={a.status} />
      </div>

      <h2>Interne Notizen</h2>
      {eintraege.length === 0 ? (
        <div className="leer">Zu dieser Anfrage gibt es noch keine Notizen.</div>
      ) : (
        eintraege.map((n) => (
          <div className="notiz" key={n.id}>
            <time>{zeitpunkt(n.created_at)}</time>
            {n.text}
          </div>
        ))
      )}
    </>
  );
}
