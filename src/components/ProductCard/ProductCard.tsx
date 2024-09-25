import React from 'react';
import Image from 'next/image';
import cls from './ProductCard.module.scss';
import { IProduct } from '@/store/features/services/productService';
import ImageDefault from '@/images/image_default.webp';

interface ProductCardProps {
    product: IProduct;
    onClick?: () => void;
}
export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    const {
        id,
        name,
        productIcon,
        // isReadyToOrderForGrowth
    } = product;
    const cardClasses = [
        cls['product-card'],
        // isReadyToOrderForGrowth && cls['product-card--not-available'],
    ].join(' ');
    return (
        <div key={id} className={cardClasses} onClick={onClick}>
            <div className={cls.image_box}>
                <Image
                    className={cls.image}
                    src={productIcon ? productIcon : ImageDefault}
                    alt={name}
                    width={142}
                    height={142}
                />
            </div>
            
            <p className={cls['product-card__title']}>{name}</p>
        </div>
    );
};
