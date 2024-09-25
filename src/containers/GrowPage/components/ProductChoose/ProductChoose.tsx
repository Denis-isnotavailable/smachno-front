import cls from './ProductChoose.module.scss';
import Image from 'next/image';
import ImgCat from '@/images/cat_rake.webp';
import { ProductChooseList } from '@/containers/GrowPage/components/ProductChoose/ProductChooseList/ProductChooseList';

export const ProductChoose = () => {
    return (
        <section className={cls.container}>
            <h3 className={cls.container__title}>Обери свій продукт</h3>
            <ProductChooseList />
            <Image
                className={cls.img}
                src={ImgCat}
                alt='Кіт з граблями'
                loading='lazy'
                width={338}
                height={338}
            />
        </section>
    );
};
