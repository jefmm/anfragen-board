import Link from 'next/link';
import { serverClient, type Anfrage } from '@/lib/supabase';

const STATUS_TEXT: Record<Anfrage['status'], string> = {
  neu: 'Neu',
  in_arbeit: 'In Arbeit',
  erledigt: 'Erledigt',
};

function datum(wert: string): string {
  return new Date(wert).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default async function AnfragenSeite() {
  const supabase = serverClient();
  const { data, error } = await supabase
    .from('anfragen')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    return (
      <>
        <h1>Übersicht</h1>
        <div className="leer">Die Anfragen konnten nicht geladen werden.</div>
      </>
    );
  }

  const anfragen = (data ?? []) as Anfrage[];

  return (
    <>
      <h1>Übersicht</h1>
      <p className="unterzeile">
        {anfragen.length} {anfragen.length === 1 ? 'Anfrage' : 'Anfragen'}, neueste zuerst.
      </p>

      {anfragen.length === 0 ? (
        <div className="leer">
          Noch keine Anfragen. <Link href="/neu">Die erste anlegen.</Link>
        </div>
      ) : (
        <table className="tabelle">
          <thead>
            <tr>
              <th>Eingegangen</th>
              <th>Name</th>
              <th>E-Mail</th>
              <th className="betreff">Betreff</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {anfragen.map((a) => (
              <tr key={a.id}>
                <td>{datum(a.created_at)}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td className="betreff">
                  <Link href={`/anfragen/${a.id}`}>{a.betreff}</Link>
                </td>
                <td>
                  <span className={`marke-status ist-${a.status}`}>{STATUS_TEXT[a.status]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
