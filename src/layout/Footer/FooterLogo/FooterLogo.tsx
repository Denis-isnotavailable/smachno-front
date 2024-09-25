import Image from 'next/image';
import FooterImage from '@/images/footer_cat.webp';

import cls from './FooterLogo.module.scss';

const TITLE_PART_ONE = 'Смачно';
const TITLE_PART_TWO = 'На селі';

export const FooterLogo = () => {
    return (
        <div className={cls['logo-box']}>
            <div className={cls['image-box']}>
                <Image
                    className={cls['image']}
                    src={FooterImage}
                    alt={'Кіт з тризубом'}
                    width='163'
                    height='172'
                    loading='lazy'
                />
            </div>

            <h2 className={cls['title']}>
                <p className={cls['title_part-one']}>{TITLE_PART_ONE}</p>
                <p className={cls['title_part-two']}>{TITLE_PART_TWO}</p>
            </h2>
        </div>
    );
};
