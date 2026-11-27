/**
 * Team-Mitglieder für den (derzeit ausgeblendeten) Team-Abschnitt.
 * Leer lassen, solange SHOW_TEAM in site.ts false ist. Beispiel:
 *   { name: 'Vorname Nachname', role: 'Rolle', avatar: '/team/vorname.jpg' }
 * Avatare (eigene Bilder, keine aus dem alten Repo) liegen unter public/team/.
 */
export interface Member {
  name: string;
  role: string;
  avatar?: string;
}

export const team: Member[] = [];
