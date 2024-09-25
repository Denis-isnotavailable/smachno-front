import Image from 'next/image';
import cls from './ChangeMessenger.module.scss';
import ImgCatPaper from '@/images/formRegister/cat_paper.webp';
import { SocialList } from '@/containers/AuthPage/components/RegisterForm/SocialList/SocialList';

interface ChangeMessengerProps {
    getCheckMessenger: (value: string) => void;
}
export const ChangeMessenger = ({ getCheckMessenger }: ChangeMessengerProps) => {
    return (
        <div className={cls.container}>
            <div>
                <p className={cls.container__title}>Який месенджер ти читаєш?</p>
                <p className={cls.container__text}>
                    (Вибір пріоритетного месенджера для надсилання підтверджень про замовлення та
                    оплату)
                </p>
                <SocialList getCheckMessenger={getCheckMessenger} />
            </div>
            <div className={cls.container__img}>
                <Image
                    src={ImgCatPaper}
                    alt={'Кіт читає газету'}
                    height={164}
                    width={200}
                    className={cls.img}
                />
            </div>
        </div>
    );
};
