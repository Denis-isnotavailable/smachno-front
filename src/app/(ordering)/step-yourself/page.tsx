import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { StepYourSelfPage } from '@/containers/StepYourSelfPage';

export const metadata: Metadata = {
    title: 'Смачно на селі - Відгуки',
    description: 'Відгуки вдячних замовників про Смачно на селі',
};

export default function StepYourself() {
    return (
        <main className={cls.main}>
            <StepYourSelfPage />
        </main>
    );
}
