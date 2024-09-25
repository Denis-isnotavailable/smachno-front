import { ReactNode } from 'react';
import cls from './ContainerMaxW1280.module.scss';

interface Props {
    children: ReactNode;
}

export const ContainerMaxW1280: React.FC<Props> = ({ children }) => {
    return (
        <div className={cls.container}>
            <div className={cls.content}>{children}</div>
        </div>
    );
};
