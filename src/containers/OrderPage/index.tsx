"use client"

import { ContainerMaxW1280 } from '@/components/ContainerMaxW1280';
import { ArrowBack, Text } from '@/components';
import { OrderForm } from './components/OrderForm/OrderForm';
import { Steps } from '@/containers/OrderPage/components/Steps/Steps';
import usePurposeCounts from '@/hooks/usePurposeCounts';

export const OrderPage = () => {
    const {countForYourSelf, countForArmy, countForGrowth, numberGrowth} = usePurposeCounts();

    return (
        <ContainerMaxW1280>
            <ArrowBack path={countForGrowth ? '/step-growth' : (countForArmy ? '/step-army' : countForYourSelf ? '/step-yourself' : '/order')} />
            <Text orderTitle={'Оформлення замовлення'} />
            <Steps
                countForYourSelf={countForYourSelf}
                countForArmy={countForArmy}
                countForGrowth={countForGrowth}
                numberGrowth={numberGrowth}
            />
            <OrderForm />
        </ContainerMaxW1280>
    );
};
