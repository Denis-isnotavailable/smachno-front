import cls from './productModal.module.scss';
import { Button, ButtonClose, ButtonTheme } from '@/components';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { selectCurrentProduct } from '@/store/features/currentProduct/currentProductSlice';
import { Text, TextAlign } from '@/components/Text/Text';
import { createPriceText } from '@/utils/convertPrice';
import { removeTrailingZeros } from '@/utils/convertWeight';
import { AppDispatch } from '@/store/store';
import { selectCartProducts, setCartProduct } from '@/store/features/cartSlice/cartSlice';
import { OrderPurpose } from '@/containers/CartPage/components/CartList/CartListItem/CartListItem';
import { useRouter } from 'next/navigation';
import ImageDefault from '@/images/image_default.webp';

export const ProductCardModal = ({ onClose }: { onClose: () => void }) => {
    const router = useRouter();
    const currentProduct = useSelector(selectCurrentProduct);
    const dispatch = useDispatch<AppDispatch>();
    const productsInCart = useSelector(selectCartProducts);
    const cartIndex = productsInCart?.cartProducts.findIndex(
        (item) => item.product.id === currentProduct?.id && item.purpose === OrderPurpose.TO_GROWTH
    );

    const weightMin = removeTrailingZeros(currentProduct?.weightMin);
    const weightMax = removeTrailingZeros(currentProduct?.weightMax);
    const WEIGHT = weightMin === weightMax ? weightMin : `${weightMin}-${weightMax}`;
    const IS_DIMENTIONS_PRESENT =
        currentProduct?.dimensionsLength !== 0 &&
        currentProduct?.dimensionsWidth !== 0 &&
        currentProduct?.dimensionsHeight !== 0;
    const DIMENTIONS = `${currentProduct?.dimensionsLength} х ${currentProduct?.dimensionsWidth} х ${currentProduct?.dimensionsHeight} см`;
    const SEASON_START =
        currentProduct?.seasonStart &&
        new Date(currentProduct?.seasonStart).toLocaleDateString('uk-UK', {
            month: 'long',
            day: 'numeric',
        });
    const SEASON_END =
        currentProduct?.seasonEnd &&
        new Date(currentProduct?.seasonEnd).toLocaleDateString('uk-UK', {
            month: 'long',
            day: 'numeric',
        });
    const PRICE_TEXT =
        currentProduct &&
        createPriceText(
            currentProduct?.packaging,
            currentProduct?.unit,
            currentProduct?.price,
            weightMin,
            weightMax
        ).split(' / ');

    const handleOrderButtonClick = () => {
        onClose();
        router.push(`/order?order=product-${currentProduct?.id}`);
    };

    const handleGrowthOrderButtonClick = () => {
        if (cartIndex === -1 && currentProduct) {
            dispatch(
                setCartProduct({
                    product: currentProduct,
                    addDate: new Date(),
                    amount: 1,
                    price: currentProduct.price,
                    purpose: OrderPurpose.TO_GROWTH,
                })
            );
        }
    };

    return (
        <div className={cls.productModal}>
            <p className={cls['productModal__title']}>{currentProduct?.name}</p>
            <div className={cls['close-button-box']}>
                <ButtonClose onClose={onClose} />
            </div>

            <div className={cls['productModal__image']}>
                <Image
                    src={currentProduct?.productImage ? currentProduct?.productImage : ImageDefault}
                    alt=''
                    width={358}
                    height={186}
                />
            </div>
            <Text
                className={cls['productModal__desc']}
                text={currentProduct?.description}
                align={TextAlign.CENTER}
            />
            <div className={cls['productModal__details']}>
                <ul>
                    <li>
                        <span>Фасування: </span>
                        {currentProduct?.packaging}
                    </li>
                    <li>
                        <span>Вага: </span>
                        {`${WEIGHT} ${currentProduct?.unit}`}
                    </li>
                    {IS_DIMENTIONS_PRESENT && (
                        <li>
                            <span>Габарити: </span>
                            {DIMENTIONS}
                        </li>
                    )}
                </ul>

                <ul>
                    <li>
                        <span>Сезон</span>
                    </li>
                    <li>
                        <span>Відкриття: </span>
                        {SEASON_START}
                    </li>
                    <li>
                        <span>Закриття: </span>
                        {SEASON_END}
                    </li>
                </ul>
            </div>
            <div className={cls['productModal__price']}>
                {PRICE_TEXT && PRICE_TEXT[0]}
                <span
                    className={cls['productModal__price_quantity']}
                >{` / ${PRICE_TEXT && PRICE_TEXT[1]}`}</span>
            </div>

            {!currentProduct?.shipping && (
                <div className={cls['post-warning-box']}>
                    <Text
                        text={`${currentProduct?.name} - продукт, який не відправляється Новою Поштою. Але ти його можеш отримати особисто в Києві.`}
                        className={cls['post-warning']}
                    />
                </div>
            )}

            <div className={cls['productModal__btnGroup']}>
                <div className={cls['productModal__btnGroup-button']}>
                    <Button
                        type={'button'}
                        theme={ButtonTheme.PRIMARY}
                        className={cls.link__btn}
                        disabled={currentProduct?.isReadyToOrderForGrowth}
                        onClick={handleOrderButtonClick}
                    >
                        <Text btnText={'Замовити'} />
                    </Button>
                </div>
                <div className={cls['productModal__btnGroup-button']}>
                    <Button
                        type={'button'}
                        theme={ButtonTheme.SECONDARY}
                        className={cls.link__btn}
                        disabled={!currentProduct?.isReadyToOrderForGrowth || cartIndex !== -1}
                        onClick={handleGrowthOrderButtonClick}
                    >
                        <Text btnText={cartIndex === -1 ? 'Замовити на виріст' : 'Вже в кошику'} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
