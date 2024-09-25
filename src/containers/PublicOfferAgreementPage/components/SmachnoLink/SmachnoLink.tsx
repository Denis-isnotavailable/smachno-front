import cls from './SmachnoLink.module.scss';
import Link from 'next/link';

export const SmachnoLink = () => {
    return (
        <Link
            href={'https://batatfarm.com'}
            target='_blank'
            rel='nofollow noopener noreferrer'
            aria-label={'Smachno na seli Link'}
            className={cls.link}
        >                            
            https://batatfarm.com                        
        </Link>
    )
};

export const SmachnoLinkEmail = () => {
    return (
        <a
            href={'mailto:serhii.red.marchenko@gmail.com'}            
            aria-label={'Smachno na seli a'}
            className={cls.link_email}
        >                            
            serhii.red.marchenko@gmail.com                        
        </a>
    )
};
