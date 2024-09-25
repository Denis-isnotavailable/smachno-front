import cls from './Input.module.scss';
import Image, { StaticImageData } from 'next/image';
import { Field } from 'formik';
import { memo } from 'react';
import { classNames, Mods } from '@/utils/classNames';
import { CloseEyeIcon, OpenEyeIcon } from '@/utils/SVG';
import { Button, ButtonTheme } from '@/components';

export enum InputTheme {
    RIGHT = 'right',
    LEFT = 'left',
}

interface InputProps {
    img: StaticImageData;
    alt: string;
    widthImg: number;
    heightImg: number;
    name: string;
    type: 'text' | 'email' | 'password' | 'file' | 'tel';
    label?: string;
    required?: boolean;
    placeholder: string;
    theme: InputTheme;
    handleClickPasswordIcon?: () => void;
    isOpenEye?: boolean;
    error?: string | null;
    errorRepeat?: string | null;
    autoFocus?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        type = 'text',
        label,
        required,
        placeholder,
        name,
        img,
        alt,
        widthImg,
        heightImg,
        theme,
        handleClickPasswordIcon,
        isOpenEye,
        error,
        errorRepeat,
        autoFocus,
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
    };

    const input = (
        <div className={classNames(cls.container__item, mods, [])}>
            <div className={cls.container__item_img}>
                <Image
                    src={img}
                    alt={alt}
                    width={widthImg}
                    height={heightImg}
                    className={cls.img}
                />
            </div>
            <div className={cls.container__input}>
                <label htmlFor={name} className={cls.label}>
                    {label}
                </label>
                <Field
                    name={name}
                    className={cls.input}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                />
                <p className={cls.error}>{error}</p>
            </div>
        </div>
    );

    if (name === 'password') {
        return (
            <div className={classNames(cls.container__item, mods, [])}>
                <div className={cls.container__item_img}>
                    <Image
                        src={img}
                        alt={alt}
                        width={widthImg}
                        height={heightImg}
                        className={cls.img}
                    />
                </div>
                <div className={cls.container__input}>
                    <label htmlFor={name} className={cls.label}>
                        {label}
                    </label>
                    <div className={cls.container__password}>
                        <Field
                            name={name}
                            className={cls.input}
                            type={type}
                            required={required}
                            placeholder={placeholder}
                        />
                        <Button
                            type={'button'}
                            theme={ButtonTheme.CLEAR}
                            className={cls.btn}
                            onClick={handleClickPasswordIcon}
                        >
                            {isOpenEye ? (
                                <OpenEyeIcon addStyle={cls.icon} />
                            ) : (
                                <CloseEyeIcon addStyle={cls.icon} />
                            )}
                        </Button>
                    </div>
                    <p className={cls.errorFirst}>{error}</p>
                    <div className={cls.container__password}>
                        <Field
                            name='passwordRepeat'
                            className={cls.input}
                            type={type}
                            required
                            placeholder='Повтори пароль'
                        />
                        <Button
                            type={'button'}
                            theme={ButtonTheme.CLEAR}
                            className={cls.btnRepeat}
                            onClick={handleClickPasswordIcon}
                        >
                            {isOpenEye ? (
                                <OpenEyeIcon addStyle={cls.icon} />
                            ) : (
                                <CloseEyeIcon addStyle={cls.icon} />
                            )}
                        </Button>
                    </div>
                    <p className={cls.error}>{errorRepeat}</p>
                </div>
            </div>
        );
    }

    return input;
});
