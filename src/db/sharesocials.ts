import Facebook from '@/images/socials/facebook.webp';
import Telegram from '@/images/socials/telegram2.webp';
import Gmail from '@/images/socials/gmail.webp';
import Twitter from '@/images/socials/twitter.webp';
import LinkedIn from '@/images/socials/linkedin.webp';
import Instagram from '@/images/socials/instagram.webp';
import TikTok from '@/images/socials/tiktok.webp';

// export const URL = 'https://smachno-na-seli-front-chi.vercel.app/';
export const URL = 'https://batatfarm.com/';

export const socials = [
    {
        id: 1,
        image: Facebook,
        alt: 'Facebook',
        link: `https://www.facebook.com/sharer.php?u=${URL}`,
        isNeededPath: true
    },
    {
        id: 2,
        image: Telegram,
        alt: 'Telegram',
        link: `https://telegram.me/share/url?url=${URL}&text=Домашня городина з Полтавщини. 🍅🥕🌽🍉🍈🍠 Смачні сорти, стиглі плоди. Все для своїх. 😇🙏❤️ Смачно! як в дитинстві`,
        isNeededPath: true
    },
    {
        id: 3,
        image: Gmail,
        alt: 'Gmail',
        link: `mailto:?subject=Замов смакоту тут&body=${URL}`,
        isNeededPath: false
    },
    {
        id: 4,
        image: Twitter,
        alt: 'Twitter',
        link: `https://twitter.com/intent/tweet?text=${URL}`,
        isNeededPath: true
    },
    {
        id: 5,
        image: LinkedIn,
        alt: 'LinkedIn',
        link: `https://www.linkedin.com/shareArticle?mini=true&url=${URL}&text=Домашня городина з Полтавщини. 🍅🥕🌽🍉🍈🍠 Смачні сорти, стиглі плоди. Все для своїх. 😇🙏❤️ Смачно! як в дитинстві`,
        isNeededPath: true
    },
];

export const socialsForStories = [
    {
        id: 1,
        image: Instagram,
        alt: 'Instagram',
        link: `https://www.instagram.com/`,
        isNeededPath: false
    },
    {
        id: 2,
        image: TikTok,
        alt: 'TikTok',
        link: `https://www.tiktok.com/`,
        isNeededPath: false
    },
];