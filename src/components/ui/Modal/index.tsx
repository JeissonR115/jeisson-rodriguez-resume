import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './modal.scss';

export type ModalOptions = {
    title?: string;
    showClose?: boolean;
    closeOnOverlay?: boolean;
    closeOnEscape?: boolean;
};

type ModalProps = ModalOptions & {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
};

function Modal({
    children,
    onClose,
    isOpen,
    showClose = true,
    closeOnOverlay = true,
    closeOnEscape = true,
    title,
}: ModalProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(isOpen);

    // Mount/unmount con delay para animación de salida
    useEffect(() => {
        if (isOpen) {
            const frameId = requestAnimationFrame(() => setMounted(true));
            return () => cancelAnimationFrame(frameId);
        }

        const id = setTimeout(() => setMounted(false), 250);
        return () => clearTimeout(id);
    }, [isOpen]);

    // Escape key
    useEffect(() => {
        if (!closeOnEscape) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose, closeOnEscape]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Focus trap
    useEffect(() => {
        if (isOpen) panelRef.current?.focus();
    }, [isOpen]);

    // return después de todos los hooks
    if (!mounted) return null;

    return (
        <div
            className={`modal ${isOpen ? 'modal--open' : ''}`}
            onClick={closeOnOverlay ? onClose : undefined}
            role="presentation"
        >
            <div
                ref={panelRef}
                className="modal__panel"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                tabIndex={-1}
            >
                {(showClose || title) && (
                    <div className="modal__header">
                        {title && <h2 className="modal__title">{title}</h2>}
                        {showClose && (
                            <button
                                className="modal__close"
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                )}
                <div className="modal__content">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
