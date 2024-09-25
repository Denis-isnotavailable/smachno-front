import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import cls from './page.module.scss';
import { StepArmyPage } from '@/containers/StepArmyPage';

export const metadata: Metadata = {
    title: 'Смачно на селі - Відгуки',
    description: 'Відгуки вдячних замовників про Смачно на селі',
};

export default function StepArmy() {
    return (
        <main className={cls.main}>
            <StepArmyPage />
        </main>
    );
}
