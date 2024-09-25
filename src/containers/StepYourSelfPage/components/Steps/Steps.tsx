'use client';

import cls from './Steps.module.scss';
import { StepNumber, StepTheme } from '@/components/StepNumber/StepNumber';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import usePurposeCounts from '@/hooks/usePurposeCounts';

export const Steps = () => {
    const router = useRouter();
    const {
        countForYourSelf,
        countForArmy,
        countForGrowth ,
    } = usePurposeCounts();

    useEffect(() => {
        if (!countForYourSelf && countForArmy) {
            router.push('/step-army');
        }
        if (!countForYourSelf && !countForArmy && countForGrowth) {
            router.push('/step-growth');
        }
    }, [countForArmy, countForGrowth, countForYourSelf, router]);

    return (
        <ul className={cls.container}>
            <li>
                <StepNumber
                    theme={StepTheme.CURRENT}
                    number={1}
                    text={'Для себе'}
                    isSeparator={false}
                />
            </li>
            {countForArmy && (
                <li>
                    <StepNumber theme={StepTheme.DISABLE} number={2} text={'Для ЗСУ'} isSeparator={false}/>
                </li>
            )}
            {countForGrowth && (
                <li>
                    <StepNumber theme={StepTheme.DISABLE} number={countForArmy ? 3 : 2} text={'На виріст'} isSeparator={false}/>
                </li>
            )}
            <li>
                <StepNumber
                    theme={StepTheme.DISABLE}
                    number={Number(countForArmy) + Number(countForGrowth) + Number(countForYourSelf) + 1}
                    text={'Доставка'}
                    isSeparator={false}
                />
            </li>
        </ul>
    );
};