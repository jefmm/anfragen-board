# Probeaufgabe: Anfragen-Board

Hi, schön dass du dabei bist.

Das hier ist ein kleines, halbfertiges Projekt. Deine Aufgabe ist, es online zu
bringen und dabei aufzuräumen, was im Weg steht.

> ### Das Wichtigste in Kürze
>
> **Umfang:** Du musst **nicht** alles schaffen. Was du weglässt, schreibst
> du auf.
>
> **Zu tun:**
> 1. Supabase-Projekt anlegen und die Anwendung damit verbinden
> 2. Schema und Beispieldaten einspielen (`supabase/migrations/` und `seed.sql`)
> 3. Die Fehler finden und beheben, die gefährlichsten zuerst
> 4. Auf dem Handy brauchbar machen
> 5. Auf Vercel deployen
> 6. Änderungen in `CHANGELOG.md` eintragen, Version in `package.json` mitziehen
>
> **Abgeben:** eine Mail mit deiner laufenden URL und dem Link zu deinem Repo
>
> **Drei Regeln, die wirklich zählen:**
> - Jede Änderung an der Datenbank gehört als `.sql`-Datei nach
>   `supabase/migrations/`. Wir schauen nicht in deine Datenbank, wir lesen
>   dein Repo.
> - Was du änderst, kommt in die `CHANGELOG.md`, und die Version wird
>   mitgezogen.
> - KI ist erlaubt und erwünscht. Im Bericht nennst du uns zwei Vorschläge der
>   KI, die du **nicht** übernommen hast, und warum nicht.
>
> Lies den Rest einmal ganz durch, bevor du anfängst. Das erspart dir Umwege.

**Es ist ausdrücklich nicht verlangt, dass du alles schaffst.** Nimm dir das
vor, was dir am wichtigsten erscheint. Wer den Rest sauber aufschreibt, steht
bei uns besser da als jemand, der alles abhakt und hinterher nichts davon
erklären kann.

---

## Worum es geht

Ein Kontaktformular auf einer Website. Anfragen laufen in einer Übersicht auf,
jede hat eine eigene Seite mit internen Notizen und einem Status.

Die Anwendung ist geschrieben, aber sie hängt an keiner Datenbank, sie ist
nirgends deployed, und sie hat Fehler. **Manche siehst du im Code. Manche erst,
wenn es wirklich läuft. Mindestens einen siehst du nur auf dem Handy.**

## Was du am Ende abgibst, und wie

Wenn du fertig bist, antwortest du **auf die Mail, mit der du diese Aufgabe
bekommen hast**, mit genau zwei Dingen:

1. **Deine laufende URL.** Die Adresse, unter der dein Board im Internet
   erreichbar ist.
2. **Den Link zu deinem Repo.** Lass es auf *privat* und lade **`felixlippe`**
   und **`aibymike`** als Mitarbeiter ein, unter Settings → Collaborators →
   Add people. So sieht niemand außer uns deine Lösung.

Mehr brauchen wir nicht. Die ausgefüllte `BERICHT.md` liegt ja in deinem Repo.

**Zugang zu deiner Datenbank wollen wir nicht.** Was an ihr wichtig ist, steht
in deinen Migrationsdateien, und die sind im Repo. In den Bericht kommen nur
die Projekt-Adresse und der öffentliche Schlüssel, sonst nichts.

> **Deinen geheimen Schlüssel schickst du uns unter keinen Umständen.** Nicht
> per Mail, nicht im Repo, nirgends. Wenn dir der Unterschied zwischen den
> beiden Schlüsseln gerade nicht klar ist, ist das die erste Sache, der du
> nachgehen solltest.

Wenn du es nicht schaffst, sag kurz Bescheid, das ist kein Problem. Melde dich
auch, wenn du irgendwo festhängst.

---

## Was du tun sollst

### 1. Zum Laufen bringen

Leg dir ein kostenloses Supabase-Projekt an und verbinde die Anwendung damit.
Welche Werte du dafür brauchst, steht in `.env.example`.

In `supabase/migrations/` liegt das Grundschema, in `supabase/seed.sql` ein
paar Beispieldaten. **Beides muss in deine Datenbank.** Wie du das machst, ist
dir überlassen, es führt mehr als ein Weg dorthin. Bleib nicht am ersten
hängen, wenn er zickt.

