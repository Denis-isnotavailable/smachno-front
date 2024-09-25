import cls from './DeliveryTerms.module.scss';
import { Title } from '@/components';
import Image from "next/image";
import NPLogo from "@/images/np_logo_large.webp";

export const DeliveryTerms = () => {
    return (
        <section className={cls.section}>

            <Title
                customClass={cls.title}
                text='Способи доставки:'
            />

            <p className={`${cls.text} ${cls.text_accent}`}>
                <strong>Доставка м.Київ:</strong>
            </p>

            <p className={cls.text}>
                <strong>Самовивіз із пункту видачі за адресою м. Київ, вул. Володимирська, 59.</strong> Парковка
                навпроти червоного корпусу Університету Шевченка зі сторони парку Шевченка.
                Білий джип Мерседес із номером BORSCH і купа веселих та усміхнених людей навколо  😇🔥🔥При виборі
                даного способу, Ви можете забрати своє замовлення в пункті самовивозу в день, оголошений днем доставки у Київ.
            </p>

            <p className={cls.text}>
                <strong>Вартість доставки:</strong> безкоштовно
            </p>

            <div className={cls.image_box}>
                <Image
                    src={NPLogo}
                    alt={'Лого Нової Пошти'}
                    width={220}
                    height={40}
                    loading={'lazy'}
                    className={cls.image_box_pic}
                />
            </div>

            <p className={`${cls.text} ${cls.text_accent}`}>
                <strong>Доставка по Україні:</strong>
            </p>

            <p className={cls.text}>
                <strong>Доставка товару у відділення &ldquo;Нової пошти&ldquo; - Ми пришлемо вам найсмачніші овочі згідно Правил Нової
                    пошти.</strong> Вартість доставки сплачується замовником за тарифами Нової Пошти. 
                Щоб в повній мірі насолодитися смаком найкращих домашніх овочів, просимо вас забирати свої відправлення якомога швидше 🙏🏻
            </p>

            <p className={cls.text}>
                <strong>Доставка товару через Поштомати &ldquo;Нової пошти&ldquo; - Ми пришлемо вам найсмачніші овочі згідно Правил Нової пошти.</strong>
                Вартість доставки сплачується замовником за тарифами Нової Пошти. При замовленні будь ласка зверніть увагу на технічні можливості поштоматів.
                Щоб в повній мірі насолодитися смаком найкращих домашніх овочів, просимо вас забирати свої відправлення якомога швидше 🙏🏻
            </p>

            <p className={cls.text}>
                <strong>Доставка товару кур’єром &ldquo;Нової пошти&ldquo; -</strong> Вартість доставки сплачується
                замовником за тарифами Нової Пошти. Відправка замовлень на суму <strong>не менше 300 грн</strong>.
            </p>

            <Title
                customClass={cls.title}
                text='Cпособи оплати:'
            />

            <p className={cls.text}>
                Будь ласка оплатіть замовлення платіжною карткою за допомогою сервісу Monobank Pay безпосередньо на нашому сайті під час оформлення замовлення.
            </p>

        </section>
    )
};
