import React from 'react';
import cls from './Title.module.scss';
interface TitleProps {
    text: string;
    customClass?: string;
}

export const Title: React.FC<TitleProps> = ({ text, customClass = '' }) => {
    return <h2 className={`${cls.title} ${customClass}`}>{text}</h2>;
};
