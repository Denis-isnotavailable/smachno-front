'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductItem } from '@/components/ModalContent/FullCart/ProductItem/ProductItem';
import { selectCartProducts } from '@/store/features/cartSlice/cartSlice';
import { CartProduct } from '@/components/ModalContent/FullCart/FullCart';
import { useRouter } from 'next/navigation';
import { SendSection } from '@/containers/StepGrowthPage/components/SendSection/SendSection';
import { Signature } from '@/containers/StepGrowthPage/components/Signature/Signature';
import { Warning } from '@/containers/StepGrowthPage/components/Warning/Warning';
import Image from 'next/image';
import ImgStep from '@/images/stepsOrder/Step_3.webp';

import cls from './OrderList.module.scss';

export const OrderList = () => {
    const route = useRouter();
    const [currentProducts, setCurrentProducts] = useState<CartProduct[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const variantOrder = useSelector(selectCartProducts).cartProducts;

    useEffect(() => {
        if (variantOrder.length === 0) {
            route.push('/');
        }
        if (variantOrder.length > 0) {
            setCurrentProducts(variantOrder.filter((product) => product.purpose === 'На виріст'));
        }
    }, [route, variantOrder]);

    useEffect(() => {
        if (currentProducts.length > 0) {
            const total = currentProducts.reduce((acc, item) => acc + item.price, 0);
            setTotalPrice(total);
            if (!total) {
                route.push('/step-order');
            }
        }
    }, [currentProducts, route]);

    return (
        <div className={cls.container}>
            <ul className={cls['cart-list']}>
                {currentProducts.length > 0 &&
                    currentProducts.map(({ product, purpose, amount }: CartProduct) => (
                        <li key={product.id + purpose} className={cls.container__item}>
                            <div className={cls['cart-list_item']}>
                                <ProductItem
                                    product={product}
                                    amount={amount}
                                    purpose={purpose}
                                    width={60}
                                    height={88}
                                />
                                <SendSection product={product} />
                            </div>
                            <div>
                                <Signature id={product.id} />
                                {!product.shipping && <Warning name={product.name} />}
                            </div>
                        </li>
                    ))}
            </ul>
            <div className={cls.container__price}>
                <p className={cls.total}>{`Всього: ${totalPrice} грн`}</p>
                <Image
                    className={cls.img}
                    src={ImgStep}
                    alt={'Рудий кіт пише "Путін Ху..."'}
                    width={380}
                    height={310}
                    priority={true}
                />
            </div>
        </div>
    );
};
