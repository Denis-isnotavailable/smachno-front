'use client';

import { Input } from '@/components/Input/Input';
import { Text } from '@/components';
import { TextAlign } from '@/components/Text/Text';
import { Phone } from '@/containers/AuthPage/components/RegisterForm/Phone/Phone';
import cls from './TemplateAdressOrder.module.scss';
import { Loading } from '@/components/Loading';

interface IUser {
    email: string;
}
interface IRecipient {
    firstName: string;
    surname: string;
    phone: string;
    email: string;
    area: string;
    city: string;
    novaPostLocker: string;
    novaPostOffice: string;
    personalAddress: string;
    user: IUser;
}
interface TemplateAdressOrderProp {
    idRecipient: string;
    isLoading: boolean;
    recipientById: IRecipient;
}

export const TemplateAdressOrder = ({
    idRecipient,
    recipientById,
    isLoading,
}: TemplateAdressOrderProp) => {
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                idRecipient !== '001' && (
                    <ul className={cls.container__input}>
                        <li>
                            <Input
                                type={'text'}
                                name={'name'}
                                label={'Твоє чудове імʼя'}
                                disabled={idRecipient !== '001'}
                                value={recipientById?.firstName}
                            />
                        </li>
                        <li>
                            <Input
                                type={'text'}
                                name={'surname'}
                                label={'Твоє прекрасне прізвище'}
                                disabled={idRecipient !== '001'}
                                value={recipientById?.surname}
                            />
                        </li>
                        <li>
                            <Text
                                text={'Твій номерочок'}
                                align={TextAlign.LEFT}
                                className={cls.label}
                            />
                            <div className={cls.container__phone}>
                                <Phone
                                    setGetPhone={() => {}}
                                    initialPhone={recipientById?.phone}
                                    disabled={idRecipient !== '001'}
                                />
                            </div>
                        </li>
                        <li>
                            <Input
                                type={'email'}
                                name={'email'}
                                label={'Твоя пошта'}
                                disabled={idRecipient !== '001'}
                                value={recipientById?.user.email}
                            />
                        </li>
                        <li>
                            <Input
                                type={'text'}
                                name={'area'}
                                label={'Твоя область'}
                                disabled={idRecipient !== '001'}
                                value={recipientById?.area}
                            />
                        </li>
                        <li>
                            <Input
                                type={'text'}
                                name={'city'}
                                label={'Твоє чудове місто'}
                                disabled={idRecipient !== '001'}
                                value={recipientById?.city}
                            />
                        </li>
                        {recipientById?.novaPostOffice && (
                            <li>
                                <Input
                                    type={'text'}
                                    name={'novaPostOffice'}
                                    label={'Номер відділення'}
                                    disabled={idRecipient !== '001'}
                                    value={recipientById?.novaPostOffice}
                                />
                            </li>
                        )}
                        {recipientById?.novaPostLocker && (
                            <li>
                                <Input
                                    type={'text'}
                                    name={'novaPostLocker'}
                                    label={'Поштоматик'}
                                    disabled={idRecipient !== '001'}
                                    value={recipientById?.novaPostLocker}
                                />
                            </li>
                        )}
                        {recipientById?.personalAddress && (
                            <li>
                                <Input
                                    type={'text'}
                                    name={'novaPostLocker'}
                                    label={'Доставка жвавим курʼєром'}
                                    disabled={idRecipient !== '001'}
                                    value={recipientById?.personalAddress}
                                />
                            </li>
                        )}
                    </ul>
                )
            )}
        </>
    );
};
