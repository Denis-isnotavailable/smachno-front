'use client';

import { Text } from '@/components';
import { TextAlign } from '@/components/Text/Text';
import { Field, Form, Formik } from 'formik';
import cls from './Signature.module.scss';
import { SignatureFormSchema } from './SignatureFormSchema';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlateToProduct, selectCartProductsArr } from '@/store/features/cartSlice/cartSlice';

interface SignatureProps {
    id: string;
}
interface InitialValues {
    signature: string;
}

export const Signature = ({ id }: SignatureProps) => {
    const [getSignature, setSignature] = useState('');
    const dispatch = useDispatch();
    const cartProducts = useSelector(selectCartProductsArr);

    const product = cartProducts.find((product) => product.product.id === id);

    const initialValues: InitialValues = {
        signature: '',
    };

    useEffect(() => {
        if (product?.plate) {
            setSignature(product.plate);
        }
    }, [product?.plate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value: plate } = e.target;
        setSignature(plate);
        dispatch(addPlateToProduct({ id, plate: plate.trim() }));
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={() => {}}
                validationSchema={SignatureFormSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className={cls.container}>
                            <label htmlFor='signature'>
                                <Text text='Можеш додати підпис на кущику' align={TextAlign.LEFT} />
                            </label>
                            <Field
                                className={cls.container__input}
                                name='signature'
                                type='text'
                                placeholder='Підпис'
                                value={getSignature}
                                onChange={handleChange}
                            />
                            <p className={cls.container__error}>
                                {touched.signature && errors.signature ? errors.signature : null}
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
