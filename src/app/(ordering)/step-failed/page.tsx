import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { FailedOrderPage } from '@/containers/FailedOrderPage';

export const metadata: Metadata = {
    title: 'Смачно на селі - Замовлення не оформлено',
    description: 'Замовлення не оформлено у Смачно на селі',
};

export default function Order() {
    return (
        <main className={cls.main}>
            <FailedOrderPage />
        </main>
    );
}