'use client';

import cls from './LoginForm.module.scss';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { LoginFormSchema } from './LoginFormSchema';
import { Button, ButtonTheme, Text } from '@/components';
import Image from 'next/image';
import ImgCatName from '@/images/formRegister/cat_name.webp';
import ImgCatGlassesOn from '@/images/formRegister/cat_glasses_on.webp';
import ImgCatGlassesOff from '@/images/formRegister/cat_glasses_off.webp';
import { CloseEyeIcon, OpenEyeIcon } from '@/utils/SVG';
import React, { ReactElement, useState } from 'react';
import { useLoginMutation } from '@/store/features/services/authService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { getToken } from '@/store/features/authSlice/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';

interface InitialValues {
    email?: string;
    password?: string;
}

const customId = 'toastId';
export const LoginForm = () => {
    const [isOpenEye, setIsOpenEye] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const initialValues: InitialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (
        values: InitialValues,
        { resetForm }: FormikHelpers<InitialValues>
    ): Promise<void | ReactElement> => {
        interface FetchData {
            token?: string;
        }
        const storeData = sessionStorage.getItem('isCartRedirectionPath');
        const { isCartRedirectionPath } = storeData ? JSON.parse(storeData) : false;

        try {
            const response:
                | {
                      data: FetchData;
                  }
                | { error?: FetchBaseQueryError | SerializedError | undefined } = await login({
                ...values,
            });

            if (response && 'error' in response) {
                // @ts-expect-error треба розібратися
                if (response.error?.data.message === 'password is expired') {
                    toast.error('Час дії тимчасового паролю вичерпано', {
                        icon: <ToastImg />,
                        toastId: customId,
                    });
                }
                setIsValidPassword(true);
            }

            if (response && 'data' in response) {
                dispatch(getToken(response.data.token));
                resetForm();
                router.push(isCartRedirectionPath ? '/step-yourself' : '/');
                sessionStorage.setItem(
                    'isCartRedirectionPath',
                    JSON.stringify({ isCartRedirectionPath: false })
                );
                toast.success('Вітаю тебе, Друже!', {
                    icon: <ToastImg />,
                    toastId: customId,
                });
            }
        } catch (e) {
            if (e) {
                return <h3>Упс, щось пішло не так!</h3>;
            }
        }
    };

    const handleClickPasswordIcon = () => {
        setIsOpenEye((prevState) => !prevState);
    };

    return (
        <>
            <h3 className={cls.title}>Вхід</h3>
            <section className={cls.section}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={LoginFormSchema}
                >
                    {({ errors, touched }) => (
                        <Form>
                            {isValidPassword && (
                                <div className={cls.container__error}>
                                    <p className={cls.container__error__text}>
                                        Невірний логін або пароль
                                    </p>
                                </div>
                            )}
                            <ul className={cls.container}>
                                <li className={cls.container__item_email}>
                                    <div className={cls.container__img}>
                                        <Image
                                            className={cls.img}
                                            src={ImgCatName}
                                            alt={'Кіт Ok'}
                                            width={200}
                                            height={172}
                                        />
                                    </div>
                                    <div className={cls.container__input}>
                                        <label htmlFor='email' className={cls.label}>
                                            Привіт, радий бачити. Нагадай свою поштоньку?
                                        </label>
                                        <Field
                                            name='email'
                                            className={
                                                isValidPassword ? cls.input_error : cls.input
                                            }
                                            type='text'
                                            placeholder='E-mail'
                                            onFocus={() => setIsValidPassword(false)}
                                        />
                                        <p className={cls.error}>
                                            {touched.email && errors.email ? errors.email : null}
                                        </p>
                                    </div>
                                </li>
                                <li className={cls.container__item_password}>
                                    <div className={cls.container__input}>
                                        <label htmlFor='password' className={cls.label}>
                                            Введи пароль. Я не підглядаю.
                                        </label>
                                        <Field
                                            name='password'
                                            className={
                                                isValidPassword ? cls.input_error : cls.input
                                            }
                                            type={isOpenEye ? 'text' : 'password'}
                                            placeholder='Пароль'
                                            onFocus={() => setIsValidPassword(false)}
                                        />
                                        <p className={cls.error}>
                                            {touched.password && errors.password
                                                ? errors.password
                                                : null}
                                        </p>
                                        <Button
                                            type={'button'}
                                            theme={ButtonTheme.CLEAR}
                                            className={cls.btn__icon}
                                            onClick={handleClickPasswordIcon}
                                        >
                                            {isOpenEye ? (
                                                <OpenEyeIcon addStyle={cls.icon} />
                                            ) : (
                                                <CloseEyeIcon addStyle={cls.icon} />
                                            )}
                                        </Button>
                                    </div>
                                    <div>
                                        <Image
                                            className={cls.img}
                                            src={isOpenEye ? ImgCatGlassesOff : ImgCatGlassesOn}
                                            alt={'Кіт в окулярах'}
                                            width={200}
                                            height={172}
                                        />
                                    </div>
                                </li>
                            </ul>

                            <Button type={'submit'} theme={ButtonTheme.PRIMARY} className={cls.btn}>
                                <Text btnText={'Увійти'} />
                            </Button>
                        </Form>
                    )}
                </Formik>
            </section>
        </>
    );
};
