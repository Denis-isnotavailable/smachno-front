import cls from './FormAddress.module.scss';
import { Form, Formik } from 'formik';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Button, ButtonTheme, SpinnerDots, Text } from '@/components';
import { FormAddressSchema } from './FormAddressSchema';
import { Input } from '@/components/Input/Input';
import {
    ICity,
    IPostWherehouses,
    useAreasMutation,
    useCitiesMutation,
    usePostWherehousesMutation,
} from '@/store/features/services/postService';
import { TextAlign } from '@/components/Text/Text';
import { Phone } from '@/containers/AuthPage/components/RegisterForm/Phone/Phone';
import { useProfileQuery } from '@/store/features/services/authService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { IAddress } from '../../AddressInfo/AddressInfo';
import {
    useCreateAddressMutation,
    useUpdateAddressMutation,
} from '@/store/features/services/addressService';
import { SelectNew, optionDeliveryI } from '@/components/SelectNew/SelectNew';

interface InitialValues {
    recieverName: string;
    name: string;
    surname: string;
    area?: string;
    city?: string;
    address?: string;
    postOffice?: string;
    postBox?: string;
}

interface IOption {
    title?: string;
    firstName?: string;
    surname?: string;
    phone?: string;
    city?: string;
    novaPostOffice?: string;
    novaPostLocker?: string;
    personalAddress?: string;
    area?: string;
}

interface FormUserProps {
    setIsEditForm: (value: boolean) => void;
    setAddresToUpdate: (value: IAddress | null) => void;
    addresToUpdate: IAddress | null;
    isFirstAdress: boolean;
}

interface FetchData {
    id: string;
    title?: string;
    firstName?: string;
    surname?: string;
    phone?: string;
    city?: string;
    novaPostOffice?: string;
    novaPostLocker?: string;
    personalAddress?: string;
    area?: string;
}

const ERROR_TEXT = 'Упс, щось пішло не так!';
const customId = 'toastIdFormAddress';
const SELECT_EMPTY = 'empty';

