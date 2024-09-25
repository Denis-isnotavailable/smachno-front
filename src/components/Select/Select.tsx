import { Fragment, useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import cls from './Select.module.scss';
import { Text, TextAlign } from '@/components/Text/Text';
import { classNames } from '@/utils/classNames';
import { ArrowSelectIcon } from '@/utils/SVG/ArrowSelect';

type DropdownDirection = 'top' | 'bottom';
export interface optionDeliveryI {
    id: string;
    name: string;
    unavailable?: boolean;
}
interface SelectProp {
    direction?: DropdownDirection;
    optionDelivery: optionDeliveryI[];
    title: string;
    getOption: (option: optionDeliveryI) => void;
    disabled?: boolean;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    bottom: cls.optionsBottom,
    top: cls.optionsTop,
};

export function Select(props: SelectProp) {
    const { direction = 'bottom', optionDelivery, title, getOption, disabled } = props;
    const optionDeliveryWithDefault = [{ id: '001', name: '-' }, ...optionDelivery];
    const optionsClasses = [mapDirectionClass[direction]];
    const [selectedDelivery, setSelectedDelivery] = useState({
        id: '001',
        name: 'Вибери',
    });

    useEffect(() => {
        if (getOption) {
            getOption(selectedDelivery);
        }
    }, [getOption, selectedDelivery]);

    return (
        <div className={cls.container}>
            <label htmlFor='selectButton'>
                <Text text={title} align={TextAlign.LEFT} className={cls.container__text} />
            </label>
            <Listbox
                as={'div'}
                value={selectedDelivery}
                onChange={setSelectedDelivery}
                disabled={disabled}
            >
                <Listbox.Button className={cls.container__btn} id='selectButton'>
                    {selectedDelivery?.name || 'Вибери'}
                    <ArrowSelectIcon addStyle={cls.icon} />
                </Listbox.Button>
                <Listbox.Options className={classNames(cls.container__options, {}, optionsClasses)}>
                    {optionDeliveryWithDefault.map((option) => (
                        <Listbox.Option
                            key={option.id}
                            value={option}
                            disabled={option.unavailable}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li className={classNames(cls.item, { [cls.active]: active }, [])}>
                                    {selected}
                                    {option?.name}
                                </li>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
