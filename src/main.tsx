import { ThemeProvider } from '@/context/theme/ThemeProvider.tsx';
import '@/i18n/i18n.ts';
import { router } from '@/router/index.tsx';
import '@/styles/base/globals.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>,
);
