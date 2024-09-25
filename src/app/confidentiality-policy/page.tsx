import { ConfidentialityPolicyPage } from '@/containers/ConfidentialityPolicyPage';
import cls from './page.module.scss';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

export const metadata: Metadata = {
    title: 'Смачно на селі - Політика конфіденційності',
    description: 'Політика конфіденційності Смачно на селі',
};

const ConfidentialityPolicy = () => {
    return (
        <main className={cls.main}>
            <ConfidentialityPolicyPage />
        </main>
    );
};

export default ConfidentialityPolicy;
