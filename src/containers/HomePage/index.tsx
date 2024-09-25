import { OrderToGrow } from '@/containers/HomePage/components/OrderToGrow';
import { CardList } from '@/containers/HomePage/components/CardList';
import { Slider } from '@/containers/HomePage/components/Slider';
import { About } from './components/About/About';
import { AboutFarmerData } from '@/db/aboutFarmer';
import { AboutCatData } from '@/db/aboutCat';
import { Faq } from './components/Faq';
import { Hero } from './components/Hero';
import { Container } from '@/components/Container';
import cls from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <>
            <Container>
                <div className={cls.hero}>
                    <Hero />
                </div>

                <div className={cls.about}>
                    <About aboutData={AboutFarmerData} isReverse={false} />
                </div>

                <div className={cls.cat}>
                    <About aboutData={AboutCatData} isReverse={true} />
                </div>

                <div className={`${cls.grow} ${cls.separator}`}>
                    <OrderToGrow />
                </div>

                <div className={`${cls.cardlist} ${cls.separator}`}>
                    <CardList />
                </div>

                <div className={`${cls.slider} ${cls.separator}`}>
                    <Slider />
                </div>

                <div className={`${cls.faq} ${cls.separator}`}>
                    <Faq />
                </div>
            </Container>
        </>
    );
};
