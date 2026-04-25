import type { AppResources } from '../locales/types';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'home';
        resources: AppResources;
    }
}
