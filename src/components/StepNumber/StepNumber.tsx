import cls from './StepNumber.module.scss';
import { memo } from 'react';
import { classNames, Mods } from '@/utils/classNames';

export enum StepTheme {
    DISABLE = 'disable',
    CURRENT = 'current',
}

interface StepNumberProps {
    number: number;
    text: string;
    className?: string;
    theme: StepTheme;
    isSeparator: boolean;
}

export const StepNumber = memo((props: StepNumberProps) => {
    const {
        number,
        text,
        className,
        theme,
        isSeparator
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
    };

    return (
        <div className={cls.container}>
            <div
                className={classNames(isSeparator ? cls.container__separator_on : cls.container__separator_off, mods, [className])}
            >
                <p className={classNames(cls.number, mods, [])}>
                    {number}
                </p>
            </div>
            <p className={classNames(cls.text, mods, [])}>
                {text}
            </p>
        </div>
    )
})