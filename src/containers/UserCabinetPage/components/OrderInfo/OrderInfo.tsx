import cls from './OrderInfo.module.scss';
import Image from 'next/image';
import CatInCillinder from '@/images/cat-in-cilinder.webp';
import { OrderList } from './OrderList/OrderList';
import { Button, ButtonTheme, Text } from '@/components';
import Link from 'next/link';
import { useGetOrdersSelfQuery } from '@/store/features/services/orderService';
import { Loading } from '@/components/Loading';

const BUTTON_TEXT = 'Хочу ще!';
const BUTTON_NAME = 'Замовити';
const ERROR_TEXT = 'Упс, щось пішло не так!';

export const OrderInfo = () => {
    const { data: ordersSelf, isLoading, error } = useGetOrdersSelfQuery('');

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
                    src={CatInCillinder}
                    alt={'Кіт в циліндрі'}
                    width={240}
                    height={240}
                    loading={'lazy'}
                />
            </div>

            <div>
                <OrderList ordersSelf={ordersSelf} isSelf />

                <div className={cls['btn-box']}>
                    <Text text={BUTTON_TEXT} className={cls['btn-box_text']} />

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
    );
};
