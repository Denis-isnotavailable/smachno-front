import { DeliveryTermsPage } from '@/containers/DeliveryTermsPage';
import cls from './page.module.scss';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

export const metadata: Metadata = {
    title: 'Смачно на селі - Умови доставки',
    description: 'Умови доставки Смачно на селі',
};

const DeliveryTerms = () => {
    return (
        <main className={cls.main}>
            <DeliveryTermsPage />
        </main>
    );
};

export default DeliveryTerms;