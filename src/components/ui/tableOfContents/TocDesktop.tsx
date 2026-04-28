import type { TocProps } from '.';
import { TocContent } from './TocContent';
import { useTableOfContents } from './useTableOfContents';

type TocDesktopProps = TocProps;
export function TocDesktop({
    container = 'main',
    levels = [2, 3],
    collapsible = false,
}: TocDesktopProps) {
    const { headings, active, scrollTo } = useTableOfContents(
        container,
        levels,
    );

    return (
        <aside className="toc-desktop">
            <TocContent
                headings={headings}
                active={active}
                onNavigate={scrollTo}
                levels={levels}
                collapsible={collapsible}
                navigateOnFirstClick={true}
            />
        </aside>
    );
}
