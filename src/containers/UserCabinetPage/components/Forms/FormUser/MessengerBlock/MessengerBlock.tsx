import cls from './MessengerBlock.module.scss';
import { SocialList } from '@/containers/AuthPage/components/RegisterForm/SocialList/SocialList';
interface MessengerBlockProps {
    getCheckMessenger: (value: string) => void;
    checkMessenger: string;
};

const ERROR_MESSANGER = 'Обери зручний месенджер';

export const MessengerBlock = ({getCheckMessenger, checkMessenger}: MessengerBlockProps) => {
    return (
        <div className={cls.container}>
            
            {!checkMessenger && <p className={cls.container__error}>
                {ERROR_MESSANGER}
            </p>}

            <p className={cls.container__title}>
                Який месенджер ти читаєш?
            </p>
            <p className={cls.container__text}>
                (Вибір приорітетного месенджера для надсилання підтверджень про замовлення та оплату)
            </p>
            
            <SocialList getCheckMessenger={getCheckMessenger} checkMessenger={checkMessenger} />
            
        </div>
    )
};
