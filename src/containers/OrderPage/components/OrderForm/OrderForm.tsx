'use client';

import Image from 'next/image';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { Button, ButtonTheme, Text } from '@/components';
import { OrderFormSchema } from './OrderFormSchema';
import ImgCat from '@/images/stepsOrder/Step_4.webp';
import { optionDeliveryI } from '@/components/Select/Select';
import { selectCartProducts } from '@/store/features/cartSlice/cartSlice';
import cls from './OrderForm.module.scss';
import {
    ICity,
    IPostWherehouses,
    useAreasMutation,
    useCitiesMutation,
    usePostWherehousesMutation,
} from '@/store/features/services/postService';
import { useProfileQuery } from '@/store/features/services/authService';
import { BlockText } from '@/containers/OrderPage/components/BlockText/BlockText';
import {
    useGetAddressByIdQuery,
    useGetAddressesQuery,
} from '@/store/features/services/addressService';
import { formatedOrderForBack } from '@/containers/OrderPage/components/OrderForm/formatedOrderForBack';
import { useCreateOrderMutation } from '@/store/features/services/orderService';
import { Loading } from '@/components/Loading';
import { TemplateAdressOrder } from '@/containers/OrderPage/components/TemplateAdressOrder/TemplateAdressOrder';
import { SelectNew } from '@/components/SelectNew/SelectNew';
import { optionDeliveryNew } from '@/db/optionDelivery';
import { Input } from '@/components/Input/Input';
import { TextAlign } from '@/components/Text/Text';
import { Phone } from '@/containers/AuthPage/components/RegisterForm/Phone/Phone';
import { formatedOrderForEmail } from '@/containers/OrderPage/components/OrderForm/formatedOrderForEmail';
import { SerializedError } from '@reduxjs/toolkit';
//import { LiqPay } from '@/components/LiqPay/LiqPay';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { usePayments } from '@/hooks/usePayment';

interface InitialValues {
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    address?: string;
}

interface IArea {
    id: string;
    name: string;
}

interface IResponseOrder {
    id: string;
    message: string;
}

const INITIAL_DELIVERY = 'Вибери варіант доставки';
const INITIAL_AREA = 'Вибери область';
const INITIAL_CITY = 'Вибери місто';
const INITIAL_OFFICE = 'Вибери адресу відділення';
const INITIAL_BOX = 'Вибери адресу поштомата';
const SELECT_EMPTY_ID = 'empty';

const customId = 'toastId';

