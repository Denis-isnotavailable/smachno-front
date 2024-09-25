'use client';

import cls from './SuccessOrder.module.scss';
import { Button, ButtonTheme, Text } from '@/components';
import Image from 'next/image';
import ImgCat from '@/images/cat_rake.webp';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSendEmailMutation } from '@/store/features/services/emailService';
import { Loading } from '@/components/Loading';
import { useDispatch } from 'react-redux';
import { clearCartProduct } from '@/store/features/cartSlice/cartSlice';
import { useGetOrderStatusQuery } from '@/store/features/services/orderService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';

interface IResponseOrder {
    id: string;
    message: string;
}

const customId = 'toastId';
const loadingDelay = 3000;

export const SuccessOrder = () => {
    const [numberOrder, setNumberOrder] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccessPay, setIsSuccessPay] = useState(false);
    const [sendEmail, { isLoading: isLoadingEmail }] = useSendEmailMutation();
    const { data: getStatusPay, isLoading: isLoadingStatus } = useGetOrderStatusQuery(numberOrder, {
        skip: !numberOrder,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const getLocalValue = localStorage.getItem('orderToEmail');
        if (!getLocalValue) return;
        const order = JSON.parse(getLocalValue);
        setNumberOrder(order.numberOrder);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, loadingDelay);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        console.log(getStatusPay);
        if (getStatusPay) {
            if (getStatusPay.payment_reference.status === 'success') {
                setIsSuccessPay(true);
                const getLocalValue = localStorage.getItem('orderToEmail');
                if (!getLocalValue) return;
                const order = JSON.parse(getLocalValue);

                const fetchData = async () => {
                    try {
                        const responseEmail: {
                            data?: IResponseOrder;
                            error?: FetchBaseQueryError | SerializedError;
                        } = await sendEmail(order);

                        if (!responseEmail.data) {
                            throw new Error('Помилка відправлення пошти');
                        }

                        toast.success('Інформація про замовлення відправлена на пошту', {
                            icon: <ToastImg />,
                            toastId: customId,
                        });

                        dispatch(clearCartProduct());
                        localStorage.removeItem('orderToEmail');
                    } catch (error) {
                        toast.error('Сталася помилка при відправленні пошти');
                    }
                };
                fetchData();
            }
        }
    }, [dispatch, getStatusPay, numberOrder, sendEmail]);

    if (isSuccessPay) {
        return (
            <section className={cls.container}>
                {isLoadingEmail || isLoadingStatus ? (
                    <Loading />
                ) : (
                    <>
                        <Text title={'Дякую!'} />
                        <p className={cls.text}>Вже біжу на город, виконувати твоє замовлення</p>
                        <div className={cls.container__img}>
                            <Image
                                className={cls.img}
                                src={ImgCat}
                                alt='Кіт з граблями'
                                width={422}
                            />
                        </div>
                        <Link href={'/'} className={cls.container__btn}>
                            <Button type={'button'} theme={ButtonTheme.SECONDARY}>
                                <Text btnText={'На головну сторінку'} />
                            </Button>
                        </Link>
                    </>
                )}
            </section>
        );
    } else {
        return isLoading ? (
            <Loading />
        ) : (
            <section className={cls.container}>
                <Text title={'Вибач!'} />
                <p className={cls.text}>
                    Щось пішло не так і твоє замовлення не оформлене, спробуй ще раз
                </p>
                <div className={cls.container__img}>
                    <Image className={cls.img} src={ImgCat} alt='Кіт засмучений' width={422} />
                </div>

                <ul className={cls.buttons_list}>
                    <li>
                        <Link href={'/step-yourself'} className={cls.container__btn}>
                            <Button type={'button'} theme={ButtonTheme.SECONDARY}>
                                <Text btnText={'Оформити ще раз'} />
                            </Button>
                        </Link>
                    </li>

                    <li>
                        <Link href={'/'} className={cls.container__btn}>
                            <Button type={'button'} theme={ButtonTheme.SECONDARY}>
                                <Text btnText={'На головну сторінку'} />
                            </Button>
                        </Link>
                    </li>
                </ul>
            </section>
        );
    }
};
