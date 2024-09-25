import cls from './ProcedureOrder.module.scss';
import { ProcedureOrderList } from '../ProcedureOrder/ProcedureOrderList/ProcedureOrderList';
export const ProcedureOrder = () => {
    return (
        <section className={cls.container}>
            <h3 className={cls.container__title}>Як це відбувається</h3>
            <ProcedureOrderList />
        </section>
    );
};
