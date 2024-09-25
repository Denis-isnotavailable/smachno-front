import { memo } from 'react';
import cls from './Text.module.scss';
import { classNames, Mods } from '@/utils/classNames';

export enum TextAlign {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    btnText?: string;
    orderTitle?: string;
    align?: TextAlign;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        btnText,
        orderTitle,
        align = TextAlign.CENTER
    } = props;

    const mods: Mods = {
        [cls[align]]: true,
    };

    return (
        <div
            className={classNames('', mods, [className])}
            data-testid='text-component'
        >
            {title && (
                <div className={cls.title}>
                    <h2 className={cls.title__text}>{title}</h2>
                </div>
            )}
            {text && <p className={cls.content__text}>{text}</p>}
            {btnText && <p className={cls.button__text}>{btnText}</p>}
            {orderTitle && (
                <div className={cls.order__title}>
                    <h2 className={cls.order__text}>{orderTitle}</h2>
                </div>
            )}
        </div>
    );
});
