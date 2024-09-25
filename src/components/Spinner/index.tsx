import Image from 'next/image';
import cls from './Spinner.module.scss';
import { heroData } from '@/db/heroData';

export const Spinner = () => {
    return (
        <div
            className={cls.container}
            style={
                {
                    '--tan': Math.tan(Math.PI / heroData.length).toFixed(2),
                } as React.CSSProperties
            }
        >
            {heroData.map((el, index) => {
                const style = {
                    '--i': index,
                    '--m': heroData.length,
                } as React.CSSProperties;
                return (
                    <div className={cls.block} key={el.key} style={style}>
                        <Image
                            src={el.src}
                            alt={el.alt}
                            priority
                            className={cls.image}
                        />
                    </div>
                );
            })}
        </div>
    );
};
