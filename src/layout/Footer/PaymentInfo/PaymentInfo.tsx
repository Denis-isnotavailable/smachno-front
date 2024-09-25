import cls from './PaymentInfo.module.scss';
import Image from 'next/image';
import VisaMasterCard from '@/images/footer/visa_mastercard.webp';
import Mono from '@/images/footer/monobank.webp';

export const PaymentInfo = () => {
    return (
        <div>
            <ul className={cls['payment-list']}>
                <li className={cls['payment-list_item']}>
                    <Image
                        src={VisaMasterCard}
                        alt={'Лого оплати Віза Майстеркард'}
                        width={90}
                        height={27}
                    />
                </li>

                <li className={cls['payment-list_item']}>
                    <Image
                        src={Mono}
                        alt={'Лого оплати монобанка'}
                        width={90}
                        height={26}
                    />
                </li>
            </ul>
        </div>
    )
};
