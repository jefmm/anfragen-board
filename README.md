# Anfragen-Board (Inbound Request Hub)

Ein leichtgewichtiges, produktionsreifes Anfragen- und Lead-Management-System für Praxen und Dienstleister. Die Anwendung ermöglicht es Besuchern, unkompliziert Kontaktanfragen über ein responsives Webformular einzureichen, während das interne Team eingehende Anfragen strukturiert sichtet, priorisiert und mit internen Notizen sowie Budget-Einschätzungen versieht.

Entwickelt mit **Next.js (App Router)**, **PostgreSQL via Supabase** und **Vercel**.


---

## 🎯 Überblick & Kernfunktionen

- **Öffentliches Anfrage-Formular:** Schnelle, barrierefreie Übermittlung von Neuanfragen ohne Login-Zwang.
- **Interne Übersicht & Status-Tracking:** Übersichtliches Board zur Verwaltung des Bearbeitungsstatus (`neu`, `in_arbeit`, `erledigt`).
- **Detailansicht mit Notizen:** Möglichkeit zur teaminternen Dokumentation von Rückrufen, Zwischenständen und Abstimmungen.
- **Geschützte interne Bewertung (`anfrage_intern`):** Erfassung von geschätztem Auftragsvolumen, Bearbeiter und internen Bemerkungen, die strikt vom Kundenbereich isoliert sind.
- **Mobile-First & Responsiv:** Volle Bedienbarkeit auf Desktop- und Mobilgeräten (optimiert für Smartphones).

---

## 🛡️ Sicherheitsarchitektur & Row Level Security (RLS)

Besonderer Wert wurde auf eine saubere Trennung von öffentlichen Formular-Funktionen und geschützten internen Daten gelegt. Die Zugriffskontrolle greift direkt auf Datenbankebene über PostgreSQL Row Level Security (RLS):

1. **`anfragen`:**
   - Besucher (`anon`) dürfen Anfragen einreichen (`INSERT`).
   - Lesender Zugriff (`SELECT`) und Statusänderungen (`UPDATE`) sind rollenbasiert geregelt.
   - Löschoperationen (`DELETE`) für anonyme Rollen sind explizit entzogen.
2. **`notizen`:**
   - Verknüpft via Fremdschlüssel (`anfrage_id`) mit Kaskadenlöschung (`ON DELETE CASCADE`).
   - Nur für interne Teambearbeitung freigegeben.
3. **`anfrage_intern`:**
   - Vollständige Isolierung: Tabelle besitzt keinerlei Berechtigungen für nicht authentifizierte (`anon`) Aufrufe.
   - Nur authentifizierte Teammitglieder (`authenticated`) haben Zugriff auf Budget- und Bearbeiter-Daten.

---

## 🛠 Tech Stack

- **Frontend & Routing:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS (Responsive Viewport-Optimierung)
- **Datenbank & Auth:** Supabase (PostgreSQL, RLS Policies, Schema-Migrationen)
- **Deployment & Hosting:** Vercel (Edge-optimiert, automatische CI/CD Pipeline)

---

## 📂 Projektstruktur

```text
├── app/                  # Next.js App Router (Pages, Layouts, Server Components)
├── components/           # UI-Komponenten (Formulare, Tabellen, Status-Badges)
├── lib/                  # Supabase Client-Konfiguration und Helper-Funktionen
├── supabase/
│   ├── migrations/       # Versionierte SQL-Migrationen (Schema, RLS & Grants)
│   └── seed.sql          # Testdaten für die lokale Entwicklung
├── CHANGELOG.md          # Versionierung und dokumentierte Änderungen
└── public/               # Statische Assets
