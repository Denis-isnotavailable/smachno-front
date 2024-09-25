import * as Yup from 'yup';
export const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .max(50, 'Довжина повинна бути більше 50 cимволів')
        .email('Невірний формат email')
        .matches(
            /^[A-Z0-9._%+-]+@(?!mail\.ru)[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            'Невірний формат email, або "mail.ru" не допускається'
        )
        .required("Поле обов'язкове до заповнення"),
});
