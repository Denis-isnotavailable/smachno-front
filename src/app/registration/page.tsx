import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { AuthPage } from '@/containers/AuthPage';

export const metadata: Metadata = {
    title: 'Смачно на селі - Реєстрація',
    description: 'Реєстрація нового покупця у Смачно на селі',
};

export default function Auth() {
    return (
        <main className={cls.main}>
            <AuthPage />
        </main>
    );
}
