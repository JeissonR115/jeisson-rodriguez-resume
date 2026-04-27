import { useState } from 'react';
import { groupHeadings } from './groupHeadings';
import './table-of-contents.scss';
import type { Heading } from './useTableOfContents';

type TocContentProps = Readonly<{
    headings: Heading[];
    active: string;
    onNavigate: (id: string) => void;
    levels: readonly number[];
    collapsible?: boolean;
    onAfterNavigate?: () => void;
    navigateOnFirstClick?: boolean;
}>;

export function TocContent({
    headings,
    active,
    onNavigate,
    levels,
    collapsible = false,
    onAfterNavigate,
    navigateOnFirstClick = false,
}: TocContentProps) {
    const [openParents, setOpenParents] = useState<Set<string>>(new Set());

    if (!headings.length) return null;

    const rootLevel = Math.min(...levels);
    const grouped = groupHeadings(headings, rootLevel);

    const handleParentClick =
        (id: string, hasChildren: boolean) =>
        (e: React.MouseEvent<HTMLAnchorElement>): void => {
            e.preventDefault();

            if (hasChildren && !navigateOnFirstClick) {
                const isOpen =
                    openParents.has(id) ||
                    active === id ||
                    grouped
                        .find((g) => g.parent.id === id)
                        ?.children.some((c) => c.id === active);

                if (isOpen) {
                    onNavigate(id);
                    onAfterNavigate?.();
                } else {
                    setOpenParents((prev) => new Set(prev).add(id));
                }
                return;
            }

            onNavigate(id);
            onAfterNavigate?.();
        };

    const handleChildClick =
        (id: string) =>
        (e: React.MouseEvent<HTMLAnchorElement>): void => {
            e.preventDefault();
            onNavigate(id);
            onAfterNavigate?.();
        };

    return (
        <nav className="toc" aria-label="Table of contents">
            <ul className="toc__list">
                {grouped.map(({ parent, children }) => {
                    const isParentActive =
                        active === parent.id ||
                        children.some((c) => c.id === active);

                    const isManuallyOpen = openParents.has(parent.id);
                    const isOpen = isManuallyOpen || isParentActive;
                    const hasChildren = children.length > 0;

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
                                onClick={handleParentClick(
                                    parent.id,
                                    hasChildren,
                                )}
                                aria-expanded={hasChildren ? isOpen : undefined}
                            >
                                {parent.label}
                            </a>

                            {(!collapsible || isOpen) && hasChildren && (
                                <ul>
                                    {children.map(({ id, label, level }) => (
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
                                                onClick={handleChildClick(id)}
                                                aria-current={
                                                    active === id
                                                        ? 'true'
                                                        : undefined
                                                }
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
