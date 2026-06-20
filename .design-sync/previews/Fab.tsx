import { Fab } from 'jeisson-rodriguez-resume';
import { List } from 'lucide-react';

// Real usage: the mobile table-of-contents trigger
// (src/components/ui/tableOfContents/TocMobile.tsx).
export function Default() {
    return (
        <div style={{ position: 'relative', height: 120 }}>
            <Fab icon={<List size={20} />} label="Table of contents" />
        </div>
    );
}

export function Labeled() {
    return (
        <div style={{ position: 'relative', height: 120 }}>
            <Fab
                icon={<List size={20} />}
                label="Contents"
                showLabel
                variant="secondary"
            />
        </div>
    );
}

export function Active() {
    return (
        <div style={{ position: 'relative', height: 120 }}>
            <Fab icon={<List size={20} />} label="Table of contents" active />
        </div>
    );
}
