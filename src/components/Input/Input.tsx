import cls from './Input.module.scss';
import { memo, useState } from 'react';
import { classNames, Mods } from '@/utils/classNames';
import { Text } from '@/components';
import { TextAlign } from '@/components/Text/Text';
import { Field } from 'formik';

interface InputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    type: 'text' | 'email' | 'password' | 'file' | 'tel' | 'date';
    required?: boolean;
    placeholder?: string;
    name: string;
    disabled?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        type = 'text',
        label,
        required,
        placeholder,
        name,
        disabled,
        value
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const mods: Mods = {
        [cls.focused]: isFocused,
        [cls.disabled]: disabled
    };

    const input = (
        <>
            <Field
                className={classNames(cls.input, mods, [className])}
                type={type}
                required={required}
                placeholder={placeholder}
                name={name}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
            />
        </>
    );
    if (label && !value) {
        return (
            <label className={cls.input__block}>
                <Text text={label} align={TextAlign.LEFT} />
                {input}
            </label>
        );
    }
    if(label && value) {
        return (
            <label className={cls.input__block}>
                <Text text={label} align={TextAlign.LEFT} />
                <Field
                    className={classNames(cls.input, mods, [className])}
                    type={type}
                    name={name}
                    disabled={disabled}
                    value={value}
                />
            </label>
        );
    }
    return input;
});
