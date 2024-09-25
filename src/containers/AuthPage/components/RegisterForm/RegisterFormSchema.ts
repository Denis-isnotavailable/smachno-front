import * as Yup from 'yup';

export const RegisterFormSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-]+$/, 'Тільки літери')
        .min(2, 'Більше 2 символів')
        .max(50, 'Не більше 50 символів')
        .trim()
        .required('Треба заповнити'),
    surname: Yup.string()
        .matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-]+$/, 'Тільки літери')
        .min(2, 'Більше 2 символів')
        .max(50, 'Не більше 50 символів')
        .trim()
        .required('Треба заповнити'),
    phone: Yup.string().matches(/^\+(?:[0-9] ?){11}[0-9]$/, 'Невірний номер'),
    email: Yup.string()
        .min(3, 'Більше 3 символів')
        .max(320, 'Не більше 320 символів')
        .email('Невірний формат')
        .matches(/^[A-Z0-9._%+-]+@(?!.*\.ru)[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Невірний формат')
        .required('Треба заповнити'),
    password: Yup.string()
        .min(8, 'Більше 8 символів')
        .max(50, 'Не більше 50 символів')
        .trim()
        .required('Треба заповнити'),
    passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Паролі не співпадають')
        .min(8, 'Більше 8 символів')
        .max(50, 'Не більше 50 символів')
        .trim()
        .required('Треба заповнити'),
});
