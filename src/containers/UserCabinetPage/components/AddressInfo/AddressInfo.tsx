import Image from 'next/image';
import cls from './AddressInfo.module.scss';
import CatOnBoxes from '@/images/cat-on-box.webp';
import { FormAddress } from '../Forms/FormAddress/FormAddress';
import { useState } from 'react';
import { Button, ButtonTheme } from '@/components';
import { AddressItem } from './AddressItem/AddressItem';
import { useGetAddressesQuery } from '@/store/features/services/addressService';
import { Loading } from '@/components/Loading';
import { toast } from 'react-toastify';

const BUTTON_ADD_RECIEVER_MARK = '+';
const BUTTON_ADD_RECIEVER = 'Додати отримувача';
const ERROR_TEXT = 'Упс, щось пішло не так!';
const ERROR_TEXT_MAX_ADDRESS = 'Максимальна кількість адрес - 3';
const customId = "toastIdAddressInfo";

export interface IAddress {
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
};

export const AddressInfo = () => {
    const [isEditForm, setIsEditForm] = useState(false);
    const [addresToUpdate, setAddresToUpdate] = useState<IAddress | null>(null);
    const { data: addresses, isLoading, error } = useGetAddressesQuery('');

    const handleAddReciever = () => {
        if (addresses?.length < 3) {
            setIsEditForm(true)
        } else {
            toast.error(ERROR_TEXT_MAX_ADDRESS, {
                toastId: customId
            })
        }
    }


    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    if (isLoading) {
        return <Loading />;
    }
    
    return (
        <div className={`${cls['address-box']} ${isEditForm && cls['address-box_form-gap']}`} >
            <div className={cls.container__img}>
                <Image
                    src={CatOnBoxes}
                    alt={'Кіт на коробках'}
                    width={330}
                    height={330}
                    loading={'lazy'}
                />
            </div>

            <div>
                {isEditForm || addresses?.length === 0 ?
                    <FormAddress
                        setIsEditForm={setIsEditForm}
                        setAddresToUpdate={setAddresToUpdate}
                        addresToUpdate={addresToUpdate}
                        isFirstAdress={addresses?.length === 0}
                    /> :
                    <ul className={cls['address-list']}>
                        {
                            addresses?.map((address: IAddress) =>
                                <li key={address.id} className={cls['address-list_item']}>
                                    <AddressItem
                                        address={address}
                                        setAddresToUpdate={setAddresToUpdate}
                                        setIsEditForm={setIsEditForm}
                                    />
                                </li>)
                        }
                    </ul>
                }

                {!isEditForm && addresses?.length !== 0 && <Button
                    type='button'
                    theme={ButtonTheme.CLEAR}
                    className={cls['add-reciever-button']}
                    aria-label='Add reciever'
                    disabled={isEditForm || addresses?.length === 0}
                    onClick={handleAddReciever}
                >
                    <div className={cls['add-reciever-button_mark']}>{BUTTON_ADD_RECIEVER_MARK}</div>
                    {BUTTON_ADD_RECIEVER}
                </Button>}

            </div>
        </div>
    )
};
