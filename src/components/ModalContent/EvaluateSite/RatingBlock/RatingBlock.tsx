'use client';
import { RateFive, RateFour, RateOne, RateThree, RateTwo } from '@/utils/SVG/RatingSvg';
import cls from './RatingBlock.module.scss';
import { Button, ButtonTheme, Text } from '@/components';
import { useCreateRatingMutation } from '@/store/features/services/ratingService';
import { useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';

const TEXT = 'В захваті!';
const RATE_LIST = [
    { rate: 1, Icon: RateOne },
    { rate: 2, Icon: RateTwo },
    { rate: 3, Icon: RateThree },
    { rate: 4, Icon: RateFour },
    { rate: 5, Icon: RateFive },
];
const ERROR_TEXT = 'Упс, щось пішло не так!';
const customId = "toastIdEvaluate";

interface FetchData {
    id?: number;
    rating?: number;
}

export const RatingBlock = () => {
    const [rating, setRating] = useState<number | null>(null)
    const [postRating] = useCreateRatingMutation();

    const handleSetRatingButtonClick = async (rate: number) => {
        

        try {
            const response:
                | {
                      data: FetchData;
                  }
                | { error?: FetchBaseQueryError | SerializedError | undefined } = await postRating({
                rating: rate,
            });

            if (response && 'error' in response) {                
                toast.error(ERROR_TEXT, {
                    icon: <ToastImg />,
                    toastId: customId,
                });
            }

            if (response && 'data' in response) {
                setRating(rate);

                toast.success('Рейтинг виставлено!', {
                    icon: <ToastImg />,
                    toastId: customId,
                });
            }
        } catch (e) {
            if (e) {
                return <h3>Упс, щось пішло не так!</h3>;
            }
        }
    }


    return (
        <div className={cls['rating-box']}>
            <Text text={TEXT} className={cls['rating-text']} />

            <ul className={cls['rating-list']}>

                {RATE_LIST.map(({ rate, Icon }) => 
                    <li className={cls['rating-list_item']} key={rate}>
                        <Button
                            type={'button'}
                            theme={ButtonTheme.CLEAR}
                            className={`${cls['button-rate']} ${rate === rating && cls['button-rate_active']}`}
                            onClick={() => handleSetRatingButtonClick(rate)}
                        >
                            <Icon addStyle={cls['rate-icon']} />
                        </Button>                        
                    </li>
                )}
            </ul>
        </div>
    );
};
