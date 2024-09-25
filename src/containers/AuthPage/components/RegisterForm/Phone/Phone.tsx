'use client';

import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useEffect, useState } from 'react';
import cls from './Phone.module.scss';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};

// const filteredCountries = defaultCountries.filter((country) => {
//     const { iso2 } = parseCountry(country);
//     return ['ua'].includes(iso2);
// });

interface GetPhoneProp {
    initialPhone?: string | null;
    setGetPhone: (phone: string) => void;
    disabled?: boolean;
}
export const Phone = ({ setGetPhone, initialPhone, disabled }: GetPhoneProp) => {
    const [phone, setPhone] = useState('');
    const isValid = isPhoneValid(phone);

    useEffect(() => {
        if (initialPhone) {
            setPhone(initialPhone);
        }
    }, [initialPhone]);

    useEffect(() => {
        if (isValid) {
            setGetPhone(phone);
        }
    }, [isValid, phone, setGetPhone]);

    return (
        <div className={cls.container}>
            <PhoneInput
                defaultCountry='ua'
                value={phone}
                onChange={(phone) => setPhone(phone)}
                // countries={filteredCountries}
                disabled={disabled}
            />
            {!isValid && <div className={cls.error}>Невірний номер </div>}
        </div>
    );
};
