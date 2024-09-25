import { Button, ButtonTheme, Text } from '@/components';
import Image from 'next/image';
import CookieCarrot from '@/images/cookie_carrot.webp';
import cls from './CookieNote.module.scss';
import { TextAlign } from '@/components/Text/Text';
import Link from 'next/link';

const INSTRUCTION = 'Ми використовуємо файли cookie для надання персоналізованого контенту.';
const ACCEPT_BUTTON_NAME = 'Ок';
const REFUSE_BUTTON_NAME = 'Розкажи більше';

export const CookieNote = ({ agreeWithCookie }: { agreeWithCookie: () => void }) => {
    return (
        <div className={cls['cookie-modal']}>

            <div className={cls['image-box']}>                
                <Image
                    className={cls['image']}
                    src={CookieCarrot}
                    alt={'Морква'}
                    width='112'
                    height='187'
                    loading='lazy'
                />                                
            </div>
            
            <div className={cls['content-box']}>
                <Text text={INSTRUCTION} align={TextAlign.LEFT} className={cls['instruction']} />
                

                <ul className={cls['buttons-list']}>
                    <li className={cls['buttons-list_item']}>
                        <Button
                            type={'button'}
                            theme={ButtonTheme.PRIMARY}
                            className={cls['button-accept']}
                            onClick={agreeWithCookie}
                        >
                            {ACCEPT_BUTTON_NAME}
                        </Button>
                    </li>

                    <li className={cls['buttons-list_item']}>
                        <Link
                            href={'/confidentiality-policy'}
                            target='_blank'
                            rel='nofollow noopener noreferrer'
                            aria-label={'Cookie'}
                            className={cls['button-link']}
                        >                            
                            {REFUSE_BUTTON_NAME}                            
                        </Link>                        
                    </li>
                </ul>
                
            </div>
           
        </div>
    )
};
