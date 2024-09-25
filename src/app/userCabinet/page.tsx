import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { UserCabinetPage } from '@/containers/UserCabinetPage';

import cls from './page.module.scss';


export const metadata: Metadata = {
    title: 'Смачно на селі - Кабінет покупця',
    description: 'Особистий кабінет Смачно на селі',
};

const UserCabinet = () => {
    return (
        <main className={cls.main}>
            <UserCabinetPage />
        </main>
    );
};

export default UserCabinet;
