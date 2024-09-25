'use client'
import Image from 'next/image';
import CatImage from '@/images/cat_sad.webp';
import { Text, ButtonClose } from '@/components';
import { IAbsetnProduct } from '../FullCart/FullCart';
import cls from './AbsentProduct.module.scss';
import { AwaitLetterButton } from '@/components/Button/AwaitLetterButton/AwaitLetterButton';


const APPEARENCE_WARNING_TEXT = 'Повідомити коли зʼявиться знову';

interface AbsentProductProps {
    onClose: () => void,
    absentProducts: IAbsetnProduct[],
}


export const AbsentProduct = ({ onClose, absentProducts }: AbsentProductProps) => {
    const absentNames = absentProducts
        ?.map(({ name }) => name.toLowerCase())
        ?.filter((name, i, array) => array.indexOf(name) === i);
        
    const HEADING = `На жаль, деяку городину вже з'їли. Це ${absentNames?.join(', ')}.`;    

    return (
        <div className={cls['absent-modal']}>
            <div className={cls['close-button-box']}>
                <ButtonClose onClose={onClose} />
            </div>

            <div className={cls['content-box']}>
                <Text text={HEADING} className={cls['absent-modal-heading']} />

                <div className={cls['image-box']}>                
                    <Image
                        className={cls['image']}
                        src={CatImage}
                        alt={'Кіт сумує'}
                        width='229'
                        height='229'
                        loading='lazy'
                    />                                
                </div>

                <Text text={APPEARENCE_WARNING_TEXT} className={cls['appearence-text']} />

                <AwaitLetterButton />                
            </div>            
        </div>
    )
};
