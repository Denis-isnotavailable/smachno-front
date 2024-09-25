'use client';
import {useState, useEffect} from 'react';
import {abortScrollRemovingHeader, removeScroll} from '@/utils/scrollCounts';
import {
    ModalContent,
    Modal,
    Button,
    ButtonTheme,
    EmptyCart,
    EvaluateSite,
} from '@/components';
import {Navigation} from '@/layout';
import {BucketIcon} from '@/utils/SVG/BucketIcon';
import {MenuIcon} from '@/utils/SVG/MenuIcon';
import {UserIcon} from '@/utils/SVG/UserIcon';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@/store/store';
import {
    deleteCartProduct,
    findProductsToDelete,
    selectCartProducts,
} from '@/store/features/cartSlice/cartSlice';
import {FullCart} from '@/components/ModalContent/FullCart/FullCart';

import cls from './MenuList.module.scss';
import {selectToken} from "@/store/features/authSlice/authSlice";
import {useProfileQuery} from "@/store/features/services/authService";
import Image from "next/image";
import ImgCatAuth from "@/images/cat_auth.webp";
import { usePathname } from "next/navigation";
import { classNames } from '@/utils/classNames';
import { selectIsCartOpen, setIsCartOpen } from '@/store/features/cartSlice/openCartSlice';

export const MenuList = () => {
    const pathname = usePathname();
    const userIconStyles = classNames(cls['header-icon'], {
        [cls['header-icon_active']]: pathname === '/preAuth' || pathname === '/login' || pathname === '/registration',
    });

    const dispatch = useDispatch<AppDispatch>();
    const productsInCart = useSelector(selectCartProducts);
    const isCartOpen = useSelector(selectIsCartOpen);

    const [showModal, setShowModal] = useState(false);
    const [showModalEvaluate, setShowModalEvaluate] = useState(false);

    const [isHiddenWelcome, setIsHiddenWelcome] = useState(false);
    const [acountPath, setAcountPath] = useState('/preAuth');
    const token = useSelector(selectToken)
    const {data} = useProfileQuery(token, {skip: !token})

    useEffect(() => {
        if (token && data) {
            setIsHiddenWelcome(true);
            data.roles[0] === 'user' ? setAcountPath('/userCabinet') : setAcountPath('/admin-cabinet');
        } else {
            setIsHiddenWelcome(false);
            setAcountPath('/preAuth');
        }
    }, [token, data]);

    useEffect(() => {
        // Check products in cart:
        // if add date more than a 24h delete it from cart
        const productsToDelete = findProductsToDelete(productsInCart);
        if (productsToDelete.length !== 0) {
            productsToDelete.forEach(({product, purpose}) => {
                dispatch(deleteCartProduct({id: product.id, purpose}));
            });
        }
    }, [dispatch, productsInCart]);

    useEffect(() => {
        const time = 2000 * 60;
        const timerId = setTimeout(() => {
            handleOpenModalEvaluate();
        }, time);

        return () => clearTimeout(timerId);
    }, [])

    const handleOpenModal = () => {
        setShowModal(true);

        removeScroll();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // setShowModalCart(false);
        dispatch(setIsCartOpen(false));

        abortScrollRemovingHeader();
    };

    const handleOpenModalEmptyCart = () => {
        // setShowModalCart(true);
        dispatch(setIsCartOpen(true));

        removeScroll();
    };

    const handleOpenModalEvaluate = () => {
        setShowModalEvaluate(true);

        removeScroll();
    };

    const handleCloseModalEvaluate = () => {        
        setShowModalEvaluate(false);

        abortScrollRemovingHeader();
    };

    return (
        <>
            <ul className={cls['menu-icons-list']}>
                <li className={cls['menu-icons-list_item']}>
                    <Link href={acountPath}>
                        <Button
                            type={'button'}
                            theme={ButtonTheme.CLEAR}
                            aria-label='Personal account'
                        >
                            {isHiddenWelcome
                                ? (
                                    <div className={cls.container__img}>
                                        <Image
                                            src={ImgCatAuth}
                                            alt={'Аватар котика'}
                                            width={32}
                                            height={32}
                                            loading={'lazy'}
                                        />
                                    </div>
                                )
                                : <UserIcon addStyle={userIconStyles}/>
                            }
                        </Button>
                    </Link>
                </li>

                <li className={cls['menu-icons-list_item']}>
                    <Button
                        type={'button'}
                        theme={ButtonTheme.CLEAR}
                        onClick={handleOpenModalEmptyCart}
                        aria-label='Cart'
                    >
                        <BucketIcon addStyle={cls['header-icon']}/>
                    </Button>
                    {productsInCart?.totalAmount !== 0 && (
                        <div className={cls['cart-amount']}>
                            {productsInCart?.totalAmount}
                        </div>
                    )}
                </li>

                <li className={cls['menu-icons-list_item']}>
                    <Button
                        type={'button'}
                        theme={ButtonTheme.CLEAR}
                        onClick={handleOpenModal}
                        aria-label='Menu'
                    >
                        <MenuIcon addStyle={cls['menu-icon']}/>
                    </Button>
                </li>
            </ul>

            <Modal>
                <ModalContent
                    onClose={handleCloseModal}
                    modal_content_style={cls['modal-content']}
                    modal_content_style__active={cls['modal-content__active']}
                    isShown={showModal}
                >
                    <Navigation onClose={handleCloseModal}/>
                </ModalContent>
            </Modal>

            <Modal>
                <ModalContent
                    onClose={handleCloseModal}
                    modal_content_style={cls['modal-content-cart']}
                    modal_content_style__active={
                        cls['modal-content-cart__active']
                    }
                    isShown={isCartOpen}
                    isDarkBack
                    isScrollY
                >
                    {productsInCart.cartProducts.length === 0 ? (
                        <EmptyCart onClose={handleCloseModal}/>
                    ) : (
                        <FullCart onClose={handleCloseModal} isCartOpen={isCartOpen}/>
                    )}
                </ModalContent>
            </Modal>

            <Modal>
                <ModalContent
                    onClose={handleCloseModalEvaluate}
                    modal_content_style={cls['modal-content-cart']}
                    modal_content_style__active={cls['modal-content-cart__active']}
                    isDarkBack
                    isShown={showModalEvaluate}
                >
                    <EvaluateSite onClose={handleCloseModalEvaluate}/>
                </ModalContent>
            </Modal>
        </>
    );
};
