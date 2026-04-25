import Modal from '@/components/ui/Modal';
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from './ModalContext';

export function ModalPortal() {
    const { isOpen, content, closeModal, options } = useContext(ModalContext);

    if (content === null) return null;

    return createPortal(
        <Modal isOpen={isOpen} onClose={closeModal} {...options}>
            {content}
        </Modal>,
        document.body,
    );
}
