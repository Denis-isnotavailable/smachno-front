import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { ReviewsPage } from '@/containers/ReviewsPage';

export const metadata: Metadata = {
    title: 'Смачно на селі - Відгуки',
    description: 'Відгуки вдячних замовників про Смачно на селі',
};

export default function Home() {
    return (
        <main className={cls.main}>
            <ReviewsPage />
        </main>
    );
}
