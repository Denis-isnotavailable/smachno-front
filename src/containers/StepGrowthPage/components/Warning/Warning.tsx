import Image from 'next/image';
import ImgWarning from '@/images/stepsOrder/warning.webp';

import cls from './Warning.module.scss';

interface WarningProps {
    name: string;
}
export const Warning = ({ name }: WarningProps) => {
    return (
        <div className={cls.container}>
            <Image
                src={ImgWarning}
                alt={'Попередження'}
                width={38}
                height={143}
                className={cls.img}
            />
            <p className={cls.text}>
                {`Так, як ${name.toLowerCase()} - один із небагатьох продуктів, які не відправляються Новою Поштою, то ти їх можеш забрати особисто в Києві.
                Я тобі напишу завчасно і дам координати. Мур`}
            </p>
        </div>
    );
};
