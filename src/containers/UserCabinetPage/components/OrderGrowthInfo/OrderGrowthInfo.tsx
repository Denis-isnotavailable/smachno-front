import cls from './OrderGrowthInfo.module.scss';
import Image from 'next/image';
import CatInSearch from '@/images/cat-serching.webp';
import { OrderList } from '../OrderInfo/OrderList/OrderList';
import Link from 'next/link';
import { Button, ButtonTheme, Text } from '@/components';
import { Loading } from '@/components/Loading';
import { useGetOrdersGrowthQuery } from '@/store/features/services/orderService';

const BUTTON_TEXT = 'Якщо хочеш ще щось, то можеш';
const BUTTON_NAME = 'Замовити на виріст';
const ERROR_TEXT = 'Упс, щось пішло не так!';

export const OrderGrowthInfo = () => {
    const { data: ordersGrowth, isLoading, error } = useGetOrdersGrowthQuery('');

    // console.log('ordersGrowth: ', ordersGrowth);

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={cls['order-box']}>
            <div className={cls.container__img}>
                <Image
                    src={CatInSearch}
                    alt={'Кіт Рудий вивчає'}
                    width={240}
                    height={240}
                    loading={'lazy'}
                />
            </div>

            <div>
                <OrderList ordersGrowth={ordersGrowth} isGrowth />

                <div className={cls['btn-box']}>
                    <Text text={BUTTON_TEXT} className={cls['btn-box_text']} />

                    <Link href={'/growth'}>
                        <Button
                            type='button'
                            theme={ButtonTheme.PRIMARY}
                            className={cls['btn-box_button']}
                            aria-label='Order'
                        >
                            {BUTTON_NAME}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
