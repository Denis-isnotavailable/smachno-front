import cls from './OrderArmyInfo.module.scss';
import Image from 'next/image';
import CatInCask from '@/images/cat-in-cask.webp';
import { OrderList } from '../OrderInfo/OrderList/OrderList';
import Link from 'next/link';
import { Button, ButtonTheme, Text } from '@/components';
import { Loading } from '@/components/Loading';
import { useGetOrdersZsuQuery } from '@/store/features/services/orderService';

const BUTTON_TEXT = 'Поділитись смакотою з воїнами';
const BUTTON_NAME = 'Замовити';
const ERROR_TEXT = 'Упс, щось пішло не так!';

export const OrderArmyInfo = () => {
    const { data: ordersZsu, isLoading, error } = useGetOrdersZsuQuery('');

    // console.log('ordersZsu: ', ordersZsu);

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={cls['order-box']} >
            <div className={cls.container__img}>
                <Image
                    src={CatInCask}
                    alt={'Кіт в касці'}
                    width={240}
                    height={240}
                    loading={'lazy'}
                />
            </div>

            <div>
                <OrderList ordersZsu={ordersZsu} isZsu />

                <div className={cls['btn-box']}>
                    <Text
                        text={BUTTON_TEXT}
                        className={cls['btn-box_text']}
                    />

                    <Link href={'/order'}>
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
    )
};
