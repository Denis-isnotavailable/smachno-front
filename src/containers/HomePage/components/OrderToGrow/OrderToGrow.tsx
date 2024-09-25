import Image from 'next/image';
import { memo } from 'react';
import cls from './OrderToGrow.module.scss';
import ImgCatLeaning from '@/images/cat_leaning.webp';
import { Text } from '@/components/Text/Text';
import { Button, ButtonTheme } from '@/components/Button/Button';
import Link from 'next/link';

export const OrderToGrow = memo(() => {
    return (
        <section className={cls.section}>
            <p className={'title'}>Замовити на виріст</p>

            <div className={cls.container}>
                <p className={`text ${cls.container__text}`}>
                    Замовити на виріст - це послуга, яка дозволить вирощувати саме твої кущики і
                    саме твій продукт, а не отримувати рандомні, але і без того найякісніші овочі.
                </p>

                <p className={`text ${cls.container__text}`}>
                    Ти можеш зробити власний напис біля кущика, який росте. Аби він наповнювався не
                    лише полтавським сонцем, але і твоєю енергетикою.
                </p>
            </div>

            <div className={cls.wrapper}>
                <Link className={cls.link} href={'/growth'} rel='noopener noreferrer'>
                    <Button type={'button'} theme={ButtonTheme.SECONDARY} className={cls.link__btn}>
                        <Text btnText={'Замовити на виріст'} />
                    </Button>
                </Link>
            </div>

            <div className={cls.thumb}>
                <Image
                    className={cls.img}
                    src={ImgCatLeaning}
                    alt={'Кіт Рудий вивчає'}
                    width='300'
                    height='220'
                    loading='lazy'
                />
            </div>
        </section>
    );
});
