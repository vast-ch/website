export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Every page exists once per locale. Slugs are translated, so the language
 * switcher and the hreflang links resolve a page through its route key rather
 * than by prefixing the path.
 */
export const ROUTES = {
  home: { en: '/', fr: '/fr' },
  services: { en: '/services', fr: '/fr/services' },
  approach: { en: '/approach', fr: '/fr/approche' },
  about: { en: '/about', fr: '/fr/a-propos' },
  contact: { en: '/contact', fr: '/fr/contact' },
  legal: { en: '/legal', fr: '/fr/mentions-legales' },
  privacy: { en: '/privacy', fr: '/fr/confidentialite' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

export const route = (key: RouteKey, locale: Locale): string => ROUTES[key][locale];

export const HTML_LANG: Record<Locale, string> = { en: 'en', fr: 'fr' };
export const OG_LOCALE: Record<Locale, string> = { en: 'en_GB', fr: 'fr_CH' };

export const CONTACT_EMAIL = 'hello@vast.ch';

export const mailto = (subject?: string) =>
  `mailto:${CONTACT_EMAIL}` + (subject ? `?subject=${encodeURIComponent(subject)}` : '');

export const EXTERNAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/vast-switzerland-gmbh',
  github: 'https://github.com/vast-ch',
};
