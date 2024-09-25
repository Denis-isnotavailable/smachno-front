'use client';

import { ContainerMaxW1280 } from '@/components/ContainerMaxW1280';
import { ArrowBack, Text } from '@/components';
import { Steps } from './components/Steps/Steps';
import { OrderList } from '@/containers/StepGrowthPage/components/OrderList/OrderList';
import { NextStep } from '@/containers/StepGrowthPage/components/NextStep/NextStep';
import usePurposeCounts from '@/hooks/usePurposeCounts';
import { Wrapper } from '@/containers/StepGrowthPage/components/Wrapper/Wrapper';

export const StepGrowthPage = () => {
    const { countForYourSelf, countForArmy, countForGrowth, numberGrowth } = usePurposeCounts();

    return (
        <ContainerMaxW1280>
            <ArrowBack
                path={countForArmy ? '/step-army' : countForYourSelf ? '/step-yourself' : '/order'}
            />
            <Text orderTitle={'Оформлення замовлення'} />
            <Steps
                countForYourSelf={countForYourSelf}
                countForArmy={countForArmy}
                countForGrowth={countForGrowth}
                numberGrowth={numberGrowth}
            />
            <Wrapper>
                <OrderList />
                <NextStep />
            </Wrapper>
        </ContainerMaxW1280>
    );
};
