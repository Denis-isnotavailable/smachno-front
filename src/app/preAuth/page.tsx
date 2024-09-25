import { PreAuthPage } from '@/containers/PreAuthPage';

import cls from './page.module.scss';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

export const metadata: Metadata = {
    title: 'Смачно на селі - Вхід',
    description: 'Вхід в особистий кабінет Смачно на селі',
};

const PreAuth = () => {
    return (
        <main className={cls.main}>
            <PreAuthPage />
        </main>
    );
};

export default PreAuth;
