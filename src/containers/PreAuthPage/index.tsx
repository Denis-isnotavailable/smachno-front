import { ContainerMaxW1280 } from '@/components/ContainerMaxW1280';
import { ArrowBack } from '@/components';
import { PreAuthPageContent } from './components/PreAuthPageContent';

export const PreAuthPage = () => {
    return (
        <ContainerMaxW1280>
            <ArrowBack path={'/'} />
            <PreAuthPageContent />
        </ContainerMaxW1280>
    );
}
