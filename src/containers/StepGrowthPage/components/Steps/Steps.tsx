'use client';

import cls from './Steps.module.scss';
import { StepNumber, StepTheme } from '@/components/StepNumber/StepNumber';
import { IPurposeCounts } from '@/hooks/usePurposeCounts';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const Steps = ({countForYourSelf, countForArmy, countForGrowth, numberGrowth} :IPurposeCounts) => {
    const router = useRouter();

    useEffect(() => {
        if(!countForGrowth){
            router.push('/step-order')
        }
    }, [countForGrowth, router]);

    return (
        <ul className={cls.container}>
            {countForYourSelf && (
                <li>
                    <StepNumber
                        theme={StepTheme.CURRENT}
                        number={1}
                        text={'Для себе'}
                        isSeparator={true}
                    />
                </li>
            )}
            {countForArmy && (
                <li>
                    <StepNumber
                        theme={StepTheme.CURRENT}
                        number={Number(countForYourSelf) ? 2 : 1}
                        text={'Для ЗСУ'}
                        isSeparator={true}
                    />
                </li>
            )}
            <li>
                <StepNumber
                    theme={StepTheme.CURRENT}
                    number={numberGrowth()}
                    text={'На виріст'}
                    isSeparator={false}
                />
            </li>

            <li>
                <StepNumber
                    theme={StepTheme.DISABLE}
                    number={numberGrowth() + 1}
                    text={'Доставка'}
                    isSeparator={false}
                />
            </li>

        </ul>
    );
};