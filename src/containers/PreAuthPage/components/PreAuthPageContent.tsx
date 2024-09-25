import { Button, ButtonTheme,  Text } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import CatImage from '@/images/cat-choose.webp';

import cls from './PreAuthPageContent.module.scss';


const HEADING = 'Нагадай, будь ласка';
const TEXT_FAMILIAR = 'Ми вже знайомі?';
const TEXT_NOT_FAMILIAR = 'Чи треба познайомитися?';
const BUTTON_FAMILIAR = 'Увійти';
const BUTTON_NOT_FAMILIAR = 'Зареєструватися';

export const PreAuthPageContent = () => {
    return (
        <section className={cls['pre-auth-section']}>
            <Text text={HEADING} className={cls['pre-auth-heading']} />
            <div className={cls['pre-auth-box']}>
                <ul className={cls['pre-auth-list']}>
                    <li>
                        <Text text={TEXT_FAMILIAR} className={cls['item-name']} />
                        <Link href={'/login'}>
                            <Button
                                type={'button'}
                                theme={ButtonTheme.PRIMARY}
                                className={cls['button-pre-auth']}                                 
                            >
                                {BUTTON_FAMILIAR}
                            </Button>
                        </Link>
                    </li>
                    
                    <li>
                        <Text text={TEXT_NOT_FAMILIAR} className={cls['item-name']} />
                        <Link href={'/registration'}>
                            <Button
                                type={'button'}
                                theme={ButtonTheme.PRIMARY}
                                className={`${cls['button-pre-auth']} ${cls['button-pre-auth_reg']}`}                                 
                            >
                                {BUTTON_NOT_FAMILIAR}
                            </Button>
                        </Link>
                    </li>
                </ul>
                
                <div className={cls['image-box']}>                
                    <Image
                        className={cls['image']}
                        src={CatImage}
                        alt={'Кіт обирає'}
                        width='428'
                        height='428'
                        loading='lazy'
                    />                                
                </div>
            </div>
            
        </section>
    )
};
