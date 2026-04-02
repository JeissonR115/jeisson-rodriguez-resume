import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/theme/ThemeProvider.tsx';
import './i18n/i18n.ts';
import './styles/base/globals.scss';
import './styles/utilities/utilities.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </StrictMode>,
);
