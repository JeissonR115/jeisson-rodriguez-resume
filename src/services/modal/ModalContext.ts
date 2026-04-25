import type { ModalOptions } from '@/components/ui/Modal/index';
import { createContext } from 'react';

export type ModalContextType = {
    isOpen: boolean;
    content: React.ReactNode | null;
    options: ModalOptions;
    openModal: (content: React.ReactNode, options?: ModalOptions) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    content: null,
    options: {},
    openModal: () => {},
    closeModal: () => {},
});
