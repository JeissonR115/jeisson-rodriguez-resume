import { useContext } from 'react';
import { ModalContext } from './ModalContext';

export function useModal() {
    const { openModal, closeModal } = useContext(ModalContext);
    return { openModal, closeModal };
}
