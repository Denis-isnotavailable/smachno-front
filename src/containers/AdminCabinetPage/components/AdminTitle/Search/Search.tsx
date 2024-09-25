import { useEffect, useState } from 'react';
import cls from './Search.module.scss';
import { Button, ButtonTheme } from '@/components';
import { SearchIcon, DeleteIcon } from '@/utils/SVG';

export const Search = ({setSearchValueMethod}: {setSearchValueMethod: (value: string) => void}) => {
    const [inputValue, setInputValue] = useState('');
    
    useEffect(() => {
        setSearchValueMethod(inputValue);
    }, [inputValue, setSearchValueMethod]);

    const hadleSearchButtonClick = () => {
        if (inputValue) setInputValue('');    
    }
    
    return (
        <div className={cls['search-box']}>
            <input
                type="text"
                placeholder="Пошук.."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className={cls['search-box_input']}
            />

            <Button
                type='button'
                theme={ButtonTheme.CLEAR}
                aria-label='Search Button'
                className={cls['search-box_search-button']}
                onClick={hadleSearchButtonClick}
            >
                {inputValue ?
                    <DeleteIcon addStyle={cls['search-box_search-button_icon']} />
                    :
                    <SearchIcon addStyle={cls['search-box_search-button_icon']} />}
            </Button>
        </div>
    )
};
