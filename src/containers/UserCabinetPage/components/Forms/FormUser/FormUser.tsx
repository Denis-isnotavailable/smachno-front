import cls from './FormUser.module.scss';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Button, ButtonTheme, SpinnerDots, Text } from '@/components';
import { FormUserSchema } from './FormUserSchema';
import { Input } from '@/components/Input/Input';
import { useProfileQuery, useUpdateProfileMutation } from '@/store/features/services/authService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Loading } from '@/components/Loading';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { Phone } from '@/containers/AuthPage/components/RegisterForm/Phone/Phone';
import { TextAlign } from '@/components/Text/Text';
import { MessengerBlock } from './MessengerBlock/MessengerBlock';

interface InitialValues {
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    isGetEmail?: boolean;
}

interface FormUserProps {    
    setIsEditForm: (value: boolean) => void;
}

interface FetchData {
    id: string | number;
    name: string;
    surname: string;
    phone: string;
    email: string;  
    roles: string[];   
    isGetEmail: boolean;
}

const ERROR_TEXT = 'Упс, щось пішло не так!';
const customId = "toastIdFormUser";

export const FormUser = ({ setIsEditForm }: FormUserProps) => {
    const { data: user, isLoading, error } = useProfileQuery('');
    const [updateProfile, {isLoading: isUpdating}] = useUpdateProfileMutation();
    const [initialPhone, setInitialPhone] = useState<null | string>('');
    const [getPhone, setGetPhone] = useState('');
    const [checkMessenger, setCheckMessenger] = useState<string>('');

    // console.log(user);


    const initialValues: InitialValues = {
        name: user.name || '',
        surname: user.surname || '',
        phone: user.phone || '',
        email: user.email || '',
        isGetEmail: user.isGetEmail || false,
    };

    useEffect(() => {
        if (user) {            
            setInitialPhone(user?.phone || null);
            setCheckMessenger(user?.messenger || '');
        }
    }, [user]);

    const handleSubmit = async (
        values: InitialValues,
        { setErrors }: FormikHelpers<InitialValues>
    ): Promise<void | ReactElement> => {
        if (!checkMessenger) return;

        try {            
            const response: {
                data: FetchData; } | { error?: FetchBaseQueryError | SerializedError | undefined;
            } = await updateProfile({
                id: user?.id,
                user: {
                    name: values.name?.trim(),
                    surname: values.surname?.trim(),
                    phone: getPhone,
                    email: values.email?.trim(),
                    messenger: checkMessenger,
                    isGetEmail: values?.isGetEmail,
                }
            });

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
                toast.success('Зміни зберіг!', {
                    icon: <ToastImg/>,
                    toastId: customId
                })
                setIsEditForm(false);
            }

        } catch (e) {
            if(e) {
                return <h3>{ERROR_TEXT}</h3>
            }
        }     
    }

    const getCheckMessenger = useCallback((value: string): void => {
        setCheckMessenger(value)
    }, [setCheckMessenger]);

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
            validationSchema={FormUserSchema}
            >
            {({ errors, touched }) => (
                <Form>
                    <ul className={cls.form_list}>
                        <li className={cls.form_list__item}>
                            <Input
                                name='name'
                                type='text'
                                label='Твоє чудове імʼя'
                                placeholder='Введи імʼя'                               
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
                                label='Твоє прекрасне прізвище'
                                placeholder='Введи прізвище'                               
                            />
                            {touched.surname && errors.surname ? (
                                <p className={cls.error}>
                                    {errors.surname}
                                </p>
                            ) : null}
                        </li>

                        <li className={cls.form_list__item}>
                            <Text text={'Твій номерочок'} align={TextAlign.LEFT} className={cls.label} />
                            <div className={cls.container__phone}>
                                <Phone setGetPhone={setGetPhone} initialPhone={initialPhone}/>
                            </div>
                        </li>

                        <li className={cls.form_list__item}>
                            <Input
                                name='email'
                                type='text'
                                label='Електронна поштонька'
                                placeholder='E-mail'
                            />
                            {touched.email && errors.email ? (
                                <p className={cls.error}>
                                    {errors.email}
                                </p>
                            ) : null}
                        </li>

                        <li className={cls.form_list__item}>
                            <MessengerBlock getCheckMessenger={getCheckMessenger} checkMessenger={checkMessenger} />                            
                        </li>

                        <li className={cls.form_list__item}>     
                            <label className={cls.label}>
                                <Field type="checkbox" name="isGetEmail" className={cls['input-checkbox']} />
                                <span className={cls['custom-checkbox']} ></span>
                                <span className={cls['label_text']} >{'Підписка "Чекати пісьмо"'}</span>
                            </label>
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
                                onClick={() => setIsEditForm(false)}
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
