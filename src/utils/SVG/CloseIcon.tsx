export const CloseIcon = ({ addStyle }: { addStyle?: string }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            className={addStyle}
        >
            <path
                d='M21 3L3 21'
                stroke='#808080'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={addStyle}
            />
            <path
                d='M3 3L21 21'
                stroke='#808080'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={addStyle}
            />
        </svg>
    );
};
