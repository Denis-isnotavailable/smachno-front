import { IProduct, useGetAllProductsQuery } from '@/store/features/services/productService';
import cls from './ProductsTable.module.scss';
import { Loading } from '@/components/Loading';
import { useSelector } from 'react-redux';
import { selectSearchValue } from '@/store/features/searchSlice/searchSlice';
import { ProductsTableItem } from './ProductsTableItem/ProductsTableItem';
import { Button, ButtonTheme } from '@/components';

interface IProductsTableProp {
    setIsFormProduct: (value: boolean) => void;
    setProductToUpdate: (value: IProduct | null) => void;
}

const ERROR_TEXT = 'Упс, щось пішло не так!';

export const ProductsTable = ({setIsFormProduct, setProductToUpdate}: IProductsTableProp) => {
    const { data: products, isLoading, error } = useGetAllProductsQuery('');
    const searchValue = useSelector(selectSearchValue);


    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    return (
        <div>
            <Button
                type='button'
                theme={ButtonTheme.CLEAR}
                className={cls['add-product-button']}
                aria-label='Add Product'
                onClick={() => setIsFormProduct(true)}
            >
                <div className={cls['add-product-button_mark']}>+</div>
                Додати продукт
            </Button>
            
            <table className={cls.table}>
                <thead className={cls.table_head}>
                    <tr className={cls['table_head-tr']}>
                        <th className={cls['table_head-th']}>№</th>
                        <th className={cls['table_head-th']}>
                            <p>Сезон /</p>
                            <p>Не сезон</p>                        
                        </th>
                        <th className={cls['table_head-th']}>
                            <p>На Виріст /</p>
                            <p>Не на виріст</p>                        
                        </th>                    
                        <th className={cls['table_head-th']}>Назва</th>
                        <th className={cls['table_head-th']}>Дата Сезону</th>                   
                        <th className={cls['table_head-th']}>Редагування</th>
                    </tr>
                </thead>

                <tbody className={cls.table_body}>

                    {
                        products
                            ?.filter(({ name }: IProduct) =>
                                name.toLowerCase().includes(searchValue.toLowerCase())
                            )
                            ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            ?.map((product: IProduct, i: number) => 
                                <ProductsTableItem
                                    key={product?.id}
                                    product={product}
                                    index={i + 1}
                                    setIsFormProduct={setIsFormProduct}
                                    setProductToUpdate={setProductToUpdate}
                                />
                            )
                    }

                </tbody>
            </table>
        </div>
        
    )
};

