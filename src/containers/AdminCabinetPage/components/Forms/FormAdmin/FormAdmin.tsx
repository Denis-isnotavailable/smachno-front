import cls from './FormAdmin.module.scss';
import { Form, Formik, FormikHelpers } from 'formik';
import { ReactElement, useState } from 'react';
import { Button, ButtonTheme, SpinnerDots, Text } from '@/components';
import { FormAdminSchema } from './FormAdminSchema';
import { Input } from '@/components/Input/Input';
import { useProfileQuery, useUpdateProfileMutation, useRegisterMutation } from '@/store/features/services/authService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Loading } from '@/components/Loading';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { CloseEyeIcon, OpenEyeIcon } from '@/utils/SVG';
import { FormAdminCreatingSchema } from './FormAdminCreatingSchema';


interface InitialValues {
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

interface FetchData {
    id: string | number;
    name: string;
    surname: string;
    phone: string;
    email: string;  
    roles: string[];    
}

const ERROR_TEXT = 'Упс, щось пішло не так!';
const customId = "toastIdFormUser";

export const FormAdmin = ({isCreatingAdmin}: {isCreatingAdmin?: boolean}) => {
    const { data: user, isLoading, error } = useProfileQuery('');
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [register, { isLoading: isRegister }] = useRegisterMutation();    
    const [isOpenEye, setIsOpenEye] = useState(false);
    
    const initialValues: InitialValues = {
        name: !isCreatingAdmin ? user.name || '' : '',
        surname: !isCreatingAdmin ? user.surname || '' : '',
        email: !isCreatingAdmin ? user.email || '' : '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (
        values: InitialValues,
        { setErrors, resetForm }: FormikHelpers<InitialValues>
    ): Promise<void | ReactElement> => {        

        try {  
            let response: {
                data: FetchData; } | { error?: FetchBaseQueryError | SerializedError | undefined;
            };

            if (isCreatingAdmin) {
                response = await register({ 
                    name: values.name?.trim(),
                    surname: values.surname?.trim(),                    
                    email: values.email?.trim(),                    
                    password: values.password,
                    roles: ['admin'],
                    messenger: 'Telegram',
                });
            } else {
                response = await updateProfile({
                    id: user?.id,
                    user: {
                        name: values.name?.trim(),
                        surname: values.surname?.trim(),                    
                        email: values.email?.trim(),                    
                    }
                });
            }

            console.log(response);
            

            if (response && 'error' in response && response.error !== undefined) {
                if ('data' in response.error    
                    && typeof response.error.data === 'object'
                    && response.error.data !== null
                    && 'message' in response.error.data
                    && response.error.data.message === "User with this email already exists") {
                    
                    setErrors({ email: 'Користувач з такою поштою вже існує' });
                    return;
                } else {                    
                    toast.error(ERROR_TEXT, {
                        toastId: customId,
                    });
                    return;
                }
            } else {
                toast.success(isCreatingAdmin ? 'Адміна створив' : 'Зміни зберіг!', {
                    icon: <ToastImg />,
                    toastId: customId
                });
                resetForm();
            }

        } catch (e) {
            if(e) {
                return <h3>{ERROR_TEXT}</h3>
            }
        }     
    }    

    const handleClickPasswordIcon = () => {
        setIsOpenEye((prevState) => !prevState);
    };

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
            validationSchema={isCreatingAdmin ? FormAdminCreatingSchema : FormAdminSchema}
            >
            {({ errors, touched }) => (
                <Form>
                    <ul className={cls.form_list}>
                        <li className={cls.form_list__item}>
                            <Input
                                name='name'
                                type='text'
                                label='Імʼя'
                                placeholder='Введи імʼя'  
                                className={cls.input}
                            />
                            {touched.name && errors.name ? (
                                <p className={cls.error}>
                                    {errors.name}
                                </p>
                            ) : null}
                        </li>

                        <li className={cls.form_list__item}>     
                            <Input
                                name='surname'
                                type='text'
                                label='Прізвище'
                                placeholder='Введи прізвище'    
                                className={cls.input}
                            />
                            {touched.surname && errors.surname ? (
                                <p className={cls.error}>
                                    {errors.surname}
                                </p>
                            ) : null}
                        </li>

                        <li className={cls.form_list__item}>
                            <Input
                                name='email'
                                type='text'
                                label='E-mail'
                                placeholder='E-mail'
                                className={cls.input}
                            />
                            {touched.email && errors.email ? (
                                <p className={cls.error}>
                                    {errors.email}
                                </p>
                            ) : null}
                        </li>      
                        
                        {isCreatingAdmin && <li className={cls.form_list__item}>     
                            <Input
                                name='password'
                                type={isOpenEye ? 'text' : 'password'}
                                // placeholder='Пароль'
                                label='Пароль'     
                                className={cls.input}
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
                        </li>}

                        {isCreatingAdmin && <li className={cls.form_list__item}>
                            <Input
                                name='confirmPassword'
                                type={isOpenEye ? 'text' : 'password'}
                                // placeholder='Пароль'
                                label='Ще раз пароль'    
                                className={cls.input}
                            />
                            {touched.confirmPassword && errors.confirmPassword ? (
                                <p className={cls.error}>
                                    {errors.confirmPassword}
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
                        </li>}
                    </ul>
                    

                    <Button
                        type={'submit'}
                        theme={ButtonTheme.PRIMARY}
                        className={cls.btn}
                        aria-label='Form Submit'
                        disabled={isUpdating || isRegister}
                    >
                        {isUpdating || isRegister ? <SpinnerDots /> : <Text btnText={'Зберегти'}/>}
                    </Button>                    
                </Form>
                )}
        </Formik>
    )
};
