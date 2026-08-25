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

### Fund 4

- **Wo:** ´app/anfragen/[id]/page.tsx´ und ´components/NotizFormular.tsx´
- **Was war falsch:** Auf der Detailseite wurden Notizen zwar geladen und dargestellt, es gab in der Benutzeroberfläche unvollständig und nicht nutzbar.
- **Was hätte passieren können:** Das Kernfeature "interne Vermerke zu Anfragen pflegen" war für Endanwender in der Oberfläche unvollständig und nicht nutzbar.
- **Wie ich es behoben habe:** Eine neue interaktive Client-Komponente ´NotizFormular.tsx´erstellt, angebunden an die ´notizen´-Tabelle (Policies ´notizen_angelegen´/´notizen_lesen´erlauben dies für ´anon´/áuthenticated´) und auf der Detailseite integriert. Zusätzlich Abstand im Layout zwischen Formular und Notiz-Vorschau ergänzt (ápp/globals.css´).

### Fund 5

- **Wo:** ´app/layout.tsx´, ápp/anfragen/page.tsx´, ´app/globals.css´, ´components/StatusSchalter.tsx´, ´next.config.ts´
- **Was war falsch:** Es fehlte das Viewport-Meta-Tag. Mobile Browser haben die Seite deshalb wie eine Desktop-Seite gerendert und automatisch eingezoomt. die Anfragen-Tabelle hatte eine feste Breite (´width: 1000px´). Auf dem Handy lief sie seitlich aus dem sichtbaren Bereich, auch mit horizontalem Scroll war das keine gute Nutzererfahrung. Beim testen der Status-Umschaltung über die lokale Netzwerk-IP (Handy im selben WLAN wie der Rechner) reagierten die Buttons visuell (grau, deaktiviert), aber die Änderung wurde nie gespeichert.
- **Was hätte passieren können:** Ohne den Vieport-Fix und die Kartenansicht wäre die Anwendung auf Mobilgeräten kaum benutzbar gewesen - für ein Anfragen-Board, das im Alltag auch mal schnell vom Handy aus geprüft wird, ein relevanter Mangel. Das Cross-Origin-Problem hätte bei einem Deployment gar nicht auftreten können, da es sich um eine reine Dev-Server-Einschränkung handelt - es hätte im schlimmsten Fall aber unnötig Zeit bei der lokalen Fehlersuche gekostet, wenn man die Ursache nicht kennt.
- **Wie ich es behoben habe:** ´viewport´-Export in ´app/layout.tsx´ergänzt (´width: ´device-width´´, ´initialScale: 1´). Tabelle in der Übersicht bleibt ab Tablet-Breite (>720px) erhalten (inkl. ´overflow-x: auto´ als Fallback), wird darunter aber komplett durch eine gestapelte Kartenansicht (´.anfragen-karten´) ersetzt. Mit den Browser-Entwicklertools auf dem Handy (Konsole) festgestellt, dass Next.js Cross-Origin-Zugriffe von der lokalen Netzwerk-IP auf Dev-Server-Ressourcen blockiert. Behoben mit ´allowedDevOrigins´in ´next.config.ts´. ´StatusSchalter.tsx´ zusätzlich robuster gemacht (try/catch/finally), damit ein fehlgeschlagener Request nicht die komplette Bedienbarkeit blockiert.
<!-- weitere Funde hier -->

---

## Was ich nicht geschafft habe

Was ist dir aufgefallen, was du aber nicht mehr angefasst hast? Und was
hättest du als Nächstes probiert?

### Beobachtung: Zugriffsrechte auf `notizen`

* **Wo:** Migration `0001_grundschema.sql`, Tabelle `notizen`
* **Was mir aufgefallen ist:** Die Tabelle wird im Schema-Kommentar als "interne Vermerke" beschrieben, die Policies erlauben aber `insert` und `select` für die Rolle `anon` — also ohne Anmeldung. Da die Anwendung aktuell kein Auth-System hat, ist "intern" hier nur inhaltlich gemeint, nicht technisch abgesichert.
* **Warum ich es nicht geändert habe:** Eine Einschränkung auf `authenticated` würde ein Login-System voraussetzen, das außerhalb des Aufgabenumfangs liegt. Ich dokumentiere es hier, damit es bei einer künftigen Erweiterung (z. B. Team-Login) berücksichtigt wird.

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
