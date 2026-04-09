import { useEffect, useState } from 'react';
import './table-of-contents.scss';

type Heading = {
    id: string;
    label: string;
    level: number;
};

type TableOfContentsProps = {
    container?: string;
    levels?: number[];
};

function TableOfContents({
    container = 'main',
    levels = [2, 3],
}: TableOfContentsProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [active, setActive] = useState<string>('');

    const levelStr = levels.join();

    useEffect(() => {
        const selector = levels.map((l) => `${container} h${l}`).join(', ');

        const parse = () => {
            const els = Array.from(
                document.querySelectorAll<HTMLElement>(selector),
            );
            const parsed = els.map((el, i) => {
                if (!el.id) el.id = `heading-${i}`;
                return {
                    id: el.id,
                    label: el.textContent ?? '',
                    level: parseInt(el.tagName[1]),
                };
            });
            setHeadings(parsed);
        };

        const id = setTimeout(parse, 0);
        return () => clearTimeout(id);
    }, [container, levelStr]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((e) => e.isIntersecting);
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );

        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (!headings.length) return null;

    return (
        <nav className="toc">
            <ul className="toc__list">
                {headings.map(({ id, label, level }) => (
                    <li
                        key={id}
                        className={[
                            'toc__item',
                            `toc__item--h${level}`,
                            active === id && 'toc__item--active',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                    >
                        <a
                            href={`#${id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document
                                    .getElementById(id)
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default TableOfContents;
