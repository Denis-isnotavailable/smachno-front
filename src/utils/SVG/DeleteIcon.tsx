export const DeleteIcon = ({ addStyle }: { addStyle?: string }) => {
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
                d="M3 6H21"
                stroke="#808080"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={addStyle}
            />
            <path
                d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6"
                stroke="#808080"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={addStyle}
            />
            <path
                d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6"
                stroke="#808080"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={addStyle}
            />
            <path
                d="M10 11V17"
                stroke="#808080"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={addStyle}
            />
            <path
                d="M14 11V17"
                stroke="#808080"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={addStyle}/>
        </svg>
    )
};
