import * as Yup from 'yup';

export const FormAdminCreatingSchema = Yup.object().shape({
    name: Yup.string()
        .matches(
            /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u,
            "Ім'я повинно бути тільки з літер"
        )
        .min(3, 'Довжина повинна бути більше 2 символів')
        .max(30, 'Довжина не більше 30 символів')
        .trim()
        .required("Обов'язкове поле"),
    surname: Yup.string()
        .matches(
            /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u,
            'Прізвище повинно бути тільки з літер'
        )
        .min(3, 'Довжина повинна бути більше 2 символів')
        .max(30, 'Довжина не більше 30 символів')
        .trim()
        .required("Обов'язкове поле"),
    email: Yup.string()
        .max(50, 'Довжина повинна бути не більше 50 cимволів')
        .email('Невірний формат email')
        .matches(
            /^[A-Z0-9._%+-]+@(?!mail\.ru)[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            'Невірний формат email, або "mail.ru" не допускається'
        )
        .required("Обов'язкове поле"),
    password: Yup.string()
        .min(8, 'Довжина повинна бути більше 8 символів')
        .max(50, 'Довжина не більше 50 символів')
        .trim()
        .required("Обов'язкове поле"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Паролі не співпадають')
        .min(8, 'Довжина повинна бути більше 8 символів')
        .max(50, 'Довжина не більше 50 символів')
        .trim()
        .required("Обов'язкове поле"),
});