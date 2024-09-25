import Link from 'next/link';
import cls from './DevInfo.module.scss';
import Image from 'next/image';
import Heart from '@/images/footer/ilovemyteam_logo.png';

const DEV_LINK = 'https://www.ilovemyteam.online/';
const DEV_LINK_2 = 'https://www.ilovemyteam.online/ua?option=2#team';
const DEV_LINE_TEXT_1 = 'Розроблено командою Смачно!';
const DEV_LINE_TEXT_2 = ' за підтримки ';
const DEV_LINE_TEXT_3 = ' Всі права захищені';

export const DevInfo = () => {
    return (
        <div className={cls['dev-line']}>
            <Link
                href={DEV_LINK_2}
                target='_blank'
                rel='nofollow noopener noreferrer'
                aria-label={'Developers Team'}
                className={cls['dev-line_team']}
            >
                {DEV_LINE_TEXT_1}
            </Link>

            {DEV_LINE_TEXT_2}

            <Link
                href={DEV_LINK}
                target='_blank'
                rel='nofollow noopener noreferrer'
                aria-label={'Developers Team'}
                className={cls['dev-line_heart']}
            >                
                <Image
                    src={Heart}
                    alt={'Серце команди'}
                    width={88}
                    height={20}
                />                
                © 2024                 
            </Link>

            {DEV_LINE_TEXT_3}
        </div>
    )
};
