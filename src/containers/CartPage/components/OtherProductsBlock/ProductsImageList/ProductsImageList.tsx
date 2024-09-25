'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IProduct, useGetAllProductsQuery } from '@/store/features/services/productService';
import { Loading } from '@/components/Loading';
import cls from './ProductsImageList.module.scss';
import ImageDefault from '@/images/image_default.webp';

const ERROR_TEXT = 'Упс, щось пішло не так!';

export const ProductsImageList = ({setIsProductsForGrowth}: {setIsProductsForGrowth: (value: boolean) => void}) => {
    const { data: productsList, error, isLoading } = useGetAllProductsQuery('');
    const [currentProductList, setCurrentProductList] = useState<IProduct[]>([]);

    useEffect(() => {
        if (productsList && productsList?.length !== 0) {
            setCurrentProductList(productsList.filter(({ isNowInSell, isReadyToOrderForGrowth }) => isNowInSell && isReadyToOrderForGrowth));
        }
    }, [productsList]);

    useEffect(() => {        
        setIsProductsForGrowth(currentProductList?.length !== 0 ? true : false);
    }, [currentProductList?.length, setIsProductsForGrowth]);

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    return (
        <ul className={cls['products-list']}>
            {
                isLoading ?
                    <Loading /> :
                    currentProductList
                        // .filter(({isNowInSell, isReadyToOrderForGrowth}) => isNowInSell && isReadyToOrderForGrowth)
                        .map(({ id, name, productIcon }) => (
                            <li key={id} className={cls['products-list_item']}>
                                <div className={cls['image-box']}>
                                    <Image
                                        className={cls['image']}
                                        src={productIcon ? productIcon : ImageDefault}
                                        alt={name}
                                        width='140'
                                        height='210'
                                        loading='lazy'
                                    />
                                </div>
                            </li>
                    ))
            }
        </ul>
    );
};
