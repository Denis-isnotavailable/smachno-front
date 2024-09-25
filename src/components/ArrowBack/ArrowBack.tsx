"use client"

import { memo } from 'react';
import Link from 'next/link';
import { Button, ButtonTheme } from '@/components';
import { ArrowBackIcon } from '@/utils/SVG/ArrowBack';
import cls from './ArrowBack.module.scss';
import { useRouter } from 'next/navigation';

interface ArrowBackProps {
    path?: string;
    text?: string;
    prevPage?: boolean
}
export const ArrowBack = memo((props: ArrowBackProps) => {
    const router = useRouter();
    const { path, text, prevPage } = props;

    if(prevPage){
        return (
            <Button
                type={'button'}
                theme={ButtonTheme.CLEAR}
                className={cls.btn}
                onClick={() => router.back()}
            >
                <ArrowBackIcon addStyle={cls.icon} />
            </Button>
        );
    }

    return (
        <Link href={path || '/'} className={cls.link}>
            <Button
                type={'button'}
                theme={ButtonTheme.CLEAR}
                className={cls.btn}
            >
                <ArrowBackIcon addStyle={cls.icon} />
                {text && <p>{text}</p>}
            </Button>
        </Link>
    );
});
