import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { GrowPage } from '@/containers/GrowPage';

export const metadata: Metadata = {
    title: 'Смачно на селі - Замовити на виріст',
    description: 'Замовити на виріст продукцію у Смачно на селі',
};

export default function Grow() {
    return (
        <main className={cls.main}>
            <GrowPage />
        </main>
    );
}
