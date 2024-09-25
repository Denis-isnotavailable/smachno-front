import { IProduct } from '@/store/features/services/productService';
import cls from './TableOrder.module.scss';
import { TableItem } from './TableItem/TableItem';
import { useSelector } from 'react-redux';
import { selectSearchValue } from '@/store/features/searchSlice/searchSlice';
import { selectOrderPaymentStatus } from '@/store/features/orderPaymentStatus/orderPaymentStatus';

export interface IOrderSelf {
    id: string;
    selfOrder: ISelfOrderArray[];
    shippingAddress: IShippingAddress;
    user: IUser;
    orderAt: string;
    payment_reference: IPaymentReference;
}

export interface ISelfOrderArray {
    id: string;
    itemsSelfOrder: IProductItem[];
    orderId: string;
    totalPrice: number;
}

export interface IOrderZsu {
    id: string;
    zsuOrder: IZsuOrderArray[];
    shippingAddress: IShippingAddress;
    user: IUser;
    orderAt: string;
    payment_reference: IPaymentReference;
}

export interface IZsuOrderArray {
    id: string;
    itemsZsuOrder: IProductItem[];
    orderId: string;
    totalPrice: number;
}

export interface IOrderGrowth {
    id: string;
    growthOrder: IGrowthOrderArray[];
    shippingAddress: IShippingAddress;
    user: IUser;
    orderAt: string;
    payment_reference: IPaymentReference;
}

export interface IGrowthOrderArray {
    id: string;
    itemsGrowthOrder: IProductItem[];
    orderId: string;
    totalPrice: number;
}

export interface IProductItem {
    id: string;
    order_quantity: number;
    product: IProduct;
    plate?: string;
    status: boolean;
}

export interface IShippingAddress {
    id: string;
    userId: string;
    orderId: string;
    firstName: string;
    surname: string;
    city: string;
    phone: string;
    novaPostLocker: string | null;
    novaPostOffice: string | null;
    personalAddress: string | null;
}

export interface IUser {
    id: string;
    firstName: string;
    surname: string;
    email: string;
}

export interface IPaymentReference {
    errCode: string;
    failureReason: string;
    invoiceId: string;
    modifiedDate: string;
    reference: string;
    status:
        | 'created'
        | 'processing'
        | 'hold'
        | 'success'
        | 'failure'
        | 'reversed'
        | 'expired'
        | undefined;
}

export interface ITableOrderProps {
    isGrowth?: boolean;
    isSelfPost?: boolean;
    isZsu?: boolean;
    isSelfKyiv?: boolean;
    ordersSelf?: IOrderSelf[];
    ordersZsu?: IOrderZsu[];
    ordersGrowth?: IOrderGrowth[];
}

