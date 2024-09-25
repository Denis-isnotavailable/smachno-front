import { Text } from '@/components';
import Image, { StaticImageData } from 'next/image';
import { classNames, Mods } from '@/utils/classNames';
import cls from './Service.module.scss';
import { TextAlign } from '@/components/Text/Text';

export enum ServiceTheme {
    IMGRIGHT = 'right',
    IMGLEFT = 'left',
}
interface ServiceProp {
    className?: string;
    text: string;
    img: StaticImageData;
    alt: string;
    theme: ServiceTheme;
}
export const Service = (props: ServiceProp) => {
    const { className, text, img, alt, theme } = props;

    const mods: Mods = {
        [cls[theme]]: true,
    };

    return (
        <div className={classNames(cls.service, mods, [className])}>
            <Text text={text} className={cls.service__text} align={TextAlign.LEFT} />
            <div className={cls.service__img}>
                <Image className={cls.img} src={img} alt={alt} loading={'lazy'} />
            </div>
        </div>
    );
};
