import { StaticImageData } from 'next/image';
import { ServiceTheme } from '@/containers/GrowPage/components/Service/Service';
import ImgCatOk from '@/images/cat_ok.webp';
import IngCatCap from '@/images/cat_cap.webp';
import IngCatWriting from '@/images/cat_writing.webp';
import IngCatPeaceful from '@/images/cat_peaceful.webp';
import IngCatSled from '@/images/cat_sled.webp';

interface CardsList {
    id: number;
    text: string;
    img: StaticImageData;
    alt: string;
    theme: ServiceTheme;
}
export const serviceCards: CardsList[] = [
    {
        id: 0,
        text: 'Замовлення на виріст - це крутяцька послуга, яка гарантує тобі продукт, як тільки він дозріє',
        img: ImgCatOk,
        alt: 'Кіт показує "Ok"',
        theme: ServiceTheme.IMGRIGHT,
    },
    {
        id: 1,
        text: 'Замовити на виріст - це коли не сезон, але ти хочеш бути впевненим, що матимеш якісний продукт першим',
        img: IngCatCap,
        alt: 'Кіт у шапці',
        theme: ServiceTheme.IMGLEFT,
    },
    {
        id: 2,
        text: 'Замовити на виріст - це можливість залишити послання біля свого кущика, поки він росте. І спосерігати ріст саме твого продукту',
        img: IngCatWriting,
        alt: 'Кіт пише "Путін Ху..."',
        theme: ServiceTheme.IMGRIGHT,
    },
    {
        id: 3,
        text: 'Замовити на виріст - це бути спокійним, що ніхто не зʼїсть твій продукт, поки ти думав купити сьогодні чи завтра',
        img: IngCatPeaceful,
        alt: 'Кіт спокійний',
        theme: ServiceTheme.IMGLEFT,
    },
    {
        id: 4,
        text: 'Замовити на виріст - це готувати санчата влітку (а свій власний кущик помідорів замовити ще взимку)',
        img: IngCatSled,
        alt: 'Кіт готується до зими влітку',
        theme: ServiceTheme.IMGRIGHT,
    },
];
