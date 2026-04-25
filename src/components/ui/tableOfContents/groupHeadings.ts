import type { Heading } from './useTableOfContents';

export type HeadingGroup = {
    parent: Heading;
    children: Heading[];
};

export function groupHeadings(
    headings: Heading[],
    rootLevel: number,
): HeadingGroup[] {
    return headings.reduce<HeadingGroup[]>((acc, heading) => {
        if (heading.level === rootLevel) {
            acc.push({ parent: heading, children: [] });
        } else {
            const last = acc[acc.length - 1];
            if (last) last.children.push(heading);
        }
        return acc;
    }, []);
}
