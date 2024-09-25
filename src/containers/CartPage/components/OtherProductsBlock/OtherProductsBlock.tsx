'use client'
import { Text, Button, ButtonTheme } from '@/components';
import cls from './OtherProductsBlock.module.scss';
import { ProductsImageList } from './ProductsImageList/ProductsImageList';
import Link from 'next/link';
import { AwaitLetterButton } from '@/components/Button/AwaitLetterButton/AwaitLetterButton';
import { useState } from 'react';

const HEADING_TEXT_FIRST = 'Також ми вирощуємо інші продукти.';
const HEADING_TEXT_SECOND = 'Вони ще наливаються соком, але ти вже можеш їх';
const DESCRIPTION =
    'Якщо бажаєш дізнатися першим про продукти, які вже дозріли, ми можемо відправити тобі пісьмо на поштоньку';
const BUTTON_ORDER = 'Замовити на виріст';


export const OtherProductsBlock = () => {
    const [isProductsForGrowth, setIsProductsForGrowth] = useState(false);
    return (
        <section className={cls['section']}>
            {isProductsForGrowth && <div className={cls['heading-box']}>
                <div>
                    <Text
                        text={HEADING_TEXT_FIRST}
                        className={`${cls['heading-text']} ${cls['heading-text_first-part']}`}
                    />
                    <Text
                        text={HEADING_TEXT_SECOND}
                        className={cls['heading-text']}
                    />
                </div>

                <Link href={'/growth'}>
                    <Button
                        type='button'
                        theme={ButtonTheme.PRIMARY}
                        className={cls['order-button']}
                    >
                        {BUTTON_ORDER}
                    </Button>
                </Link>
                
            </div>}

            <ProductsImageList setIsProductsForGrowth={setIsProductsForGrowth} />

            <div>
                <Text text={DESCRIPTION} className={cls['description-text']} />

                <AwaitLetterButton />
            </div>
        </section>
    );
};
