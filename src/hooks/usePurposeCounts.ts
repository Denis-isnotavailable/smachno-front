import { useSelector } from 'react-redux';
import { selectCartProducts } from '@/store/features/cartSlice/cartSlice';

const usePurposeCounts = () => {
    const variantOrder = useSelector(selectCartProducts).cartProducts;

    const countProductsByPurpose = (purpose: string): number => {
        const filteredProducts = variantOrder.filter(product => product.purpose === purpose);
        return filteredProducts.length === 0 ? 0 : 1;
    };

    const countForYourSelf = Boolean(countProductsByPurpose('Для себе'));
    const countForArmy = Boolean(countProductsByPurpose('Для ЗСУ'));
    const countForGrowth = Boolean(countProductsByPurpose('На виріст'));

    const numberGrowth = (): number => {
        if(countForYourSelf && countForArmy ) {
            return 3
        }
        if (countForArmy || countForYourSelf) {
            return 2
        }
        return 1
    }

    return { countForYourSelf, countForArmy, countForGrowth, numberGrowth };
};

export default usePurposeCounts;

export interface IPurposeCounts {
    countForYourSelf?: boolean;
    countForArmy?: boolean;
    countForGrowth?: boolean;
    numberGrowth: () => number;
}