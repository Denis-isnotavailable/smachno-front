import cls from './FailedOrder.module.scss';
import { Button, ButtonTheme, Text } from '@/components';
import Image from 'next/image';
import ImgCat from '@/images/cat_sad.webp';
import Link from 'next/link';

export const FailedOrder = () => {    

    return (
        <section className={cls.container}>
            
            <Text title={'Вибач!'} />
            <p className={cls.text}>Щось пішло не так і твоє замовлення не оформлене, спробуй ще раз</p>
            <div className={cls.container__img}>
                <Image className={cls.img} src={ImgCat} alt='Кіт засмучений' width={422} />
            </div>
        
            <ul className={cls.buttons_list}>
                <li>
                    <Link href={'/step-yourself'} className={cls.container__btn}>
                        <Button type={'button'} theme={ButtonTheme.SECONDARY}>
                            <Text btnText={'Оформити ще раз'} />
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link href={'/'} className={cls.container__btn}>
                        <Button type={'button'} theme={ButtonTheme.SECONDARY}>
                            <Text btnText={'На головну сторінку'} />
                        </Button>
                    </Link>
                </li>
            </ul>

        </section>
    );
};
