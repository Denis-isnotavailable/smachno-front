'use client'
import React, { useEffect, useRef } from 'react';
import { ModalContentProps } from './types/types';

import cls from './Modal.module.scss';

export const ModalContent = ({
    isDarkBack = false,
    onClose,
    children,
    modal_content_style,
    modal_content_style__active,
    isShown,
    isScrollY,
}: ModalContentProps) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isShown && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [isShown]);
    
    return (
        <div
            ref={scrollRef}
            className={`${cls['bg']} ${isDarkBack && cls['is-dark']} ${isShown && cls['bg__active']} ${isScrollY && cls['bg__scroll']}`}
            onClick={onClose}
        >
            <div                
                className={`${modal_content_style} ${isShown && modal_content_style__active}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
