import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Eine eigene globalIgnores-Liste ersetzt die Vorgabe von
  // eslint-config-next, deshalb stehen deren Eintraege hier mit drin.
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Legt die Supabase-CLI beim Start an. Gitignoriert, kein Projektcode.
    // Ohne diese Ausnahme meldet der Lint hunderte Fehler in einer Datei,
    // die niemand geschrieben hat, sobald der lokale Stack einmal lief.
    'supabase/.temp/**',
  ]),
]);
