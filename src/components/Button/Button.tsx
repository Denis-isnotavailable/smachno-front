import { ButtonHTMLAttributes, memo } from 'react';
import cls from './Button.module.scss';
import { classNames, Mods } from '@/utils/classNames';

export enum ButtonTheme {
    CLEAR = 'clear',
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    M = 'small'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type: 'button' | 'submit';
    className?: string;
    theme: ButtonTheme;
}

export const Button = memo((props: ButtonProps) => {
    const { type, className, theme, children, ...otherProps } = props;

    const mods: Mods = {
        [cls[theme]]: true,
    };

    return (
        <button
            data-testid='button-component'
            type={type}
            className={classNames(cls.button, mods, [className])}
            {...otherProps}
        >
            {children}
        </button>
    );
});
