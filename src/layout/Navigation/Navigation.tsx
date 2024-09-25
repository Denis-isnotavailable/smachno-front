'use client';
import { useState } from 'react';
import Link from 'next/link';
import { NavigationProps } from './types/types';
import { Button, ButtonTheme, ModalContent, Modal } from '@/components';
import { abortScrollRemovingHeader, removeScroll } from '@/utils/scrollCounts';
import { ShareIcon } from '@/utils/SVG/ShareIcon';
import { ShareModalContent } from '@/components/index';

import cls from './Navigation.module.scss';

const NAVIGATION = [
    { id: 1, name: 'Фермер', path: '/#farmer', isActive: true },
    { id: 2, name: 'Кіт', path: '/#cat', isActive: true },
    { id: 3, name: 'Замовити на виріст', path: '/growth', isActive: true },
    { id: 4, name: 'Магазин продуктів', path: '/#market', isActive: true },
    // { id: 5, name: 'Магазин мерча', path: '/merch', isActive: false },
    // { id: 6, name: 'Рецепти', path: '/recipes', isActive: false },
    { id: 7, name: 'Відгуки', path: '/#comments', isActive: true },
    { id: 8, name: 'Поширені запитання', path: '/#questions', isActive: true },
    { id: 9, name: 'Контакти', path: '/#contacts', isActive: true },
    // { id: 10, name: 'Поділитись сайтом', path: '', isActive: true },
];
const NAVIGATION_FOOTER = [
    { id: 1, name: 'Головна', path: '/', isActive: true },
    { id: 2, name: 'Фермер і Кіт', path: '/#farmer', isActive: true },
    { id: 3, name: 'Замовити на виріст', path: '/growth', isActive: true },
    { id: 4, name: 'Магазин продуктів', path: '/#market', isActive: true },
    // { id: 5, name: 'Магазин мерча', path: '/merch', isActive: false },
    // { id: 6, name: 'Рецепти', path: '/recipes', isActive: false },
    { id: 7, name: 'Відгуки', path: '/#comments', isActive: true },
    { id: 8, name: 'Поширені запитання', path: '/#questions', isActive: true },
];
const SHARE_ITEM = 'Поділитись сайтом';

export const Navigation = ({ onClose, isFooter }: NavigationProps) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        onClose && onClose();
        setShowModal(true);

        removeScroll();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        abortScrollRemovingHeader();
    };

    return (
        <nav className={cls['nav']}>
            <ul
                className={`${!isFooter ? cls['nav-list'] : cls['nav-list_footer']}`}
            >
                {!isFooter ? (
                    <>
                        {NAVIGATION.map(({ id, name, path, isActive }) => (
                            <li className={cls['nav-list_item']} key={id}>
                                {!isActive ? (
                                    <span className={cls['link-disabled']}>
                                        {name}
                                    </span>
                                ) : (
                                    <Link
                                        href={path}
                                        passHref
                                        className={cls['nav-list_link']}
                                        onClick={onClose}
                                    >
                                        <span>{name}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                        <li className={cls['nav-list_item']}>
                            <Button
                                type='button'
                                theme={ButtonTheme.CLEAR}
                                className={cls['nav-list_link']}
                                onClick={handleOpenModal}
                            >
                                <span>{SHARE_ITEM}</span>
                                <ShareIcon addStyle={cls['share-icon']} />
                            </Button>
                        </li>
                    </>
                ) : (
                    NAVIGATION_FOOTER.map(({ id, name, path, isActive }) => (
                        <li className={cls['nav-list_item']} key={id}>
                            {!isActive ? (
                                <span className={cls['link-disabled']}>
                                    {name}
                                </span>
                            ) : (
                                <Link
                                    href={path}
                                    passHref
                                    className={cls['nav-list_link']}
                                    onClick={onClose}
                                >
                                    <span>{name}</span>
                                </Link>
                            )}
                        </li>
                    ))
                )}
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
        </nav>
    );
};
