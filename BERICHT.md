# Bericht

Bitte ausfüllen und mit abgeben. Kurz halten, Stichpunkte reichen völlig.

---

## Meine URL

<!-- Die laufende Vercel-Adresse -->

## Zugang zu deiner Datenbank

Damit wir die Anwendung von außen ansehen können, so wie es jeder Besucher
könnte.

- **Supabase-Projekt-URL:** <!-- https://apckqkgdeqsanrjriibq.supabase.co -->
- **Publishable Key:** <!-- sb_publishable_fYIokOj8PnyOmmPe03SXIg_5eG5Mn6D -->

> Der Publishable Key ist dafür gedacht, öffentlich zu sein, der steht bei jeder
> Supabase-Anwendung im Browser. **Schick uns niemals den Secret Key.**
> Nicht hier, nicht per Mail, nirgends. Wenn dir der Unterschied gerade nicht
> klar ist, ist das die erste Sache, der du nachgehen solltest.

## Was ich gefunden und behoben habe

Je Fund vier Zeilen. Kopier den Block so oft du ihn brauchst.

### Fund 1

- **Wo:** lib/supabase.ts | Zeilen 15 und 20
- **Was war falsch:** ´browserClient´ hätte mit einem Secret Key mit ´NEXT_PUBLIC_´ -Präfix einen Client erstellt.
- **Was hätte passieren können:** Der Secret Key wäre im browserClient gelandet.
- **Wie ich es behoben habe:** Ich habe die Zugriffswege angepasst: ´browserClient´ verwendet nun ´NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY´, während ´erverClient´ ´SUPABASE_SECRET_KEY´ verwendet.

### Fund 2

- **Wo:** lib/supabase.ts | Zeile ab 14 | browserClient
- **Was war falsch:** Bei jedem Aufruf von ´browserClient()´ wurde eine neue Supabase-Client-Instanz erzeugt. Dadurch konnten innerhalb derselben Browser-Anwendung unnötig mehrere Instanzen entstehen.
- **Was hätte passieren können:** Die wiederholte Erstellung hätte zu unnötigem Speicher- und Verbindungsaufwand sowie zu schwerer nachvollziehbarem Verhalten im Browser führen können.
- **Wie ich es behoben habe:** Eine wiederverwendbare Variable ´browserClientInstance´ ergänzt. Die Supabase-Client-Instanz wird nun nur erzeugt, wenn doch keine vorhanden ist, und bei weiteren Aufrufen wiederverwendet.

### Fund 3

- **Wo:** supabase/migrations/20260101120000_001_grundschema.sql | Datenbank-Schema (´anfrage_intern´ und ´notizen´)
- **Was war falsch:** Bei ´public.anfrage_intern´ war Row Level Security nicht aktiviert, obwohl vertrauliche interne Felder enthalten sind und anon Leserechte hatte. Zudem fehlte bei public.´notizen´ eine ´SELECT´-Policy.
- **Was hätte passieren können:** Jeder Besucher hätte mit dem öffentlichen Schlüssel sensible interne Einschätzungen und Budgets auslesen können. Zudem konnten angelegte Notizen in der Oberfläche nicht geladen werden.
- **Wie ich es behoben habe:** In der neuen Migrationsdatei ´20260825123000_0002_fix_rls_und_policies.sql´ wurde RLS für anfrage_intern aktiviert, anon die Rechte entzogen und die fehlende ´SELECT´-Policy für ´notizen´ ergänzt.


<!-- weitere Funde hier -->

---

## Was ich nicht geschafft habe

Was ist dir aufgefallen, was du aber nicht mehr angefasst hast? Und was
hättest du als Nächstes probiert?

<!-- Hier ehrlich zu sein bringt dir mehr als eine Lücke. -->

---

## Zwei KI-Vorschläge, die ich nicht übernommen habe

### Erste Stelle

- **Was die KI vorgeschlagen hat:** legacy anon public key zu verwenden
- **Warum ich es nicht übernommen habe:** in der Aufgabe ist explizit den publishable key anzugeben
- **Was ich stattdessen gemacht habe:** ich habe den publishable key verwendet

### Zweite Stelle

- **Was die KI vorgeschlagen hat:**
- **Warum ich es nicht übernommen habe:**
- **Was ich stattdessen gemacht habe:**

---

## Was mir am Projekt aufgefallen ist

Freies Feld. Etwas, das dir unabhängig von den Fehlern komisch vorkam, das du
anders gebaut hättest, oder das du nicht verstanden hast. Darf auch leer
bleiben.
