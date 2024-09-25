import cls from './BlockText.module.scss';

export const BlockText = () => {
    return (
        <>
            <p className={cls.text}>
                Підтверджуючи замовлення, я приймаю умови:
            </p>
            <ul className={cls.list}>
                <li>
                    <p className={cls.text}>
                        положення про обробку і захист персональних даних;
                    </p>
                </li>
                <li>
                    <p className={cls.text}>
                        угоди користувача;
                    </p>
                </li>
                <li>
                    <p className={cls.text}>
                        відправка здійснюється впродовж тижня з моменту замовлення;
                    </p>
                </li>
            </ul>
        </>
    )
}