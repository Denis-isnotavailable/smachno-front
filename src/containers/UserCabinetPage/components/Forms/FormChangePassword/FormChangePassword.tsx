import cls from './FormChangePassword.module.scss';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button, ButtonTheme, SpinnerDots, Text } from '@/components';
import { ReactElement, useState } from 'react';
import { FormChangePasswordSchema } from './FormChangePasswordSchema';
import { Input } from '@/components/Input/Input';
import { OpenEyeIcon, CloseEyeIcon } from '@/utils/SVG';
import { useChangePasswordMutation, useProfileQuery } from '@/store/features/services/authService';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getToken } from '@/store/features/authSlice/authSlice';
import { Loading } from '@/components/Loading';


interface InitialValues {
    password: string;
    newPassword: string;
    confirmNewPassword: string;    
}

interface FetchData {
    message?: string;
    token?: string;    
}

interface FormChangePasswordProps {    
    setIsChangePassword: (value: boolean) => void;
}

const ERROR_TEXT = 'Упс, щось пішло не так!';
const customId = "toastIdFormChangePassword";

export const FormChangePassword = ({ setIsChangePassword }: FormChangePasswordProps) => {
    const [isOpenEye, setIsOpenEye] = useState(false);
    const [isOpenEyeNew, setIsOpenEyeNew] = useState(false);
    const { data: user, isLoading, error } = useProfileQuery('');
    const [changePassword, {isLoading: isUpdating}] = useChangePasswordMutation();
    const dispatch = useDispatch();

    const initialValues: InitialValues = {
        password: '',
        newPassword: '',
        confirmNewPassword: '',
    };

    const handleClickPasswordIcon = () => {
        setIsOpenEye((prevState) => !prevState);
    };

    const handleClickPasswordIconNew = () => {
        setIsOpenEyeNew((prevState) => !prevState);
    };

    const handleSubmit = async (
        values: InitialValues,
        { setErrors }: FormikHelpers<InitialValues>
    ): Promise<void | ReactElement> => { 
        console.log(values);

        try {            
            const response: {
                data?: FetchData; } | { error?:FetchBaseQueryError | SerializedError | undefined;
            } = await changePassword({
                id: user?.id,
                body: {
                    password: values.password,
                    newPassword: values.newPassword,
                }
            });

            if (response && 'error' in response && response.error !== undefined) {                
                if ('data' in response.error    
                    && typeof response.error.data === 'object'
                    && response.error.data !== null
                    && 'message' in response.error.data
                    && response.error.data.message === 'password is incorrect') {
                    
                    setErrors({ password: 'Невірний пароль' });
                    return;
                } else {
                    // Handle other error cases
                    toast.error(ERROR_TEXT, {
                        toastId: customId,
                    });
                    return;
                }
            } else if (response && 'data' in response) {
                toast.success('Парольчик змінив!', {
                    icon: <ToastImg />,
                    toastId: customId
                });
                dispatch(getToken(response.data?.token));
                setIsChangePassword(false);
            }

        } catch (e) {
            if(e) {
                return <h3>Упс, щось пішло не так!</h3>
            }
        }              
    }

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FormChangePasswordSchema}
            >
            {({ errors, touched }) => (
                <Form>
                    <ul className={cls.form_list}>
                        <li className={cls.form_list__item}>
                            <Input
                                name='password'
                                type={isOpenEye ? 'text' : 'password'}
                                // placeholder='Пароль'
                                label='Старий пароль'                              
                            />
                            {touched.password && errors.password ? (
                                <p className={cls.error}>
                                    {errors.password}
                                </p>
                            ) : null}
                            <Button
                                type={'button'}
                                theme={ButtonTheme.CLEAR}
                                className={cls.btn__icon}
                                onClick={handleClickPasswordIcon}
                            >
                                {isOpenEye ? <OpenEyeIcon addStyle={cls.icon} /> : <CloseEyeIcon addStyle={cls.icon} />}
                            </Button>
                        </li>

                        <li className={cls.form_list__item}>     
                            <Input
                                name='newPassword'
                                type={isOpenEyeNew ? 'text' : 'password'}
                                // placeholder='Пароль'
                                label='Новий пароль'                             
                            />
                            {touched.newPassword && errors.newPassword ? (
                                <p className={cls.error}>
                                    {errors.newPassword}
                                </p>
                            ) : null}
                            <Button
                                type={'button'}
                                theme={ButtonTheme.CLEAR}
                                className={cls.btn__icon}
                                onClick={handleClickPasswordIconNew}
                            >
                                {isOpenEyeNew ? <OpenEyeIcon addStyle={cls.icon} /> : <CloseEyeIcon addStyle={cls.icon} />}
                            </Button>
                        </li>

                        <li className={cls.form_list__item}>
                            <Input
                                name='confirmNewPassword'
                                type={isOpenEyeNew ? 'text' : 'password'}
                                // placeholder='Пароль'
                                label='Повтори новий пароль'                            
                            />
                            {touched.confirmNewPassword && errors.confirmNewPassword ? (
                                <p className={cls.error}>
                                    {errors.confirmNewPassword}
                                </p>
                            ) : null}
                            <Button
                                type={'button'}
                                theme={ButtonTheme.CLEAR}
                                className={cls.btn__icon}
                                onClick={handleClickPasswordIconNew}
                            >
                                {isOpenEyeNew ? <OpenEyeIcon addStyle={cls.icon} /> : <CloseEyeIcon addStyle={cls.icon} />}
                            </Button>
                        </li>
                        
                    </ul>

                    <ul className={cls['form-btns-list']}>
                        <li className={cls['form-btns-list_item']}>
                            <Button
                                type={'submit'}
                                theme={ButtonTheme.PRIMARY}
                                className={cls.btn}
                                aria-label='Form Submit'
                            >
                                {isUpdating ? <SpinnerDots /> : <Text btnText={'Зберегти'}/>}
                            </Button>
                        </li>
                        <li className={cls['form-btns-list_item']}>
                            <Button
                                type={'button'}
                                theme={ButtonTheme.PRIMARY}
                                className={cls.btn}
                                aria-label='Form Back'
                                onClick={() => setIsChangePassword(false)}
                            >                        
                                <Text btnText={'Назад'}/>
                            </Button>
                        </li>
                    </ul>                    
                </Form>
                )}
        </Formik>
    )
};
