'use client';

import { ContainerMaxW1280 } from '@/components/ContainerMaxW1280';
import { ArrowBack, Text } from '@/components';
import { Steps } from './components/Steps/Steps';
import { OrderList } from '@/containers/StepArmyPage/components/OrderList/OrderList';
import { NextStep } from '@/containers/StepArmyPage/components/NextStep/NextStep';
import Image from 'next/image';
import ImgStep from '@/images/stepsOrder/Step_2.webp';
import { Wrapper } from '@/containers/StepArmyPage/components/Wrapper/Wrapper';
import usePurposeCounts from '@/hooks/usePurposeCounts';
import cls from './index.module.scss';

export const StepArmyPage = () => {
    const { countForYourSelf, countForArmy, countForGrowth } = usePurposeCounts();

    return (
        <ContainerMaxW1280>
            <ArrowBack path={countForYourSelf ? '/step-yourself' : '/order'} />
            <Text orderTitle={'Оформлення замовлення'} />
            <Steps
                countForYourSelf={countForYourSelf}
                countForGrowth={countForGrowth}
                countForArmy={countForArmy}
            />
            <Wrapper>
                <div>
                    <OrderList countForArmy={countForArmy} countForGrowth={countForGrowth} />
                    <NextStep countForGrowth={countForGrowth} />
                </div>
                <Image
                    className={cls.img}
                    src={ImgStep}
                    alt={'Рудий кіт в касці'}
                    width={380}
                    height={310}
                    priority={true}
                />
            </Wrapper>
        </ContainerMaxW1280>
    );
};