### 2. Alles an der Datenbank läuft über Migrations

**Das ist die wichtigste Regel hier.** Jede Änderung am Schema, an einer
Policy, an einem Index gehört als neue `.sql`-Datei nach
`supabase/migrations/`. Wir müssen deine Datenbank allein aus deinem Repo
nachbauen können.

Wenn du im Supabase-Dashboard klickst und es nirgends festhältst, ist deine
Arbeit für uns unsichtbar. Wir schauen nicht in deine Datenbank, wir lesen dein
Repo.

Benenne neue Dateien fortlaufend, zum Beispiel
`20260315090000_0002_kurze_beschreibung.sql`.

### 3. Schreib auf, was du geändert hast

Im Repo liegt eine `CHANGELOG.md`. Dort trägst du deine Änderungen ein, in
Worten, die auch jemand versteht, der den Code nicht gelesen hat. Die Version
in `package.json` ziehst du im selben Zug mit. Sie steht gerade auf `0.1.0`.

Wie die Nummern gemeint sind, steht in der `CHANGELOG.md` selbst.

### 4. Die Fehler finden und beheben

Es sind mehrere. Manche sind gefährlich, manche nur ärgerlich. **Schau dir an,
was davon wirklich weh tut, und fang damit an.**

Zwei Hinweise, weil es sonst unfair wäre:

**Nicht jeder Fehler zeigt sich als Fehlermeldung.** Manches funktioniert
scheinbar und ist trotzdem falsch. Wenn dir etwas komisch vorkommt, obwohl
nichts rot ist, geh dem nach.

**Nicht alles steckt im Anwendungscode.** Das Schema gehört genauso dazu. Lies
die Migration, und schau dir an, was mit deinen Zugangsdaten von außen
erreichbar ist. Nicht jede Tabelle taucht in der Oberfläche auf.

### 5. Auf dem Handy brauchbar machen

Ruf deine fertige Seite auf dem Telefon auf. Wenn du dabei zur Seite scrollen
musst, ist etwas kaputt.

### 6. Deployen

Auf Vercel, kostenlos, ohne Kreditkarte. Denk an die Umgebungsvariablen, die
Vercel nicht von deinem Rechner kennt.

**Richte Supabase vollständig ein, bevor du das erste Mal deployst**, also
Migration und Beispieldaten. Wenn die Datenbank beim Deployment noch leer ist,
kann es sein, dass die Seite hinterher hartnäckig behauptet, sie könne nichts
laden, obwohl längst alles da ist. Ein erneutes Deployment hilft dann. Warum
das so ist, findest du selbst heraus, es hat mit einem der Fehler zu tun.

**Prüf danach die Seite auf der echten URL, nicht nur lokal.** Es gibt Fehler,
die man ausschließlich dort sieht.

---

## KI

**Benutz sie.** Wir arbeiten selbst den ganzen Tag mit Claude Code, alles andere
wäre verlogen. Es zählt nicht als Schummeln.

Eine Sache wollen wir dazu von dir wissen, das Feld dafür steht in
`BERICHT.md`:

> **Nenne uns zwei Stellen, an denen die KI dir etwas vorgeschlagen hat, das du
> am Ende nicht übernommen hast.** Was war der Vorschlag, warum hast du ihn
> verworfen, und was hast du stattdessen gemacht?

---

## Wie es weitergeht

Wir rufen deine Seite auf und probieren sie aus, so wie es jeder Besucher tun
würde. Dabei entsteht auch eine Anfrage von uns, erkennbar am Namen
`PRUEFUNG-` und einer Zahl. Erschrick nicht, wenn danach ein Eintrag in deiner
Liste steht, den du nicht gemacht hast. Löschen darfst du ihn, stehen lassen
auch.

---

## Wenn du hängst

Steht in `BERICHT.md` unter „Was ich nicht geschafft habe". Da ehrlich
reinzuschreiben, woran du hängen geblieben bist und was du als Nächstes
probiert hättest, ist mehr wert als eine Lücke.

Viel Erfolg.
