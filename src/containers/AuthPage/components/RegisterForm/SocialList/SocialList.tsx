'use client';

import cls from './SocialList.module.scss';
import ImgViber from '@/images/socials/viber.webp';
import ImgTelegram from '@/images/socials/telegram.webp';
import ImgWhats from '@/images/socials/whats.webp';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SOCIALS = [
    { id: 1, img: ImgViber, label: 'Viber' },
    { id: 2, img: ImgTelegram, label: 'Telegram' },
    { id: 3, img: ImgWhats, label: 'WhatsApp' },
];

interface SocialListProps {
    getCheckMessenger: (value: string) => void;
    checkMessenger?: string;
};

export const SocialList = ({getCheckMessenger, checkMessenger}: SocialListProps) => {

    const [activeIndex, setActiveIndex] = useState(-1);
    const handleClick = (index: number): void => {
        setActiveIndex(index);
        getCheckMessenger(SOCIALS[index].label);
    };

    useEffect(() => {
        if (checkMessenger) {
            const currentIndex = SOCIALS.findIndex(({ label }) => label === checkMessenger);
            setActiveIndex(currentIndex);
        }
    }, [checkMessenger]);

    return (
        <ul className={cls.container}>
            {SOCIALS.map(( { id, img,  label }, index) => (
                <li key={id} >
                    <div className={cls.container__item}>
                        <Image src={img} alt={'Соціальна мережа'} width={24} height={24}/>
                        <span
                            className={index === activeIndex ? cls.active : cls.container__text}
                            onClick={() => handleClick(index)}
                        >
                            {label}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    )
}