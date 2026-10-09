import { en } from './en';
import { fr } from './fr';
import type { Locale } from './config';
import type { Dictionary } from './types';

export * from './config';
export type { Dictionary, Offer, Section } from './types';

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
