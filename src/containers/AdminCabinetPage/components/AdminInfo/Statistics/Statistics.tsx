import { Button, ButtonTheme } from '@/components';
import cls from './Statistics.module.scss';

interface StatisticsProps {
    setCurrentOperation: (value: string) => void;
}

const BUTTON_BACK = '<-- Назад';

export const Statistics = ({ setCurrentOperation }: StatisticsProps) => {

    const handleBackBtnClick = () => {
        setCurrentOperation('');
    }

    return (
        <div>
            <Button
                type='button'
                theme={ButtonTheme.CLEAR}
                className={cls['back-button']}
                aria-label='Redact accaunt'
                onClick={handleBackBtnClick}
            >
                {BUTTON_BACK}                        
            </Button>
            <h1>Statistics</h1>
        </div>
    )
};
