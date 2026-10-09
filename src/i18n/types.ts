import type { Locale } from './config';

/**
 * Strings marked "HTML" are rendered with `set:html`. They are authored in this
 * repository only, and may contain inline markup such as <a>, <em> or <br>.
 */
type Html = string;

export interface PageMeta {
  title: string;
  description: string;
}

export interface Section {
  title: string;
  /** HTML */
  text: Html;
}

export interface Offer {
  /** Stable anchor, identical in every locale (e.g. /services#monitoring). */
  id: string;
  title: string;
  headline: string;
  promise: string;
  audience: string;
  deliverables: string[];
  /** Optional extra block such as "Typical scope" or "Typical questions". */
  extra?: { label: string; text: string };
  how: string;
  pricing: string;
  why: string;
  cta: string;
}

export interface Dictionary {
  locale: Locale;
  chrome: {
    company: string;
    skipToContent: string;
    primaryNav: string;
    externalLinks: string;
    menu: string;
    close: string;
    language: string;
    languageNames: Record<Locale, string>;
    theme: { label: string; auto: string; light: string; dark: string };
  };
  nav: {
    home: string;
    services: string;
    approach: string;
    about: string;
    contact: string;
    linkedin: string;
    github: string;
  };
  home: {
    meta: PageMeta;
    /** HTML */
    hero: Html;
    links: { services: string; contact: string };
  };
  services: {
    meta: PageMeta;
    label: string;
    heading: string;
    /** HTML paragraphs */
    intro: Html[];
    listLabel: string;
    labels: {
      audience: string;
      deliverables: string;
      how: string;
      pricing: string;
      why: string;
      start: string;
      write: string;
    };
    offers: Offer[];
    /** HTML */
    outro: Html;
  };
  approach: {
    meta: PageMeta;
    label: string;
    heading: string;
    principles: Section[];
    start: {
      heading: string;
      intro: string;
      steps: Section[];
    };
    oneLiner: { label: string; text: string };
    /** HTML */
    outro: Html;
  };
  about: {
    meta: PageMeta;
    label: string;
    /** HTML */
    intro: Html;
    sections: Section[];
    tagline: string;
  };
  contact: {
    meta: PageMeta;
    label: string;
    heading: string;
    /** HTML */
    intro: Html;
    emailLabel: string;
    offersLabel: string;
    write: string;
    addressLabel: string;
    address: string[];
    elsewhereLabel: string;
    /** HTML */
    smallPrint: Html;
  };
  notFound: {
    meta: PageMeta;
    heading: string;
    back: string;
  };
}
