'use client';

import { Button, ButtonTheme, Text } from '@/components';
import cls from './NextStep.module.scss';
import Link from 'next/link';
import usePurposeCounts from '@/hooks/usePurposeCounts';

export const NextStep = () => {
    const {
        countForArmy,
        countForGrowth ,
    } = usePurposeCounts();

    const redirect = (): string => {
        if(countForArmy ) {
            return '/step-army'
        }
        if (!countForArmy && countForGrowth) {
            return '/step-growth'
        }
        if (!countForArmy && !countForGrowth) {
            return '/step-order'
        }
        return '/'
    }

    return (
        <div className={cls.container}>
            <p className={cls.container__text}>
                Я перевірив, все правильно. Можна лапкою клацнути
            </p>
            <Link href={ `${redirect()}` }>
                <Button type={'button'} theme={ButtonTheme.M}>
                    <Text btnText={'Далі'}/>
                </Button>
            </Link>
        </div>
    )
}