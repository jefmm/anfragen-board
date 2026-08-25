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
