import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { LoginPage } from '@/containers/LoginPage';

export const metadata: Metadata = {
    title: 'Смачно на селі - Логін',
    description: 'Логін в особистий кабінет Смачно на селі',
};

export default function Login() {
    return (
        <main className={cls.main}>
            <LoginPage />
        </main>
    );
}
