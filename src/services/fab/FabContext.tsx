import type { FabPosition, FabSize, FabVariant } from '@/components/ui/fab';
import { createContext } from 'react';

export type FabConfig = {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    active?: boolean;
    position?: FabPosition;
    size?: FabSize;
    variant?: FabVariant;
};

export type FabContextType = {
    config: FabConfig | null;
    register: (config: FabConfig) => void;
    unregister: () => void;
};

export const FabContext = createContext<FabContextType>({
    config: null,
    register: () => {},
    unregister: () => {},
});
