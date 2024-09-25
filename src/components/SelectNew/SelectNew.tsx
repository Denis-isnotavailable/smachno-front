import Select, { MultiValue, SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { useEffect, useState } from 'react';
import cls from './SelectNew.module.scss';
import { Text } from '@/components';
import { TextAlign } from '@/components/Text/Text';

interface IOption {
    value: string;
    label: string;
}

export interface optionDeliveryI {
    id: string;
    name: string;
}

interface SelectProp {
    title?: string;
    disabled?: boolean;
    isLoading?: boolean;
    options: IOption[];
    getOption?: (option: optionDeliveryI) => void;
    startValue?: IOption | null;
    placeholder?: string;
}

const animatedComponents = makeAnimated();
export const SelectNew = (props: SelectProp) => {
    const { title, disabled, isLoading, options, getOption, startValue, placeholder } =
        props;
    const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

    useEffect(() => {
        if (startValue) {
            setSelectedOption(startValue);
        }
    }, [startValue]);

    // useEffect(() => {
    //     if (getOption && selectedOption) {
    //         getOption({id: selectedOption.value, name: selectedOption.label});
    //     }
    // }, [getOption, selectedOption]);

    const onChange = (newValue: MultiValue<IOption> | SingleValue<IOption>) => {
        const option = Array.isArray(newValue) ? newValue[0] : newValue;
        setSelectedOption(option);
        if (getOption && option) {
            getOption({ id: option.value, name: option.label });
        }
    };

    return (
        <div className={cls.container}>
            <label htmlFor='select'>
                <Text
                    text={title}
                    align={TextAlign.LEFT}
                    className={cls.container__text}
                />
            </label>
            <Select
                id='select'
                classNamePrefix={'custom-select'}
                value={selectedOption}
                // defaultValue={selectedOption}
                onChange={onChange}
                options={[{ value: 'empty', label: '-' }, ...options]}
                placeholder={placeholder || 'Пошук...'}
                isDisabled={disabled}
                noOptionsMessage={() => 'Немає варіантів'}
                isLoading={isLoading}
                maxMenuHeight={200}
                components={animatedComponents}
            />
        </div>
    );
};
