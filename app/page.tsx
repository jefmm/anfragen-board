import Link from 'next/link';

export default function StartSeite() {
  return (
    <>
      <h1>Anfragen-Board</h1>
      <p className="unterzeile">
        Alles, was über das Kontaktformular reinkommt, an einer Stelle.
      </p>

      <div className="kacheln">
        <Link href="/anfragen" className="kachel">
          <span className="kachel-titel">Übersicht</span>
          <span className="kachel-text">
            Alle Anfragen beieinander, mit Status und Eingangsdatum. Jede hat eine eigene Seite
            mit den internen Notizen dazu.
          </span>
          <span className="kachel-pfeil">Ansehen →</span>
        </Link>

        <Link href="/neu" className="kachel">
          <span className="kachel-titel">Neue Anfrage</span>
          <span className="kachel-text">
            Das Formular, das auf der Website eingebunden ist. Hier kannst du ausprobieren, was
            passiert, wenn jemand schreibt.
          </span>
          <span className="kachel-pfeil">Ausfüllen →</span>
        </Link>
      </div>
    </>
  );
}
