import { useGetAllProductsQuery } from '@/store/features/services/productService';
import { ProductCard, Text } from '@/components';
// import ImageDefault from '@/images/image_default.webp';
import cls from './SeasonProductsList.module.scss';
// import Image from 'next/image';
import { Loading } from '@/components/Loading';

const HEADING = 'Також зараз в сезоні';

interface IProps {
    handleSesonProductButtonClick: (id: string) => void;
}

export const SeasonProductsList = ({handleSesonProductButtonClick}: IProps) => {
    const { data: cartList, isLoading } = useGetAllProductsQuery('');

    return (
        <>
            <Text text={HEADING} className={cls['season-list-heading']} />

            {isLoading
                ? <Loading />
                : cartList &&
                    cartList?.length !== 0 && (
                        <ul
                            className={`${cls['season-list']} ${cartList?.length > 4 && cls['season-list_wrap']}`}
                        >
                            {cartList
                                .filter(
                                    ({ isNowInSell, isReadyToOrderForGrowth }) =>
                                        isNowInSell && !isReadyToOrderForGrowth
                                )
                                .map((product) => (
                                    <li
                                        className={cls['season-list_item']}
                                        key={product.id}
                                    >
                                        <ProductCard                                            
                                            product={product}
                                            onClick={() => handleSesonProductButtonClick(product.id)}
                                        />
                                        {/* <div className={cls['image-box']}>
                                            <Image
                                                className={cls['image']}
                                                src={productIcon ? productIcon : ImageDefault}
                                                alt={name}
                                                width='142'
                                                height='142'
                                                loading='lazy'
                                            />
                                        </div>

                                        <Text
                                            text={name}
                                            className={
                                                cls['season-list_item-heading']
                                            }
                                        /> */}
                                    </li>
                                ))}
                        </ul>
                    )}
        </>
    );
};
