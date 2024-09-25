import { ContainerMaxW1280 } from '@/components/ContainerMaxW1280';
import { ArrowBack } from '@/components';
import { CartList } from './components/CartList/CartList';
import { OtherProductsBlock } from './components/OtherProductsBlock/OtherProductsBlock';

export const CartPage = () => {
    return (
        <>
            <ContainerMaxW1280>
                <ArrowBack path={'/'} />
                <CartList />
                <OtherProductsBlock />
            </ContainerMaxW1280>
        </>
    );
};
