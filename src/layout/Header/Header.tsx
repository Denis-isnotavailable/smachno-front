'use client';

import Image from 'next/image';
import LogoImage from '@/images/logo/logo_beta_desktop.webp';
import { MenuList } from './MenuList/MenuList';
import Link from 'next/link';
import cls from './Header.module.scss';
import { CookieNote, ScrollUpButton } from '@/components';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setPagePosition } from '@/store/features/adminPagePositionSlice/adminPagePositionSlice';

const TITLE_PART_ONE = 'Смачно';
const TITLE_PART_TWO = 'На селі';

export const Header = () => {
    const [showCookie, setShowCookie] = useState(true);
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();    

    useEffect(() => {        
        // reset pagePosition, if path changed
        if (pathname !== '/admin-cabinet') {
            dispatch(setPagePosition(0));
        };        
    }, [dispatch, pathname]);

    useEffect(() => {
        const cookieAcceptance = localStorage.getItem('cookie-acceptance');
        cookieAcceptance && setShowCookie(!JSON.parse(cookieAcceptance));
    }, []);

    const handleAgreeWithCookie = () => {
        localStorage.setItem('cookie-acceptance', 'true');
        setShowCookie(false);
    };
    return (
        <>
            {!pathname.includes('/admin-cabinet') && (
                <header className={cls['header']}>
                    <div className={cls['logo-box']}>
                        <Link href={'/'}>
                            <Image
                                className={cls['logo']}
                                src={LogoImage}
                                alt={'Логотип'}
                                width='150'
                                height='122'
                                loading='lazy'
                            />
                        </Link>
                    </div>

                    <h2 className={cls['title']}>
                        <p className={cls['title_part-one']}>{TITLE_PART_ONE}</p>
                        <p className={cls['title_part-two']}>{TITLE_PART_TWO}</p>
                    </h2>

                    <div className={cls['menu-box']}>
                        <MenuList />
                    </div>

                    <ScrollUpButton />

                    {/* COOKIE NOTIFICATION */}
                    <div
                        className={`${cls['cookie-container']} ${showCookie && cls['cookie-container_active']}`}
                    >
                        <CookieNote agreeWithCookie={handleAgreeWithCookie} />
                    </div>
                </header>
            )}
        </>
    );
};
