import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { AdminCabinetPage } from '@/containers/AdminCabinetPage';
import cls from './page.module.scss';


export const metadata: Metadata = {
    title: 'Смачно на селі - Кабінет Адміністратора',
    description: 'Особистий кабінет Адміністратора Смачно на селі',
};

const AdminCabinet = () => {
    return (
        <main className={cls.main}>
            <AdminCabinetPage />
        </main>
    );
};

export default AdminCabinet;
