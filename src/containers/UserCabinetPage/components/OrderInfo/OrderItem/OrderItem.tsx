import cls from './OrderItem.module.scss';
import { IProductItem, IShippingAddress, PaymentReference } from '../OrderList/OrderList';
import { ProductItemStat } from './ProductItemStat/ProductItemStat';
import { translatePaymentStatus } from '@/utils/translatePaymentStatus';

interface OrderItemProps {
    reciever?: string;
    growthDate?: string;
    bushComment?: string;
    order: IProductItem[];
    address: IShippingAddress;
    isSelf?: boolean;
    isZsu?: boolean;
    isGrowth?: boolean;
    orderAt: string;
    payment_reference: PaymentReference | undefined;
}

export const OrderItem = ({
    order,
    address,
    isSelf,
    isGrowth,
    orderAt,
    payment_reference,
}: OrderItemProps) => {
    const { firstName, surname, city, novaPostOffice, novaPostLocker, personalAddress } =
        address ?? {};
    const RECIEVER = `${firstName} ${surname}, м. ${city}, ${novaPostOffice || novaPostLocker || personalAddress}`;
    const orderDate = new Date(orderAt).toLocaleDateString('uk-UK', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });

    if (order?.length === 0) {
        return <h2>Замовлень ще немає</h2>;
    }

    return (
        <div>
            <ul className={cls['order-list']}>
                {order?.map(({ id, product, order_quantity, plate = '' }) => (
                    <li
                        key={id}
                        className={`${cls['order-list_item']} ${isGrowth && cls['order-list_item-border']}`}
                    >
                        <ProductItemStat
                            product={product}
                            orderQuantity={order_quantity}
                            orderAt={orderDate}
                        />
                        <ul className={cls['comment-list']}>
                            {isGrowth && product?.seasonStart && (
                                <li className={cls['comment-list_item']}>
                                    <p>
                                        <span className={cls['comment-list_item_title']}>
                                            Орієнтовна дата дозрівання:{' '}
                                        </span>
                                        {new Date(product?.seasonStart).toLocaleDateString(
                                            'uk-UK',
                                            {
                                                month: 'long',
                                                day: 'numeric',
                                            }
                                        )}
                                    </p>
                                </li>
                            )}
                            {isGrowth && plate && (
                                <li className={cls['comment-list_item']}>
                                    <p>
                                        <span className={cls['comment-list_item_title']}>
                                            Коментар:{' '}
                                        </span>{' '}
                                        {plate}
                                    </p>
                                </li>
                            )}
                        </ul>
                    </li>
                ))}
            </ul>

            <ul className={cls['comment-list']}>
                {isSelf && (
                    <li className={cls['comment-list_item']}>
                        <p>
                            <span className={cls['comment-list_item_title']}>Отримувач: </span>{' '}
                            {RECIEVER}
                        </p>
                    </li>
                )}
            </ul>
            <p className={cls['payment-status']}>
                Статус оплати: {translatePaymentStatus(payment_reference?.status || '')}
            </p>
        </div>
    );
};
