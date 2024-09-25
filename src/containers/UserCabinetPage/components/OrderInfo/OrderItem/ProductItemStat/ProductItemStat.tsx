import Image from 'next/image';
import cls from './ProductItemStat.module.scss';
import { IProduct } from '@/store/features/services/productService';
import { PACKAGING_CASES } from '@/db/packagingCases';
import ImageDefault from '@/images/image_default.webp';

interface IProductItemStatProps {
    product: IProduct;
    orderQuantity: number;
    orderAt: string;
}

export const ProductItemStat = ({ product, orderQuantity, orderAt }: IProductItemStatProps) => {
    const { packaging, price, name, productIcon } = product;
    
    return (
        <ul className={cls['content-list']}>
            <li className={cls['content-list_item']}>{orderAt}</li>
            <li className={cls['content-list_item']}>{`${orderQuantity} ${PACKAGING_CASES.get(packaging)}`}</li>
            <li className={cls['content-list_item']}>{`${price * orderQuantity} грн`}</li>
            <li className={cls['content-list_item']}>{name}</li>
            <li className={cls['content-list_item']}>
                <div className={cls.container__img}>
                    <Image
                        src={productIcon ? productIcon : ImageDefault}
                        alt={name}
                        width={40}
                        height={40}
                        loading={'lazy'}
                    />
                </div>
            </li>
        </ul>
    )
};
