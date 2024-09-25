'use client';

import cls from './SocialLogin.module.scss';
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { SerializedError } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
// import { ToastImg } from '@/components/ToastImg/ToastImg';
// import { getToken } from '@/store/features/authSlice/authSlice';
// import React from 'react';
// import { useRegisterMutation } from '@/store/features/services/authService';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';

// interface JwtPayload {
//     sub?: string;
//     given_name: string;
//     family_name: string;
//     email: string;
// }

// interface User {
//     email: string;
//     name: string;
//     surname: string;
//     phone: null;
//     messenger: string;
//     password: string | undefined;
// }

// const customId = 'toastId';
export const SocialLogin = () => {
    // const [register] = useRegisterMutation();
    // const dispatch = useDispatch();
    // const router = useRouter();
    // const registerUser = async (newUser: User) => {
    //     interface FetchData {
    //         token?: string;
    //     }
    //
    //     try {
    //         const response:
    //             | {
    //                   data: FetchData;
    //               }
    //             | {
    //                   error?: FetchBaseQueryError | SerializedError | undefined;
    //               } = await register({ ...newUser });
    //
    //         if (response && 'error' in response) {
    //             toast.error('Користувач з такою поштою вже існує', {
    //                 icon: <ToastImg />,
    //                 toastId: customId,
    //             });
    //         }
    //
    //         if (response && 'data' in response) {
    //             dispatch(getToken(response.data.token));
    //             router.push('/');
    //             toast.success('Вітаю тебе, Друже!', {
    //                 icon: <ToastImg />,
    //                 toastId: customId,
    //             });
    //         }
    //     } catch (e) {
    //         if (e) {
    //             return <h3>Упс, щось пішло не так!</h3>;
    //         }
    //     }
    // };
    return (
        <div className={cls.container}>
            {/*<Text text={'Або через:'} />*/}
            {/*<LoginSocialFacebook*/}
            {/*    appId='1599680924112923'*/}
            {/*    onReject={(err: IResolveParams) => console.log('err-->', err)}*/}
            {/*    onResolve={(res: IResolveParams) => {*/}
            {/*        const newUser= {*/}
            {/*            email: res.data.email,*/}
            {/*            name: res.data.first_name,*/}
            {/*            surname: res.data.last_name,*/}
            {/*            phone: null,*/}
            {/*            messenger: '',*/}
            {/*            password: res.data.userID*/}
            {/*        }*/}
            {/*        registerUser(newUser)*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Button type={'button'} theme={ButtonTheme.CLEAR}>*/}
            {/*        <Image*/}
            {/*            src={ImgFacebook}*/}
            {/*            alt={'facebook'}*/}
            {/*            width={36}*/}
            {/*            height={36}*/}
            {/*            className={cls.img}*/}
            {/*        />*/}
            {/*    </Button>*/}
            {/*</LoginSocialFacebook>*/}
            {/*<div className={cls.container_google}>*/}
            {/*    <Button*/}
            {/*        type={'button'}*/}
            {/*        theme={ButtonTheme.CLEAR}*/}
            {/*        className={cls.btn}*/}
            {/*    >*/}
            {/*        <GoogleLogin*/}
            {/*            onSuccess={credentialResponse => {*/}
            {/*                const decoded: JwtPayload = jwtDecode(`${credentialResponse.credential}`);*/}
            {/*                const newUser= {*/}
            {/*                    email: decoded.email,*/}
            {/*                    name: decoded.given_name                                ,*/}
            {/*                    surname: decoded.family_name,*/}
            {/*                    phone: null,*/}
            {/*                    messenger: '',*/}
            {/*                    password: decoded.sub*/}
            {/*                }*/}
            {/*                registerUser(newUser)*/}
            {/*            }}*/}
            {/*            onError={() => {*/}
            {/*                console.log('Login Failed');*/}
            {/*            }}*/}
            {/*        />;*/}
            {/*    </Button>*/}
            {/*    <Image*/}
            {/*        src={ImgGoogle}*/}
            {/*        alt={'google'}*/}
            {/*        width={36}*/}
            {/*        height={36}*/}
            {/*        className={cls.img_google}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
};
