import { Button, ButtonTheme } from '@/components';
import { Text } from '@/components/Text/Text';
import cls from './NotFound.module.scss';
import cat from '@/images/notFound.webp';
import Image from 'next/image';
import Link from 'next/link';

export const NotFoundPage = () => {
    return (
        <section className={cls.container}>
            <Image src={cat} alt={'Кіт з заплюшеними очимами'} className={cls.cat} />
            <h1 className={cls.title}>404</h1>
            <p className={cls.description}>
                Сорі, але ця сторінка тимчасово недоступна
            </p>
            <Link href={'/'} className={cls.link}>
                <Button type={'button'} theme={ButtonTheme.SECONDARY}>
                    <Text btnText={'На головну сторінку'} />
                </Button>
            </Link>
        </section>
    );
};
