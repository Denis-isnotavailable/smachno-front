import * as Yup from 'yup';

export const FormProductSchema = Yup.object().shape({
    name: Yup.string()
        .matches(
            /^[A-Za-zА-Яа-яІіЇїЄєҐґ\s'-]+$/u,
            "Назва має бути тільки з літер"
        )
        .min(3, 'Довжина має бути більше 3 символів')
        .max(30, 'Довжина не більше 30 символів')
        .trim()
        .required("Поле обов'язкове до заповнення"),
    description: Yup.string().matches(
            /^[A-Za-zА-Яа-яІіЇїЄєҐґ'ʼ-](?:[^./`~@^()_+=?<>]*\.?[^./`~@^()_+=?<>]*)*$/u,
            "Опис має бути тільки з літер"
        )
        .min(3, 'Довжина має бути більше 3 символів')
        .max(100, 'Довжина не більше 100 символів')
        .trim()
        .required("Поле обов'язкове до заповнення"),
    productIcon: Yup.string()
        // .url('Має бути валідний URL')
        .required("Поле обов'язкове до заповнення"),
    productImage: Yup.string()
        // .url('Має бути валідний URL')
        .required("Поле обов'язкове до заповнення"),
    price: Yup.number()
        .typeError('Ціна повинна бути числом')
        .positive('Ціна має бути позитивним числом')
        .required("Поле обов'язкове до заповнення"),
    // packaging: Yup.string()
    //     .required("Поле обов'язкове до заповнення"),
    seasonStart: Yup.date().nullable().default(null).required("Поле обов'язкове до заповнення"),
    seasonEnd: Yup.date().nullable().default(null).required("Поле обов'язкове до заповнення")
        .when('seasonStart', (seasonStart, schema) => {
            return seasonStart[0] ? schema.min(
                seasonStart,
                'Дата завершення сезону не може бути раніше дати початку сезону'
            ) : schema;
        }),
    weightMin: Yup.number()
        .typeError('Вага повинна бути числом')
        .positive('Мінімальна вага більше 0')
        .nullable()
        .default(null)
        .required("Поле обов'язкове до заповнення"),
    weightMax: Yup.number()
        .typeError('Вага повинна бути числом')
        .positive('Максимальна вага більше 0')
        .nullable()
        .default(null)
        .when('weightMin', (weightMin, schema) =>
            typeof weightMin[0] === 'number' && weightMin[0] ? schema.min(weightMin[0], 'Максимальна вага має бути більше за мінімальну') : schema
        )
        .required("Поле обов'язкове до заповнення"),
    // unit: Yup.string()
    //     .required("Поле обов'язкове до заповнення"),
    dimensionsHeight: Yup.number()
        .typeError('Висота повинна бути числом')
        .min(0, 'Висота має бути більше або дорівнювати 0')
        .nullable()
        .default(null)
        .required("Поле обов'язкове до заповнення"),
    dimensionsWidth: Yup.number()
        .typeError('Ширина повинна бути числом')
        .min(0, 'Ширина має бути більше або дорівнювати 0')
        .nullable()
        .default(null)
        .required("Поле обов'язкове до заповнення"),
    dimensionsLength: Yup.number()
        .typeError('Довжина повинна бути числом')
        .min(0, 'Довжина має бути більше або дорівнювати 0')
        .nullable()
        .default(null)
        .required("Поле обов'язкове до заповнення"),
    shipping: Yup.boolean(),
        // .required("Поле обов'язкове до заповнення"),

});