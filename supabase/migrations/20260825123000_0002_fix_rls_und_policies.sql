-- RLS auf andfrage_intern aktivieren
alter table public.anfrage_intern enable row level security;

-- anon_Leserechte auf anfrage_intern entziehen
revoke select on public.anfrage_intern from anon;

-- Fehlende SELECT_Policy für notizen ergänzen
create policy notizen_lesen on public.notizen
    for select to anon, authenticated
    using (true);