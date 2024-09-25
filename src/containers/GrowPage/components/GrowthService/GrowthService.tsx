import { Text } from '@/components';
import { GrowthServiceList } from '@/containers/GrowPage/components/GrowthService/GrowthServiceList/GrowthServiceList';

export const GrowthService = () => {
    return (
        <section>
            <Text title={'Замовити на виріст'} />
            <GrowthServiceList />
        </section>
    );
};
