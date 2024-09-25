'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import styles from './ShareSocialsList.module.scss';

type ShareSocialsListProps = {
    socials: {
        id: number,
        image: StaticImageData,
        alt: string,
        link: string,
        isNeededPath: boolean,
    }[]
}

export const ShareSocialsList = ({socials}: ShareSocialsListProps) => {
    const pathname = usePathname();

    return (
        <ul className={styles['socials-list']}>
            {socials.map(({ id, image, alt, link, isNeededPath }) => (
                <li key={id} className={styles['socials-list_item']}>
                    <Link
                        className={styles['socials-list_link']}
                        href={`${link}${isNeededPath ? pathname : ''}`}
                        target='_blank'
                        rel='nofollow'
                    >
                        <Image
                            className={styles['social-image']}
                            src={image}
                            alt={alt}
                            width='56'
                            height='56'
                            loading='lazy'
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
};
