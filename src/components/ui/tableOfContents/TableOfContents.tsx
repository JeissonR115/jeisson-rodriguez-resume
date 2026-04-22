import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './table-of-contents.scss';

type Heading = Readonly<{
    id: string;
    label: string;
    level: number;
}>;

type TableOfContentsProps = Readonly<{
    container?: string;
    levels?: readonly number[];
    collapsible?: boolean;
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

function TableOfContents({
    container = 'main',
    levels = [2, 3],
    collapsible = false,
}: TableOfContentsProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [active, setActive] = useState<string>('');
    const [isClickScrolling, setIsClickScrolling] = useState(false);

    const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { i18n } = useTranslation();

    // ------------------------
    // Parse headings
    // ------------------------
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const selector = levels.map((l) => `${container} h${l}`).join(', ');

        const parseHeadings = (): void => {
            const nodeList = document.querySelectorAll(selector);

            const parsed: Heading[] = Array.from(nodeList)
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

        return () => {
            window.cancelAnimationFrame(rafId);
        };
    }, [container, levels, i18n.language]);

    // ------------------------
    // Scroll-based active
    // ------------------------
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!headings.length) return;

        const handleScroll = (): void => {
            if (isClickScrolling) return;

            const root = document.documentElement;

            const headerHeight =
                parseInt(
                    getComputedStyle(root).getPropertyValue('--header-height'),
                ) || 0;

            const offset = headerHeight + 20;

            let current: string = headings[0]?.id ?? '';

            for (const { id } of headings) {
                const el = document.getElementById(id);
                if (!el) continue;

                const top = el.getBoundingClientRect().top;

                if (top - offset <= 0) {
                    current = id;
                } else {
                    break;
                }
            }

            setActive(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [headings, isClickScrolling]);

    // ------------------------
    // Detect scroll end
    // ------------------------
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
            if (fallbackTimerRef.current) {
                clearTimeout(fallbackTimerRef.current);
            }

            fallbackTimerRef.current = setTimeout(() => {
                handleScrollEnd();
            }, 120);
        };

        window.addEventListener('scrollend', handleScrollEnd);
        window.addEventListener('scroll', fallbackHandler);

        return () => {
            window.removeEventListener('scrollend', handleScrollEnd);
            window.removeEventListener('scroll', fallbackHandler);

            if (fallbackTimerRef.current) {
                clearTimeout(fallbackTimerRef.current);
            }
        };
    }, [isClickScrolling]);

    if (!headings.length) return null;

    // ------------------------
    // Click handler
    // ------------------------
    const handleClick =
        (id: string) =>
        (e: React.MouseEvent<HTMLAnchorElement>): void => {
            e.preventDefault();

            const el = document.getElementById(id);
            if (!el) return;

            setIsClickScrolling(true);
            setActive(id);

            const root = document.documentElement;

            const headerHeight =
                parseInt(
                    getComputedStyle(root).getPropertyValue('--header-height'),
                ) || 0;

            const offset = headerHeight + 16;

            const top =
                el.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top,
                behavior: 'smooth',
            });
        };

    // ------------------------
    // Group headings (dinámico)
    // ------------------------
    const rootLevel = Math.min(...levels);

    const grouped = headings.reduce<{ parent: Heading; children: Heading[] }[]>(
        (acc, heading) => {
            if (heading.level === rootLevel) {
                acc.push({ parent: heading, children: [] });
            } else {
                const last = acc[acc.length - 1];
                if (last) last.children.push(heading);
            }
            return acc;
        },
        [],
    );

    // ------------------------
    // Render
    // ------------------------
    return (
        <nav className="toc" aria-label="Table of contents">
            <ul className="toc__list">
                {grouped.map(({ parent, children }) => {
                    const isParentActive =
                        active === parent.id ||
                        children.some((c) => c.id === active);

                    return (
                        <li
                            key={parent.id}
                            className={[
                                'toc__item',
                                `toc__item--h${parent.level}`,
                                active === parent.id && 'toc__item--active',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                        >
                            <a
                                href={`#${parent.id}`}
                                onClick={handleClick(parent.id)}
                            >
                                {parent.label}
                            </a>

                            {(!collapsible || isParentActive) &&
                                children.length > 0 && (
                                    <ul>
                                        {children.map(
                                            ({ id, label, level }) => (
                                                <li
                                                    key={id}
                                                    className={[
                                                        'toc__item',
                                                        `toc__item--h${level}`,
                                                        active === id &&
                                                            'toc__item--active',
                                                    ]
                                                        .filter(Boolean)
                                                        .join(' ')}
                                                >
                                                    <a
                                                        href={`#${id}`}
                                                        onClick={handleClick(
                                                            id,
                                                        )}
                                                    >
                                                        {label}
                                                    </a>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default TableOfContents;
