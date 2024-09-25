'use client';

import { EmptyMarketPlug, Modal, ModalContent, ProductCard } from '@/components';
import cls from './ProductChooseList.module.scss';
import { ProductCardModal } from '@/components/ProductCardModal/ProductCardModal';
import { useEffect, useState } from 'react';
import { setCurrentProduct } from '@/store/features/currentProduct/currentProductSlice';
import { abortScrollRemovingHeader, removeScroll } from '@/utils/scrollCounts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { IProduct, useGetAllProductsQuery } from '@/store/features/services/productService';

export const ProductChooseList = () => {
    const { data: productsList } = useGetAllProductsQuery('');
    const [showModal, setShowModal] = useState(false);
    const [currentProductList, setCurrentProductList] = useState<IProduct[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (productsList && productsList?.length !== 0) {
            setCurrentProductList(productsList.filter(({ isNowInSell, isReadyToOrderForGrowth }) => isNowInSell && isReadyToOrderForGrowth));
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
        <>
            <div className={cls['product-list']}>
                {currentProductList?.length !== 0 ?
                    currentProductList
                        // .filter(({isNowInSell}) => isNowInSell)
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => handleOpenModal(product)}
                    />
                )) : < EmptyMarketPlug heading='Замовляти на виріст ще зарано' />}
            </div>
            <Modal>
                <ModalContent
                    onClose={handleCloseModal}
                    modal_content_style={cls['modal-content']}
                    modal_content_style__active={
                        cls['modal-content__active']
                    }
                    isShown={showModal}
                    isDarkBack
                >
                    <ProductCardModal onClose={handleCloseModal} />
                </ModalContent>
            </Modal>
        </>
    );
};
