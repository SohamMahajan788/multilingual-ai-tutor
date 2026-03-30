/**
 * Dictionary of translation keys to localized strings for one locale.
 */
export type MessageCatalog = Record<string, string>;

/**
 * Resolves a user-facing string from a translation key and loaded catalog.
 * UI code must pass keys only; never concatenate raw English in components.
 *
 * @param key - Stable translation key (e.g. `screens.home.title`).
 * @param catalog - Messages for the active locale.
 * @param fallback - Optional fallback if the key is missing (defaults to the key itself).
 * @returns The localized string, or fallback/key when missing.
 */
export function translate(
  key: string,
  catalog: MessageCatalog,
  fallback?: string
): string {
  const resolved = catalog[key];
  if (resolved !== undefined) {
    return resolved;
  }
  return fallback ?? key;
}
