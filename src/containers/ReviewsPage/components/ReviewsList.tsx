'use client';

import { usePaginationReviewQuery } from '@/store/features/services/reviewService';
import { useEffect, useState } from 'react';
import { Button, ButtonTheme, ReviewCard, Text } from '@/components';
import cls from './ReviewsList.module.scss';
import { ArrowBtn } from '@/components/Button/ArrowBtn';
import SvgDefault from '../../../../public/assets/icons/arrowReviewsDefaultRight.svg';
import SvgHover from '../../../../public/assets/icons/arrowReviewsHoverRight.svg';
import SvgPress from '../../../../public/assets/icons/arrowReviewsPressedRight.svg';
import { Loading } from '@/components/Loading';

interface ReviewCard {
    id: number;
    reviewImage: string;
    reviewUrl: string;
    text: string;
}

export const ReviewsList = () => {
    const [hoveredRight, setHoveredRight] = useState(false);
    const [activeRight, setActiveRight] = useState(false);
    const [reviews, setReviews] = useState<ReviewCard[]>([]);
    const [page, setPage] = useState(1);

    const options = {
        order: 'DESC',
        page,
        take: 6,
    };

    const { data, error, isLoading } = usePaginationReviewQuery(options);

    useEffect((): void => {
        if (!data) {
            return;
        }
        setReviews((prevState) => [...prevState, ...data.data]);
    }, [data]);


    const handleClick = () => {
        setPage((prevPage) => prevPage + 1);
    };

    if (error) {
        return <h3>Упс, щось пішло не так!</h3>;
    }

    return (
        <section className={cls.container}>
            <Text title={'Відгуки'} />
            {isLoading
                ? (
                    <Loading />
                )
                : <ul className={cls.container__list}>
                    {data && reviews
                        .map(({ reviewImage, reviewUrl, text, id }: ReviewCard) => {
                            return (
                                <li key={id}>
                                    <ReviewCard
                                        img={reviewImage}
                                        link={reviewUrl}
                                        alt={text}
                                        width={308}
                                        height={292}
                                    />
                                </li>
                            );
                        })}
                </ul>
            }
            {(data?.meta.itemCount / data?.meta.page) > data?.meta.take && (
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={cls.container__icon}
                    type={'button'}
                    onMouseEnter={() => setHoveredRight(true)}
                    onMouseLeave={() => setHoveredRight(false)}
                    onMouseDown={() => setActiveRight(true)}
                    onMouseUp={() => {
                        setActiveRight(false);
                        handleClick();
                    }}
                >
                    <ArrowBtn
                        svgDefault={SvgDefault}
                        svgHover={SvgHover}
                        svgPress={SvgPress}
                        hovered={hoveredRight}
                        active={activeRight}
                    />
                </Button>
            )}
        </section>

    );
};