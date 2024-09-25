export const PencilIcon = ({ addStyle }: { addStyle?: string }) => {
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
                d="M17 2.99966C17.2547 2.69869 17.5697 2.45372 17.925 2.28034C18.2803 2.10697 18.6681 2.009 19.0636 1.99267C19.4592 1.97635 19.8538 2.04204 20.2224 2.18555C20.5909 2.32905 20.9254 2.54723 21.2043 2.82618C21.4833 3.10513 21.7006 3.43872 21.8425 3.8057C21.9845 4.17268 22.0478 4.56499 22.0286 4.95764C22.0094 5.35028 21.908 5.73465 21.7309 6.08623C21.5538 6.43781 21.3049 6.74889 21 6.99966L7.5 20.4997L2 21.9997L3.5 16.4997L17 2.99966Z"
                stroke="#808080" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={addStyle}
            />
            <path 
                d="M15 5L19 9"
                stroke="#808080" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={addStyle}
            />
        </svg>
    )
};