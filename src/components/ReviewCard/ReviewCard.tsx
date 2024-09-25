import Image from 'next/image';
import cls from './ReviewCard.module.scss';
import Link from 'next/link';
import { memo } from 'react';
import ImageDefault from '@/images/image_default.webp';

interface ReviewCardProps {
    img: string;
    link: string;
    alt: string;
    width?: number;
    height?: number;
}

export const ReviewCard = memo((props: ReviewCardProps) => {
    const { img, link, alt, width, height } = props;
    return (
        <Link className={cls.reviewCard} href={link} rel='noopener noreferrer' target='_blank'>
            <Image
                src={img ? img : ImageDefault}
                alt={alt}
                width={width}
                height={height}
                priority
                className={cls.image}
            />
            <p className={cls.link}>Перейти за посиланням</p>
        </Link>
    );
});
