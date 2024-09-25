import * as Yup from 'yup';
export const FormChangePasswordSchema = Yup.object().shape({    
    password: Yup.string()
        .min(8, 'Довжина повинна бути більше 8 символів')
        .max(50, 'Довжина не більше 50 символів')
        .trim()
        .required("Поле обов'язкове до заповнення"),
    newPassword: Yup.string()
        .min(8, 'Довжина повинна бути більше 8 символів')
        .max(50, 'Довжина не більше 50 символів')
        .trim()
        .required("Поле обов'язкове до заповнення"),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), undefined], 'Паролі не співпадають')
        .min(8, 'Довжина повинна бути більше 8 символів')
        .max(50, 'Довжина не більше 50 символів')
        .trim()
        .required("Поле обов'язкове до заповнення"),
});