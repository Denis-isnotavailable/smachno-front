'use client'
import { Button, ButtonTheme, SpinnerDots } from '@/components';
import cls from './AwaitLetterButton.module.scss';
import { useProfileQuery, useUpdateProfileMutation } from '@/store/features/services/authService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { useSelector } from 'react-redux';
import { selectToken } from '@/store/features/authSlice/authSlice';

const BUTTON_LETTER = 'Чекати пісьмо';
const ERROR_TEXT = 'Упс, щось пішло не так!';
const ERROR_AUTH_TEXT = 'Упс, спочатку залогінься!';
const ERROR_ALREADY_SUBSCRIBE_TEXT = 'Упс, ти вже підписаний!';
const customId = "toastIdFormUser";

interface FetchData {
    id: string | number;
    name: string;
    surname: string;
    phone: string;
    email: string;  
    roles: string[];   
    isGetEmail: boolean;
}

export const AwaitLetterButton = () => {
    const { data: user } = useProfileQuery('');
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const token = useSelector(selectToken);

    const handleSubscribeButtonClick = async () => {
        if (!token || !user?.id) {
            toast.error(ERROR_AUTH_TEXT, {
                toastId: customId
            })
        } else if (user?.isGetEmail) {
            toast.error(ERROR_ALREADY_SUBSCRIBE_TEXT, {
                toastId: customId
            })
        } else {
            try {            
                const response: {
                    data: FetchData; } | { error?: FetchBaseQueryError | SerializedError | undefined;
                } = await updateProfile({
                    id: user.id,
                    user: {
                        name: user.name ,
                        surname: user.surname,
                        phone: user.phone,
                        email: user.email,
                        isGetEmail: true,
                    }
                });

                if (response && 'error' in response) {
                    toast.error(ERROR_TEXT, {
                        toastId: customId
                    })
                } else {
                    toast.success('Ти підписався на оновлення!', {
                        icon: <ToastImg />,
                        toastId: customId
                    });
                }

            } catch (e) {
                if(e) {
                    return <h3>{ERROR_TEXT}</h3>
                }
            }  
        }        
    }
    
    return (
        <Button
            type='button'
            theme={ButtonTheme.PRIMARY}
            className={cls['letter-button']}
            onClick={handleSubscribeButtonClick}
        >
            {isUpdating ? <SpinnerDots /> : BUTTON_LETTER}
            
        </Button>
    )
};
