import { Button, ButtonTheme, Text, ButtonClose } from '@/components';

import cls from './EvaluateSite.module.scss';
import { RatingBlock } from './RatingBlock/RatingBlock';
import { EmailBlock } from './EmailBlock/EmailBlock';
import { SocialsBlock } from './SocialsBlock/SocialsBlock';

const HEADING = 'Як тобі наш сайт?';
const BUTTON_NAME = 'Готово!';

export const EvaluateSite = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className={cls['evaluate-site-modal']}>
            <div className={cls['close-button-box']}>
                <ButtonClose onClose={onClose} />
            </div>

            <Text text={HEADING} className={cls['evaluate-site-heading']} />

            <div className={cls['rating-block']}>
                <RatingBlock />
            </div>

            <div className={cls['email-block']}>
                <EmailBlock />
            </div>

            <SocialsBlock />            

            <Button
                type={'button'}
                theme={ButtonTheme.PRIMARY}
                className={cls['button-evaluate-site']}
                onClick={onClose}
            >
                {BUTTON_NAME}
            </Button>
        </div>
    )
};
