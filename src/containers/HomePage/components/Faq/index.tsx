// import { Title } from '@/components';
import cls from './faq.module.scss';
import { SingleFaq } from './SingleFaq';
import { faqData } from '@/db/faqData';
import Image from 'next/image';

export const Faq = () => {
    const renderFaqItems = () =>
        faqData.map((el) => (
            <SingleFaq key={el.key} upperText={el.upperText} lowerText={el.lowerText} />
        ));
    return (
        <div className={cls.container} id='questions'>
            <h2 className={`title`}>Поширені запитання</h2>

            <ul className={cls.text}>{renderFaqItems()}</ul>

            <div className={cls.thumb}>
                <Image
                    width={267}
                    height={201}
                    src={'/assets/images/question.webp'}
                    alt={'FAQ section question image'}
                    quality={90}
                    className={cls.image}
                />
            </div>
        </div>
    );
};
