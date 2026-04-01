import { useState } from 'react';
import { type Language, LanguageContext } from './LanguageContext';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>('es');
    const toggle = () => setLang((l) => (l === 'es' ? 'en' : 'es'));

    return (
        <LanguageContext.Provider value={{ lang, toggle }}>
            {children}
        </LanguageContext.Provider>
    );
}
