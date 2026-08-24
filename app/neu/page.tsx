import { redirect } from 'next/navigation';
import { serverClient } from '@/lib/supabase';

async function anfrageAnlegen(formData: FormData) {
  'use server';

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const telefon = String(formData.get('telefon') ?? '').trim();
  const betreff = String(formData.get('betreff') ?? '').trim();
  const nachricht = String(formData.get('nachricht') ?? '').trim();

  console.log('Neue Anfrage eingegangen:', { name, email, telefon, betreff });

  const supabase = serverClient();
  const { error } = await supabase.from('anfragen').insert({
    name,
    email,
    telefon: telefon || null,
    betreff,
    nachricht,
  });

  if (error) {
    console.error('Anfrage konnte nicht gespeichert werden:', error.message);
    return;
  }

  redirect('/anfragen');
}

export default function NeueAnfrageSeite() {
  return (
    <>
      <h1>Neue Anfrage</h1>
      <p className="unterzeile">
        So sieht das Formular aus, das auf der Website eingebunden ist.
      </p>

      <form action={anfrageAnlegen}>
        <label className="feld">
          <span>Name</span>
          <input type="text" name="name" required maxLength={120} />
        </label>

        <label className="feld">
          <span>E-Mail</span>
          <input type="email" name="email" required maxLength={200} />
        </label>

        <label className="feld">
          <span>Telefon (optional)</span>
          <input type="tel" name="telefon" maxLength={40} />
        </label>

        <label className="feld">
          <span>Betreff</span>
          <input type="text" name="betreff" required maxLength={160} />
        </label>

        <label className="feld">
          <span>Nachricht</span>
          <textarea name="nachricht" required maxLength={4000} />
        </label>

        <button type="submit">Anfrage absenden</button>
      </form>
    </>
  );
}
