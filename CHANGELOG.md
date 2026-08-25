# Änderungsverlauf

Hier trägst du ein, was du geändert hast. Neueste Version oben.

**Wie das gemeint ist**

- Jede Änderung kommt hier rein, in Worten, die auch jemand versteht, der den
  Code nicht gelesen hat. „Fehler behoben" sagt uns nichts. Was war kaputt, was
  konnte dadurch passieren, was hast du gemacht?
- Die Version in `package.json` wird im selben Zug mitgezogen. Beide müssen
  zusammenpassen.
- Versionsnummern nach dem Muster `HAUPT.NEBEN.KORREKTUR`:
  - **KORREKTUR** steigt, wenn du etwas reparierst, ohne dass sich das
    Verhalten für den Benutzer ändert.
  - **NEBEN** steigt, wenn etwas dazukommt oder sich sichtbar anders verhält.
  - **HAUPT** bleibt bei 0, solange das Projekt nicht offiziell fertig ist.

Wenn du dir bei der Einordnung unsicher bist, schreib deine Überlegung
einfach dazu. Uns interessiert, wie du denkst, nicht ob du die Regel auf die
Nachkommastelle triffst.

---
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

Das Projekt, wie du es bekommen hast. Ab hier bist du dran.
