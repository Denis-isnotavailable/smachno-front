import cls from './SliderList.module.scss';
import { memo } from 'react';
import { ReviewCard } from '@/components/ReviewCard/ReviewCard';
import useWindowSize from '@/hooks/useWindowSize';

interface ReviewCard {
    id: number;
    reviewImage: string;
    reviewUrl: string;
    text: string;
}
interface SliderListProps {
    currentIndex: number;
    getReviews: ReviewCard[];
}

export const SliderList = memo(({ currentIndex, getReviews }: SliderListProps) => {
    const devices = useWindowSize();

    let slidesCount = 1;
    if (devices.isTablet) slidesCount = 2;
    if (devices.isDesktop) slidesCount = 3;

    return (
        <ul className={cls.container}>
            {getReviews &&
                [...getReviews, ...getReviews]
                    .slice(currentIndex, currentIndex + slidesCount)
                    .map((item) => {
                        return (
                            <li key={item.id}>
                                <ReviewCard
                                    img={item.reviewImage}
                                    link={item.reviewUrl}
                                    alt={item.text}
                                    width={308}
                                    height={292}
                                />
                            </li>
                        );
                    })}
        </ul>
    );
});
