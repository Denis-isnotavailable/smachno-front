import cls from './SocialsBlock.module.scss';
import { Text } from '@/components';
import { CoffeeSvg } from '@/utils/SVG/CoffeeSvg';
import { LinkedinIcon, TelegramIcon } from '@/utils/SVG/SocialIcons';
import Link from 'next/link';

const SOCIALS = [    
    {
        id: 1,
        Icon: TelegramIcon,
        link: 'https://t.me/Susanna_Salata',
        label: 'Link to Telegram',
    },
    {
        id: 2,
        Icon: LinkedinIcon,
        link: 'https://www.linkedin.com/in/susanna-salata/',
        label: 'Link to Linkedin',
    },
];

const SOCIALS_TEXT = 'Замовити і собі крутяцький сайт';
const COFFEE_TEXT = 'Пригостити кавою творців';
const COFFEE_LINK = 'https://buymeacoffee.com/susanna.salata';

export const SocialsBlock = () => {
    return (
        <div className={cls['socials']}>

            <div className={cls['socials-box']}>

                <ul className={cls['socials-list']}>
                    {SOCIALS.map(({ id, Icon, link, label }) => (
                        <li key={id} className={cls['socials-list_item']}>
                            <Link
                                className={cls['socials-list_link']}
                                href={link}
                                target='_blank'
                                rel='nofollow noopener noreferrer'
                                aria-label={label}
                            >
                                <Icon addStyle={cls['icon']} />
                            </Link>
                        </li>
                    ))}
                </ul>
                
                <Text text={SOCIALS_TEXT} className={cls['socials-text']} />
            </div>

            <div className={cls['coffee-box']}>
                <CoffeeSvg addStyle={cls['coffee-icon']} />

                <Link
                    className={cls['coffee_link']}
                    href={COFFEE_LINK}
                    target='_blank'
                    rel='nofollow noopener noreferrer'
                    aria-label={'Coffee Link'}
                >
                    {COFFEE_TEXT}
                </Link>
            </div>
            
        </div>
    )
};
