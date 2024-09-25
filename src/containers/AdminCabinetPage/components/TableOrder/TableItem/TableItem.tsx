import cls from './TableItem.module.scss';
import { PACKAGING_CASES } from '@/db/packagingCases';
import { IProductItem, IShippingAddress } from '../TableOrder';
import { Switch } from '../../Switch/Switch';
import { useChangeOrderSendStatusMutation } from '@/store/features/services/orderService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { useEffect, useState } from 'react';

export interface ITableItemProps {
    order: IProductItem;
    shippingAddress: IShippingAddress;
    indexNumber: string | number;
    orderAt: string;
    orderId: string;
    isGrowth?: boolean;
    isZsu?: boolean;
    isSelfPost?: boolean;
    // isSelfKyiv?: boolean;
    mainId?: string;
    payment:
        | 'created'
        | 'processing'
        | 'hold'
        | 'success'
        | 'failure'
        | 'reversed'
        | 'expired'
        | undefined;
}

interface FetchData {
    typeOrder: string;
    idOrder: number;
    idItemOrder: number;
    status: boolean;
}

enum TypeOrder {
    zsuOrder = 'zsuOrder',
    selfOrder = 'selfOrder',
    growthOrder = 'growthOrder',
}

export const typePayment = {
    created: 'рахунок створено успішно, очікується оплата',
    processing: 'платіж обробляється',
    hold: 'сума заблокована',
    success: 'успішна оплата',
    failure: 'неуспішна оплата',
    reversed: 'оплата повернена після успіху',
    expired: 'час дії вичерпано',
};

const ERROR_TEXT = 'Упс, щось пішло не так!';
const customId = 'toastIdChangeStatus';

export const TableItem = ({
    order,
    shippingAddress,
    indexNumber,
    orderAt,
    orderId,
    isGrowth,
    isZsu,
    isSelfPost,
    mainId,
    payment,
}: ITableItemProps) => {
    const [changeOrderSendStatus] = useChangeOrderSendStatusMutation();
    const [type, setType] = useState<string | null>(null);

    const orderDate = new Date(orderAt).toLocaleDateString('uk-UK', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
    const address = order.product.shipping
        ? `м. ${shippingAddress?.city}, ${shippingAddress?.novaPostOffice || shippingAddress?.personalAddress || shippingAddress?.novaPostLocker}`
        : 'Самовивіз';

    useEffect(() => {
        isGrowth && setType(TypeOrder.growthOrder);
        isSelfPost && setType(TypeOrder.selfOrder);
        isZsu && setType(TypeOrder.zsuOrder);
    }, [isGrowth, isSelfPost, isZsu]);

    const handleChangeSendStatusButtonClick = async (value: boolean) => {
        try {
            const response:
                | {
                      data: FetchData;
                  }
                | { error?: FetchBaseQueryError | SerializedError | undefined } =
                await changeOrderSendStatus({
                    statusData: {
                        typeOrder: type,
                        idOrder: mainId,
                        idItemOrder: order.id,
                        status: value,
                    },
                });

            if (response && 'error' in response) {
                toast.error(ERROR_TEXT, {
                    toastId: customId,
                });
                return false;
            } else {
                toast.success('Статус змінено!', {
                    icon: <ToastImg />,
                    toastId: customId,
                });
                return true;
            }
        } catch (e) {
            if (e) {
                return <h3>{ERROR_TEXT}</h3>;
            }
        }
    };

    return (
        <>
            <tr className={cls['table_body-tr']} key={order?.id}>
                <td className={cls['table_body-td']}>{indexNumber}</td>
                <td className={cls['table_body-td']}>
                    <p
                        className={cls['table_body_name']}
                    >{`${shippingAddress?.firstName} ${shippingAddress?.surname}`}</p>
                    <a href={`tel:${shippingAddress?.phone}`} className={cls['phone_link']}>{shippingAddress?.phone}</a>                    
                </td>
                <td className={cls['table_body-td']}>
                    <p>{`№ ${orderId}`}</p>
                    <p>{orderDate}</p>
                </td>
                <td className={cls['table_body-td']}>{order?.product?.name}</td>
                <td className={cls['table_body-td']}>
                    {`${order?.order_quantity} ${PACKAGING_CASES.get(order?.product?.packaging)}`}
                </td>
                {isGrowth && (
                    <td className={`${cls['table_body-td']} ${cls['table_body-td__right']}`}>
                        {order?.plate}
                    </td>
                )}
                <td className={`${cls['table_body-td']} ${cls['table_body-td__center']}`}>
                    <Switch
                        id={order.id}
                        agreed={order.status}
                        setApprovement={handleChangeSendStatusButtonClick}
                        isWithConfirmation={true}
                    />
                </td>
            </tr>

            <tr className={`${isZsu && cls['table_body-tr__zsu']}`}>
                <td className={cls['table_body-td-down']} colSpan={isGrowth ? 7 : 6}>
                    <strong>Оплата: </strong>
                    <span className={`${payment === 'success' ? cls.green : cls.orange}`}>
                        {payment && typePayment[payment] ? typePayment[payment] : 'Дані відсутні'}
                    </span>
                </td>
            </tr>

            {!isZsu && (
                <tr className={cls['table_body-tr-down']}>
                    <td className={cls['table_body-td-down']} colSpan={isGrowth ? 7 : 6}>
                        <strong>Доставка: </strong>
                        <span className={`${address === 'Самовивіз' && cls.red}`}>{address}</span>
                    </td>
                </tr>
            )}
        </>
    );
};
