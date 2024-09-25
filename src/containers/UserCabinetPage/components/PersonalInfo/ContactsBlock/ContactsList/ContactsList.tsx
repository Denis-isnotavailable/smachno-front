import cls from './ContactsList.module.scss';
import Image from 'next/image';
import Envelop from '@/images/formOrder/letter.webp';
import PhoneWired from '@/images/phone-wired.webp';

const PHONE_ABSENT = 'Номер не вказано';

export const ContactsList = ({phone, email}: {phone?: string | number, email?: string}) => {
    return (
        <ul className={cls['contacts-list']}>                
            <li className={cls['contacts-list_item']}>
                <div className={cls['image-box']}>
                    <Image
                        src={PhoneWired}
                        alt={'Дротовий телефон'}
                        width={75}
                        height={45}
                        loading={'lazy'}
                    />
                </div>
                <span>{ phone ? phone : PHONE_ABSENT }</span>
            </li>
            <li className={cls['contacts-list_item']}>
                <div className={cls['image-box']}>
                    <Image
                        src={Envelop}
                        alt={'Конверт'}
                        width={61}
                        height={38}
                        loading={'lazy'}
                    />
                </div>
                <span className={cls['contacts-list_item_email']}>{ email }</span>
            </li>
        </ul>
    )
};
