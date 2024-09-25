'use client';

import Image from 'next/image';
import { GoogleLogin } from '@react-oauth/google';
// @ts-expect-error This import is correct
import { IResolveParams, LoginSocialFacebook } from 'reactjs-social-login';
import { jwtDecode } from 'jwt-decode';
import { Button, ButtonTheme, Text } from '@/components';
import ImgFacebook from '@/images/formLogin/facebook.webp';
import ImgGoogle from '@/images/formLogin/gmail.webp';
import cls from './SocialLogin.module.scss';
import { useLoginMutation } from '@/store/features/services/authService';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { getToken } from '@/store/features/authSlice/authSlice';
import React from 'react';

interface JwtPayload {
    sub?: string;
    email: string;
}

interface User {
    email: string;
    password: string | undefined;
}

const customId = "toastId";

export const SocialLogin = () => {
    const [login]= useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const loginUser = async (loginUser: User) => {
        interface FetchData {
            token?: string;
        }

        try {
            const response: {
                data: FetchData; } | { error?: FetchBaseQueryError | SerializedError | undefined;
            } = await login({ ...loginUser });

            if(response && 'error' in response){
                toast.error('Вам потрібно зареєструватися', {
                    icon: <ToastImg/>,
                    toastId: customId
                })
            }

            if (response && 'data' in response) {
                dispatch(getToken(response.data.token));
                router.push('/')
                toast.success('Вітаю тебе, Друже!', {
                    icon: <ToastImg/>,
                    toastId: customId,
                })
            }

        } catch (e) {
            if(e) {
                return <h3>Упс, щось пішло не так!</h3>
            }
        }
    }
    return (
        <div className={cls.container}>
            <Text text={'Увійти через:'} />
            <LoginSocialFacebook
                appId='1599680924112923'
                onReject={(err: IResolveParams) => console.log('err-->', err)}
                onResolve={(res: IResolveParams) => {
                    const user= {
                        email: res.data.email,
                        password: res.data.userID
                    }
                    loginUser(user)
                }}
            >
                <Button type={'button'} theme={ButtonTheme.CLEAR}>
                    <Image
                        src={ImgFacebook}
                        alt={'facebook'}
                        width={36}
                        height={36}
                        className={cls.img}
                    />
                </Button>
            </LoginSocialFacebook>
            <div className={cls.container_google}>
                <Button
                    type={'button'}
                    theme={ButtonTheme.CLEAR}
                    className={cls.btn}
                >
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const decoded: JwtPayload = jwtDecode(`${credentialResponse.credential}`);
                            const user= {
                                email: decoded.email,
                                password: decoded.sub
                            }
                            loginUser(user);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />;
                </Button>
                <Image
                    src={ImgGoogle}
                    alt={'google'}
                    width={36}
                    height={36}
                    className={cls.img_google}
                />
            </div>

        </div>
    );
}