'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import cls from './Slider.module.scss';
import ImgCatNorm from '@/images/cat_norm.webp';
import { Text, TextAlign } from '@/components/Text/Text';
import { Button, ButtonTheme } from '@/components/Button/Button';
import { SliderList } from './SliderList/SliderList';
import SvgDefault from '../../../../../public/assets/icons/arrowReviewsDefaultRight.svg';
import SvgHover from '../../../../../public/assets/icons/arrowReviewsHoverRight.svg';
import SvgPress from '../../../../../public/assets/icons/arrowReviewsPressedRight.svg';
import SvgHoverLeft from '../../../../../public/assets/icons/arrowReviewsHoverLeft.svg';
import SvgPressLeft from '../../../../../public/assets/icons/arrowReviewsPressedLeft.svg';
import SvgDefaultLeft from '../../../../../public/assets/icons/arrowReviewsDefaultLeft.svg';
import { ArrowBtn } from '@/components/Button/ArrowBtn';
import { usePaginationReviewQuery } from '@/store/features/services/reviewService';
import { Loading } from '@/components/Loading';

export const Slider = memo(() => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [hoveredLeft, setHoveredLeft] = useState(false);
    const [activeLeft, setActiveLeft] = useState(false);
    const [hoveredRight, setHoveredRight] = useState(false);
    const [activeRight, setActiveRight] = useState(false);
    const [getReviews, setGetReviews] = useState([]);
    const options = {
        order: 'DESC',
        page: 1,
        take: 6,
    };
    const { data, error, isLoading } = usePaginationReviewQuery(options);

    useEffect((): void => {
        if (data && data.data) {
            setGetReviews(data.data);
        }
    }, [data]);

    if (error) {
        return <h3>Упс, щось пішло не так!</h3>;
    }

    return (
        <section className={cls.container} id='comments'>
            <Text title={'Відгуки'} align={TextAlign.CENTER} />
            <div className={cls.slider}>
                <Button
                    aria-label='Previous testimonial'
                    theme={ButtonTheme.CLEAR}
                    type={'button'}
                    onMouseEnter={() => setHoveredLeft(true)}
                    onMouseLeave={() => setHoveredLeft(false)}
                    onMouseDown={() => {
                        setCurrentIndex(
                            (prevState) => (prevState - 1 + data.data.length) % data.data.length
                        );
                        setActiveLeft(true);
                    }}
                    onMouseUp={() => setActiveLeft(false)}
                >
                    <ArrowBtn
                        svgDefault={SvgDefaultLeft}
                        svgHover={SvgHoverLeft}
                        svgPress={SvgPressLeft}
                        hovered={hoveredLeft}
                        active={activeLeft}
                    />
                </Button>
                {isLoading ? (
                    <Loading />
                ) : (
                    <SliderList currentIndex={currentIndex} getReviews={getReviews} />
                )}
                <Button
                    aria-label='Next testimonial'
                    theme={ButtonTheme.CLEAR}
                    type={'button'}
                    onMouseEnter={() => setHoveredRight(true)}
                    onMouseLeave={() => setHoveredRight(false)}
                    onMouseDown={() => {
                        setCurrentIndex((prevState) => (prevState + 1) % data.data.length);
                        setActiveRight(true);
                    }}
                    onMouseUp={() => setActiveRight(false)}
                >
                    <ArrowBtn
                        svgDefault={SvgDefault}
                        svgHover={SvgHover}
                        svgPress={SvgPress}
                        hovered={hoveredRight}
                        active={activeRight}
                    />
                </Button>
            </div>
            <Link href={'/reviews'} rel='noopener noreferrer'>
                <Button type={'button'} theme={ButtonTheme.PRIMARY} className={cls.btn}>
                    <Text btnText={'Всі відгуки'} align={TextAlign.CENTER} />
                </Button>
            </Link>
            <Image
                className={cls.img}
                src={ImgCatNorm}
                alt={'Задоволений Рудий кіт'}
                width='166'
                height='178'
                loading='lazy'
            />
        </section>
    );
});
