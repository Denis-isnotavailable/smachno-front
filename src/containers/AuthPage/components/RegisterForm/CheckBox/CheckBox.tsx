'use client';

import { ChangeEvent, useEffect, useId } from 'react';
import cls from './CheckBox.module.scss';
import ImgCheckBox from '@/images/checkbox.webp';
import Image from 'next/image';

interface CheckBoxProps {
    isActiveBtn: boolean;
    setIsActiveBtn: (value: boolean) => void;
}

export const CheckBox = ({ setIsActiveBtn, isActiveBtn }: CheckBoxProps) => {
    const id: string = useId();

    useEffect(() => {
        setIsActiveBtn(isActiveBtn);
    }, [isActiveBtn, setIsActiveBtn]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setIsActiveBtn(e.target.checked);
    };

    const handleIconClick = (): void => {
        setIsActiveBtn(isActiveBtn);
    };

    return (
        <div className={cls.container}>
            <input
                className={cls.container__input}
                type='checkbox'
                id={id}
                name='checkbox'
                checked={isActiveBtn}
                onChange={handleChange}
            />

            {isActiveBtn ? (
                <label htmlFor={id} className={cls.label}>
                    <p className={cls.text}>
                        {`"Великий Брат" просить дозволу на обробку та зберігання твоїх персональних даних. Можна?`}
                    </p>
                    <Image
                        className={cls.img}
                        src={ImgCheckBox}
                        alt={'checkbox'}
                        width={24}
                        height={24}
                        onClick={handleIconClick}
                    />
                </label>
            ) : (
                <label htmlFor={id} className={cls.label}>
                    <p className={cls.text}>
                        {`"Великий Брат" просить дозволу на обробку та зберігання твоїх персональних даних. Можна?`}
                    </p>
                    <div className={cls.box}></div>
                </label>
            )}
        </div>
    );
};
