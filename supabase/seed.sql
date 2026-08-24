-- Beispieldaten, damit du beim Entwickeln etwas siehst.
--
-- Alle Namen und Adressen sind erfunden. `example.com` ist eine reservierte
-- Domain (RFC 2606) und kann niemandem gehoeren.
--
-- Fuehre diese Datei NACH den Migrationen aus.

insert into public.anfragen (name, email, telefon, betreff, nachricht, status, created_at) values
  ('Anna Beispiel',    'anna@example.com',    '030 1111111',  'Angebot Website',        'Wir brauchen eine neue Website für unseren Betrieb. Können Sie ein Angebot machen?',            'neu',       now() - interval '2 hours'),
  ('Ben Muster',       'ben@example.com',     null,           'Frage zur Rechnung',     'Auf der letzten Rechnung steht eine Position, die ich nicht zuordnen kann.',                      'in_arbeit', now() - interval '8 hours'),
  ('Clara Testfall',   'clara@example.com',   '040 2222222',  'Termin verschieben',     'Der Termin am Donnerstag passt leider doch nicht. Geht auch Freitag?',                            'neu',       now() - interval '1 day'),
  ('David Probe',      'david@example.com',   null,           'Zusammenarbeit',         'Wir sind eine Agentur und suchen einen Partner für Entwicklungsprojekte.',                       'erledigt',  now() - interval '2 days'),
  ('Elif Vorlage',     'elif@example.com',    '0221 333333',  'Support gebraucht',      'Seit heute früh kommt beim Login eine Fehlermeldung. Was können wir tun?',                      'neu',       now() - interval '3 days'),
  ('Frank Dummy',      'frank@example.com',   '089 4444444',  'Wartungsvertrag',        'Läuft unser Wartungsvertrag automatisch weiter oder müssen wir kündigen?',                     'erledigt',  now() - interval '5 days'),
  ('Greta Platzhalt',  'greta@example.com',   null,           'Schulung für das Team',  'Können Sie eine Einführung für sechs Mitarbeitende machen? Am liebsten vor Ort.',              'in_arbeit', now() - interval '6 days'),
  ('Hakan Exempel',    'hakan@example.com',   '0511 555555',  'Shop-Anbindung',         'Unser Warenwirtschaftssystem soll an den Shop angebunden werden. Ist das machbar?',               'neu',       now() - interval '9 days'),
  ('Ines Attrappe',    'ines@example.com',    null,           'Datenschutz',            'Wo werden unsere Kundendaten gespeichert und wer hat darauf Zugriff?',                            'neu',       now() - interval '11 days'),
  ('Jonas Fiktiv',     'jonas@example.com',   '0351 666666',  'Angebot abgelehnt',      'Wir haben uns für einen anderen Anbieter entschieden. Danke für Ihre Mühe.',                   'erledigt',  now() - interval '14 days'),
  ('Kira Modell',      'kira@example.com',    '0341 777777',  'Relaunch Onlineshop',    'Unser Shop ist von 2018 und auf dem Handy kaum bedienbar. Wir brauchen einen Relaunch.',          'in_arbeit', now() - interval '18 days'),
  ('Lars Schablone',   'lars@example.com',    null,           'Kurze Rückfrage',        'Bieten Sie auch reine Beratung an, ohne dass Sie danach die Umsetzung machen?',                   'neu',       now() - interval '23 days');

-- ── Notizen ─────────────────────────────────────────────────────────────────

insert into public.notizen (anfrage_id, text)
select id, 'Angebot ist raus, Rückmeldung bis Ende der Woche zugesagt.'
  from public.anfragen where email = 'anna@example.com';

insert into public.notizen (anfrage_id, text)
select id, 'Rechnung geprüft, Position stimmt. Kundin informiert.'
  from public.anfragen where email = 'ben@example.com';

insert into public.notizen (anfrage_id, text)
select id, 'Freitag 14 Uhr angeboten, wartet auf Bestätigung.'
  from public.anfragen where email = 'clara@example.com';

insert into public.notizen (anfrage_id, text)
select id, 'Termin für die Schulung steht, Raum ist gebucht.'
  from public.anfragen where email = 'greta@example.com';

insert into public.notizen (anfrage_id, text)
select id, 'Schnittstelle der Warenwirtschaft angefragt, Doku steht aus.'
  from public.anfragen where email = 'hakan@example.com';

-- ── Interne Einschaetzung ───────────────────────────────────────────────────
--
-- Diese Zeilen sieht der Kunde nie. Weder in der Oberflaeche noch sonst wo.

insert into public.anfrage_intern (anfrage_id, budget_geschaetzt, bearbeiter, bemerkung)
select id, 18000.00, 'Vertrieb', 'Zahlt gut, hat letztes Jahr ohne Diskussion abgenommen. Preis ruhig oben ansetzen.'
  from public.anfragen where email = 'anna@example.com';

insert into public.anfrage_intern (anfrage_id, budget_geschaetzt, bearbeiter, bemerkung)
select id, 0.00, 'Vertrieb', 'Dauerbeschwerde, kostet mehr Zeit als er bringt. Vertrag nicht verlängern.'
  from public.anfragen where email = 'ben@example.com';

insert into public.anfrage_intern (anfrage_id, budget_geschaetzt, bearbeiter, bemerkung)
select id, 4500.00, 'Kundenbetreuung', 'Entscheidet langsam, dreimal nachfassen nötig. Sonst unkompliziert.'
  from public.anfragen where email = 'greta@example.com';

insert into public.anfrage_intern (anfrage_id, budget_geschaetzt, bearbeiter, bemerkung)
select id, 32000.00, 'Vertrieb', 'Größter offener Posten dieses Quartal. Wenn das kippt, wird es eng.'
  from public.anfragen where email = 'kira@example.com';

insert into public.anfrage_intern (anfrage_id, budget_geschaetzt, bearbeiter, bemerkung)
select id, 950.00, 'Kundenbetreuung', 'Fragt viel, bucht wenig. Nur mit Vorkasse.'
  from public.anfragen where email = 'lars@example.com';
