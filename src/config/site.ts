import { joinBase, resolveTarget } from './deploy';

export const target = resolveTarget();

export const SITE_NAME = 'AgentUnit';
export const TAGLINE = 'Private Research Lab for Applied AI in Digital Marketing';
export const DESCRIPTION =
  'AgentUnit is a private research lab for applied AI in digital marketing. Current projects: General Agent OS and The Technical Marketer.';

/** Team-Abschnitt (src/components/Team.astro). Aus: wird nicht gerendert, ist nicht in Navigation und Sitemap. */
export const SHOW_TEAM = false;

export const TTM_URL = 'https://ttm.agentunit.com/';

/** Interner Pfad mit Basis-Pfad: `url('/projects/the-technical-marketer/')`. */
export const url = (path = '/') => joinBase(target.base, path);

/** Absolute URL für canonical und og:url. */
export const absoluteUrl = (path = '/') => new URL(url(path), target.site).href;
