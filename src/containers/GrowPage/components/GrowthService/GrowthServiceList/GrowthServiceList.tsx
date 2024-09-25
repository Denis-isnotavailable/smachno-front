import { memo } from 'react';
import { serviceCards } from '@/db/serviceCard';
import { Service } from '../../Service/Service';
import cls from './GrowthServiceList.module.scss';
export const GrowthServiceList = memo(() => {
    return (
        <ul className={cls.container}>
            {serviceCards.map((item) => {
                return (
                    <li key={item.id}>
                        <Service
                            text={item.text}
                            img={item.img}
                            alt={item.alt}
                            theme={item.theme}
                        />
                    </li>
                );
            })}
        </ul>
    );
});
