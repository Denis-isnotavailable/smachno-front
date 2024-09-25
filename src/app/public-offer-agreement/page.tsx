import { PublicOfferAgreementPage } from '@/containers/PublicOfferAgreementPage';
import cls from './page.module.scss';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

export const metadata: Metadata = {
    title: 'Смачно на селі - Договір публічної оферти',
    description: 'Договір публічної оферти Смачно на селі',
};

const PublicOfferAgreement = () => {
    return (
        <main className={cls.main}>
            <PublicOfferAgreementPage />
        </main>
    );
};

export default PublicOfferAgreement;