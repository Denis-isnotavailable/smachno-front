export const ArrowSelectIcon = ({ addStyle }: { addStyle?: string }) => {
    return (
        <svg
            width='24'
            height='25'
            viewBox='0 0 24 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={addStyle}
        >
            <path
                d='M6 9.5L12 15.5L18 9.5'
                stroke='#808080'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={addStyle}
            />
        </svg>
    );
};
