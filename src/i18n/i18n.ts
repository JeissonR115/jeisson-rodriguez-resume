import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en';
import es from '../locales/es';

import type { LocaleResources } from '../locales/types';
const resources: LocaleResources = {
    es,
    en,
};

i18n.use(initReactI18next).init({
    lng: 'es',
    fallbackLng: 'en',
    resources,
    interpolation: { escapeValue: false },
});

export default i18n;
