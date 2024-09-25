import cls from './AdminInfo.module.scss';
import Image from 'next/image';
import CatHelloChief from '@/images/cat_hello_chief.webp';
import { AdminTitle } from '../AdminTitle/AdminTitle';
import { useState } from 'react';
import { AdminRequisites } from './AdminRequisites/AdminRequisites';
import { Statistics } from './Statistics/Statistics';

interface AdminInfoProps {
    titleText: string;
}

const BUTTON_STATISTICS = 'Статистика';

export const AdminInfo = ({ titleText }: AdminInfoProps) => {
    const [currentOperation, setCurrentOperation] = useState('');
    

    return (
        <div className={cls['position-box']} >

            <AdminTitle titleText={`${titleText} ${currentOperation && ' / ' + currentOperation}`} />
            
            {
                currentOperation === BUTTON_STATISTICS ?
                    <Statistics setCurrentOperation={setCurrentOperation} />
                    :
                    <div className={cls.content_container}>
                        <AdminRequisites
                            currentOperation={currentOperation}
                            setCurrentOperation={setCurrentOperation}
                        />

                        <div className={cls.container__img}>
                            <Image
                                src={CatHelloChief}
                                alt={'Кіт вітає шефа'}
                                width={460}
                                height={460}
                                priority={true}
                            />
                        </div>
                    </div>
            }
        </div>
    )
};
