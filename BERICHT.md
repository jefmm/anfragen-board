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

### Fund 6

- **Wo:** ´app/anfragen/page.tsx´ und ´app/anfragen/[id]/page.tsx´ | am Dateianfang
- **Was war falsch:** Beim Production-Build wurden die Seiten teilweise statisch (prerendered) erzeugt, wodurch die gezeigten Statuswerte die Daten vom Build‑Zeitpunkt widerspiegelten statt der aktuellen Daten aus Supabase. Im Dev‑Server wurden die Seiten hingegen on‑demand gerendert und zeigten aktuelle Werte.
- **Was hätte passieren können:** Produktionsnutzer hätten veraltete Statusinformationen gesehen; Änderungen in der Datenbank wären erst nach einem erneuten Build sichtbar gewesen. Das hätte zu Verwirrung oder falschem Bearbeitungsstatus geführt.
- **Wie ich es behoben habe:** Ich habe in beiden Server-Komponenten die Direktive export const dynamic = 'force-dynamic'; hinzugefügt, sodass Next.js die Seiten bei jeder Anfrage serverseitig neu rendert. Anschließend rm -rf .next && npm run build && npm start ausgeführt und das Verhalten verifiziert.

### Fund 7

- **Wo:** supabase/migrations/20260827133000_0003_fix_grants_to_anon.sql
- **Was war falsch:** In der ersten Migration waren weitergehende GRANTs an anon gesetzt, die potentiell UPDATE/DELETE-Rechte auf sensitive Tabellen erlauben.
- **Was hätte passieren können:** Ein anonymer Besucher hätte, bei falscher Policy-Kombination und offenen Grants, Datensätze ändern oder löschen können - insbesondere in anfrage_intern und notizen.
- **Wie ich es behoben habe:** Neue Migration hinzugefügt, die UPDATE/DELETE/TRUNCATE/REFERENCES/TRIGGER-Rechte für anon auf public.anfrage_intern und public.notizen entzieht. Die Migration ist in supabase/migrations/ committed; 
<!-- weitere Funde hier -->

---

## Was ich nicht geschafft habe

Was ist dir aufgefallen, was du aber nicht mehr angefasst hast? Und was
hättest du als Nächstes probiert?

Implementierung einer vollständigen Nutzer-Authentifizierung (Accounts):

Ich hätte gern ein Auth-System (z. B. Supabase Auth) in die Anwendung integriert, damit sich Benutzer anmelden können und Rechte zentral über ihre Accounts / Rollen verteilt werden. Mit Auth würde ich das Zugriffsmodell folgendermaßen vereinfachen und verbessern:

- Anonyme Nutzer (anon) dürfen ausschließlich lesen — Formular absenden und die öffentliche Anfragen-Übersicht einsehen.
- Authentifizierte Benutzer erhalten differenzierte Rechte (z. B. role = "staff" oder "admin"): je nach Rolle können sie Notizen anlegen, interne Einschätzungen sehen, Einträge aktualisieren oder löschen.
- Policies in der Datenbank würden auth.uid() und Rollen nutzen, statt pauschaler to anon, authenticated-Regeln oder USING (true).
- Das macht Rechteverwaltung klarer, sicherer und leichter testbar.
- Warum ich es nicht geschafft habe: Zeitliche Begrenzung — ich habe priorisiert, die kritischen Sicherheitslücken in den DB-Migrationen zu schließen (REVOKE/Policy‑Fixes) und das Prerendering‑Problem zu beheben, damit die Anwendung in Prod zuverlässig aktuelle Daten anzeigt. Auth wäre ein nächster Schritt, der zusätzliches UI- und Testing-Aufwand bedeutet (Login/Session-Handling, Role-Management im Admin-UI, Anpassung der Server-/Client-Logik).
- Wie ich es später umsetzen würde: Supabase Auth einrichten, Login/Logout-UI, serverseitige Sitzungserkennung in Next.js (Server Components/Route-Auth), Policies umstellen auf checks mit auth.uid() / role-Strings und separate Admin-Routes erstellen. Außerdem würde ich automatisierte Tests ergänzen, die auth-geschützte Pfade und Policies prüfen.

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

- **Was die KI vorgeschlagen hat:** Die KI schlug vor, ´allowedDevOrigins´ in ´next.config.ts´ nur für die Entwicklungsumgebung zu setzen (mittels NODE_ENV-Check) und ´DEV_ALLOWED_ORIGINS´ aus ´.env.local´ zu lesen. Außerdem wurde empfohlen, ´DEV_ALLOWED_ORIGINS´ in ´.env.local´ zu speichern oder alternativ das lokale Subnetz (192.168.178.0/24) als Fallback zu verwenden. Ziel war, dass Handy/LAN-Geräte während der Entwicklung zuverlässig auf den Next-Dev-Server zugreifen können, ohne dass dev-only Einstellungen in Production landen.
- **Warum ich es nicht übernommen habe:** Ich habe die Änderung nicht übernommen, weil sie zwar Development-Convenience bietet, aber das Projektverhalten für zukünftige Tester*innen und Teammitglieder weniger transparent macht. Automatische oder breit gefasste Dev-Ausnahmen (z.B. Subnetz-Fallback) können verwirren oder bei Fremdgeräten im gleichen Netz unbeabsichtigten Zugriff erlauben. Ich bevorzuge eine klare, einfache Konfiguration ohne versteckte dev-Ausnahmen im Config-File.
- **Was ich stattdessen gemacht habe:** Ich belasse next.config.ts leer (kein allowedDevOrigins) und verwalte Zugriffs-Origins ausschließlich über .env.local bei Bedarf. .env.local enthält die notwendigen Keys. Wenn ich lokal per Handy testen will, setze ich ´DEV_ALLOWED_ORIGINS´ vorübergehend in ´.env.local´, starte den Dev-Server neu und teste. So bleibt die Repository-Konfiguration sauber, reproduzierbar und sicher für Production/CI, und lokale Anpassungen sind explizit und leicht nachvollziehbar.

---

## Was mir am Projekt aufgefallen ist

Freies Feld. Etwas, das dir unabhängig von den Fehlern komisch vorkam, das du
anders gebaut hättest, oder das du nicht verstanden hast. Darf auch leer
bleiben.

Das Projekt ist sehr gut aufgebaut und deckt ein breites, realistisches Themenspektrum ab. Als Anfänger habe ich viele interessante Dinge gelernt (Next.js Rendering‑Strategien, Supabase‑Migrations und RLS, Deploy‑Workflows). Gleichzeitig ist das Gesamtsystem nicht vollständig leicht zu automatisieren — insbesondere die Erstellung von Anfragen und einige Status‑Übergänge erfordern menschliche Kontextentscheidungen und Prüfungen. Für Routineaufgaben ließen sich Teile automatisieren (z. B. Validierungen, Benachrichtigungen, einfache Statusänderungen), aber komplexere Schritte wie inhaltliche Bewertung oder das Setzen interner Einschätzungen sollten meiner Meinung nach weiterhin manuell erfolgen oder durch ein gut geregeltes Rollen‑/Authentifizierungsmodell gesteuert werden.