import cls from './EmptyMarketPlug.module.scss';
import Image from 'next/image';
import EmptyMarketImage from '@/images/cat_sad.webp';
import { Text } from '@/components';

const HEADING = 'Зараз нема смаколиків на продаж!';

export const EmptyMarketPlug = ({heading}: {heading?: string}) => {
    return (
        <div className={cls['content-box']}>
            <Text text={heading ? heading : HEADING} className={cls['empty-market-heading']} />

            <div className={cls['image-box']}>
                <Image
                    className={cls['image']}
                    src={EmptyMarketImage}
                    alt={'Пуста магазин'}
                    width='230'
                    height='230'
                    loading='lazy'
                />
            </div>
        </div>
    )
};
