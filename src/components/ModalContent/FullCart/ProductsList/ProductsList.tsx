import { Text } from '@/components';
import { TextAlign } from '@/components/Text/Text';
import { CartProduct } from '../FullCart';
import { ProductItem } from '../ProductItem/ProductItem';

import cls from './ProductsList.module.scss';

interface ProductsListProps {
    heading: string;
    productsList: CartProduct[];
}

export const ProductsList = ({ heading, productsList }: ProductsListProps) => {
    return (
        <>
            <Text
                text={heading}
                align={TextAlign.LEFT}
                className={cls['list-heading']}
            />

            <ul className={cls['cart-list']}>
                {productsList?.length !== 0 &&
                    productsList?.map(
                        ({ product, purpose, amount }: CartProduct) => (
                            <li
                                key={product.id + purpose}
                                className={cls['cart-list_item']}
                            >
                                <ProductItem
                                    product={product}
                                    amount={amount}
                                    purpose={purpose}
                                    width={130}
                                    height={130}
                                />
                            </li>
                        )
                    )}
            </ul>
        </>
    );
};
