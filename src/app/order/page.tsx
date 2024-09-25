import { CartPage } from '@/containers/CartPage';

import cls from './page.module.scss';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

export const metadata: Metadata = {
    title: 'Смачно на селі - Зробити замовлення',
    description: 'Зробити замовлення у Смачно на селі',
};

const Order = () => {
    return (
        <main className={cls.main}>
            <CartPage />
        </main>
    );
};

export default Order;
