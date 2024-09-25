import cls from './AddressList.module.scss';
import Image from 'next/image';
import LocationImage from '@/images/map-mark.webp';
import NpLogo from '@/images/np-logo.webp';

export const AddressList = ({city, postAddress}: {city: string, postAddress: string}) => {
    return (
        <ul className={cls['contacts-list']}>                
            <li className={cls['contacts-list_item']}>
                <div className={cls['image-box']}>
                    <Image
                        src={LocationImage}
                        alt={'Локація'}
                        width={44}
                        height={44}
                        loading={'lazy'}
                    />
                </div>
                <span>{ `Місто ${city}` }</span>
            </li>
            <li className={cls['contacts-list_item']}>
                <div className={cls['image-box']}>
                    <Image
                        src={NpLogo}
                        alt={'Логотип нової пошти'}
                        width={44}
                        height={44}
                        loading={'lazy'}
                    />
                </div>
                <span>{ postAddress }</span>
            </li>
        </ul>
    )
};
