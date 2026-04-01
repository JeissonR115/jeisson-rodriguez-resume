import { createContext } from 'react';

export type Language = 'es' | 'en';

export interface LanguageContextType {
    lang: Language;
    toggle: () => void;
}

export const LanguageContext = createContext<LanguageContextType>({
    lang: 'es',
    toggle: () => {},
});
