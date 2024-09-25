import Image from 'next/image';
import ImgCatAuth from '@/images/cat_auth.webp';

export const ToastImg = () => (
    <Image
        src={ImgCatAuth}
        alt={'Котик інформує'}
        width={32}
        height={32}
        loading={'lazy'}
    />
);


