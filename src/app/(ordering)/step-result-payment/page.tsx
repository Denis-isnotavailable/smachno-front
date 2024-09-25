import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { SuccessOrderPage } from '@/containers/SuccessOrderPage';

export const metadata: Metadata = {
    title: 'Смачно на селі - Замовлення оформлено',
    description: 'Замовлення оформлено у Смачно на селі',
};

export default function Order() {
    return (
        <main className={cls.main}>
            <SuccessOrderPage />
        </main>
    );
}
