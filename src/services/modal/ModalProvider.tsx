import type { ModalOptions } from '@/components/ui/Modal';
import { useState } from 'react';
import { ModalContext } from './ModalContext';

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<React.ReactNode | null>(null);

    const [options, setOptions] = useState<ModalOptions>({});

    const openModal = (content: React.ReactNode, opts: ModalOptions = {}) => {
        setContent(content);
        setOptions(opts);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setContent(null), 300);
    };

    return (
        <ModalContext.Provider
            value={{ isOpen, content, openModal, closeModal, options }}
        >
            {children}
        </ModalContext.Provider>
    );
}
