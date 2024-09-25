'use client';
import React, { useEffect, useState } from 'react';
import { CartListItem } from './CartListItem/CartListItem';
import { IProduct, useGetAllProductsQuery } from '@/store/features/services/productService';
import { Loading } from '@/components/Loading';
import cls from './CartList.module.scss';
import { EmptyMarketPlug } from '@/components';
import { useRouter, useSearchParams } from 'next/navigation';


const ERROR_TEXT = 'Упс, щось пішло не так!';

export const CartList = () => {
    const { data: productsList, error, isLoading } = useGetAllProductsQuery('');
    const [currentProductList, setCurrentProductList] = useState<IProduct[]>([]);   
    const [path, setPath] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => { 
        setPath(searchParams.get('order') || '');        
  }, [router, searchParams]);

    useEffect(() => {
        if (path) {
            const element = document.getElementById(path);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                router.push('/order');
            }
        }
  }, [path, router]);

    useEffect(() => {
        if (productsList && productsList?.length !== 0) {
            setCurrentProductList(productsList.filter(({ isNowInSell, isReadyToOrderForGrowth }) => isNowInSell && !isReadyToOrderForGrowth));
        }
    }, [productsList]);

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    return (
        <section className={cls['cart-section']}>
            {isLoading ? (
                <Loading />
            ) : (
                currentProductList?.length !== 0 ?
                    (<ul className={cls['cart-list']}>
                        {currentProductList
                            .map((product) => (
                                <CartListItem
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                    </ul>) :
                    (<EmptyMarketPlug />)
            )}
        </section>
    );
};
