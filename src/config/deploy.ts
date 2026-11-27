/**
 * Deploy-Ziel: einzige Stelle für Domain und Basis-Pfad.
 *
 * - `preview`    : GitHub Pages unter https://mltmllr.github.io/agentunit-site/ (Standard)
 * - `production` : https://www.agentunit.com/ ohne Basis-Pfad
 *
 * Umstellen: Konstante `DEFAULT_TARGET` ändern oder die Umgebungsvariable
 * `DEPLOY_TARGET=production` setzen (z. B. `npm run build:production`).
 * Die Suchmaschinen-Freigabe (robots, noindex) hängt am Ziel: Preview ist `noindex`.
 */
export const targets = {
  preview: { site: 'https://mltmllr.github.io', base: '/agentunit-site', indexable: false },
  production: { site: 'https://www.agentunit.com', base: '/', indexable: true },
} as const;

export type TargetName = keyof typeof targets;

export const DEFAULT_TARGET: TargetName = 'production';

export function resolveTarget(env: string | undefined = process.env.DEPLOY_TARGET) {
  if (env === undefined || env === '') return { name: DEFAULT_TARGET, ...targets[DEFAULT_TARGET] };
  if (env !== 'preview' && env !== 'production') {
    throw new Error(`Unbekanntes DEPLOY_TARGET "${env}" (erlaubt: preview, production).`);
  }
  return { name: env as TargetName, ...targets[env as TargetName] };
}

/** Hängt einen Pfad an den Basis-Pfad: `joinBase('/agentunit-site', '/projects/x/')` → `/agentunit-site/projects/x/`. */
export function joinBase(base: string, path = '/'): string {
  const b = base.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}
