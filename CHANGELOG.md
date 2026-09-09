# Änderungsverlauf

---
## [0.2.3] – Security: Anpassung ´anon´ Datenbank-Rechte:

- Ursache: Das initiale Schema enthielt weitreichende GRANTs, die anonyme Zugriffsrechte (auch für sensitive Tabellen) ermöglichten. In Kombination mit permissiven Policies bestand das Risiko, dass anonyme Nutzer Schreib‑ oder Löschoperationen durchführen konnten.
- Fix: Neue Supabase‑Migrations hinzugefügt:
  - supabase/migrations/20260826_0002_fix_rls_and_policies.sql — Entzug anonymer Leserechte auf public.anfrage_intern und Ergänzung der notizen_lesen‑Policy.
  - supabase/migrations/20260827_0003_revoke_anon_privileges.sql — Explizites Entfernen von UPDATE/DELETE/TRUNCATE/REFERENCES/TRIGGER für anon auf public.anfrage_intern und public.notizen.
- Auswirkungen: Anonyme Nutzer können weiterhin öffentliche Anfragen einreichen und die öffentliche Übersicht einsehen, erhalten jedoch keine Schreib‑ oder Löschrechte auf sensible Tabellen. Interne Tabellen (anfrage_intern) bleiben authentifizierten Nutzern vorbehalten.
## [0.2.2] – Build & Dev: next.config.ts auf sauberen Zustand zurückgesetzt (LAN-Tests lokal über .env.local) | Build & Prod: Seiten erzwingen, dass sie Laufzeit-Daten verwenden (fix für unterschiedliche Statusanzeige)

- next.config.ts wieder bereinigt. Ziel: klare, reproduzierbare Production-Konfiguration vor dem Deploy.
- Entwicklertipp: Lokale Lan-Tests mit Handy erfolgen über ´.env.local´ (DEV_ALLOWED_ORIGINS); keine dauerhaften dev-Ausnahmen im Repo.
- Ursache: Bei Production-Builds wurden bestimmte Seiten beim Build statisch (prerendered) erzeugt. Dadurch zeigte die gestartete Produktions-App Daten vom Build-Zeitpunkt; im Dev-Server wurden die Seiten jedoch bei jeder Anfrage neu gerendert und zeigten die aktuellen Daten aus Supabase.
- Fix: In den Server-Komponenten app/anfragen/page.tsx und app/anfragen/[id]/page.tsx wurde oben die Direktive export const dynamic = ´force-dynamic´; ergänzt. Das zwingt Next.js, diese Seiten bei jeder Anfrage serverseitig neu zu rendern und die aktuellen DB-Daten anzuzeigen.
- Auswirkungen: Nach neuem Build/start (npm run build && npm start) stimmen Statusanzeigen und Notizen mit der Datenbank überein, wie im Dev-Server. Seiten, die häufig aktuelle DB-Daten zeigen, werden nicht mehr beim build eingefroren.
- Tests: Lokal rm -rf .next && npm build && npm start durchgeführt; Statusänderungen in Supabase nun ohne erneuten Build auf der Produktivinstanz angezeigt.
## [0.2.1] – Fehlerbehebungen in Mobile-Layout und Cross-Origin-Blockade:

- Fehlendes Viewport-Meta-Tag in ´app/layout.tsx´ ergänzt. Ohne diesen Tag hat der mobile Browser die Seite wie eine Desktop-Ansicht dargestellt unt eingezoomt.
- Anfragen-Übersicht (´app/anfragen/page.tsx´) zeigt auf Bildschirmen unter 720px jetzt eine gestapelte Kartenansicht statt der festbreiten Tabelle (´.tabelle´ hatte ´width: 1000px´, was auf dem Handy zu horizontalem Auslaufen führte).
- Status-Umschaltung (´StatusSchalter.tsx´) hat beim Testen über die lokale Netzwerk-IP (Handy im selben WLAN) nicht funktioniert. Ursache: Next.js blockt seit Version 16 standartmässig Cross-Origin-Zugriffe von anderen Geräten auf Dev-Server-Ressourcen. Behoben durch ´allowedDevOrigins´in ´next.config.ts´.
- ´setzen()´in ´StatusSchalter.tsx´mit try/cath/finally abgesichert, damit ein fehlgeschlagener oder hängender Request die Buttons nicht dauerhaft blockiert und eine echte Fehlermeldung anzeigt.
## [0.2.0] – Interaktives Notizformula auf der Detailseite(´components/NotizFormular.tsx´) und Feinschliff im Layout(´app/globals.css´):

- Nutzer Können nun direkt auf der Detailseite einer Anfrage neue interne Vermerke verfassen und speichern. Das Formular validiert die Eingabe, speichert den Eintrag über den Supabase-Client in der Tabelle ´notizen´ und aktualisiert die Ansicht unmittelbar nach erfolgreichem Eintrag.

- Abstand zwischen Notizformular und Notiz-Vorschau ergänzt, damit beide Bereiche optisch klar getrennt sind.

## [0.1.3] – Kritische Sicherheitslücke in Datenbank-Schema behoben(supabase/migrations/) und Leserechte für Notizen ergänzt:

- Für die interne Tabelle ´public.anfragen_intern´ fehlte im Grundschema die Aktivierung von Row Level Security(RLS), während gleichzeitig der Rolle ´anon´ Leserechte gewährt wurden.
Dadurch hätten vertrauliche interne Daten (Budgets, Bearbeiter, Notizen) von jedem Besucher über die Supabase-REST_API abgefragt werden können. RLS wurde per Migration aktiviert und die Leserechte für ´anon´ wurden entzogen.

- In ´public.notizen´ fehlte eine ´SELECT´-Policy für RLS. Dadurch konnten gespeicherte Notizen im Board zuvor nicht angezeigt werden. Eine entsprechende Leseberechtigung für autorisierte und anonyme Board-Nutzer wurde ergänzt.

## [0.1.2] – Mehrfache Client-Instanziierung verhindert:

In browserClient() wurde ein Singleton-Pattern eingeführt, sodass im Browser nur noch eine einzige Supabase-Client Instanz wiederverwendet wird, statt bei jedem Aufruf eine neue Verbindung aufzubauen.

## [0.1.1] – Lokale Supabase-Konfiguration eingerichtet

- .env.local erstellt und die benötigten Supabase-Konfigurationswerte eingetragen.
- Datenbankzugriff angepasst:
  - Browserzugriff über den öffentlichen Publishable Key
  - Serverseitiger Zugriff über einen geschützten Secret Key
- Authentifizierung für Browser- und Server-Clients korrigiert.
- Zugriffbedingungen für interne beziehungsweise serverseitige Funktionen aus Sicherheitsgründen angepasst.

## [0.1.0] – Ausgangszustand
