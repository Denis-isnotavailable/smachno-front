import { Button, ButtonTheme, Text } from '@/components';
import cls from './NextStep.module.scss';
import Link from 'next/link';

export const NextStep = () => {
    return (
        <div className={cls.container}>
            <p className={cls.container__text}>
                Я перевірив, все правильно. Можна лапкою клацнути
            </p>
            <Link href={'/step-order'}>
                <Button type={'button'} theme={ButtonTheme.M}>
                    <Text btnText={'Далі'} />
                </Button>
            </Link>
        </div>
    )
}