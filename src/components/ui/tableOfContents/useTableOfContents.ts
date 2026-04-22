import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type Heading = Readonly<{
    id: string;
    label: string;
    level: number;
}>;

function slugify(text: string, fallback: string): string {
    const slug = text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
    return slug || fallback;
}

function isHTMLElement(node: Element): node is HTMLElement {
    return node instanceof HTMLElement;
}

function getHeaderHeight(): number {
    return (
        parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
                '--header-height',
            ),
        ) || 0
    );
}

export function useTableOfContents(
    container: string,
    levels: readonly number[],
) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [active, setActive] = useState<string>('');
    const [isClickScrolling, setIsClickScrolling] = useState(false);
    const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { i18n } = useTranslation();

    // Parse headings
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const selector = levels.map((l) => `${container} h${l}`).join(', ');

        const parseHeadings = (): void => {
            const parsed: Heading[] = Array.from(
                document.querySelectorAll(selector),
            )
                .filter(isHTMLElement)
                .map((el, i) => {
                    if (!el.id) {
                        el.id = slugify(el.textContent ?? '', `heading-${i}`);
                    }
                    return {
                        id: el.id,
                        label: el.textContent ?? '',
                        level: Number(el.tagName.replace('H', '')),
                    };
                });

            setHeadings(parsed);
        };

        const rafId = window.requestAnimationFrame(parseHeadings);
        return () => window.cancelAnimationFrame(rafId);
    }, [container, levels, i18n.language]);

    // Scroll-based active
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!headings.length) return;

        const handleScroll = (): void => {
            if (isClickScrolling) return;

            const offset = getHeaderHeight() + 20;
            let current: string = headings[0]?.id ?? '';

            for (const { id } of headings) {
                const el = document.getElementById(id);
                if (!el) continue;
                if (el.getBoundingClientRect().top - offset <= 0) {
                    current = id;
                } else {
                    break;
                }
            }

            setActive(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings, isClickScrolling]);

    // Detect scroll end
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!isClickScrolling) return;

        const handleScrollEnd = (): void => {
            setIsClickScrolling(false);
            window.removeEventListener('scrollend', handleScrollEnd);
            window.removeEventListener('scroll', fallbackHandler);
            if (fallbackTimerRef.current) {
                clearTimeout(fallbackTimerRef.current);
                fallbackTimerRef.current = null;
            }
        };

        const fallbackHandler = (): void => {
            if (fallbackTimerRef.current)
                clearTimeout(fallbackTimerRef.current);
            fallbackTimerRef.current = setTimeout(handleScrollEnd, 120);
        };

        window.addEventListener('scrollend', handleScrollEnd);
        window.addEventListener('scroll', fallbackHandler);

        return () => {
            window.removeEventListener('scrollend', handleScrollEnd);
            window.removeEventListener('scroll', fallbackHandler);
            if (fallbackTimerRef.current)
                clearTimeout(fallbackTimerRef.current);
        };
    }, [isClickScrolling]);

    const scrollTo = (id: string): void => {
        const el = document.getElementById(id);
        if (!el) return;

        setIsClickScrolling(true);
        setActive(id);

        const offset = getHeaderHeight() + 16;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return { headings, active, scrollTo };
}
