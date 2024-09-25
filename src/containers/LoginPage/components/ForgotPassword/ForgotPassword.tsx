import { toast } from 'react-toastify';
import { Button, ButtonClose, ButtonTheme, Text } from '@/components';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { ReactElement } from 'react';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { ForgotPasswordSchema } from './ForgotPasswordSchema';
import { useRouter } from 'next/navigation';
import ImgLetter from '@/images/formRegister/letter.webp';

import cls from './ForgotPassword.module.scss';
import Image from 'next/image';
import { useSendNewPasswordMutation } from '@/store/features/services/emailService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { getToken } from '@/store/features/authSlice/authSlice';
import { useDispatch } from 'react-redux';

interface InitialValues {
    email?: string;
}

interface FetchData {
    message?: string;
    token?: string;
}

const customId = 'toastId';
export const ForgotPassword = ({ onClose }: { onClose: () => void }) => {
    const router = useRouter();
    const [sendNewPassword] = useSendNewPasswordMutation();
    const dispatch = useDispatch();

    const initialValues: InitialValues = {
        email: '',
    };

    const handleSubmit = async (
        values: InitialValues,
        { resetForm }: FormikHelpers<InitialValues>
    ): Promise<void | ReactElement> => {
        if (!values.email) {
            toast.error('Вкажи пошту', {
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
                | {
                      error?: FetchBaseQueryError | SerializedError | undefined;
                  } = await sendNewPassword({ email: values.email });
            if (response && 'data' in response) {
                resetForm();
                router.push('/login');
                toast.success('На пошту відправлено тимчасовий пароль', {
                    icon: <ToastImg />,
                    toastId: customId,
                });
                dispatch(getToken(response.data.token));
                onClose();
            }
            if (response && 'error' in response) {
                toast.error('Така пошта не зареєстрована', {
                    icon: <ToastImg />,
                    toastId: customId,
                });
            }
        } catch (error) {
            toast.error('Упс, щось пішло не так', {
                icon: <ToastImg />,
                toastId: customId,
            });
        }
    };

    return (
        <div className={cls['empty-cart-modal']}>
            <div className={cls['close-button-box']}>
                <ButtonClose onClose={onClose} />
            </div>

            <div className={cls['content-box']}>
                <h3 className={cls.title}>Забув пароль?</h3>
                <p className={cls.title_text_one}>Не кіпішуй, зараз порішаєм</p>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={ForgotPasswordSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className={cls.container__input}>
                            <label htmlFor='email' className={cls.text_label}>
                                Введи свою пошту. На неї зараз прийде лист з тимчасовим паролем
                            </label>
                            <div className={cls.container_img}>
                                <Image
                                    src={ImgLetter}
                                    alt='Конверт'
                                    width={46}
                                    height={29}
                                    loading={'lazy'}
                                />
                                <Field
                                    name='email'
                                    className={cls.input}
                                    type='text'
                                    placeholder='E-mail'
                                />
                                <p className={cls.error}>
                                    {touched.email && errors.email ? errors.email : null}
                                </p>
                            </div>
                        </div>
                        <Button type={'submit'} theme={ButtonTheme.PRIMARY} className={cls.btn}>
                            <Text btnText={'Надіслати'} />
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