export const TableOrder = ({
    ordersSelf,
    ordersZsu,
    ordersGrowth,
    isGrowth,
    isSelfPost,
    isZsu,
}: ITableOrderProps) => {
    const searchValue = useSelector(selectSearchValue);
    const orderPaymentStatusValue = useSelector(selectOrderPaymentStatus);

    // console.log('ordersGrowth: ', ordersGrowth);

    return (
        <table className={cls.table}>
            <thead className={cls.table_head}>
                <tr className={cls['table_head-tr']}>
                    <th className={cls['table_head-th']}>№</th>
                    <th className={cls['table_head-th']}>
                        <p>Імʼя</p> <p>Телефон</p>
                    </th>
                    <th className={cls['table_head-th']}>
                        <p>№ Замовлення</p> <p>Дата</p>
                    </th>
                    <th className={cls['table_head-th']}>Продукт</th>
                    <th className={cls['table_head-th']}>Кількість</th>
                    {isGrowth && (
                        <th className={`${cls['table_head-th']} ${cls['table_head-th__right']}`}>
                            Коментар
                        </th>
                    )}
                    <th className={`${cls['table_head-th']} ${cls['table_head-th__center']}`}>
                        Вислав
                    </th>
                </tr>
            </thead>

            <tbody className={cls.table_body}>
                {isGrowth &&
                    ordersGrowth
                        ?.filter(
                            ({ growthOrder, payment_reference }) =>
                                growthOrder?.length !== 0 && (orderPaymentStatusValue ? payment_reference?.status === 'success' : true) 
                        )
                        ?.sort(
                            (a, b) => new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime()
                        )
                        ?.map((order, i) => {
                            const productArray = order?.growthOrder[0]?.itemsGrowthOrder;
                            return (
                                productArray &&
                                [...productArray]
                                    ?.filter(
                                        (productOrder) =>
                                            productOrder?.product?.name
                                                .toLowerCase()
                                                .includes(searchValue.toLowerCase()) ||
                                            (order?.shippingAddress?.firstName
                                                .toLowerCase()
                                                .includes(searchValue.toLowerCase()) ||
                                            order?.shippingAddress?.surname
                                                .toLowerCase()
                                                .includes(searchValue.toLowerCase()) ||
                                            String(order?.shippingAddress?.phone).includes(
                                                searchValue.toLowerCase()
                                            ) ||
                                            String(order?.growthOrder[0]?.orderId).includes(
                                                searchValue.toLowerCase()
                                            ))
                                    )
                                    ?.sort((a, b) => Number(b.id) - Number(a.id))
                                    ?.map((productOrder, index) => (
                                        <TableItem
                                            key={productOrder?.id}
                                            order={productOrder}
                                            shippingAddress={order?.shippingAddress}
                                            indexNumber={`${order?.growthOrder[0]?.itemsGrowthOrder?.length === 1 ? '' + (i + 1) : '' + (i + 1) + '.' + (index + 1)}.`}
                                            orderAt={order?.orderAt}
                                            orderId={order?.growthOrder[0].orderId}
                                            isGrowth={isGrowth}
                                            mainId={order?.growthOrder[0].id}
                                            payment={order?.payment_reference?.status}
                                        />
                                    ))
                            );
                        })}

                {isZsu &&
                    ordersZsu
                        ?.filter(
                            ({ zsuOrder, payment_reference }) =>
                                zsuOrder?.length !== 0 && (orderPaymentStatusValue ? payment_reference?.status === 'success' : true)
                        )
                        ?.sort(
                            (a, b) => new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime()
                        )
                        ?.map((order, i) => {
                            const productArray = order?.zsuOrder[0]?.itemsZsuOrder;
                            return (
                                productArray &&
                                [...productArray]
                                    ?.filter(
                                        (productOrder) =>
                                            productOrder?.product?.name
                                                .toLowerCase()
                                                .includes(searchValue.toLowerCase()) ||
                                            (order?.shippingAddress?.firstName
                                                .toLowerCase()
                                                .includes(searchValue.toLowerCase()) ||
                                            order?.shippingAddress?.surname
                                                .toLowerCase()
                                                .includes(searchValue.toLowerCase()) ||
                                            String(order?.shippingAddress?.phone).includes(
                                                searchValue.toLowerCase()
                                            ) ||
                                            String(order?.zsuOrder[0]?.orderId).includes(
                                                searchValue.toLowerCase()
                                            ))
                                    )
                                    ?.sort((a, b) => Number(b.id) - Number(a.id))
                                    ?.map((productOrder, index) => (
                                        <TableItem
                                            key={productOrder?.id}
                                            order={productOrder}
                                            shippingAddress={order?.shippingAddress}
                                            indexNumber={`${order?.zsuOrder[0]?.itemsZsuOrder?.length === 1 ? '' + (i + 1) : '' + (i + 1) + '.' + (index + 1)}.`}
                                            orderAt={order?.orderAt}
                                            orderId={order?.zsuOrder[0]?.orderId}
                                            isZsu={isZsu}
                                            mainId={order?.zsuOrder[0].id}
                                            payment={order?.payment_reference?.status}
                                        />
                                    ))
                            );
                        })}

                {isSelfPost &&
                    ordersSelf
                        ?.filter(
                            ({ selfOrder, payment_reference }) =>
                                selfOrder?.length !== 0 && (orderPaymentStatusValue ? payment_reference?.status === 'success' : true)
                        )
                        ?.sort(
                            (a, b) => new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime()
                        )
                        ?.map((order, i) => {
                            const productArray = order?.selfOrder[0]?.itemsSelfOrder;
                            return (
                                productArray &&
                                [...productArray]
                                    ?.filter(
                                        (productOrder) =>
                                            productOrder?.product?.name
                                                .toLowerCase()
                                                .includes(searchValue.toLowerCase()) ||
                                            (order?.shippingAddress?.firstName
                                                .toLowerCase()
                                                .includes(searchValue.toLowerCase()) ||
                                            order?.shippingAddress?.surname
                                                .toLowerCase()
                                                .includes(searchValue.toLowerCase()) ||
                                            String(order?.shippingAddress?.phone).includes(
                                                searchValue.toLowerCase()
                                            ) ||
                                            String(order?.selfOrder[0]?.orderId).includes(
                                                searchValue.toLowerCase()
                                            ))
                                    )
                                    ?.sort((a, b) => Number(b.id) - Number(a.id))
                                    ?.map((productOrder, index) => (
                                        <TableItem
                                            key={productOrder?.id}
                                            order={productOrder}
                                            shippingAddress={order?.shippingAddress}
                                            indexNumber={`${order?.selfOrder[0]?.itemsSelfOrder?.length === 1 ? '' + (i + 1) : '' + (i + 1) + '.' + (index + 1)}.`}
                                            orderAt={order?.orderAt}
                                            orderId={order?.selfOrder[0]?.orderId}
                                            isSelfPost={isSelfPost}
                                            mainId={order?.selfOrder[0].id}
                                            payment={order?.payment_reference?.status}
                                        />
                                    ))
                            );
                        })}
            </tbody>
        </table>
    );
};
