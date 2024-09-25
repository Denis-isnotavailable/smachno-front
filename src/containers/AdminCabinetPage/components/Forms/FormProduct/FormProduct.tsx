import { IProduct, useCreateProductMutation, useUpdateProductMutation } from '@/store/features/services/productService';
import cls from './FormProduct.module.scss';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Input } from '@/components/Input/Input';
import { Button, ButtonTheme, SpinnerDots, Text } from '@/components';
import { FormProductSchema } from './FormProductSchema';
import { SelectNew, optionDeliveryI } from '@/components/SelectNew/SelectNew';
import { PACKAGING, UNITS } from '@/db/packagingCases';
import { FileUploadIcon } from '@/utils/SVG';
import { ProductPreview } from './ProductPreview/ProductPreview';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { ArrowBackIcon } from '@/utils/SVG/ArrowBack';

interface IFormProductProp {
    product: IProduct | null;
    setIsFormProduct: (value: boolean) => void;
    setProductToUpdate: (value: IProduct | null) => void;
}

export interface InitialValues {
    name: string,
    description: string,
    productIcon?: string,
    productImage?: string,
    price: string | number,
    // packaging: string,
    seasonStart: string,
    seasonEnd: string,
    weightMin: string,
    weightMax: string,
    // unit: string,
    dimensionsHeight: string,
    dimensionsWidth: string,
    dimensionsLength: string,
    shipping: boolean,
}

const ERROR_TEXT = 'Упс, щось пішло не так!';
const customId = "toastIdFormProduct";
const SELECT_EMPTY = 'empty';

