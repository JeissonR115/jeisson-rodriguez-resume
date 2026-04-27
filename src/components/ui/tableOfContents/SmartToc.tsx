import { useEffect, useState } from 'react';
import type { TocProps } from '.';
import { TocDesktop } from './TocDesktop';
import { TocMobile } from './TocMobile';

function SmartToc(props: TocProps) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 1024px)');
        const update = () => setIsDesktop(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    return isDesktop ? <TocDesktop {...props} /> : <TocMobile {...props} />;
}

export default SmartToc;
