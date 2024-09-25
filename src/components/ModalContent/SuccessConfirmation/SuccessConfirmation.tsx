import Image from 'next/image';
import cls from './SuccessConfirmation.module.scss';
import SuccessImage from '@/images/success_img.webp';

export const SuccessConfirmation = ({text}: {text: string}) => {
    return (
        <div className={cls['success-modal']}>
            <div className={cls['content-box']}>
                <span>{text}</span>
                <div className={cls['image-box']}>
                    <Image
                        className={cls['image']}
                        src={SuccessImage}
                        alt={'Позначка вдалої дії'}
                        width='32'
                        height='24'
                        loading='lazy'
                    />
                </div>
            </div>
        </div>
    )
};
