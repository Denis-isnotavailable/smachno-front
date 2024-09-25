'use client'

import cls from './ScrollUpButton.module.scss';
import { Button, ButtonTheme } from '@/components';
import CookieCarrot from '@/images/cookie_carrot.webp';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ScrollUpButton = () => {
    const [isHidden, setIsHidden] = useState(true);    
    const scroll_button_class = `${cls.scroll_button} ${isHidden && cls.scroll_button_hidden}`

    useEffect(() => {
        window.addEventListener('scroll', function() {
            if (window.scrollY > window.innerHeight * 0.8) setIsHidden(false);
            if (window.scrollY < window.innerHeight * 0.8) setIsHidden(true);
        });        
    }, []);    

    const handleScrollUpButtonClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <Button
            type='button'
            theme={ButtonTheme.CLEAR}
            className={scroll_button_class}
            onClick={handleScrollUpButtonClick}
        >
            <Image
                className={cls.image}
                src={CookieCarrot}
                alt={'Морква'}
                width='40'
                height='60'
                loading='lazy'
            />
        </Button>
    )
};
