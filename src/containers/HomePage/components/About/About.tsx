import { AboutData } from './types/types';
import cls from './about.module.scss';
import Image from 'next/image';

interface Props {
    aboutData: AboutData;
    isReverse: boolean;
}
export const About = (props: Props) => {
    const { aboutData, isReverse = false } = props;

    return (
        <section
            className={`${cls.container} ${isReverse ? cls.reverse : ''}`}
            id={aboutData.anchor}
        >
            <div className={cls.text}>
                <h2 className={cls.title}>{aboutData.title}</h2>
                <p className={`text ${cls.description}`}>
                    {aboutData.description.map((el) => (
                        <span className={cls.paragraph} key={el}>
                            {el}
                        </span>
                    ))}
                </p>
            </div>
            <Image
                src={aboutData.imageSrc}
                width={aboutData.imageWidth}
                height={aboutData.imageHeight}
                alt={aboutData.alt}
                quality={90}
                priority={true}
            />
        </section>
    );
};
