'use client'
import { Title, Text } from '@/components';
import cls from './Cabinet.module.scss';
import { useState, useEffect } from 'react';
import { CabinetMenu } from '../CabinetMenu/CabinetMenu';
import { PersonalInfo } from '../PersonalInfo/PersonalInfo';
import { AddressInfo } from '../AddressInfo/AddressInfo';
import { OrderInfo } from '../OrderInfo/OrderInfo';
import { OrderArmyInfo } from '../OrderArmyInfo/OrderArmyInfo';
import { OrderGrowthInfo } from '../OrderGrowthInfo/OrderGrowthInfo';
import {selectToken} from "@/store/features/authSlice/authSlice";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useProfileQuery } from '@/store/features/services/authService';

const TITLE = 'Твій кабінет';
const POSITIONS = [
    { id: 0, name: 'Особиста інформація', title: 'Дуже особиста інформація' },
    { id: 1, name: 'Адреса доставки', title: 'Адреса доставки' },
    { id: 2, name: 'Замовлення для себе', title: 'Історія замовлень для себе' },
    { id: 3, name: 'Замовлення для ЗСУ', title: 'Історія замовлень для ЗСУ' },
    { id: 4, name: 'Замовлення “На виріст”', title: 'Замовлення “На виріст”' },
];


export const Cabinet = () => {
    const token = useSelector(selectToken);
    const { data, isLoading } = useProfileQuery(token, { skip: !token });
    const router = useRouter();
    const [currentPosition, setCurrentPosition] = useState(POSITIONS[0].id);

    useEffect(() => {
        if (!token || !isLoading && data?.roles[0] !== 'user') {
            router.push('/');
        }
    }, [data?.roles, isLoading, router, token]);

    return (
        <section className={cls.section}>
            <div className={cls['title-box']}>
                <Title text={TITLE} />
            </div>

            <Text
                text={POSITIONS[currentPosition].title}
                className={cls['position-title']}
            />

            <div className={cls['content-box']}>
                <CabinetMenu
                    positions={POSITIONS}
                    currentPosition={currentPosition}
                    setCurrentPosition={setCurrentPosition}
                />
                <div className={cls['positions-box']}>
                    {currentPosition === 0 && <PersonalInfo />}
                    {currentPosition === 1 && <AddressInfo />}
                    {currentPosition === 2 && <OrderInfo />}
                    {currentPosition === 3 && <OrderArmyInfo />}
                    {currentPosition === 4 && <OrderGrowthInfo />}
                </div>
            </div>
        </section>
    )
};