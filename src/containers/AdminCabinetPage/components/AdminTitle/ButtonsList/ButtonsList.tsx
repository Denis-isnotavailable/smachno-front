import cls from './ButtonsList.module.scss';
import { Button, ButtonTheme, } from '@/components';
import { LogOutIcon } from '@/utils/SVG/LogOutIcon';
import Link from 'next/link';


interface ButtonsListProps {
    isGSButton?: boolean;
    isPdfButton?: boolean;
    handleSetDataToGoogleSheets: () => void;
    handleOpenModal: () => void;
}

const GOOGLE_SHEETS_LINK = 'https://docs.google.com/spreadsheets/d/1ipRF3_FEsPVbJlR8V5fzX5beKXGlkqgh2rOOYvK11Gs/edit?usp=sharing';
const BUTTON_GOOGLE_SHEETS = 'Google Sheets';

export const ButtonsList = ({ isGSButton, isPdfButton, handleSetDataToGoogleSheets, handleOpenModal}: ButtonsListProps) => {

    return ( 
        <ul className={cls['buttons-list']}>
            {isGSButton &&
                <ul className={cls['gs-buttons-list']}>
                    <li>
                        <Link
                            href={GOOGLE_SHEETS_LINK}
                            target='_blank'
                            rel='nofollow noopener noreferrer'
                            aria-label={'Google Sheets'}
                            className={cls['tool-button']}
                        >
                            {BUTTON_GOOGLE_SHEETS}
                        </Link>
                        
                    </li>
                    <li>
                        <Button
                            type='button'
                            theme={ButtonTheme.CLEAR}
                            aria-label='Donwload Google Sheets'
                            onClick={handleSetDataToGoogleSheets}
                            className={cls['tool-button']}
                        >
                            <LogOutIcon />
                            {'GS'}
                        </Button>
                    </li>
                </ul> }

            {isPdfButton &&
                <li>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        aria-label='Donwload PDF'
                        onClick={handleOpenModal}
                        className={cls['tool-button']}
                    >
                        <LogOutIcon />
                        {'PDF'}
                    </Button>
                </li>}                    
        </ul>
    )
};
