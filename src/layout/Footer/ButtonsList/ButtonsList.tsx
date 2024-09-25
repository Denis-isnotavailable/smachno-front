'use client';
import { useEffect, useState } from 'react';
import {
    Button,
    ButtonTheme,
    ModalContent,
    Socials,
    Modal,
} from '@/components';
import { ShareIcon } from '@/utils/SVG/ShareIcon';
import { removeScroll, abortScrollRemovingHeader } from '@/utils/scrollCounts';
import { ShareModalContent } from '@/components/index';
import cls from './ButtonsList.module.scss';
import { selectToken } from '@/store/features/authSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/store/features/services/authService';

const BUTTON_NAME_SHARE = 'Поділитися сайтом';
const BUTTON_NAME_SIGN_UP = 'Зареєструватися';
const BUTTON_LOGOUT = 'Вийти';
const EMAIL = 'smachno.na.seli@gmail.com';

export const ButtonsList = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const token = useSelector(selectToken);
    const dispatch = useDispatch<AppDispatch>();
    const [logout] = useLogoutMutation();
    const router = useRouter();    

    useEffect(() => {
        if (token) setIsLogIn(true);
        else setIsLogIn(false);
    }, [token]);

    const handleSignUpLogOutButtonClick = async () => {
        if (isLogIn) {
            await logout(dispatch).unwrap();
            setIsLogIn(false);
        } else {
            router.push('/registration');
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);

        removeScroll();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        abortScrollRemovingHeader();
    };

    return (
        <div>
            <ul className={cls['buttons-list']} id='contacts'>
                <li className={cls['buttons-list_item']}>
                    <Socials />
                </li>

                <li className={cls['buttons-list_item']}>
                    <Button
                        type={'button'}
                        theme={ButtonTheme.SECONDARY}
                        className={cls['footer-button']}
                        onClick={handleOpenModal}
                    >
                        {BUTTON_NAME_SHARE}
                        <ShareIcon />
                    </Button>
                </li>

                <li className={cls['buttons-list_item']}>                    
                    <Button
                        type={'button'}
                        theme={ButtonTheme.SECONDARY}
                        className={cls['footer-button']}
                        onClick={handleSignUpLogOutButtonClick}
                    >
                        {isLogIn ? BUTTON_LOGOUT : BUTTON_NAME_SIGN_UP}
                    </Button>
                </li>

                <li className={cls['buttons-list_item']}>                    
                    <a
                        href={`mailto:${EMAIL}`}
                        className={cls['footer-email']}
                    >
                        {EMAIL}
                    </a>
                </li>
            </ul>

            <Modal>
                {
                    <ModalContent
                        onClose={handleCloseModal}
                        modal_content_style={cls['modal-content']}
                        modal_content_style__active={
                            cls['modal-content__active']
                        }
                        isShown={showModal}
                        isDarkBack
                    >
                        <ShareModalContent onClose={handleCloseModal} />
                    </ModalContent>
                }
            </Modal>
        </div>
    );
};
