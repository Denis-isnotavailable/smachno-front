'use client';

import React, { ReactElement, useCallback, useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button, ButtonTheme, Text } from '@/components';
import { RegisterFormSchema } from './RegisterFormSchema';
import ImgCatName from '@/images/formRegister/cat_name.webp';
import ImgCatSurname from '@/images/formRegister/cat_surname.webp';
import ImgLetter from '@/images/formRegister/letter.webp';
import ImgPhone from '@/images/formRegister/phone.webp';
import ImgCatGlassesOn from '@/images/formRegister/cat_glasses_on.webp';
import ImgCatGlassesOff from '@/images/formRegister/cat_glasses_off.webp';
import { Input, InputTheme } from '@/containers/AuthPage/components/RegisterForm/Input/Input';
import { ChangeMessenger } from '@/containers/AuthPage/components/RegisterForm/ChangeMessenger/ChangeMessenger';
import { CheckBox } from '@/containers/AuthPage/components/RegisterForm/CheckBox/CheckBox';
import { useRegisterMutation } from '@/store/features/services/authService';
import { getToken } from '@/store/features/authSlice/authSlice';
import { ToastImg } from '@/components/ToastImg/ToastImg';

import cls from './RegisterForm.module.scss';
import { Phone } from './Phone/Phone';
import Image from 'next/image';

interface InitialValues {
    name: string;
    surname?: string;
    email?: string;
    password?: string;
    passwordRepeat?: string;
    phone?: string | null;
    messenger?: string;
}

const customId = 'toastId';

export const RegisterForm = () => {
    const [isOpenEye, setIsOpenEye] = useState<boolean>(false);
    const [checkMessenger, setCheckMessenger] = useState<string>('');
    const [isActiveBtn, setIsActiveBtn] = useState(false);
    const [getPhone, setGetPhone] = useState('');
    const [register] = useRegisterMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const initialValues: InitialValues = {
        name: '',
        surname: '',
        email: '',
        password: '',
        passwordRepeat: '',
    };

    const handleSubmit = async (
        values: InitialValues,
        { resetForm }: FormikHelpers<InitialValues>
    ): Promise<void | ReactElement> => {
        const newUser: InitialValues = {
            name: values.name,
            surname: values.surname,
            email: values.email,
            password: values.password,
            messenger: checkMessenger,
            phone: getPhone,
        };

        interface FetchData {
            token?: string;
        }

        const storeData = sessionStorage.getItem('isCartRedirectionPath');
        const { isCartRedirectionPath } = storeData ? JSON.parse(storeData) : false;

        if (!getPhone) {
            toast.error('Вкажи свій телефон', {
                icon: <ToastImg />,
                toastId: customId,
            });
            return;
        }

        try {
            const response:
                | {
                      data: FetchData;
                  }
                | { error?: FetchBaseQueryError | SerializedError | undefined } = await register({
                ...newUser,
            });

            if (response && 'error' in response) {
                toast.error('Користувач з такою поштою вже існує', {
                    icon: <ToastImg />,
                    toastId: customId,
                });
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

    const handleClickPasswordIcon = useCallback((): void => {
        setIsOpenEye((prevState) => !prevState);
    }, [setIsOpenEye]);

    const getCheckMessenger = useCallback(
        (value: string): void => {
            setCheckMessenger(value);
        },
        [setCheckMessenger]
    );

    return (
        <>
            <h3 className={cls.title}>Давай знайомитися</h3>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={RegisterFormSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <ul className={cls.container}>
                            <li className={cls.container__item}>
                                <Input
                                    theme={InputTheme.LEFT}
                                    type={'text'}
                                    name={'name'}
                                    label={'Твоє чудове імʼя?'}
                                    heightImg={172}
                                    widthImg={200}
                                    alt={'Кіт Ok'}
                                    img={ImgCatName}
                                    placeholder={'Імʼя'}
                                    error={touched.name && errors.name ? errors.name : null}
                                    autoFocus={true}
                                />
                            </li>
                            <li className={cls.container__item}>
                                <Input
                                    theme={InputTheme.RIGHT}
                                    type={'text'}
                                    name={'surname'}
                                    label={'Твоє прекрасне прізвище?'}
                                    heightImg={160}
                                    widthImg={200}
                                    alt={'Кіт норм'}
                                    img={ImgCatSurname}
                                    placeholder={'Прізвище'}
                                    error={
                                        touched.surname && errors.surname ? errors.surname : null
                                    }
                                />
                            </li>
                            <li className={cls.container__item}>
                                <Input
                                    theme={InputTheme.LEFT}
                                    type={'email'}
                                    name={'email'}
                                    label={
                                        'Буду тобі писати любовні пісьма про кавуни.\n' +
                                        'Вкажи свою електроночку.'
                                    }
                                    heightImg={110}
                                    widthImg={168}
                                    alt={'Конверт'}
                                    img={ImgLetter}
                                    placeholder={'E-mail'}
                                    error={touched.email && errors.email ? errors.email : null}
                                />
                            </li>
                            <li className={cls.container__item}>
                                <Input
                                    theme={InputTheme.RIGHT}
                                    type={isOpenEye ? 'text' : 'password'}
                                    name={'password'}
                                    label={'І саме секретне - придумай пароль. Я не підглядаю.'}
                                    heightImg={176}
                                    widthImg={200}
                                    alt={'Кіт в окулярах'}
                                    img={isOpenEye ? ImgCatGlassesOff : ImgCatGlassesOn}
                                    placeholder={'Пароль'}
                                    handleClickPasswordIcon={handleClickPasswordIcon}
                                    isOpenEye={isOpenEye}
                                    error={
                                        touched.password && errors.password ? errors.password : null
                                    }
                                    errorRepeat={
                                        touched.passwordRepeat && errors.passwordRepeat
                                            ? errors.passwordRepeat
                                            : null
                                    }
                                />
                            </li>
                            <li className={cls.container__item}>
                                <div className={cls.container__item_phone}>
                                    <div className={cls.container__item_img}>
                                        <Image
                                            className={cls.img_phone}
                                            src={ImgPhone}
                                            alt={'Мобільний телефон'}
                                            width={102}
                                            height={168}
                                        />
                                    </div>

                                    <div className={cls.container__input_phone}>
                                        <p className={cls.label}>
                                            Телефон, за яким тебе знайде Нова Пошта
                                        </p>
                                        <div className={cls.container__phone}>
                                            <Phone setGetPhone={setGetPhone} />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ChangeMessenger getCheckMessenger={getCheckMessenger} />
                        <CheckBox setIsActiveBtn={setIsActiveBtn} isActiveBtn={isActiveBtn} />
                        <Button
                            type={'submit'}
                            theme={ButtonTheme.SECONDARY}
                            className={cls.btn}
                            disabled={!isActiveBtn}
                        >
                            <Text btnText={'Зареєструватися'} />
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};
