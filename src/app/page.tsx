import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { HomePage } from '@/containers/HomePage';

export const metadata: Metadata = {
    title: 'Смачно на селі',
    description: 'Найкращий магазин органічної продукції',
};

export default function Home() {
    return (
        <main className={cls.main}>
            <HomePage />
        </main>
    );
}
