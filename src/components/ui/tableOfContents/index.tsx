import { groupHeadings } from './groupHeadings';
import './table-of-contents.scss';
import { useTableOfContents } from './useTableOfContents';

type TableOfContentsProps = Readonly<{
    container?: string;
    levels?: readonly number[];
    collapsible?: boolean;
}>;

function TableOfContents({
    container = 'main',
    levels = [2, 3],
    collapsible = false,
}: TableOfContentsProps) {
    const { headings, active, scrollTo } = useTableOfContents(
        container,
        levels,
    );

    if (!headings.length) return null;

    const rootLevel = Math.min(...levels);
    const grouped = groupHeadings(headings, rootLevel);

    const handleClick =
        (id: string) =>
        (e: React.MouseEvent<HTMLAnchorElement>): void => {
            e.preventDefault();
            scrollTo(id);
        };

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
