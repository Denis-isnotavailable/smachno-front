'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ShareImage from '@/images/love_cat.webp';
import {
    Button,
    ButtonTheme,
    Text,
    SuccessElement,
    ButtonClose,
} from '@/components';
import { ShareIcon } from '@/utils/SVG/ShareIcon';
import { ShareSocialsList } from './ShareSocialsList/ShareSocialsList';
import { socials, socialsForStories, URL} from '@/db/sharesocials'

import cls from './ShareModal.module.scss';


const HEADING = 'Розкажи про смакоту друзям!';
const INSTRUCTION = 'Пошерь через cоціальні мережі';
const ALTERNATIVE_DESCRIPTION = 'Або закинь собі в сторіс';
const COPY_LINK_TEXT = 'Скопіювати посилання';

export const ShareModalContent = ({ onClose }: { onClose: () => void }) => {
    const [isCopySuccess, setIsCopySuccess] = useState(false);

    useEffect(() => {
        if (isCopySuccess) {
            const timer = setTimeout(() => {
                setIsCopySuccess(false);
            }, 2000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isCopySuccess]);

    const handleCopy = () => {
        navigator.clipboard.writeText(URL);
        setIsCopySuccess(true);
    };

    return (
        <div className={cls['share-modal']}>
            <div className={cls['close-button-box']}>
                <ButtonClose onClose={onClose} />
            </div>

            <div className={cls['content-box']}>
                <h2 className={cls['title']}>{HEADING}</h2>

                <Text text={INSTRUCTION} className={cls['instruction']} />

                <div className={cls['socials-box']}>
                    <ShareSocialsList socials={socials} />
                </div>                

                <Text
                    text={ALTERNATIVE_DESCRIPTION}
                    className={`${cls['instruction']} ${cls['alt-description']}`}
                />

                <div className={cls['socials-box']}>
                    <ShareSocialsList socials={socialsForStories} />
                </div>                

                <Button
                    type={'button'}
                    theme={ButtonTheme.CLEAR}
                    className={cls['link-box']}
                    onClick={handleCopy}
                >
                    <Text
                        text={COPY_LINK_TEXT}
                        className={`${cls['instruction']} ${cls['copy-link']}`}
                    />
                    <ShareIcon addStyle={cls['share-icon']} />
                    {isCopySuccess && (
                        <div className={cls['success-box']}>
                            <SuccessElement />
                        </div>
                    )}
                </Button>
            </div>

            <div className={cls['image-box']}>
                <Image
                    className={cls['image']}
                    src={ShareImage}
                    alt={'Кіт з серцем'}
                    width='171'
                    height='140'
                    loading='lazy'
                />
            </div>
        </div>
    );
};
