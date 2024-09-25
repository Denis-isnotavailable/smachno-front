import { useEffect, useState } from 'react';
import cls from './LogoPreview.module.scss';
import Image from 'next/image';
import { convertImageForPreview } from '@/utils/convertImageForPreview';

export const LogoPreview = ({productIcon}: {productIcon: string | Blob}) => {
    const [logoPreview, setLogoPreview] = useState<string | null>('');

    useEffect(() => {
        convertImageForPreview(productIcon, setLogoPreview);
    }, [productIcon]);
    
    return (
        <div className={cls['productModal__logo']}>
            {logoPreview ? (
                <Image
                    src={logoPreview}
                    alt="Прев'ю лого"
                    width={142}
                    height={126}
                />
            ) : (
                <span>Зображення недоступне</span>
            )}
        </div>
    )
};
