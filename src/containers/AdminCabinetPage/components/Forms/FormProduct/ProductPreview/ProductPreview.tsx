import cls from './ProductPreview.module.scss';
import { Button, ButtonTheme, Text } from '@/components';
import { TextAlign } from '@/components/Text/Text';
import Image from 'next/image';
import { removeTrailingZeros } from '@/utils/convertWeight';
import { createPriceText } from '@/utils/convertPrice';
import { useFormikContext } from 'formik';
import { InitialValues } from '../FormProduct';
import { useEffect, useState } from 'react';
import { convertImageForPreview } from '@/utils/convertImageForPreview';
import { LogoPreview } from './LogoPreview/LogoPreview';
import { CloseIcon } from '@/utils/SVG/CloseIcon';

interface IProductPreviewProps {
    packaging: string;
    unit: string;
}

export const ProductPreview = ({ packaging, unit }: IProductPreviewProps) => {
    const { values }: { values: InitialValues } = useFormikContext();
    const [imagePreview, setImagePreview] = useState<string | null>('');
    
    useEffect(() => {
        values?.productImage && convertImageForPreview(values.productImage, setImagePreview);
    }, [values.productImage]);
    
    const weightMin = removeTrailingZeros(Number(values?.weightMin));
    const weightMax = removeTrailingZeros(Number(values?.weightMax));
    const WEIGHT =
        weightMin === weightMax ? weightMin : `${weightMin}-${weightMax}`;
    const IS_DIMENTIONS_PRESENT =
        values?.dimensionsLength &&
        values?.dimensionsWidth &&
        values?.dimensionsHeight;
    const DIMENTIONS = `${values?.dimensionsLength} х ${values?.dimensionsWidth} х ${values?.dimensionsHeight} см`;
    const SEASON_START =
        values?.seasonStart &&
        new Date(values?.seasonStart).toLocaleDateString('uk-UK', {
            month: 'long',
            day: 'numeric',
        });
    const SEASON_END =
        values?.seasonEnd &&
        new Date(values?.seasonEnd).toLocaleDateString('uk-UK', {
            month: 'long',
            day: 'numeric',
        });
    const PRICE_TEXT =
        values &&
        createPriceText(
            packaging,
            unit,
            Number(values?.price),
            weightMin,
            weightMax
        ).split(' / ');
    
    return (
        <div className={cls.productModal} >            
            <LogoPreview productIcon={values?.productIcon ? values?.productIcon : ''} />

            <p className={cls['productModal__title']}>{values?.name}</p>
            <div className={cls['close-button-box']}>                
                <CloseIcon addStyle={cls['close-icon']} />
            </div>
            
            <div className={cls['productModal__image']}>
                {imagePreview ? (
                    <Image
                        src={imagePreview}
                        alt="Прев'ю фото"
                        width={358}
                        height={186}
                    />
                ) : (
                    <span>Зображення недоступне</span>
                )}
            </div>            
            
            <Text
                className={cls['productModal__desc']}
                text={values?.description}
                align={TextAlign.CENTER}
            />
            <div className={cls['productModal__details']}>
                <ul>
                    <li>
                        <span>Фасування: </span>
                        {packaging}
                    </li>
                    <li>
                        <span>Вага: </span>
                        {`${WEIGHT} ${unit}`}
                    </li>
                    {IS_DIMENTIONS_PRESENT && (
                        <li>
                            <span>Габарити: </span>
                            {DIMENTIONS}
                        </li>
                    )}
                </ul>

                <ul>
                    <li>
                        <span>Сезон</span>
                    </li>
                    <li>
                        <span>Відкриття: </span>
                        {SEASON_START}
                    </li>
                    <li>
                        <span>Закриття: </span>
                        {SEASON_END}
                    </li>
                </ul>
            </div>
            <div className={cls['productModal__price']}>
                {PRICE_TEXT && PRICE_TEXT[0]}
                <span
                    className={cls['productModal__price_quantity']}
                >{` / ${PRICE_TEXT && PRICE_TEXT[1]}`}</span>
            </div>

            {!values?.shipping && (
                <div className={cls['post-warning-box']}>
                    <Text text={`${values?.name} - продукт, який не відправляється`} className={cls['post-warning']} />
                    <Text text={`Новою Поштою.`} className={cls['post-warning']} />
                    <Text text={'Але ти його можеш отримати особисто в Києві.'} className={cls['post-warning']} />
                </div>                
            )}

            <div className={cls['productModal__btnGroup']}>
                <div className={cls['productModal__btnGroup-button']}>                    
                    <Button
                        type={'button'}
                        theme={ButtonTheme.CLEAR}
                        className={cls.link__btn}
                    >
                        <Text btnText={'Замовити'} />
                    </Button>
                </div>
                <div className={cls['productModal__btnGroup-button']}>                    
                    <Button
                        type={'button'}
                        theme={ButtonTheme.CLEAR}
                        className={`${cls.link__btn} ${cls.link__btn_wide}`}
                    >
                        <Text btnText={'Замовити на виріст'} />
                    </Button>
                </div>
            </div>
        </div>
    )
};
