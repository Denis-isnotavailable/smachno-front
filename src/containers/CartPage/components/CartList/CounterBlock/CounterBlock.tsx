import React from 'react';
import { Text, QuantityCounter } from '@/components';

import cls from './CounterBlock.module.scss';

type CounterBlockProps = {
    count: number;
    setCount: (value: number) => void;
    title: string;
    priceText: string;
    isDisabled?: boolean;
};

export const CounterBlock = ({
    count,
    setCount,
    title,
    priceText,
    isDisabled,
}: CounterBlockProps) => {
    return (
        <div className={cls['counter-box']}>
            <Text text={title} className={cls['counter-heading']} />

            <QuantityCounter
                count={count}
                setCount={setCount}
                xl
                isDisabled={isDisabled}
            />

            <Text text={priceText} className={cls['counter-price']} />
        </div>
    );
};
