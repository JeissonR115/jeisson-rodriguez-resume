import type en from './en';

export type Language = 'es' | 'en';
export type AppResources = typeof en;
export type LocaleResources = Record<Language, AppResources>;
