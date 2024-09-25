import Link from 'next/link';
import cls from './DocsList.module.scss';

const DOCS = [
    { id: 1, href: '/confidentiality-policy', ariaLabel: 'Confidential policy docs', name: 'Політика конфіденційності' },
    { id: 2, href: '/public-offer-agreement', ariaLabel: 'Public offer agreement', name: 'Договір публічної оферти' },
    { id: 3, href: '/delivery-terms', ariaLabel: 'Delivery terms', name: 'Умови доставки' },
];

export const DocsList = () => {
    return (
        <ul className={cls['docs-list']} >
            {
                DOCS.map(({ id, href, ariaLabel, name }) => 
                    <li key={id} className={cls['docs-list_item']} >
                        <Link
                            href={href}
                            // target='_blank'
                            // rel='nofollow noopener noreferrer'
                            aria-label={ariaLabel}
                            className={cls['docs-list_item_link']}
                        >                            
                            {name}                        
                        </Link>
                    </li>
                )
            }
        </ul>
    )
};
