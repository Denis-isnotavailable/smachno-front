import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { OrderPage } from '@/containers/OrderPage';

export const metadata: Metadata = {
    title: 'Смачно на селі - Замовити на виріст',
    description: 'Замовити на виріст продукцію у Смачно на селі',
};

export default function Order() {
    return (
        <main className={cls.main}>
            <OrderPage />
        </main>
    );
}
