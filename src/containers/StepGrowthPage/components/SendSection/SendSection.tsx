import Image from 'next/image';
import ImgClock from '@/images/formOrder/clock.webp';
import ImgLetter from '@/images/formOrder/letter.webp';
import { Text } from '@/components';
import { getMonthNameFromDate } from '@/utils/convertDate';
import { IProduct } from '@/store/features/services/productService';

import cls from './SendSection.module.scss';

interface SendSectionProps {
    product: IProduct;
}
export const SendSection = ({ product }: SendSectionProps) => {
    return (
        <div className={cls.container}>
            <div className={cls.img}>
                <Image
                    className={cls.img__clock}
                    src={ImgClock}
                    alt={'Пісочні часи'}
                    width={40}
                    height={45}
                />
                <Text
                    text={`Очікуй ${product.name.toLowerCase()} приблизно у ${getMonthNameFromDate(product.seasonStart)}`}
                />
            </div>
            <div className={cls.img}>
                <Image
                    className={cls.img__letter}
                    src={ImgLetter}
                    alt={'Конверт'}
                    width={64}
                    height={40}
                />
                <Text text={'На твою пошту прийде лист з датою доставки'} />
            </div>
        </div>
    );
};
