import cls from './Socials.module.scss';
import {
    // InstagramIcon,
    TelegramIcon,
    FacebookIcon,
    // TiktokIcon,
    YoutubeIcon,
    LinkedinIcon,
} from '../../utils/SVG/SocialIcons';
import Link from 'next/link';

const SOCIALS = [
    // {
    //     id: 1,
    //     Icon: InstagramIcon,
    //     link: 'https://www.instagram.com/',
    //     label: 'Link to Instagram',
    // },
    {
        id: 2,
        Icon: TelegramIcon,
        link: 'https://t.me/Smachno_NaSeli',
        label: 'Link to Telegram',
    },
    {
        id: 3,
        Icon: FacebookIcon,
        link: 'https://www.facebook.com/serhii.marchenko.ua',
        label: 'Link to Facebook',
    },
    {
        id: 4,
        Icon: YoutubeIcon,
        link: 'https://www.youtube.com/@smachno_na_seli',
        label: 'Link to Youtube',
    },
    // {
    //     id: 5,
    //     Icon: TiktokIcon,
    //     link: 'https://www.tiktok.com/',
    //     label: 'Link to TikTok',
    // },
    {
        id: 6,
        Icon: LinkedinIcon,
        link: 'https://www.linkedin.com/company/batatfarmcom',
        label: 'Link to Linkedin',
    },
];

export const Socials = () => {
    return (
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
    );
};
