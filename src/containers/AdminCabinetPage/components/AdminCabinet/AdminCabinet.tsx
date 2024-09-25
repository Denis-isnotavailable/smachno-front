'use client'
import cls from './AdminCabinet.module.scss';
import { useSelector } from 'react-redux';
import { selectToken } from '@/store/features/authSlice/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useProfileQuery } from '@/store/features/services/authService';
import { Menu } from '../Menu/Menu';
import { AdminInfo } from '../AdminInfo/AdminInfo';
import { Products } from '../Products/Products';
import { Clients } from '../Clients/Clients';
import { OrdersGrowth } from '../OrdersGrowth/OrdersGrowth';
import { OrdersPost } from '../OrdersPost/OrdersPost';
// import { OrdersKyiv } from '../OrdersKyiv/OrdersKyiv';
import { OrdersArmy } from '../OrdersArmy/OrdersArmy';
import { selectPagePosition } from '@/store/features/adminPagePositionSlice/adminPagePositionSlice';

const POSITIONS = [
    { id: 0, name: 'Кабінет шефа', title: 'Кабінет шефа' },
    { id: 1, name: 'Продукти', title: 'Продукти' },
    { id: 2, name: 'База клієнтів', title: 'База клієнтів' },
    { id: 3, name: 'Замовлення “На виріст”', title: 'Замовлення “На виріст”' },
    { id: 4, name: 'Замовлення “Для себе”', title: 'Замовлення “Для себе”' },
    // { id: 5, name: 'Замовлення Київ', title: 'Замовлення Київ' },
    { id: 5, name: 'Замовлення для ЗСУ', title: 'Замовлення для ЗСУ' },
];

export const AdminCabinet = () => {
    const token = useSelector(selectToken);
    const { data, isLoading } = useProfileQuery(token, { skip: !token });
    const router = useRouter();    
    const pagePosition = useSelector(selectPagePosition);    

    useEffect(() => {
        if (!token || !isLoading && data?.roles[0] !== 'admin') {
            router.push('/');
        }
    }, [data?.roles, isLoading, router, token]);
    
    return (
        <section className={cls.section}>

            <Menu positions={POSITIONS}/>
            
            {pagePosition === 0 && <AdminInfo titleText={POSITIONS[0].title} />}
            {pagePosition === 1 && <Products titleText={POSITIONS[1].title} />}
            {pagePosition === 2 && <Clients titleText={POSITIONS[2].title} />}
            {pagePosition === 3 && <OrdersGrowth titleText={POSITIONS[3].title} />}
            {pagePosition === 4 && <OrdersPost titleText={POSITIONS[4].title} />}
            {/* {pagePosition === 5 && <OrdersKyiv titleText={POSITIONS[5].title} />} */}
            {pagePosition === 5 && <OrdersArmy titleText={POSITIONS[5].title} />}
            
        </section>
    )
};
