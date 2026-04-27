import { useFab } from '@/services/fab/useFab';
import { useModal } from '@/services/modal/useModal';
import { TableOfContents as TocIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { TocProps } from '.';
import { TocContent } from './TocContent';
import { useTableOfContents, type Heading } from './useTableOfContents';

type TocMobileProps = TocProps;

type LatestRef = {
    headings: Heading[];
    active: string;
    scrollTo: (id: string) => void;
    openModal: ReturnType<typeof useModal>['openModal'];
    closeModal: () => void;
    levels: readonly number[];
    collapsible: boolean;
};

export function TocMobile({
    container = 'main',
    levels = [2, 3],
    collapsible = false,
}: TocMobileProps) {
    const { headings, active, scrollTo } = useTableOfContents(
        container,
        levels,
    );
    const { openModal, closeModal } = useModal();

    const latestRef = useRef<LatestRef>({
        headings,
        active,
        scrollTo,
        openModal,
        closeModal,
        levels,
        collapsible,
    });

    // useEffect en vez de asignación directa en render
    useEffect(() => {
        latestRef.current = {
            headings,
            active,
            scrollTo,
            openModal,
            closeModal,
            levels,
            collapsible,
        };
    });

    const handleFabClick = useCallback(() => {
        const {
            headings,
            active,
            scrollTo,
            openModal,
            closeModal,
            levels,
            collapsible,
        } = latestRef.current;

        openModal(
            <TocContent
                headings={headings}
                active={active}
                onNavigate={scrollTo}
                levels={levels}
                collapsible={collapsible}
                onAfterNavigate={closeModal}
            />,
        );
    }, []);

    const fabConfig = useMemo(
        () => ({
            icon: <TocIcon size={20} />,
            label: 'Table of contents',
            onClick: handleFabClick,
        }),
        [handleFabClick],
    );

    useFab(fabConfig);

    return null;
}
