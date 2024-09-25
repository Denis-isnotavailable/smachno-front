import { AdminTitle } from '../AdminTitle/AdminTitle';
import cls from './Products.module.scss';
import { ProductsTable } from './ProductsTable/ProductsTable';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setSearchValue } from '@/store/features/searchSlice/searchSlice';
import { useEffect, useRef, useState } from 'react';
import { FormProduct } from '../Forms/FormProduct/FormProduct';
import { IProduct } from '@/store/features/services/productService';

export const Products = ({ titleText }: { titleText: string }) => {
    const [isFormProduct, setIsFormProduct] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState<IProduct | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const containerRef = useRef<HTMLDivElement>(null);

    const setSearchValueMethod = (value: string) => dispatch(setSearchValue(value));

    const TITLE = `${titleText} / ${productToUpdate ? `Редагування '${productToUpdate.name}'` : 'Створення продукту'}`;

    useEffect(() => {        
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        } 
    }, [isFormProduct]);

    return (
        <div ref={containerRef} className={cls['position-box']}>
            <AdminTitle titleText={isFormProduct ? TITLE : titleText} isSearch={!isFormProduct} setSearchValueMethod={setSearchValueMethod} />            

            {
                isFormProduct ?
                    <FormProduct
                        product={productToUpdate}
                        setIsFormProduct={setIsFormProduct}
                        setProductToUpdate={setProductToUpdate}
                    /> :
                    <ProductsTable
                        setIsFormProduct={setIsFormProduct}
                        setProductToUpdate={setProductToUpdate}
                    />
            }
        </div>
    )
};
