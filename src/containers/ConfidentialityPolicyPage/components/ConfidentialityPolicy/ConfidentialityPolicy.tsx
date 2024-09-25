import { TextAlign } from '@/components/Text/Text';
import cls from './ConfidentialityPolicy.module.scss';
import { Title, Text } from '@/components';
import Link from 'next/link';

export const ConfidentialityPolicy = () => {
    return (
        <section className={cls['cookie-section']}>
            <Text
                align={TextAlign.LEFT}
                className={cls.text}
                text='На цьому веб-сайті використовуються файли cookies. Цей розділ пояснює, для чого ці файли призначені, які файли використовуються, як їх залишати або видаляти.'
            />

            <Title
                customClass={cls.title}
                text='Що таке cookies?'
            />
            <Text
                align={TextAlign.LEFT}
                className={cls.text}
                text='Cookies — це невеликі текстові файли, які той чи інший веб-сайт зберігає на твоєму комп’ютері або мобільному пристрої. Файли cookies дозволяють веб-сайту «пам’ятати» твої дії або дані протягом певного часу. Зазвичай вони використовуються для підтримки авторизованих сесій або налаштування персоналізованого інтерфейсу, розміру шрифтів, кольорових схем, мови сайту тощо, та взагалі забезпечують комфортніше перебування на сайті.'
            />

            <Title
                customClass={cls.title}
                text='Як ми використовуємо cookies'
            />
            <Text
                align={TextAlign.LEFT}
                className={cls.text}
                text='Основною метою використання cookies на цьому веб-сайті є забезпечення роботи авторизованих користувачів, надання якісних персоналізованих послуг та збереження інформації при роботі з цим веб-сайтом.'
            />

            <Title
                customClass={cls.title}
                text='Використання сторонніх cookies'
            />
            <Text
                align={TextAlign.LEFT}
                className={cls.text}
                text='Цей веб-сайт крім власних cookies може зберігати й інші додаткові файли, через використання сторонніх сервісів.'
            />

            <Title
                customClass={cls.title}
                text='Які cookies ми використовуємо'
            />
            <ul className={cls.list}>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        className={cls.text_decoration}
                        text='Основні файли cookies'
                    />
                </li>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='Вони використовуються для роботи з основними функціями веб-сайту, щоб у тебе була можливість відвідувати сайт, а також використовувати його функції.'
                    />
                </li>

                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        className={cls.text_decoration}
                        text='Файли cookies для аналітики'
                    />
                </li>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='Вони допомагають нам зрозуміти, як відвідувачі використовують наш веб-сайт і переміщуються по ньому, це дає змогу покращувати та адаптувати наш веб-сайт до потреб відвідувачів. Відмова від цих файлів cookies не дозволить нам збирати такі дані та покращувати сайт відповідно до твоїх потреб.'
                    />
                </li>

                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        className={cls.text_decoration}
                        text='Файли cookies соціальних мереж'
                    />
                </li>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='Вони надають нам інформацію про активність переглядів, а також допомагають нам адаптувати та вимірювати ефективність нашої реклами на сайтах соціальних мереж. Відмова від цих файлів cookies не дозволить нам пов’язувати твої відвідування цього веб-сайту з нашими маркетинговими кампаніями в соціальних мережах, а також не дозволить сайтам соціальних мереж встановлювати файли cookies на твоєму пристрої.'
                    />
                </li>
            </ul>

            <Title
                customClass={cls.title}
                text='Дані, які ми можемо збирати'
            />
            <ul className={cls.list_dots}>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='IP-адреса'
                    />
                </li>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='Веб-браузер'
                    />
                </li>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='Операційна система'
                    />
                </li>

                <li className={cls.list_item_link}>       
                    Веб-сторінки або сайти, відвідані безпосередньо перед або відразу після відвідування веб-сайту {' '}   
                    <Link
                        href={'https://batatfarm.com/'}
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                        aria-label={'Batatfarm'}
                    >
                        <span className={cls.color_blue}>https://batatfarm.com/</span>
                    </Link>
                </li>

                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='Відстеження доменів, з яких відвідують веб-сайт'
                    />
                </li>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='Активність на веб-сайті'
                    />
                </li>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='Середній час відвідування'
                    />
                </li>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='Відвідані сторінки'
                    />
                </li>
            </ul>

            <Title
                customClass={cls.title}
                text='Як контролювати cookies'
            />
            <ul className={cls.list}>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}
                        text='Ти можеш дізнатися про файли cookies, перевіривши сховище cookies для кожної сторінки веб-сайту через браузер.'
                    />
                </li>
                <li className={cls.list_item}>
                    <Text
                        align={TextAlign.LEFT}                        
                        text='Використовуючи цей веб-сайт, ти надаєш згоду на застосування cookies. У разі небажання зберігати файли cookies, ти можеш використовувати спеціальний анонімний режим браузера або вручну знищувати файли після відвідування сайту. В такому разі при наступному відвідуванні веб-сайт не відображатиме інформацію про твій попередній візит та налаштування.'
                    />
                </li>
            </ul>

            <Title
                customClass={cls.title}
                text='Як вимкнути функцію збирання файлів cookies'
            />
            <ul className={cls.list_dots}>
                <li className={cls.list_item_link}>       
                    Firefox {" "}
                    <Link
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                        aria-label={'Firefox'}
                        href={'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US'}
                    >
                        <span className={cls.color_blue}>https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US</span>
                    </Link>
                </li>
                <li className={cls.list_item_link}>       
                    Chrome {" "} 
                    <Link
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                        aria-label={'Chrome'}
                        href={'https://support.google.com/chrome/answer/95647'}
                    >
                        <span className={cls.color_blue}>https://support.google.com/chrome/answer/95647</span>
                    </Link>
                </li>
                <li className={cls.list_item_link}>       
                    Safari {" "}   
                    <Link
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                        aria-label={'Safari'}
                        href={'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac'}
                    >
                        <span className={cls.color_blue}>https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac</span>
                    </Link>
                </li>
                <li className={cls.list_item_link}>       
                    Opera {" "}    
                    <Link
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                        aria-label={'Opera'}
                        href={'https://help.opera.com/en/latest/web-preferences/#cookies'}
                    >
                        <span className={cls.color_blue}>https://help.opera.com/en/latest/web-preferences/#cookies</span>
                    </Link>
                </li>
                <li className={cls.list_item_link}>       
                    Microsoft Edge {" "}  
                    <Link
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                        aria-label={'Microsoft Edge'}
                        href={'https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd'}
                    >
                        <span className={cls.color_blue}>https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd</span>
                    </Link>
                </li>
                <li className={cls.list_item_link}>       
                    Internet Explorer {" "}   
                    <Link
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                        aria-label={'Internet Explorer'}
                        href={'https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d'}
                    >
                        <span className={cls.color_blue}>https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d</span>
                    </Link>
                </li>
            </ul>            
        </section>
    )
};
