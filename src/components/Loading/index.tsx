import cls from './Loading.module.scss';
import { Spinner } from '../Spinner';

export const Loading = () => {
    return (
        <div className={cls.container}>
            <Spinner />
            <p className={cls.description}>Тримайся, зараз завантажимо</p>
        </div>
    );
};
