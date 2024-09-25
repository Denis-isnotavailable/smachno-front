import Image from 'next/image';
import cls from './hero.module.scss';
import cat from '@/images/hero/heroCat.webp';
import shadow from '@/images/hero/shadow.webp';
import { heroData } from '@/db/heroData';

export const Hero = () => {
    return (
        <div className={cls.container}>
            <div className={cls.ellipse}>
                <Image src={cat} alt={'Cat'} className={cls.cat} priority={true}/>
                <Image src={shadow} alt={'Shadow'} className={cls.shadow} priority={true} />
                <div className={cls.veggies}>
                    {heroData.map((el, index) => {
                        const style = {
                            '--i': index + 1,
                        } as React.CSSProperties;
                        return (
                            <div
                                className={cls.block}
                                key={el.key}
                                style={style}
                            >
                                <Image
                                    src={el.src}
                                    alt={el.alt}
                                    priority={true}
                                    //className={el.style}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