export const OrderForm = () => {
    const [delivery, setDelivery] = useState(INITIAL_DELIVERY);
    const [idRecipient, setIdRecipient] = useState(SELECT_EMPTY_ID);
    const [city, setCity] = useState(INITIAL_CITY);
    const [office, setOffice] = useState(INITIAL_OFFICE);
    const [box, setBox] = useState(INITIAL_BOX);
    const [area, setArea] = useState<IArea>({ id: '', name: INITIAL_AREA });
    const [postOfficesAndBoxes, setOfficesAndBoxes] = useState<IPostWherehouses>({
        postOffices: [],
        postBoxes: [],
    });
    const [areasArr, setAreasArr] = useState<optionDeliveryI[]>([]);
    const [citiesArr, setCitiesArr] = useState<ICity[]>([]);
    const [initialValues, setInitialValues] = useState<InitialValues>({
        name: '',
        surname: '',
        email: '',
        address: '',
    });
    const [initialPhone, setInitialPhone] = useState<null | string>('');
    const [getPhone, setGetPhone] = useState('');
    const [getAddress, setGetAddress] = useState([]);
    const [isDisabledBtn, setIsDisabledBtn] = useState(false);
    //const [orderId, setOrderId] = useState(''); // [null, undefined]
    const { cartProducts, totalPrice } = useSelector(selectCartProducts);
    const [cities, { isLoading: isLoadingCities }] = useCitiesMutation();
    const [areas, { isLoading: isLoadingAreas }] = useAreasMutation();
    const [postWherehouses, { isLoading: isLoadingWherehouses }] = usePostWherehousesMutation();
    const { data } = useProfileQuery('');
    const { data: addresses } = useGetAddressesQuery('');
    const { data: recipientById, isLoading: isLoadingRecipient } = useGetAddressByIdQuery(
        idRecipient,
        {
            skip: !idRecipient,
        }
    );
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    //const route = useRouter();

    const payment = usePayments;

    //const ref = useRef(null);

    useEffect(() => {
        const getAreas = async () => {
            const res = await areas({});
            if ('data' in res) setAreasArr(res.data ?? []);
        };
        getAreas();
    }, [areas]);

    useEffect(() => {
        if (area.id !== '') {
            const getCities = async () => {
                const res = await cities(area.id);
                if ('data' in res) setCitiesArr(res.data ?? []);
            };
            getCities();
        }
    }, [cities, area.id]);

    useEffect(() => {
        function fetchData() {
            if (city) {
                const getPostWherehouses = async (city: string) => {
                    const res = await postWherehouses(city);
                    if ('data' in res)
                        setOfficesAndBoxes(
                            res.data ?? {
                                postOffices: [],
                                postBoxes: [],
                            }
                        );
                };
                getPostWherehouses(city);
            }
        }

        fetchData();
    }, [city, postWherehouses]);

    useEffect(() => {
        if (addresses) {
            setGetAddress(
                addresses?.map(({ id, title }: { id: number; title: string }) => ({
                    id: String(id),
                    name: title,
                }))
            );
        }
    }, [addresses]);

    useEffect(() => {
        if (idRecipient === SELECT_EMPTY_ID) {
            setInitialValues({
                name: data?.name || '',
                surname: data?.surname || '',
                email: data?.email || '',
                address: data?.address || '',
            });
            setInitialPhone(data?.phone || '');
            setCity(INITIAL_CITY);
            setOffice(INITIAL_OFFICE);
            setBox(INITIAL_BOX);
            setArea({ id: '', name: INITIAL_AREA });
        }
    }, [data, idRecipient]);
    /*
    useEffect(() => {
        if (orderId) {
            // @ts-expect-error maybe null
            ref.current.submit();
        }
    }, [orderId]);*/

    const getRecipient = (option: optionDeliveryI) => {
        setIdRecipient(option.id);
    };
    const getDelivery = (option: optionDeliveryI) => {
        if (option.name === 'Доставка жвавим курʼєром') {
            setOffice('');
            setBox('');
        }
        if (option.name === 'Нова Поштонька') {
            setBox('');
            setInitialValues({
                name: data?.name || '',
                surname: data?.surname || '',
                email: data?.email || '',
                address: data?.address || '',
            });
        }
        if (option.name === 'Поштоматик') {
            setOffice('');
            setInitialValues({
                name: data?.name || '',
                surname: data?.surname || '',
                email: data?.email || '',
                address: data?.address || '',
            });
        }
        setDelivery(option.name);
    };

    const getCity = (option: optionDeliveryI) => {
        setOffice(INITIAL_OFFICE);
        setBox(INITIAL_BOX);
        setCity(option.name);
    };

    const getOffice = (option: optionDeliveryI) => {
        setOffice(option.name);
    };

    const getBox = (option: optionDeliveryI) => {
        setBox(option.name);
    };

    const getIdArea = useCallback(
        (option: optionDeliveryI) => {
            setCity(INITIAL_CITY);
            setOffice(INITIAL_OFFICE);
            setBox(INITIAL_BOX);
            setArea({ id: option.id, name: option.name });
        },
        [setArea]
    );

    const handleSubmit = async (values: InitialValues) => {
        if (
            idRecipient === SELECT_EMPTY_ID &&
            (office === 'Вибери адресу відділення' ||
                office === '-' ||
                box === 'Вибери адресу поштомата' ||
                box === '-')
        ) {
            toast.error('Вибери адресу доставки', {
                icon: <ToastImg />,
                toastId: customId,
            });
            return;
        }

        if (!values.address && idRecipient === SELECT_EMPTY_ID && !office && !box) {
            toast.error('Адреса доставки пуста', {
                icon: <ToastImg />,
                toastId: customId,
            });
            return;
        }
        if (idRecipient === SELECT_EMPTY_ID && !getPhone) {
            toast.error("Потрібен телефон для зв'язку", {
                icon: <ToastImg />,
                toastId: customId,
            });
            return;
        }
        if (
            idRecipient === SELECT_EMPTY_ID &&
            (office === 'Вибери адресу відділення' || box === 'Вибери адресу поштомата')
        ) {
            toast.error('Помилка при виборі адреси доставки', {
                icon: <ToastImg />,
                toastId: customId,
            });
            return;
        }

        const outputObjectForBack = formatedOrderForBack(cartProducts);
        const outputObjectForEmail = formatedOrderForEmail(cartProducts);

        try {
            setIsDisabledBtn(true);
            const paymentReference = new Date().getTime().toString();
            const payment_reference = paymentReference;
            const responseOrder: {
                data?: IResponseOrder;
                error?: FetchBaseQueryError | SerializedError;
            } = await createOrder({
                shippingAddress: {
                    firstName:
                        idRecipient !== SELECT_EMPTY_ID ? recipientById?.firstName : values.name,
                    surname:
                        idRecipient !== SELECT_EMPTY_ID ? recipientById?.surname : values.surname,
                    phone: idRecipient !== SELECT_EMPTY_ID ? recipientById?.phone : getPhone,
                    area: idRecipient !== SELECT_EMPTY_ID ? recipientById?.area : area.name,
                    city: idRecipient !== SELECT_EMPTY_ID ? recipientById?.city : city,
                    novaPostLocker:
                        idRecipient !== SELECT_EMPTY_ID ? recipientById?.novaPostLocker : box,
                    novaPostOffice:
                        idRecipient !== SELECT_EMPTY_ID ? recipientById?.novaPostOffice : office,
                    personalAddress:
                        idRecipient !== SELECT_EMPTY_ID
                            ? recipientById?.personalAddress
                            : values.address,
                },
                ...outputObjectForBack,
                payment_reference: { reference: payment_reference },
            });
            if (!responseOrder.data) {
                throw new Error('Помилка відправлення замовлення');
            }
            //setOrderId(responseOrder.data.id);
            localStorage.setItem(
                'orderToEmail',
                JSON.stringify({
                    name: idRecipient !== SELECT_EMPTY_ID ? recipientById?.firstName : values.name,
                    surname:
                        idRecipient !== SELECT_EMPTY_ID ? recipientById?.surname : values.surname,
                    email:
                        idRecipient !== SELECT_EMPTY_ID ? recipientById?.user.email : values.email,
                    phone: idRecipient !== SELECT_EMPTY_ID ? recipientById?.phone : getPhone,
                    area: idRecipient !== SELECT_EMPTY_ID ? recipientById?.area : area.name,
                    city: idRecipient !== SELECT_EMPTY_ID ? recipientById?.city : city,
                    office:
                        idRecipient !== SELECT_EMPTY_ID ? recipientById?.novaPostOffice : office,
                    box: idRecipient !== SELECT_EMPTY_ID ? recipientById?.novaPostLocker : box,
                    address:
                        idRecipient !== SELECT_EMPTY_ID
                            ? recipientById?.personalAddress
                            : values.address,
                    totalPrice,
                    cartProducts: outputObjectForEmail,
                    numberOrder: responseOrder.data?.id,
                })
            );
            await payment(totalPrice, paymentReference.toString());
        } catch (e) {
            toast.error('Помилка відправлення замовлення', {
                icon: <ToastImg />,
                toastId: customId,
            });
        } finally {
            setIsDisabledBtn(false);
        }
    };

    return (
        <section className={cls.section}>
            {isLoading ? (
                <Loading />
            ) : (
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                    validationSchema={OrderFormSchema}
                >
                    {({ errors, touched }) => (
                        <Form className={cls.container}>
                            <div className={cls.container__left}>
                                <ul className={cls.container__input}>
                                    <li>
                                        <SelectNew
                                            title={'Інший отримувач'}
                                            options={getAddress?.map(({ id, name }) => ({
                                                value: id,
                                                label: name,
                                            }))}
                                            getOption={getRecipient}
                                        />
                                    </li>
                                    {/* <li>
                                        <Select
                                            optionDelivery={getAddress}
                                            title={'Інший отримувач'}
                                            getOption={getRecipient}
                                        />
                                    </li> */}
                                    {idRecipient === SELECT_EMPTY_ID && (
                                        <>
                                            <li>
                                                <Input
                                                    type={'text'}
                                                    name={'name'}
                                                    label={'Твоє чудове імʼя'}
                                                />
                                                {touched.name && errors.name ? (
                                                    <p className={cls.error}>{errors.name}</p>
                                                ) : null}
                                            </li>
                                            <li>
                                                <Input
                                                    type={'text'}
                                                    name={'surname'}
                                                    label={'Твоє прекрасне прізвище'}
                                                />
                                                {touched.surname && errors.surname ? (
                                                    <p className={cls.error}>{errors.surname}</p>
                                                ) : null}
                                            </li>
                                            <li>
                                                <Text
                                                    text={'Твій номерочок'}
                                                    align={TextAlign.LEFT}
                                                    className={cls.label}
                                                />
                                                <div className={cls.container__phone}>
                                                    <Phone
                                                        setGetPhone={setGetPhone}
                                                        initialPhone={initialPhone}
                                                    />
                                                </div>
                                            </li>
                                            <li>
                                                <Input
                                                    type={'email'}
                                                    name={'email'}
                                                    label={'Твоя пошта'}
                                                />
                                                {touched.email && errors.email ? (
                                                    <p className={cls.error}>{errors.email}</p>
                                                ) : null}
                                            </li>
                                            <li>
                                                <SelectNew
                                                    title={'Твоя область'}
                                                    options={areasArr?.map(({ id, name }) => ({
                                                        value: id,
                                                        label: name,
                                                    }))}
                                                    getOption={getIdArea}
                                                    startValue={{
                                                        value: area.id,
                                                        label: area.name,
                                                    }}
                                                    isLoading={isLoadingAreas}
                                                />
                                            </li>
                                            {area.name !== INITIAL_AREA && area.name !== '-' && (
                                                <li>
                                                    <SelectNew
                                                        title={'Твоє чудове місто'}
                                                        options={citiesArr
                                                            ?.slice()
                                                            .sort((a, b) => {
                                                                const hasParenthesesA =
                                                                    /\([^()]*\)/.test(
                                                                        a.Description
                                                                    );
                                                                const hasParenthesesB =
                                                                    /\([^()]*\)/.test(
                                                                        b.Description
                                                                    );
                                                                if (
                                                                    !hasParenthesesA &&
                                                                    hasParenthesesB
                                                                ) {
                                                                    return -1;
                                                                } else if (
                                                                    hasParenthesesA &&
                                                                    !hasParenthesesB
                                                                ) {
                                                                    return 1;
                                                                } else {
                                                                    return a.Description.localeCompare(
                                                                        b.Description
                                                                    );
                                                                }
                                                            })
                                                            .map((item, i) => ({
                                                                value: String(i),
                                                                label: item.Description,
                                                            }))}
                                                        startValue={{
                                                            value: '001',
                                                            label: city,
                                                        }}
                                                        isLoading={isLoadingCities}
                                                        getOption={getCity}
                                                    />
                                                </li>
                                            )}

                                            {city !== INITIAL_CITY && city !== '-' && (
                                                <li>
                                                    <SelectNew
                                                        options={optionDeliveryNew}
                                                        title={'Доставка'}
                                                        getOption={getDelivery}
                                                        startValue={{
                                                            value: '001',
                                                            label: delivery,
                                                        }}
                                                    />
                                                </li>
                                            )}

                                            {city !== INITIAL_CITY &&
                                                delivery === 'Нова Поштонька' && (
                                                    <li>
                                                        <SelectNew
                                                            title={'Номер відділення'}
                                                            options={postOfficesAndBoxes?.postOffices?.map(
                                                                (item, i) => ({
                                                                    value: String(i),
                                                                    label: item.Description,
                                                                })
                                                            )}
                                                            getOption={getOffice}
                                                            startValue={{
                                                                value: '001',
                                                                label: office,
                                                            }}
                                                            isLoading={isLoadingWherehouses}
                                                        />
                                                    </li>
                                                )}

                                            {city !== INITIAL_CITY && delivery === 'Поштоматик' && (
                                                <li>
                                                    <SelectNew
                                                        title={'Номер поштоматика'}
                                                        options={postOfficesAndBoxes?.postBoxes?.map(
                                                            (item, i) => ({
                                                                value: String(i),
                                                                label: item.Description,
                                                            })
                                                        )}
                                                        getOption={getBox}
                                                        startValue={{
                                                            value: '001',
                                                            label: box,
                                                        }}
                                                    />
                                                </li>
                                            )}

                                            {city !== INITIAL_CITY &&
                                                delivery === 'Доставка жвавим курʼєром' && (
                                                    <li>
                                                        <Input
                                                            type={'text'}
                                                            name={'address'}
                                                            label={'Адреса доставки'}
                                                            placeholder={'Напиши адресу доставки'}
                                                        />
                                                        {touched.address && errors.address ? (
                                                            <p className={cls.error}>
                                                                {errors.address}
                                                            </p>
                                                        ) : null}
                                                    </li>
                                                )}
                                        </>
                                    )}

                                    {idRecipient !== SELECT_EMPTY_ID && (
                                        <li>
                                            <TemplateAdressOrder
                                                idRecipient={idRecipient}
                                                recipientById={recipientById}
                                                isLoading={isLoadingRecipient}
                                            />
                                        </li>
                                    )}
                                </ul>

                                <p className={cls.text}>
                                    *доставка здійснюється за рахунок замовника згідно з тарифами
                                    Нової Пошти
                                </p>
                            </div>
                            <div className={cls.container__right}>
                                <p className={cls.total}>{`Всього: ${totalPrice} грн`}</p>
                                <BlockText />
                                <Button
                                    type={'submit'}
                                    theme={ButtonTheme.SECONDARY}
                                    disabled={isDisabledBtn}
                                >
                                    <Text btnText={'Перейти до оплати'} />
                                </Button>
                                {/*<LiqPay
                                    formRef={ref}
                                    amount={totalPrice}
                                    isDisabledBtn={isDisabledBtn}
                                    orderId={orderId}
                                    />*/}

                                <div>
                                    <Image
                                        className={cls.img}
                                        src={ImgCat}
                                        alt='Кіт несе посилку'
                                        priority={true}
                                        width={380}
                                        height={310}
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </section>
    );
};
