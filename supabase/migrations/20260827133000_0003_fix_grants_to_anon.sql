-- Entferne mögliche UPDATE/DELETE/OTHER Grants an anon auf anfrage_intern und notizen
REVOKE UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.anfrage_intern FROM anon;
REVOKE UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.notizen FROM anon;
