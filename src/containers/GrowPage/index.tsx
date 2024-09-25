import { ContainerMaxW1280 } from '@/components/ContainerMaxW1280';
import { GrowthService } from '@/containers/GrowPage/components/GrowthService';
import { ArrowBack } from '@/components';
import { ProcedureOrder } from '@/containers/GrowPage/components/ProcedureOrder';
import { ProductChoose } from '@/containers/GrowPage/components/ProductChoose';

export const GrowPage = () => {
    return (
        <>
            <ContainerMaxW1280>
                <ArrowBack path={'/'} />
                <GrowthService />
                <ProcedureOrder />
                <ProductChoose />
            </ContainerMaxW1280>
        </>
    );
};
