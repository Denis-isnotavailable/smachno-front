'use client';

// import { Text } from '@/components';
import cls from './SingleFaq.module.scss';
// import { TextAlign } from '@/components/Text/Text';
import Image from 'next/image';
import { useState } from 'react';
interface Props {
    upperText: string;
    lowerText: string;
}

export const SingleFaq = ({ upperText, lowerText }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleButtonStatus = () => setIsOpen((prev) => !prev);

    const iconClass = `${cls.arrow} ${isOpen ? cls.arrowDown : ''}`;
    const lowerTextClass = `${cls.lowerText} ${isOpen ? cls.fullHeight : cls.zeroHeight}`;

    return (
        <li className={cls.container}>
            <button onClick={toggleButtonStatus} className={cls.container_btn}>
                <div className={cls.upperText}>
                    {/* <Text text={upperText} align={TextAlign.LEFT} /> */}
                    <p className={`text ${cls['align-left']}`}>{upperText}</p>

                    <Image
                        src={'/assets/icons/faqArrow.svg'}
                        alt={'Faq Arrow'}
                        width={24}
                        height={24}
                        className={iconClass}
                    />
                </div>
                <div className={lowerTextClass}>
                    {/* <Text text={lowerText} align={TextAlign.LEFT} className={cls['text-padding']} /> */}
                    <p className={`text ${cls['text-padding']} ${cls['align-left']}`}>
                        {lowerText}
                    </p>
                </div>
            </button>
        </li>
    );
};
