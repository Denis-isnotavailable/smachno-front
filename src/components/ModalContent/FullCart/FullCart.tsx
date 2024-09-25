import { useEffect, useState } from 'react';
import { Button, ButtonTheme, Text, ButtonClose, Modal, ModalContent, AbsentProduct } from '@/components';
import { SeasonProductsList } from './SeasonProductsList/SeasonProductsList';
import { deleteCartProduct, selectCartProducts } from '@/store/features/cartSlice/cartSlice';
import { IProduct, useGetAllProductsQuery } from '@/store/features/services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { OrderPurpose } from '@/containers/CartPage/components/CartList/CartListItem/CartListItem';
import { ProductsList } from './ProductsList/ProductsList';
import { AppDispatch } from '@/store/store';
import { cartAbsentCheck } from '@/utils/cartAbsentCheck';
import cls from './FullCart.module.scss';
import Link from 'next/link';
import { selectToken } from '@/store/features/authSlice/authSlice';
import { useRouter } from 'next/navigation';

export interface CartProduct {
    product: IProduct;
    addDate: Date;
    amount: number;
    price: number;
    purpose: string;
}

export interface IAbsetnProduct {
    id: string;
    purpose: string;
    name: string;
}

const HEADING = 'Кошик';
const CART_RESTRICTION =
    'Продукт в кошику буде чекати на тебе добу, потім його зʼїдять';
const BUTTON_NAME_ORDER = 'Оформити замовлення';
const BUTTON_NAME_CONTINUE = 'Продовжити покупки';

export const FullCart = ({ onClose, isCartOpen }: { onClose: () => void, isCartOpen: boolean }) => {
    const { data: productsList, refetch } = useGetAllProductsQuery('');
    const dispatch = useDispatch<AppDispatch>();
    const productsInCart = useSelector(selectCartProducts);
    const token = useSelector(selectToken);
    const router = useRouter();

    const [showAbsentProductModal, setShowAbsentProductModal] = useState(false);
    const [absentProducts, setAbsentProducts] = useState<IAbsetnProduct[]>([]);

    const productsForMe = productsInCart?.cartProducts?.filter(
        ({ purpose }) => purpose === OrderPurpose.FOR_ME
    );
    const productsForArmy = productsInCart?.cartProducts?.filter(
        ({ purpose }) => purpose === OrderPurpose.FOR_ARMY
    );
    const productsForGrowth = productsInCart?.cartProducts?.filter(
        ({ purpose }) => purpose === OrderPurpose.TO_GROWTH
    );

    useEffect(() => {
        const getAbsentProducts = () => {
            refetch();

            if (productsList) {
                const absentProductsFromDb = cartAbsentCheck(productsInCart, productsList);
                setAbsentProducts(absentProductsFromDb);
            }
        };

        isCartOpen && getAbsentProducts();

    }, [isCartOpen, productsInCart, productsList, refetch]);

    useEffect(() => {
        if (absentProducts.length !== 0 && isCartOpen) {
            handleOpenModal();
        }
    }, [absentProducts, isCartOpen]);

    const handleOpenModal = () => {
        setShowAbsentProductModal(true);
    };

    const handleCloseModal = () => {
        setShowAbsentProductModal(false);
        absentProducts.map(({ id, purpose }) => dispatch(deleteCartProduct({ id, purpose })));
    };

    const handleOrderButtonClick = () => {
        onClose();
        !token && sessionStorage.setItem("isCartRedirectionPath", JSON.stringify({isCartRedirectionPath: true}));
    };

    const handleSesonProductButtonClick = (id: string) => {
        router.push(`/order?order=product-${id}`);
        onClose();
    };

    return (
        <div className={cls['cart-modal']}>
            <div className={cls['close-button-box']}>
                <ButtonClose onClose={onClose} />
            </div>

            <div className={cls['content-box']}>
                <Text
                    text={HEADING}
                    className={cls['cart-heading']}
                />

                {productsForMe?.length !== 0 && (
                    <ProductsList
                        heading={OrderPurpose.FOR_ME}
                        productsList={productsForMe}
                    />
                )}
                {productsForArmy?.length !== 0 && (
                    <ProductsList
                        heading={OrderPurpose.FOR_ARMY}
                        productsList={productsForArmy}
                    />
                )}
                {productsForGrowth?.length !== 0 && (
                    <ProductsList
                        heading={OrderPurpose.TO_GROWTH}
                        productsList={productsForGrowth}
                    />
                )}

                <Text
                    text={CART_RESTRICTION}
                    className={cls['cart-restriction']}
                />

                <div className={cls['cart-button-box']}>
                    <Text
                        text={`Всього ${productsInCart.totalPrice} грн`}
                        className={cls['cart-total-price']}
                    />

                    <ul className={cls.buttons_list}>
                        <li className={cls.buttons_list__item}>
                            <Link href={token ? '/step-yourself' : '/preAuth'}>
                                <Button
                                    type={'button'}
                                    theme={ButtonTheme.PRIMARY}
                                    className={cls['button-cart']}
                                    onClick={handleOrderButtonClick}
                                >
                                    {BUTTON_NAME_ORDER}
                                </Button>
                            </Link>
                        </li>
                        <li className={cls.buttons_list__item}>
                            <Button
                                type={'button'}
                                theme={ButtonTheme.PRIMARY}
                                className={`${cls['button-cart']} ${cls['button-cart_continue']}`}
                                onClick={onClose}
                            >
                                {BUTTON_NAME_CONTINUE}
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>

            <SeasonProductsList handleSesonProductButtonClick={handleSesonProductButtonClick} />

            <Modal>
                <ModalContent
                    onClose={handleCloseModal}
                    modal_content_style={cls['modal-content']}
                    modal_content_style__active={cls['modal-content__active']}
                    isShown={showAbsentProductModal}
                    isDarkBack
                >
                    <AbsentProduct onClose={handleCloseModal} absentProducts={absentProducts} />
                </ModalContent>
            </Modal>
        </div>
    );
};
