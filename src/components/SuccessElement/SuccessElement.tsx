import SuccessImage from '@/images/success_img.webp';
import Image from 'next/image';

import cls from './SuccessElement.module.scss';

export const SuccessElement = () => {
    return (
        <div className={cls['container']}>
            <div className={cls['image-box']}>
                <Image
                    className={cls['image']}
                    src={SuccessImage}
                    alt={'Позначка вдалої дії'}
                    width='23'
                    height='19'
                    loading='lazy'
                />
            </div>
        </div>
    );
};
