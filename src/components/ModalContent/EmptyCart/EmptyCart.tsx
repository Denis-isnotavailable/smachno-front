import Image from 'next/image';
import CartImage from '@/images/cart_empty.webp';
import { Button, ButtonTheme, Text, ButtonClose } from '@/components';
import Link from 'next/link';

import cls from './EmptyCart.module.scss';

const HEADING = 'Твій кошик ще пустий';
const BUTTON_NAME = 'Наповнити кошик';

export const EmptyCart = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className={cls['empty-cart-modal']}>
            <div className={cls['close-button-box']}>
                <ButtonClose onClose={onClose} />
            </div>

            <div className={cls['content-box']}>
                <Text text={HEADING} className={cls['empty-cart-heading']} />

                <div className={cls['image-box']}>
                    <Image
                        className={cls['image']}
                        src={CartImage}
                        alt={'Пуста корзина'}
                        width='269'
                        height='180'
                        loading='lazy'
                    />
                </div>

                <Link href={'/order'}>
                    <Button
                        type={'button'}
                        theme={ButtonTheme.PRIMARY}
                        className={cls['button-empty-cart']}
                        onClick={onClose}
                    >
                        {BUTTON_NAME}
                    </Button>
                </Link>
            </div>
        </div>
    );
};
