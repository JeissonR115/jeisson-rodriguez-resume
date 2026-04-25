import Fab from '@/components/ui/fab';
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { FabContext } from './FabContext';

export function FabPortal() {
    const { config } = useContext(FabContext);

    if (!config) return null;

    return createPortal(
        <Fab
            icon={config.icon}
            label={config.label}
            onClick={config.onClick}
            position={config.position}
            size={config.size}
            variant={config.variant}
            active={config.active}
        />,
        document.body,
    );
}
