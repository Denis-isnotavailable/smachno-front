import { FC, ReactNode } from 'react';
import cls from './Container.module.scss';

interface ContainerProps {
    children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
    return <div className={cls.container}>{children} </div>;
};
