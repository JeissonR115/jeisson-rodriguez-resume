import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    base: mode === 'production' ? '/jeisson-rodriguez-resume/' : '/',
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    server: {
        hmr: {
            protocol: 'ws',
            host: 'localhost',
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: (content, filepath) => {
                    if (filepath.includes('_variables.scss')) return content;
                    return `@use "/src/styles/_variables.scss" as *;\n${content}`;
                },
            },
        },
    },
}));
