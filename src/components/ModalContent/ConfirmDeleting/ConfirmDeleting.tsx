import { Button, ButtonClose, ButtonTheme, SpinnerDots, Text } from '@/components';
import cls from './ConfirmDeleting.module.scss';
import Image from 'next/image';
import CatSad from '@/images/cat_sad.webp';

interface ConfirmDeletingProps {
    onClose: () => void,
    deleteFunction?: () => void,
    isLoading?: boolean,
}

const HEADING = 'Точно хочеш видалити?';
const BUTTON_YES = 'Так';
const BUTTON_NO = 'Ні';

export const ConfirmDeleting = ({ onClose, deleteFunction, isLoading }: ConfirmDeletingProps) => {

    return (
        <div className={cls['deleting-modal']}>
            <div className={cls['close-button-box']}>
                <ButtonClose onClose={onClose} />
            </div>

            <Text text={HEADING} className={cls['deleting-heading']} />

            <div className={cls['image-box']}>
                <Image
                    className={cls['image']}
                    src={CatSad}
                    alt={'Кіт сумує'}
                    width='182'
                    height='152'
                    loading='lazy'
                />
            </div>

            <ul className={cls['deleting-btns-list']}>
                <li className={cls['deleting-btns-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={`${cls['deleting-button']} ${cls['deleting-button_confirm']}`}
                        onClick={deleteFunction}
                    >                        
                        {isLoading ? <SpinnerDots /> : BUTTON_YES}                
                    </Button>
                </li>

                <li className={cls['deleting-btns-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={`${cls['deleting-button']} ${cls['deleting-button_abort']}`}
                        onClick={onClose}
                    >                        
                        {BUTTON_NO}
                    </Button>
                </li>
            </ul>
        </div>
    )
};
