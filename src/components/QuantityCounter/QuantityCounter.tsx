import { Button, ButtonTheme } from '@/components';
import { classNames } from '@/utils/classNames';

import cls from './QuantityCounter.module.scss';

type QuantityCounterProps = {
    count: number;
    setCount: (value: number) => void;
    sm?: boolean;
    xl?: boolean;
    isDisabled?: boolean;
};

const MINUS = '-';
const PLUS = '+';
const MAX_QUANTITY = 10;

export const QuantityCounter = ({
    count,
    setCount,
    sm,
    xl,
    isDisabled,
}: QuantityCounterProps) => {
    const buttonStyles = classNames(cls['counter-button'], {
        [cls['counter-button_small']]: sm,
        [cls['counter-button_big']]: xl,
        [cls['counter-button_disabled']]: isDisabled,
    });
    const inputStyles = classNames(
        cls['counter-button'],
        {
            [cls['counter-button_small']]: sm,
            [cls['counter-button_big']]: xl,
            [cls['counter-button_disabled']]: isDisabled,
        },
        [cls['counter-input']]
    );

    const handleOnChange = (value: number) => {
        if (isDisabled) return;
        value >= 0 && value <= MAX_QUANTITY && setCount(value);
    };

    return (
        <div className={cls['counter-container']}>
            <ul className={cls['buttons-list']}>
                <li className={cls['buttons-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={buttonStyles}
                        onClick={() => count > 0 && setCount(count - 1)}
                        disabled={isDisabled}
                    >
                        {MINUS}
                    </Button>
                </li>

                <li className={cls['buttons-list_item']}>
                    <input
                        type='text'
                        name='counter'
                        value={count}
                        onChange={(e) =>
                            handleOnChange(Number(e.currentTarget.value))
                        }
                        className={inputStyles}
                    />
                </li>

                <li className={cls['buttons-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={buttonStyles}
                        onClick={() => count < MAX_QUANTITY && setCount(count + 1)}
                        disabled={isDisabled}
                    >
                        {PLUS}
                    </Button>
                </li>
            </ul>
        </div>
    );
};
