import * as Yup from 'yup';

export const OrderFormSchema = Yup.object().shape({
    name: Yup.string()
        .matches(
            /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u,
            "Ім'я повинно бути тільки з літер"
        )
        .min(2, 'Довжина повинна бути більше 2 символів')
        .max(50, 'Довжина не більше 50 символів')
        .trim()
        .required("Поле обов'язкове до заповнення"),
    surname: Yup.string()
        .matches(
            /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u,
            'Прізвище повинно бути тільки з літер'
        )
        .min(2, 'Довжина повинна бути більше 2 символів')
        .max(50, 'Довжина не більше 50 символів')
        .trim()
        .required("Поле обов'язкове до заповнення"),
    email: Yup.string()
        .min(3, 'Довжина повинна бути більше 3 символів')
        .max(320, 'Довжина не більше 320 cимволів')
        .email('Невірний формат email')
        .matches(/^[A-Z0-9._%+-]+@(?!.*\.ru)[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Невірний формат email')
        .required("Поле обов'язкове до заповнення"),
    address: Yup.string()
        .min(2, 'Довжина повинна бути більше 2 символів')
        .max(300, 'Довжина не більше 300 символів')
        .trim(),
});