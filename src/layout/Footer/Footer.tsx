'use client';
import { FooterLogo } from './FooterLogo/FooterLogo';
import { Navigation } from '@/layout';
import { ButtonsList } from './ButtonsList/ButtonsList';
import cls from './Footer.module.scss';
import { usePathname } from 'next/navigation';
import { DocsList } from './DocsList/DocsList';
import { PaymentInfo } from './PaymentInfo/PaymentInfo';
import { DevInfo } from './DevInfo/DevInfo';

export const Footer = () => {
    const pathname = usePathname();
    return (
        <>
            {!pathname.includes('/admin-cabinet') && (
                <footer className={cls['footer']}>
                    <div className={cls['mobile-nav-container']}>
                        <FooterLogo />

                        <div className={cls['mobile-nav']}>
                            <Navigation isFooter />
                        </div>
                    </div>

                    <div className={cls['content-box']}>
                        <div className={cls['actions-box']}>
                            <div className={cls['desktop-nav']}>
                                <Navigation isFooter />
                            </div>

                            <ButtonsList />
                        </div>

                        <DocsList />
                        <DevInfo />
                        <PaymentInfo />
                    </div>
                </footer>
            )}
        </>
    );
};
