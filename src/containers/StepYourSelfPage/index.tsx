import { ContainerMaxW1280 } from '@/components/ContainerMaxW1280';
import { ArrowBack, Text } from '@/components';
import { Steps } from '@/containers/StepYourSelfPage/components/Steps/Steps';
import { OrderList } from '@/containers/StepYourSelfPage/components/OrderList/OrderList';
import { NextStep } from '@/containers/StepYourSelfPage/components/NextStep/NextStep';
import ImgStep from '@/images/stepsOrder/Step_1.webp';
import Image from 'next/image';
import { Wrapper } from '@/containers/StepYourSelfPage/components/Wrapper/Wrapper';
import cls from './index.module.scss';

export const StepYourSelfPage = () => {
    return (
        <ContainerMaxW1280>
            <ArrowBack prevPage={true} />
            <Text orderTitle={'Оформлення замовлення'} />
            <Steps />
            <Wrapper>
                <div>
                    <OrderList />
                    <NextStep />
                </div>
                <Image
                    className={cls.img}
                    src={ImgStep}
                    alt={'Рудий кіт збирає урожай'}
                    width={380}
                    height={310}
                    priority={true}
                />
            </Wrapper>
        </ContainerMaxW1280>
    );
};
