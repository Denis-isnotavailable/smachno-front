import cls from './Steps.module.scss';
import { StepNumber, StepTheme } from '@/components/StepNumber/StepNumber';
import { IPurposeCounts } from '@/hooks/usePurposeCounts';

export const Steps = ({countForYourSelf, countForArmy, countForGrowth, numberGrowth}: IPurposeCounts) => {

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
            {countForGrowth && (
                <li>
                    <StepNumber
                        theme={StepTheme.CURRENT}
                        number={numberGrowth()}
                        text={'На виріст'}
                        isSeparator={true}
                    />
                </li>
            )}

            <li>
                <StepNumber
                    theme={StepTheme.CURRENT}
                    number={Number(countForYourSelf) + Number(countForArmy) + Number(countForGrowth) + 1}
                    text={'Доставка'}
                    isSeparator={false}
                />
            </li>

        </ul>
    );
};