'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from './types/types';

export const Modal = ({ children }: ModalProps) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (isBrowser) {
        return ReactDOM.createPortal(
            <> {children} </>,
            document.getElementById('modal-root') as HTMLBodyElement
        );
    } else {
        return null;
    }
};