export const FormAddress = ({
    setIsEditForm,
    setAddresToUpdate,
    addresToUpdate,
    isFirstAdress,
}: FormUserProps) => {
    const { data: user } = useProfileQuery('');
    const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
    const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
    const [areas, { isLoading }] = useAreasMutation();
    const [cities, { isLoading: isLoadingCities }] = useCitiesMutation();
    const [postWherehouses, { isLoading: isLoadingWherehouses }] = usePostWherehousesMutation();
    const [postOfficesAndBoxes, setOfficesAndBoxes] = useState<IPostWherehouses>({
        postOffices: [],
        postBoxes: [],
    });
    const [areasArr, setAreasArr] = useState<optionDeliveryI[]>([]);
    const [citiesArr, setCitiesArr] = useState<ICity[]>([]);
    const [area, setArea] = useState<optionDeliveryI>({ id: '', name: '' });
    const [city, setCity] = useState('');
    const [office, setOffice] = useState('');
    const [box, setBox] = useState('');
    const [initialPhone, setInitialPhone] = useState<null | string>('');
    const [getPhone, setGetPhone] = useState('');

    const initialValues: InitialValues = {
        recieverName: isFirstAdress
            ? `${user?.name} ${user?.surname}`
            : addresToUpdate?.title || '',
        name: isFirstAdress ? user?.name : addresToUpdate?.firstName || '',
        surname: isFirstAdress ? user?.surname : addresToUpdate?.surname || '',
        address: addresToUpdate?.personalAddress || '',
    };

    useEffect(() => {
        if (isFirstAdress) {
            setInitialPhone(user?.phone || null);
        }

        if (addresToUpdate) {
            setInitialPhone(addresToUpdate?.phone || null);
        }
    }, [addresToUpdate, isFirstAdress, user]);

    useEffect(() => {
        if (areasArr.length !== 0 && addresToUpdate?.area) {
            const areaForSelect = areasArr.find((area) => area.name === addresToUpdate?.area);
            areaForSelect && setArea(areaForSelect);
        }
    }, [addresToUpdate?.area, areasArr]);

    useEffect(() => {
        if (addresToUpdate?.city) {
            setCity(addresToUpdate?.city);
        }

        if (addresToUpdate?.novaPostOffice) {
            setOffice(addresToUpdate?.novaPostOffice);
        }

        if (addresToUpdate?.novaPostLocker) {
            setBox(addresToUpdate?.novaPostLocker);
        }
    }, [addresToUpdate?.city, addresToUpdate?.novaPostLocker, addresToUpdate?.novaPostOffice]);

    useEffect(() => {
        const getAreas = async () => {
            const res = await areas({});
            if ('data' in res) {
                setAreasArr(res.data ?? []);
            }
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
    }, [cities, area]);

    useEffect(() => {
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
    }, [city, postWherehouses]);

    const clearCityAndPost = () => {
        setCity('');
        setOffice('');
        setBox('');
    };

    const clearPost = () => {
        setOffice('');
        setBox('');
    };

    const getIdArea = useCallback((option: optionDeliveryI) => {
        if (option.id !== SELECT_EMPTY) {
            setArea({ id: option.id, name: option.name });
            clearCityAndPost();
        } else {
            setArea({ id: '', name: '' });
            setCitiesArr([]);
            setOfficesAndBoxes({ postOffices: [], postBoxes: [] });
            clearCityAndPost();
        }
    }, []);

    const getCity = (option: optionDeliveryI) => {
        if (option.id !== SELECT_EMPTY) {
            setCity(option.name);
            clearPost();
        } else {
            setCity('');
            setOfficesAndBoxes({ postOffices: [], postBoxes: [] });
            clearPost();
        }
    };

    const getOffice = (option: optionDeliveryI) => {
        option.id !== SELECT_EMPTY ? setOffice(option.name) : setOffice('');
    };

    const getBox = (option: optionDeliveryI) => {
        option.id !== SELECT_EMPTY ? setBox(option.name) : setBox('');
    };

    const handleBackButton = () => {
        setIsEditForm(false);
        setAddresToUpdate(null);
    };

    const handleSubmit = async (
        values: InitialValues
        // { resetForm }: FormikHelpers<InitialValues>
    ): Promise<void | ReactElement> => {
        try {
            const option: IOption = {
                title: values.recieverName,
                firstName: values.name,
                surname: values.surname,
                phone: getPhone,
                city: city,
                novaPostOffice: office || '',
                novaPostLocker: box || '',
                personalAddress: values.address || '',
                area: area.name,
            };
            let response:
                | {
                      data: FetchData;
                  }
                | { error?: FetchBaseQueryError | SerializedError | undefined };

            if (!option.novaPostOffice) delete option.novaPostOffice;
            if (!option.novaPostLocker) delete option.novaPostLocker;
            if (!option.personalAddress) delete option.personalAddress;

            if (isFirstAdress || !addresToUpdate) {
                response = await createAddress({
                    option,
                });
            } else {
                response = await updateAddress({
                    id: addresToUpdate.id,
                    option,
                });
            }

            if (response && 'error' in response) {
                toast.error(ERROR_TEXT, {
                    toastId: customId,
                });
            } else {
                toast.success('Зміни зберіг!', {
                    icon: <ToastImg />,
                    toastId: customId,
                });
                setIsEditForm(false);
                setAddresToUpdate(null);
            }
        } catch (e) {
            if (e) {
                return <h3>Упс, щось пішло не так!</h3>;
            }
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FormAddressSchema}
        >
            {({ errors, touched, values }) => (
                <Form>
                    <ul className={cls.form_list}>
                        {!isFirstAdress && (
                            <>
                                <li className={cls.form_list__item}>
                                    <Input
                                        name='recieverName'
                                        type='text'
                                        label='Хто цей отримувач?'
                                        required={true}
                                        placeholder='(мама, брат, колега..)'
                                    />
                                    {touched.recieverName && errors.recieverName ? (
                                        <p className={cls.error}>{errors.recieverName}</p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>
                                    <Input
                                        name='name'
                                        type='text'
                                        label='Його прекрасне імʼя'
                                        required={true}
                                        placeholder='Введи імʼя'
                                    />
                                    {touched.name && errors.name ? (
                                        <p className={cls.error}>{errors.name}</p>
                                    ) : null}
                                </li>

                                <li className={cls.form_list__item}>
                                    <Input
                                        name='surname'
                                        type='text'
                                        label='Його прізвище'
                                        required={true}
                                        placeholder='Введи прізвище'
                                    />
                                    {touched.surname && errors.surname ? (
                                        <p className={cls.error}>{errors.surname}</p>
                                    ) : null}
                                </li>
                            </>
                        )}

                        <li className={cls.form_list__item}>
                            <Text text={'Номерочок'} align={TextAlign.LEFT} className={cls.label} />
                            <div className={cls.container__phone}>
                                <Phone setGetPhone={setGetPhone} initialPhone={initialPhone} />
                            </div>
                        </li>

                        <li className={cls.form_list__item}>
                            <SelectNew
                                title={'Область'}
                                options={areasArr?.map(({ id, name }) => ({
                                    value: id,
                                    label: name,
                                }))}
                                startValue={{ value: area.id, label: area.name }}
                                getOption={getIdArea}
                                isLoading={isLoading}
                            />
                        </li>

                        <li className={cls.form_list__item}>
                            <SelectNew
                                title={'Чудове місто'}
                                options={citiesArr?.slice().sort((a, b) => {
                                    const hasParenthesesA = /\([^()]*\)/.test(a.Description);
                                    const hasParenthesesB = /\([^()]*\)/.test(b.Description);
                                    if (!hasParenthesesA && hasParenthesesB) {
                                        return -1;
                                    } else if (hasParenthesesA && !hasParenthesesB) {
                                        return 1;
                                    } else {
                                        return a.Description.localeCompare(b.Description);
                                    }
                                }).map((item, i) => ({
                                    value: String(i),
                                    label: item.Description,
                                }))}
                                startValue={{ value: '001', label: city }}
                                getOption={getCity}
                                isLoading={isLoadingCities}
                            />
                        </li>

                        <li className={cls.form_list__item}>
                            <SelectNew
                                title={'Відділення Нової Пошти:'}
                                options={postOfficesAndBoxes?.postOffices?.map((item, i) => ({
                                    value: String(i),
                                    label: item.Description,
                                }))}
                                startValue={{ value: '001', label: office }}
                                getOption={getOffice}
                                disabled={!city || !!box || !!values.address}
                                isLoading={isLoadingWherehouses}
                            />
                        </li>

                        <li className={cls.form_list__item}>
                            <SelectNew
                                title={'Поштоматик:'}
                                options={postOfficesAndBoxes?.postBoxes?.map((item, i) => ({
                                    value: String(i),
                                    label: item.Description,
                                }))}
                                startValue={{ value: '001', label: box }}
                                getOption={getBox}
                                disabled={!city || !!office || !!values.address}
                                isLoading={isLoadingWherehouses}
                            />
                        </li>

                        <li className={cls.form_list__item}>
                            <Input
                                name='address'
                                type='text'
                                label='Доставка жвавим курʼєром:'
                                placeholder='Введи адресу'
                                disabled={!city || !!box || !!office}
                            />
                            {touched.address && errors.address ? (
                                <p className={cls.error}>{errors.address}</p>
                            ) : null}
                        </li>
                    </ul>

                    <ul className={cls['form-btns-list']}>
                        <li className={cls['form-btns-list_item']}>
                            <Button
                                type={'submit'}
                                theme={ButtonTheme.PRIMARY}
                                className={cls.btn}
                                aria-label='Form Submit'
                                disabled={!area || !city || (!office && !box && !values.address)}
                            >
                                {isCreating || isUpdating ? (
                                    <SpinnerDots />
                                ) : (
                                    <Text btnText={'Зберегти'} />
                                )}
                            </Button>
                        </li>
                        <li className={cls['form-btns-list_item']}>
                            <Button
                                type={'button'}
                                theme={ButtonTheme.PRIMARY}
                                className={cls.btn}
                                aria-label='Form Back'
                                disabled={isFirstAdress}
                                onClick={handleBackButton}
                            >
                                <Text btnText={'Назад'} />
                            </Button>
                        </li>
                    </ul>
                </Form>
            )}
        </Formik>
    );
};
