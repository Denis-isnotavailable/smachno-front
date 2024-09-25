'use client';

import { Button, ButtonTheme, Modal, ModalContent } from '@/components';
import React, { useState } from 'react';
import Link from 'next/link';
import { abortScrollRemovingHeader, removeScroll } from '@/utils/scrollCounts';

import cls from './ForgotPasswordAndRegister.module.scss';
import { ForgotPassword } from '@/containers/LoginPage/components/ForgotPassword/ForgotPassword';

export const ForgotPasswordAndRegister = () => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);

        abortScrollRemovingHeader();
    };
    const handleOpenModal = () => {
        setShowModal(true);

        removeScroll();
    };
    return (
        <>
            <ul className={cls.container}>
                <li>
                    <Button
                        type={'button'}
                        theme={ButtonTheme.CLEAR}
                        onClick={handleOpenModal}
                        className={cls.link}
                    >
                        Забув пароль?
                    </Button>
                </li>
                <li>
                    <Button type={'button'} theme={ButtonTheme.CLEAR}>
                        <Link href={'/registration'} className={cls.link}>
                            Зареєструватися
                        </Link>
                    </Button>
                </li>
            </ul>
            <Modal>
                <ModalContent
                    onClose={handleCloseModal}
                    modal_content_style={cls['modal-content']}
                    modal_content_style__active={cls['modal-content__active']}
                    isShown={showModal}
                    isDarkBack
                >
                    <ForgotPassword onClose={handleCloseModal} />
                </ModalContent>
            </Modal>
        </>
    );
};
