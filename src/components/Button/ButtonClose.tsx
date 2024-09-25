import { Button, ButtonTheme } from './Button';
import { CloseIcon } from '@/utils/SVG/CloseIcon';

import cls from './Button.module.scss';

export const ButtonClose = ({ onClose }: { onClose: () => void }) => {
    return (
        <Button
            type={'button'}
            theme={ButtonTheme.CLEAR}
            onClick={onClose}
            className={cls['close-button']}
        >
            <CloseIcon addStyle={cls['close-icon']} />
        </Button>
    );
};
