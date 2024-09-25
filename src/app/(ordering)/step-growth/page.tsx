import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { StepGrowthPage } from '@/containers/StepGrowthPage';

export const metadata: Metadata = {
    title: 'Смачно на селі - Відгуки',
    description: 'Відгуки вдячних замовників про Смачно на селі',
};

export default function StepGrowth() {
    return (
        <main className={cls.main}>
            <StepGrowthPage />
        </main>
    );
}
