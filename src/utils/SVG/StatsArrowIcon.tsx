export const StatsArrowIcon = ({ addStyle }: { addStyle?: string }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={addStyle}
        >
            <path 
                d="M22 7L13.5 15.5L8.5 10.5L2 17"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={addStyle}
            />
            <path 
                d="M16 7H22V13"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={addStyle}
            />
        </svg>
    );
};