import cls from './EmailBlock.module.scss';
import Image from 'next/image';
import NoteImage from '@/images/procedureOrder/order.webp';
import { Text } from '@/components';

const EMAIL = 'smachno.na.seli@gmail.com';
const TEXT = 'Якщо є що додати, пиши сюди:';

export const EmailBlock = () => {
    return (
        <div>
            <div className={cls['email-box']}>
                <div className={cls['image-box']}>
                    <Image
                        className={cls['image']}
                        src={NoteImage}
                        alt={'Нотатки'}
                        width='68'
                        height='60'
                        loading='lazy'
                    />
                </div>

                <div className={cls['content']}>
                    <Text text={TEXT} className={cls['email-text']} />

                    <div className={cls['desktop-box']}>
                        <a
                            href={`mailto:${EMAIL}`}
                            className={cls['email']}
                        >
                            {EMAIL}
                        </a>
                    </div>
                </div>
            </div>   
            
            <div className={cls['mobile-box']}>
                <a
                    href={`mailto:${EMAIL}`}
                    className={cls['email']}
                >
                    {EMAIL}
                </a>
            </div>
            
        </div>
    )
};
