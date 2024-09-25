import { Title, Text } from '@/components';
import Image from 'next/image';
import { IProduct } from '@/store/features/services/productService';
import { createPriceText } from '@/utils/convertPrice';
import { removeTrailingZeros } from '@/utils/convertWeight';
import cls from './CartListItem.module.scss';
import { ProductToChoose } from './ProductToChoose/ProductToChoose';
import { VEGETABLE_CASES } from '@/db/productsCases';
import { MEASUREMENT_CASES } from '@/db/packagingCases';
import ImageDefault from '@/images/image_default.webp';

type CartListItemProp = {
    product: IProduct;
};

export enum OrderPurpose {
    FOR_ME = 'Для себе',
    FOR_ARMY = 'Для ЗСУ',
    TO_GROWTH = 'На виріст',
}

export const CartListItem = ({ product }: CartListItemProp) => {
    const {
        id,
        name,
        productIcon,
        price,
        packaging,
        weightMin,
        weightMax,
        unit,
        shipping,
    } = product;

    const weightMinAdaptive = removeTrailingZeros(weightMin);
    const weightMaxAdaptive = removeTrailingZeros(weightMax);
    const TITLE = `Зараз сезон ${VEGETABLE_CASES.get(name)?.toLowerCase() || name}!`;
    const USER_ORDER = `Скільки ${MEASUREMENT_CASES.get(packaging)?.toLowerCase()} ${VEGETABLE_CASES.get(name)?.toLowerCase() || name} замовиш для себе?`;
    const ARMY_ORDER = `Скільки ${MEASUREMENT_CASES.get(packaging)?.toLowerCase()} ${VEGETABLE_CASES.get(name)?.toLowerCase() || name} замовиш для ЗСУ?`;
    const POST_WARNING = `${name} - продукт, який не відправляється Новою Поштою. Але ти його можеш отримати особисто в Києві.`;
    const PRICE_TEXT = createPriceText(
        packaging,
        unit,
        price,
        weightMinAdaptive,
        weightMaxAdaptive
    );

    return (
        <li className={cls['cart-list_item']} id={`product-${id}`}>
            <div className={cls['title-box']}>
                <Title text={TITLE} />
            </div>

            <div className={cls['product-box']}>
                <div className={cls['image-box']}>
                    <Image
                        className={cls['image']}
                        src={productIcon ? productIcon : ImageDefault}
                        alt={name}
                        width='325'
                        height='325'
                        loading='lazy'
                    />
                </div>

                <ul className={cls['counters-list']}>
                    <li className={cls['counters-list_item']}>
                        <ProductToChoose
                            product={product}
                            purpose={OrderPurpose.FOR_ME}
                            orderText={USER_ORDER}
                            priceText={PRICE_TEXT}
                        />
                        
                    </li>

                    <li className={cls['counters-list_item']}>
                        <ProductToChoose
                            product={product}
                            purpose={OrderPurpose.FOR_ARMY}
                            orderText={ARMY_ORDER}
                            priceText={PRICE_TEXT}
                        />                        
                    </li>
                </ul>                
            </div>
            

            {!shipping && (
                <Text text={POST_WARNING} className={cls['post-warning']} />
            )}
        </li>
    );
};