export const FormProduct = ({ product, setIsFormProduct, setProductToUpdate }: IFormProductProp) => {
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const [packaging, setPackaging] = useState('');
    const [unit, setUnit] = useState('');

    // console.log(product);

    const initialValues: InitialValues = {
        name: product?.name || '',
        description: product?.description || '',
        productIcon: product?.productIcon || '',
        productImage: product?.productImage || '',
        price: product?.price ? String(product?.price) : '',
        // packaging: product?.packaging || '',
        seasonStart: product?.seasonStart ? new Date(product?.seasonStart).toISOString().split('T')[0] : '',
        seasonEnd: product?.seasonEnd ? new Date(product?.seasonEnd).toISOString().split('T')[0] : '',
        weightMin: product?.weightMin ? String(product?.weightMin) : '',
        weightMax: product?.weightMax ? String(product?.weightMax) : '',
        // unit: product?.unit || '',
        dimensionsHeight: product?.dimensionsHeight ? String(product?.dimensionsHeight) : '0',
        dimensionsWidth: product?.dimensionsWidth ? String(product?.dimensionsWidth) : '0',
        dimensionsLength: product?.dimensionsLength ? String(product?.dimensionsLength) : '0',
        shipping: product?.shipping || false,
    };

    useEffect(() => {
        product?.packaging && setPackaging(product.packaging);
        product?.unit && setUnit(product.unit);
    }, [product]);
    
    async function imageUrlToBlob(photo: string) {
        if (typeof photo !== 'string') return photo;

        try {
            const response = await fetch(photo);
            const blob = await response.blob();
            const file = new File([blob], 'image_filename.jpg', { type: 'image/jpeg' });
            return file;
        } catch (error) {
            console.error('Помилка при завантаженні зображення:', error);
            return null;
        }
    }

    const handleSubmit = async (
        values: InitialValues,
    ): Promise<void | ReactElement> => {

        if (!packaging || !unit) return;

        const formData = new FormData();        

        formData.append('name', values.name);
        formData.append('description', values.description);
        if (values?.productIcon) {            
            const productIcon = await imageUrlToBlob(values.productIcon);
            productIcon && formData.append('productIcon', productIcon);
        }
        if (values?.productImage) {
            const productImage = await imageUrlToBlob(values.productImage);
            productImage && formData.append('productImage', productImage);
        }     
        // values.productIcon && formData.append('productIcon', values.productIcon);
        // values?.productImage && formData.append('productImage', values.productImage);
        formData.append('price', String(values.price));
        formData.append('seasonStart', values.seasonStart);
        formData.append('seasonEnd', values.seasonEnd);
        formData.append('weightMin', values.weightMin);
        formData.append('weightMax', values.weightMax);
        formData.append('dimensionsHeight', values.dimensionsHeight);
        formData.append('dimensionsWidth', values.dimensionsWidth);
        formData.append('dimensionsLength', values.dimensionsLength);
        formData.append('shipping', String(values.shipping));
        formData.append('packaging', packaging);
        formData.append('unit', unit);
        formData.append('isNowInSell', 'false');
        formData.append('isReadyToOrderForGrowth', 'false');
        

        // Object.keys(values).forEach((key) => formData.append(key, values[key as keyof InitialValues]));

        // for (const key in values) {
        //     formData.append(key, values[key]);            
        // }
        
        try {
            let response: {
                data: IProduct;
            } | {
                error?: FetchBaseQueryError | SerializedError | undefined;
            };

            if (product) { 
                response = await updateProduct({ id: product?.id, product: formData });
            } else {
                response = await createProduct({ formData });
            }

            if (response && 'error' in response) {
                toast.error(ERROR_TEXT, {
                    toastId: customId
                })
            } else {
                toast.success('Зміни зберіг!', {
                    icon: <ToastImg/>,
                    toastId: customId
                })
                setIsFormProduct(false);
                setProductToUpdate(null);
            }

        } catch (e) {
            if(e) {
                return <h3>{ERROR_TEXT}</h3>
            }
        }     
    }

    const hadleCloseEditingProduct = () => {
        setIsFormProduct(false);
        setProductToUpdate(null);
    }

    const getPackaging = (option: optionDeliveryI) => {
        option.id !== SELECT_EMPTY ? setPackaging(option.name) : setPackaging('');        
    };

    const getUnit = (option: optionDeliveryI) => {
        option.id !== SELECT_EMPTY ? setUnit(option.name) : setUnit('');        
    };

    return (
        <>
            
            <Button
                type={'button'}
                theme={ButtonTheme.CLEAR}
                className={cls.btn_back}
                onClick={hadleCloseEditingProduct}
            >
                <ArrowBackIcon addStyle={cls.icon} />
                <span>Повернутися до продуктів</span>
            </Button>
            
            
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={FormProductSchema}
                >
                {({ errors, touched, setFieldValue, values }) => (
                    <div className={cls['form-box']}>
                        <ProductPreview packaging={packaging} unit={unit} />

                        <Form>
                            <ul className={cls.form_list}>
                                <li className={cls.form_list__item}>
                                    <Input
                                        name='name'
                                        type='text'
                                        label='Назва Продукту'
                                        placeholder='Назва Продукту'
                                        className={cls.input}
                                />
                                    {touched.name && errors.name ? (
                                        <p className={cls.error}>
                                            {errors.name}
                                        </p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>     
                                    <Input
                                        name='description'
                                        type='text'
                                        label='Опис продукту'
                                        placeholder='До 100 символів'
                                        className={cls.input}
                                />
                                    {touched.description && errors.description ? (
                                        <p className={cls.error}>
                                            {errors.description}
                                        </p>
                                    ) : null}
                                </li>
                            
                                <li className={`${cls.form_list__item} ${cls.form_list__item_select}`}>
                                    <SelectNew
                                        title={'Вид фасування'}
                                        options={PACKAGING}
                                        placeholder='Вид фасування'
                                        startValue={{ value: '001', label: packaging }}
                                        getOption={getPackaging}
                                />
                                    {!packaging ? (
                                        <p className={cls.error}>
                                            {"Поле обов'язкове до заповнення"}
                                        </p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>     
                                    <Input
                                        name='weightMin'
                                        type='text'
                                        label='Мін. вага/кільк в кг/шт'
                                        placeholder='Вага/Кількість'
                                        className={cls.input}
                                />
                                    {touched.weightMin && errors.weightMin ? (
                                        <p className={cls.error}>
                                            {errors.weightMin}
                                        </p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>     
                                    <Input
                                        name='weightMax'
                                        type='text'
                                        label='Макс. вага/кільк в кг/шт'
                                        placeholder='Вага/Кількість'
                                        className={cls.input}
                                />
                                    {touched.weightMax && errors.weightMax ? (
                                        <p className={cls.error}>
                                            {errors.weightMax}
                                        </p>
                                    ) : null}
                                </li>

                                <li className={`${cls.form_list__item} ${cls.form_list__item_select}`}>
                                    <SelectNew
                                        title={'Одиниці виміру'}
                                        options={UNITS}
                                        placeholder='Одиниці виміру'
                                        startValue={{ value: '001', label: unit }}
                                        getOption={getUnit}
                                />
                                    {!unit ? (
                                        <p className={cls.error}>
                                            {"Поле обов'язкове до заповнення"}
                                        </p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>     
                                    <Input
                                        name='dimensionsHeight'
                                        type='text'
                                        label='Висота в см'
                                        placeholder='Висота'
                                        className={cls.input}
                                />
                                    {touched.dimensionsHeight && errors.dimensionsHeight ? (
                                        <p className={cls.error}>
                                            {errors.dimensionsHeight}
                                        </p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>     
                                    <Input
                                        name='dimensionsWidth'
                                        type='text'
                                        label='Ширина в см'
                                        placeholder='Ширина'
                                        className={cls.input}
                                />
                                    {touched.dimensionsWidth && errors.dimensionsWidth ? (
                                        <p className={cls.error}>
                                            {errors.dimensionsWidth}
                                        </p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>     
                                    <Input
                                        name='dimensionsLength'
                                        type='text'
                                        label='Довжина в см'
                                        placeholder='Довжина'
                                        className={cls.input}
                                />
                                    {touched.dimensionsLength && errors.dimensionsLength ? (
                                        <p className={cls.error}>
                                            {errors.dimensionsLength}
                                        </p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>  
                                    <Input
                                        name='seasonStart'
                                        type='date'
                                        label='Сезон. Відкриття'
                                        placeholder='Дата'
                                        className={cls.input}
                                />
                                    {touched.seasonStart && errors.seasonStart ? (
                                        <p className={cls.error}>
                                            {errors.seasonStart}
                                        </p>
                                    ) : null}                                
                                </li>

                                <li className={cls.form_list__item}>  
                                    <Input
                                        name='seasonEnd'
                                        type='date'
                                        label='Сезон. Закриття'
                                        placeholder='Дата'
                                        className={cls.input}
                                />
                                    {touched.seasonEnd && errors.seasonEnd ? (
                                        <p className={cls.error}>
                                            {errors.seasonEnd}
                                        </p>
                                    ) : null}                                
                                </li>

                                <li className={cls.form_list__item}>     
                                    <Input
                                        name='price'
                                        type='text'
                                        label='Ціна в грн'
                                        placeholder='Ціна'
                                        className={cls.input}
                                />
                                    {touched.price && errors.price ? (
                                        <p className={cls.error}>
                                            {errors.price}
                                        </p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>     
                                    <label className={cls.label}>
                                        <Field type="checkbox" name="shipping" className={cls['input-checkbox']} />
                                        <span className={cls['custom-checkbox']} ></span>
                                        <span className={cls['label_text']} >Продукт відправляється Новою Поштою</span>
                                    </label>
                                </li>

                                <li className={cls.form_list__item}>
                                    <label className={cls.label}>
                                        <FileUploadIcon addStyle={`${cls.label_icon} ${values.productImage && cls.label_icon_active}`} />
                                        <input
                                            className={cls.input_photo_hide}
                                            type='file'
                                            name="productImage"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {                                        
                                                e.currentTarget.files && setFieldValue('productImage', e.currentTarget.files[0]);
                                            }}
                                            accept="image/png, image/jpeg, image/webp"
                                    />
                                        <span className={cls['label_text']} >Завантажити фото</span>                                    
                                    </label>
                                    {touched.productImage && errors.productImage ? (
                                        <p className={cls.error}>
                                            {errors.productImage}
                                        </p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>
                                    <label className={cls.label}>
                                        <FileUploadIcon addStyle={`${cls.label_icon} ${values.productIcon && cls.label_icon_active}`} />
                                        <input
                                            className={cls.input_photo_hide}
                                            type='file'
                                            name="productIcon"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {                                        
                                                e.currentTarget.files && setFieldValue('productIcon', e.currentTarget.files[0]);
                                            }}
                                            accept="image/png, image/jpeg, image/webp"
                                    />
                                        <span className={cls['label_text']} >Завантажити лого</span>                                    
                                    </label>
                                    {touched.productIcon && errors.productIcon ? (
                                        <p className={cls.error}>
                                            {errors.productIcon}
                                        </p>
                                        ) : null
                                    }
                                </li>

                            </ul>
                        

                            <ul className={cls['form-btns-list']}>
                                <li className={cls['form-btns-list_item']}>
                                    <Button
                                        type={'submit'}
                                        theme={ButtonTheme.PRIMARY}
                                        className={cls.btn}
                                        aria-label='Form Submit'
                                        disabled={isUpdating || isCreating}
                                    >
                                        {isUpdating || isCreating ? <SpinnerDots /> : <Text btnText={'Зберегти'}/>}
                                    </Button>
                                </li>
                                <li className={cls['form-btns-list_item']}>
                                    <Button
                                        type={'button'}
                                        theme={ButtonTheme.PRIMARY}
                                        className={cls.btn}
                                        aria-label='Form Back'
                                        onClick={hadleCloseEditingProduct}
                                    >                        
                                        <Text btnText={'Назад'}/>
                                    </Button>
                                </li>
                            </ul>               
                        </Form>
                    </div>
                    )}
            </Formik>
        </>                
    )
};
