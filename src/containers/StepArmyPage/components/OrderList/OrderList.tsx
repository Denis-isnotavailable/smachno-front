"use client"

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductItem } from '@/components/ModalContent/FullCart/ProductItem/ProductItem';
import { selectCartProducts } from '@/store/features/cartSlice/cartSlice';
import { CartProduct } from '@/components/ModalContent/FullCart/FullCart';
import { useRouter } from 'next/navigation';
import { IPurposeCounts } from '@/hooks/usePurposeCounts';

import cls from './OrderList.module.scss';

export const OrderList = ({countForArmy, countForGrowth}: Partial<IPurposeCounts> ) => {
    const route = useRouter();
    const [currentProducts, setCurrentProducts] = useState<CartProduct[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const variantOrder = useSelector(selectCartProducts).cartProducts;

    useEffect(() => {
        if(variantOrder.length === 0) {
            route.push('/')
        }
        if(variantOrder.length > 0) {
            setCurrentProducts(variantOrder.filter(product => product.purpose === 'Для ЗСУ'))
        }
    }, [route, variantOrder]);

    useEffect(() => {

        if(!countForArmy && countForGrowth) {
            route.push('/step-growth')
        }
        if(!countForArmy && !countForGrowth) {
            route.push('/step-order')
        }

        if(currentProducts.length > 0) {
        const total = currentProducts.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
        }

    }, [countForArmy, countForGrowth, currentProducts, route]);

    return (
        <div className={cls.container}>
            <ul className={cls['cart-list']}>
                {currentProducts.length > 0 && currentProducts.map(
                    ({ product, purpose, amount }: CartProduct) => (
                        <li
                            key={product.id + purpose}
                            className={cls['cart-list_item']}
                        >
                            <ProductItem
                                product={product}
                                amount={amount}
                                purpose={purpose}
                                width={60}
                                height={88}
                            />
                        </li>
                    )
                )}
            </ul>
            <p className={cls.total__price}>
                {`Всього: ${totalPrice} грн`}
            </p>
        </div>
    )
}