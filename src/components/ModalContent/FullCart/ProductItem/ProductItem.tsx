import { Button, ButtonTheme, QuantityCounter, Text } from '@/components';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { DeleteIcon } from '@/utils/SVG';
import { IProduct } from '@/store/features/services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import {
    deleteCartProduct,
    selectCartProducts,
    updateCartProduct,
} from '@/store/features/cartSlice/cartSlice';
import { removeTrailingZeros } from '@/utils/convertWeight';
import { createPriceText } from '@/utils/convertPrice';
import ImageDefault from '@/images/image_default.webp';
import cls from './ProductItem.module.scss';

type ProductItemProps = {
    product: IProduct;
    amount: number;
    purpose: string;
    width?: number;
    height?: number;
};

export const ProductItem = ({ product, amount, purpose, width, height }: ProductItemProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [userOrderCount, setUserOrderCount] = useState(amount);
    const productsInCart = useSelector(selectCartProducts);

    const cartIndex = productsInCart?.cartProducts.findIndex(
        (item) =>
            item.product.id === product.id &&
            item.purpose === purpose
    );

    useEffect(() => {
        if (cartIndex !== -1) {
            setUserOrderCount(productsInCart?.cartProducts[cartIndex].amount);
        }
    }, [cartIndex, productsInCart?.cartProducts])

    const { name, productIcon, price, packaging, weightMin, weightMax, unit } =
        product;

    const weightMinAdaptive = removeTrailingZeros(weightMin);
    const weightMaxAdaptive = removeTrailingZeros(weightMax);
    const PRICE_TEXT = createPriceText(
        packaging,
        unit,
        price,
        weightMinAdaptive,
        weightMaxAdaptive
    );

    const updateMyOrder = (
        orderCount: number,
        purpose: string,
        product: IProduct
    ) => {
        if (orderCount !== 0) {
            dispatch(
                updateCartProduct({
                    product: product,
                    addDate: new Date(),
                    amount: orderCount,
                    price: orderCount * price,
                    purpose,
                })
            );
        }
    };

    const handleDeleteCartItem = () => {
        dispatch(deleteCartProduct({ id: product.id, purpose }));
    };

    const handleUpdateCartItem = (value: number) => {
        if (value >= 1) {
            updateMyOrder(value, purpose, product);
            setUserOrderCount(value);
        }
    };

    return (
        <div className={cls.container}>
            <ul className={cls.container_list}>
                <li>
                    <div className={cls.image_box}>
                        <Image
                            src={productIcon ? productIcon : ImageDefault}
                            alt={name}
                            width={width}
                            height={height}
                        />
                    </div>
                </li>

                <li className={cls.container_list__product_name}>
                    <Text text={`${name}`} />
                </li>

                <li className={cls.container_list__counter}>
                    <QuantityCounter
                        count={userOrderCount}
                        setCount={handleUpdateCartItem}
                        xl
                    />
                </li>

                <li className={cls.container_list__price}>
                    <Text text={PRICE_TEXT} />
                </li>

                <li className={cls.container_list__btn}>
                    <Button
                        type={'button'}
                        theme={ButtonTheme.CLEAR}
                        className={cls.btn}
                        onClick={handleDeleteCartItem}
                    >
                        <DeleteIcon addStyle={cls.icon} />
                    </Button>
                </li>
            </ul>
        </div>
    );
};
