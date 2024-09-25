import { ReactElement, ReactNode } from 'react';
import cls from './Wrapper.module.scss'
export const Wrapper = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <div className={cls.container}>
            {children}
        </div>
    );
}