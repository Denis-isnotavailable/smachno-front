import { Montserrat } from 'next/font/google';
import { Marmelad } from 'next/font/google';

export const montserrat = Montserrat({
    weight: ['300', '400', '500', '600'],
    subsets: ['cyrillic', 'latin'],
    variable: '--font-montserrat',
    display: 'swap',
});

export const marmelad = Marmelad({
    weight: ['400'],
    subsets: ['cyrillic', 'latin'],
    variable: '--font-marmelad',
    display: 'swap',
});
