import type { Language } from '../context/language/LanguageContext';
import { useLanguage } from '../context/language/useLanguage';

type WithI18n<T> = { i18n: Record<Language, T> } & Record<string, unknown>;
type MaybeI18n<T> = T extends WithI18n<infer U> ? Omit<T, 'i18n'> & U : T;
type ResolvedConfig<T> = { [K in keyof T]: MaybeI18n<T[K]> };

function resolveI18n<T>(obj: T, lang: Language): MaybeI18n<T> {
    if (obj !== null && typeof obj === 'object' && 'i18n' in obj) {
        const { i18n, ...rest } = obj as WithI18n<unknown>;
        return {
            ...rest,
            ...(i18n[lang] as Record<string, unknown>),
        } as MaybeI18n<T>;
    }
    return obj as MaybeI18n<T>;
}

export function usePageConfig<T extends Record<string, unknown>>(
    config: T,
): ResolvedConfig<T> {
    const { lang } = useLanguage();

    return Object.fromEntries(
        Object.entries(config).map(([key, value]) => [
            key,
            resolveI18n(value, lang),
        ]),
    ) as ResolvedConfig<T>;
}
