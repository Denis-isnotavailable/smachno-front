import * as Yup from 'yup';
export const SignatureFormSchema = Yup.object().shape({
    signature: Yup.string()
        .max(30, 'Довжина повинна бути не більше 30 cимволів')
        .trim()
});
