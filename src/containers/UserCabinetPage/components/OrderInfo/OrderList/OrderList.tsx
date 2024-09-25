import cls from './OrderList.module.scss';
import { IProduct } from '@/store/features/services/productService';
import { OrderItem } from '../OrderItem/OrderItem';
import { Pagination } from '@/components';
import { useEffect, useState } from 'react';

interface IOrderBase {
    id: string;
    shippingAddress: IShippingAddress;
    user: IUser;
    orderAt: string;
    payment_reference?: PaymentReference;
}

interface IOrderSelf extends IOrderBase {
    selfOrder: ISelfOrderArray[];
}

interface IOrderZsu extends IOrderBase {
    zsuOrder: IZsuOrderArray[];
}

interface IOrderGrowth extends IOrderBase {
    growthOrder: IGrowthOrderArray[];
}

export interface IBaseOrderArray {
    id: string;
    itemsSelfOrder: IProductItem[];
    orderId: string;
    totalPrice: number;
}
export interface ISelfOrderArray extends IBaseOrderArray {
    itemsSelfOrder: IProductItem[];
}

export interface IZsuOrderArray extends IBaseOrderArray {
    itemsZsuOrder: IProductItem[];
}

export interface IGrowthOrderArray extends IBaseOrderArray {
    itemsGrowthOrder: IProductItem[];
}

export interface IProductItem {
    id: string;
    order_quantity: number;
    product: IProduct;
    plate?: string;
}

export interface IShippingAddress {
    id: string;
    userId: string;
    orderId: string;
    firstName: string;
    surname: string;
    city: string;
    phone: string;
    novaPostLocker?: string;
    novaPostOffice?: string;
    personalAddress?: string;
}

export interface IUser {
    id: string;
    firstName: string;
    surname: string;
}

interface OrderListProps {
    isSelf?: boolean;
    isZsu?: boolean;
    isGrowth?: boolean;
    ordersSelf?: IOrderSelf[];
    ordersZsu?: IOrderZsu[];
    ordersGrowth?: IOrderGrowth[];
    payment_reference?: PaymentReference;
}

export interface PaymentReference {
    invoiceId?: string;
    status?: 'created' | 'processing' | 'hold' | 'success' | 'failure' | 'reversed' | 'expired';
    reference: string;
    modifiedDate?: string;
    failureReason?: string;
    errCode?: string;
}

const ORDERS_NUMBER_ON_PAGE = 3;

export const OrderList = ({
    ordersSelf,
    ordersZsu,
    ordersGrowth,
    isSelf,
    isGrowth,
    isZsu,
}: OrderListProps) => {
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageRange, setPageRange] = useState(5);

    /*
    console.log('ordersSelf: ', ordersSelf);
    console.log('ordersZsu: ', ordersZsu);
    console.log('ordersGrowth: ', ordersGrowth);
    */
    const getNumberOfOrders = (
        ordersGrowth: IOrderGrowth[] | undefined,
        ordersSelf: IOrderSelf[] | undefined,
        ordersZsu: IOrderZsu[] | undefined
    ): number => {
        let result = 0;
        if (ordersSelf) {
            ordersSelf.map(({ selfOrder }) => selfOrder.length !== 0 && result++);
        }
        if (ordersGrowth) {
            ordersGrowth.map(({ growthOrder }) => growthOrder.length !== 0 && result++);
        }
        if (ordersZsu) {
            ordersZsu.map(({ zsuOrder }) => zsuOrder.length !== 0 && result++);
        }

        return Math.ceil(result / ORDERS_NUMBER_ON_PAGE);
    };

    useEffect(() => {
        setNumberOfPages(getNumberOfOrders(ordersGrowth, ordersSelf, ordersZsu));
    }, [ordersGrowth, ordersSelf, ordersZsu]);

    useEffect(() => {
        if (page > 3 && page < numberOfPages - 2) setPageRange(3);
        else if (page === 1 || page >= numberOfPages - 1) setPageRange(5);
        else setPageRange(4);
    }, [numberOfPages, page]);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <ul className={cls['order-list']}>
                {isSelf &&
                    ordersSelf &&
                    [...ordersSelf]
                        ?.filter(({ selfOrder }) => selfOrder?.length !== 0)
                        ?.sort(
                            (a, b) => new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime()
                        )
                        ?.slice(0 + (page - 1) * 3, page * 3)
                        ?.map((order) => (
                            <li key={order?.id} className={cls['order-list_item']}>
                                <OrderItem
                                    order={order?.selfOrder[0]?.itemsSelfOrder}
                                    address={order.shippingAddress}
                                    isSelf={isSelf}
                                    orderAt={order.orderAt}
                                    payment_reference={order.payment_reference}
                                />
                            </li>
                        ))}

                {isGrowth &&
                    ordersGrowth &&
                    [...ordersGrowth]
                        ?.filter(({ growthOrder }) => growthOrder?.length !== 0)
                        ?.sort(
                            (a, b) => new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime()
                        )
                        ?.slice(0 + (page - 1) * 3, page * 3)
                        ?.map((order) => (
                            <li key={order?.id} className={cls['order-list_item']}>
                                <OrderItem
                                    order={order?.growthOrder[0]?.itemsGrowthOrder}
                                    address={order.shippingAddress}
                                    isGrowth={isGrowth}
                                    orderAt={order.orderAt}
                                    payment_reference={order.payment_reference}
                                />
                            </li>
                        ))}

                {isZsu &&
                    ordersZsu &&
                    [...ordersZsu]
                        ?.filter(({ zsuOrder }) => zsuOrder?.length !== 0)
                        ?.sort(
                            (a, b) => new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime()
                        )
                        ?.slice(0 + (page - 1) * 3, page * 3)
                        ?.map((order) => (
                            <li key={order?.id} className={cls['order-list_item']}>
                                <OrderItem
                                    order={order?.zsuOrder[0]?.itemsZsuOrder}
                                    address={order.shippingAddress}
                                    isZsu={isZsu}
                                    orderAt={order.orderAt}
                                    payment_reference={order.payment_reference}
                                />
                            </li>
                        ))}
            </ul>

            <div className={cls['pagination-box']}>
                <Pagination
                    pageCount={numberOfPages}
                    pageRangeDisplayed={pageRange}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};
