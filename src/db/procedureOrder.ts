import { StaticImageData } from 'next/image';
import ImgCare from '@/images/procedureOrder/care.webp';
import ImgCatCollects from '@/images/procedureOrder/cat_collects.webp';
import ImgCatLeaning from '@/images/procedureOrder/cat_leaning.webp';
import ImgPostman from '@/images/procedureOrder/cat_postman.webp';
import ImgOrder from '@/images/procedureOrder/order.webp';
import ImgPlant from '@/images/procedureOrder/plant.webp';
interface CardsList {
    id: number;
    text: string;
    img: StaticImageData;
    alt: string;
}
export const procedureOrder: CardsList[] = [
    {
        id: 0,
        text: 'Замовляєш продукт',
        img: ImgOrder,
        alt: 'Замовляємо продукт',
    },
    {
        id: 1,
        text: 'Я з любовʼю його саджаю',
        img: ImgPlant,
        alt: 'Саджаємо продукт',
    },
    {
        id: 2,
        text: 'Вирощую продукт',
        img: ImgCatLeaning,
        alt: 'Кіт Рудий вивчає',
    },
    {
        id: 3,
        text: 'Піклуюся про нього',
        img: ImgCare,
        alt: 'Пілкуємось',
    },
    {
        id: 4,
        text: 'Збираю саме твій врожай',
        img: ImgCatCollects,
        alt: 'Рудий кіт збирає урожай',
    },
    {
        id: 5,
        text: 'Відправляю тобі',
        img: ImgPostman,
        alt: 'Кіт несе посилку на НП',
    },
];
