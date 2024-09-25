import { IProduct, useDeleteProductMutation, useUpdateProductMutation } from '@/store/features/services/productService';
import cls from './ProductsTableItem.module.scss';
import { Switch } from '../../../Switch/Switch';
import { PencilIcon } from '@/utils/SVG/PencilIcon';
import { DeleteIcon } from '@/utils/SVG';
import { Button, ButtonTheme } from '@/components';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';

interface IProductsTableItemProp {
    product: IProduct;
    index: number;
    setIsFormProduct: (value: boolean) => void;
    setProductToUpdate: (value: IProduct | null) => void;
}

const ERROR_TEXT = 'Упс, щось пішло не так!';
const customId = "toastIdProductUpdate";

export const ProductsTableItem = ({ product, index, setIsFormProduct, setProductToUpdate }: IProductsTableItemProp) => {
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const { id, name, seasonStart, seasonEnd, isNowInSell, isReadyToOrderForGrowth } = product;
    const SEASON_START = new Date(seasonStart).toLocaleDateString('uk-UK', {
        month: 'long',
        day: 'numeric',
    });
    const SEASON_END = new Date(seasonEnd).toLocaleDateString('uk-UK', {
        month: 'long',
        day: 'numeric',
    });    

    // console.log(product);

    const operateSelling = async (value: boolean, isSellNow: boolean) => {       
        const product = isSellNow ? { isNowInSell: value } : { isReadyToOrderForGrowth: value };

        try {            
            const response: {
                data: IProduct; } | { error?: FetchBaseQueryError | SerializedError | undefined;
            } = await updateProduct({ id, product });

            if (response && 'error' in response) {
                toast.error(ERROR_TEXT, {
                    toastId: customId
                })
                return false;
            } else {
                toast.success('Зміни зберіг!', {
                    icon: <ToastImg/>,
                    toastId: customId
                })
                return true;
            }

        } catch (e) {
            if (e) {
                return <h3>{ERROR_TEXT}</h3>
            }
        } 
    }

    const hadleSetNowInSell = async (value: boolean) => {        
        const result = await operateSelling(value, true);
        if (result) return true;
    }

    const hadleSetReadyToOrderForGrowth = async (value: boolean) => {        
        const result = await operateSelling(value, false);
        if (result) return true;
    }

    const hadleEditProduct = () => {
        setIsFormProduct(true);
        setProductToUpdate(product);
    }

    const hadleDeleteProduct = async () => {        
        try {            
            const response: {
                data: IProduct; } | { error?: FetchBaseQueryError | SerializedError | undefined;
            } = await deleteProduct(id);

            if (response && 'error' in response) {
                toast.error(ERROR_TEXT, {
                    toastId: customId
                })
            } else {
                toast.success('Зміни зберіг!', {
                    icon: <ToastImg/>,
                    toastId: customId
                })
            }

        } catch (e) {
            if (e) {
                return <h3>{ERROR_TEXT}</h3>
            }
        }
    }
    
    
    return (
        <tr className={cls['table_body-tr']}>
            <td className={cls['table_body-td']}>{`${index}.`}</td>
            <td className={cls['table_body-td']}>
                <Switch
                    id={id + 'isNowInSell'}
                    agreed={isNowInSell}
                    setApprovement={hadleSetNowInSell} />
            </td>
            <td className={cls['table_body-td']}>
                <Switch
                    id={id + 'isReadyToOrderForGrowth'}
                    agreed={isReadyToOrderForGrowth}
                    setApprovement={hadleSetReadyToOrderForGrowth} />
            </td>            
            <td className={cls['table_body-td']}>{name}</td>
            <td className={cls['table_body-td']}>{`${SEASON_START} - ${SEASON_END}`}</td>                                         
            <td className={cls['table_body-td']}>
                <Button
                    type={'button'}
                    theme={ButtonTheme.CLEAR}
                    onClick={hadleEditProduct}
                    aria-label='Edit Product'
                    className={`${cls['button-edit']} ${cls['button-edit_margin']}`}
                >
                    <PencilIcon addStyle={cls['button-edit_icon']} />
                </Button>

                <Button
                    type={'button'}
                    theme={ButtonTheme.CLEAR}
                    onClick={hadleDeleteProduct}
                    aria-label='Delete product'
                    className={cls['button-edit']}
                >
                    <DeleteIcon addStyle={cls['button-edit_icon']} />
                </Button>                         
            </td>
        </tr>
    )
};
