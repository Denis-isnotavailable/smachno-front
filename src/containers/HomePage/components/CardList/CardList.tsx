'use client';

import cls from './ProductList.module.scss';
import { AppDispatch } from '@/store/store';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { Button, ButtonTheme } from '@/components/Button/Button';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '@/store/features/currentProduct/currentProductSlice';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ImgProductCat from '/public/assets/images/catProduct.webp';
import { EmptyMarketPlug, Modal, ModalContent, Text } from '@/components';
import { abortScrollRemovingHeader, removeScroll } from '@/utils/scrollCounts';
import { ProductCardModal } from '@/components/ProductCardModal/ProductCardModal';
import Link from 'next/link';
import { IProduct, useGetAllProductsQuery } from '@/store/features/services/productService';
import { Loading } from '@/components/Loading';

export const CardList = () => {
    const [showModal, setShowModal] = useState(false);
    const { data: productsList, isLoading } = useGetAllProductsQuery('');
    const [currentProductList, setCurrentProductList] = useState<IProduct[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (productsList && productsList?.length !== 0) {
            setCurrentProductList(productsList.filter(({ isNowInSell, isReadyToOrderForGrowth }) => isNowInSell && !isReadyToOrderForGrowth));
        }
    }, [productsList]);

    const handleOpenModal = (product: IProduct) => {
        dispatch(setCurrentProduct(product));
        setShowModal(true);

        removeScroll();
    };
    const handleCloseModal = () => {
        dispatch(setCurrentProduct(null));
        setShowModal(false);
        abortScrollRemovingHeader();
    };
    return (
        <section className={cls.container} id='market'>
            <div>
                <h2 className={'title'}>Магазин продуктів</h2>

                <p className={`text ${cls.container__text}`}>
                    Продукцію на цей рік можеш обрати та{' '}
                    <Link className={`text ${cls['container__text-span']}`} href='/growth'>
                        замовити на виріст
                    </Link>
                </p>
            </div>
            <div className={cls.product}>
                <div className={cls['product-list']}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        // productsList &&
                        currentProductList?.length !== 0 ?
                        currentProductList
                            // .filter(({ isNowInSell }) => isNowInSell)
                            .map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={() => handleOpenModal(product)}
                                />
                            )) :
                        <EmptyMarketPlug />
                    )}
                </div>
                <Link href={'/order'}>
                    <Button type={'button'} theme={ButtonTheme.PRIMARY} className={cls.link__btn}>
                        <Text btnText={'Замовити'} />
                    </Button>
                </Link>
            </div>
            <div className={cls['container__image']}>
                <Image src={ImgProductCat} alt={'Рудий кіт'} loading='lazy' />
            </div>
            <Modal>
                <ModalContent
                    onClose={handleCloseModal}
                    modal_content_style={cls['modal-content']}
                    modal_content_style__active={cls['modal-content__active']}
                    isShown={showModal}
                    isDarkBack
                    isScrollY
                >
                    <ProductCardModal onClose={handleCloseModal} />
                </ModalContent>
            </Modal>
        </section>
    );
};
