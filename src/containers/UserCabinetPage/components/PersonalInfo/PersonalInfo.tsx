import Image from 'next/image';
import CatWithCoffee from '@/images/cat-coffee.webp';
import cls from './PersonalInfo.module.scss';
import { ContactsBlock } from './ContactsBlock/ContactsBlock';
import { useState } from 'react';
import { FormUser } from '../Forms/FormUser/FormUser';
import { FormChangePassword } from '../Forms/FormChangePassword/FormChangePassword';

export const PersonalInfo = () => {
    const [isEditForm, setIsEditForm] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);

    return (
        <div
            className={`${cls['personal-box']} ${isEditForm || (isChangePassword && cls['personal-box_form-gap'])}`}
        >
            <div className={cls.container__img}>
                <Image
                    src={CatWithCoffee}
                    alt={'Кіт в халаті з кавою'}
                    width={350}
                    height={350}
                    priority={true}
                />
            </div>

            {!isEditForm && !isChangePassword && (
                <ContactsBlock
                    setIsEditForm={setIsEditForm}
                    setIsChangePassword={setIsChangePassword}
                />
            )}

            {isEditForm && <FormUser setIsEditForm={setIsEditForm} />}

            {isChangePassword && (
                <FormChangePassword setIsChangePassword={setIsChangePassword} />
            )}
        </div>
    );
};
