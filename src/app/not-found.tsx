import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { NotFoundPage } from '@/containers/NotFoundPage';

export const metadata: Metadata = {
    title: 'Упс, сторінку не знайдено',
    description: 'Найкращий магазин органічної продукції. Сторінку не знайдено',
};

export default function NotFound() {
    return (
        <main>
            <NotFoundPage />
        </main>
    );
}
