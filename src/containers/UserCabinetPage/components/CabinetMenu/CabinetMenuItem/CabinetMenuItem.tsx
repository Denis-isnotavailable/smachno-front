import cls from './CabinetMenuItem.module.scss';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { AddressInfo } from '../../AddressInfo/AddressInfo';
import { OrderInfo } from '../../OrderInfo/OrderInfo';
import { OrderArmyInfo } from '../../OrderArmyInfo/OrderArmyInfo';
import { OrderGrowthInfo } from '../../OrderGrowthInfo/OrderGrowthInfo';

interface CabinetMenuProps {    
    id: number,
    name: string,
    currentPosition: number,
    setCurrentPosition: (value: number) => void,
}

export const CabinetMenuItem = ({ id, name, currentPosition, setCurrentPosition }: CabinetMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (currentPosition === id) setIsOpen(prev => !prev);
        else setIsOpen(false);
    }, [currentPosition, id]);

    const iconClass = `${cls.arrow} ${isOpen ? cls.arrowDown : ''}`;

    const togglePositionClick = (id: number) => {
        setCurrentPosition(id);
        if (currentPosition === id) setIsOpen(prev => !prev);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <li
            key={id}
            className={classNames(cls['positions-list_item'], { [cls['positions-list_item__active']]: currentPosition === id })}            
            // onClick={() => togglePositionClick(id)}
        >
            <div
                className={cls['name-box']}
                onClick={() => togglePositionClick(id)}
            >
                <div>{name}</div>

                <Image
                    src={'/assets/icons/faqArrow.svg'}
                    alt={'Faq Arrow'}
                    width={24}
                    height={24}
                    className={iconClass}
                />
            </div>

            <div
                className={classNames(cls['lowerBox'], { [cls['lowerBox__active']]: currentPosition === id && isOpen })}
            >
                {currentPosition === 0 && <PersonalInfo />}
                {currentPosition === 1 && <AddressInfo />}
                {currentPosition === 2 && <OrderInfo />}
                {currentPosition === 3 && <OrderArmyInfo />}
                {currentPosition === 4 && <OrderGrowthInfo />}
            </div>
            
        </li>
    )
};
