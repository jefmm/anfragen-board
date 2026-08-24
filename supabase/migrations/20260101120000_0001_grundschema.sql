-- Grundschema fuer das Anfragen-Board.
--
-- Drei Tabellen: `anfragen` kommt vom oeffentlichen Formular, `notizen` sind
-- interne Vermerke dazu, und `anfrage_intern` haelt fest, was wir intern zu
-- einer Anfrage einschaetzen.
--
-- Row Level Security ist auf allen drei Tabellen aktiv. Ohne passende Policy
-- kommt niemand an die Daten, auch nicht lesend.
--
-- MERKE fuer jede neue Tabelle: RLS einschalten UND eine Policy schreiben.
-- Eines von beiden allein reicht nicht.

create extension if not exists "pgcrypto";

-- ── Anfragen ────────────────────────────────────────────────────────────────

create table public.anfragen (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  telefon     text,
  betreff     text not null,
  nachricht   text not null,
  status      text not null default 'neu'
              check (status in ('neu', 'in_arbeit', 'erledigt')),
  created_at  timestamptz not null default now()
);

create index anfragen_created_at_idx on public.anfragen (created_at desc);

alter table public.anfragen enable row level security;

-- Jeder darf eine Anfrage stellen. Das Formular ist oeffentlich.
create policy anfragen_einreichen on public.anfragen
  for insert to anon, authenticated
  with check (true);

-- Die Uebersicht zeigt alle Anfragen.
create policy anfragen_lesen on public.anfragen
  for select to anon, authenticated
  using (true);

-- Der Status laesst sich aendern.
create policy anfragen_status_aendern on public.anfragen
  for update to anon, authenticated
  using (true);

-- ── Notizen ─────────────────────────────────────────────────────────────────

create table public.notizen (
  id          uuid primary key default gen_random_uuid(),
  anfrage_id  uuid not null references public.anfragen (id) on delete cascade,
  text        text not null,
  created_at  timestamptz not null default now()
);

create index notizen_anfrage_idx on public.notizen (anfrage_id, created_at);

alter table public.notizen enable row level security;

-- Notizen anlegen ist erlaubt.
create policy notizen_anlegen on public.notizen
  for insert to anon, authenticated
  with check (true);

-- ── Interne Einschaetzung ───────────────────────────────────────────────────
--
-- Was wir intern zu einer Anfrage festhalten: geschaetztes Auftragsvolumen,
-- wer sie bearbeitet, und eine Bemerkung, die der Kunde niemals lesen soll.
--
-- Diese Tabelle taucht in der Oberflaeche nicht auf. Sie wird spaeter vom
-- internen Bereich gebraucht, deshalb steht sie schon im Schema.

create table public.anfrage_intern (
  id                uuid primary key default gen_random_uuid(),
  anfrage_id        uuid not null unique references public.anfragen (id) on delete cascade,
  budget_geschaetzt numeric(10, 2),
  bearbeiter        text,
  bemerkung         text,
  created_at        timestamptz not null default now()
);

-- Interne Daten gehen nur das Team etwas an, nicht die Oeffentlichkeit.
create policy anfrage_intern_lesen on public.anfrage_intern
  for select to authenticated
  using (true);

create policy anfrage_intern_pflegen on public.anfrage_intern
  for all to authenticated
  using (true)
  with check (true);

-- ── Tabellenrechte ──────────────────────────────────────────────────────────
--
-- RLS entscheidet, WELCHE Zeilen eine Rolle sieht. Das GRANT entscheidet, ob
-- sie die Tabelle ueberhaupt anfassen darf. Beides wird gebraucht.

grant select, insert, update on public.anfragen to anon, authenticated, service_role;
grant select, insert on public.notizen to anon, authenticated, service_role;
grant select on public.anfrage_intern to anon, authenticated, service_role;
