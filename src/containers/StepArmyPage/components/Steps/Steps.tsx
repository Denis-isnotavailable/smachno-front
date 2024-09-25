import cls from './Steps.module.scss';
import {  StepNumber, StepTheme } from '@/components/StepNumber/StepNumber';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IPurposeCounts } from '@/hooks/usePurposeCounts';

export const Steps = ({countForYourSelf, countForGrowth, countForArmy} :Partial<IPurposeCounts> ) => {
    const router = useRouter();
    useEffect(() => {
        if(countForGrowth && !countForArmy){
            router.push('/step-growth')
        }
    }, [countForArmy, router, countForGrowth]);

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
            <li>
                <StepNumber
                    theme={StepTheme.CURRENT}
                    number={countForYourSelf ? 2 : 1}
                    text={'Для ЗСУ'}
                    isSeparator={false}
                />
            </li>
            {countForGrowth && (
                <li>
                    <StepNumber
                        theme={StepTheme.DISABLE}
                        number={countForYourSelf ? 3 : 2}
                        text={'На виріст'}
                        isSeparator={false}
                    />
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
    )
}