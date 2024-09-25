import { Button, ButtonTheme, Text } from '@/components';
import { CounterBlock } from '../../CounterBlock/CounterBlock';
import cls from './ProductToChoose.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartProducts, setCartProduct } from '@/store/features/cartSlice/cartSlice';
import { useEffect, useState } from 'react';
import { IProduct } from '@/store/features/services/productService';
import { AppDispatch } from '@/store/store';
import { setIsCartOpen } from '@/store/features/cartSlice/openCartSlice';
import { removeScroll } from '@/utils/scrollCounts';

const BUTTON_NAME = 'Замовити';
const BUTTON_NAME_ORDERED = 'Вже в кошику';
const CURRENCY = 'грн';

type ProductToChooseProp = {
    product: IProduct;
    purpose: string;
    orderText: string;
    priceText: string;
};

export const ProductToChoose = ({ product, purpose, orderText, priceText }: ProductToChooseProp) => {
    const dispatch = useDispatch<AppDispatch>();
    const productsInCart = useSelector(selectCartProducts);
    const cartIndex = productsInCart?.cartProducts.findIndex(
        (item) =>
            item.product.id === product.id &&
            item.purpose === purpose
    );

    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        if (cartIndex !== -1) {
            setOrderCount(productsInCart?.cartProducts[cartIndex].amount);
        }
    }, [cartIndex, productsInCart]);

    useEffect(() => {
        if (cartIndex === -1)
            setOrderCount(0);
    }, [cartIndex]);

    const addToMyOrder = (
        orderCount: number,
        purpose: string,
        product: IProduct
    ) => {
        if (orderCount !== 0) {
            dispatch(
                setCartProduct({
                    product: product,
                    addDate: new Date(),
                    amount: orderCount,
                    price: orderCount * product.price,
                    purpose,
                })
            );
        }
    };

    const handleOrderButtonClick = () => {        
        if (cartIndex === -1) {
            addToMyOrder(orderCount, purpose, product);
            if (orderCount > 0) {
                dispatch(setIsCartOpen(true));
                removeScroll();
            }
        }
    };


    return (
        <div className={cls['product-order-container']}>
            <CounterBlock
                count={orderCount}
                setCount={setOrderCount}
                title={orderText}
                priceText={priceText}
                isDisabled={cartIndex !== -1}
            />

            <div>
                <Text
                    text={`${product.price * orderCount} ${CURRENCY}`}
                    className={cls['main-price']}
                />

                <Button
                    type='button'
                    theme={ButtonTheme.PRIMARY}
                    className={cls['order-button']}
                    onClick={handleOrderButtonClick}
                    disabled={cartIndex !== -1}
                >
                    {cartIndex === -1 ? BUTTON_NAME : BUTTON_NAME_ORDERED}
                </Button>
            </div>
        </div>
    )
};

