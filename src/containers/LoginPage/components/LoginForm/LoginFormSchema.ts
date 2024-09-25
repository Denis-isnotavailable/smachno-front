import * as Yup from 'yup';
export const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
        .min(3, 'Довжина повинна бути більше 3 символів')
        .max(320, 'Довжина не більше 320 cимволів')
        .email('Невірний формат email')
        .matches(
            /^[A-Z0-9._%+-]+@(?!.*\.ru)[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            'Невірний формат email'
        )
        .required("Поле обов'язкове до заповнення"),
    password: Yup.string()
        .min(8, 'Довжина повинна бути більше 8 символів')
        .max(50, 'Довжина не більше 50 символів')
        .trim()
        .required("Поле обов'язкове до заповнення"),
});
