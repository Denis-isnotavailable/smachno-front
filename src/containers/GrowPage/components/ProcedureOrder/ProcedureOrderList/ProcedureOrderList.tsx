import { procedureOrder } from '@/db/procedureOrder';
import Image from 'next/image';
import cls from './ProcedureOrderList.module.scss';
import { Text } from '@/components';
import { TextAlign } from '@/components/Text/Text';

export const ProcedureOrderList = () => {
    return (
        <ul className={cls.container}>
            {procedureOrder.map((item) => {
                return (
                    <li key={item.id} className={cls.container__card}>
                        <Image src={item.img} alt={item.alt} loading={'lazy'} className={cls.img}/>
                        <Text text={item.text} align={TextAlign.CENTER} />
                    </li>
                );
            })}
        </ul>
    );
};
