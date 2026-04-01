import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export type Theme = 'light' | 'dark';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() =>
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}
