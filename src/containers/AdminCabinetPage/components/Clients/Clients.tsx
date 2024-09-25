import { AdminTitle } from '../AdminTitle/AdminTitle';
import cls from './Clients.module.scss';
import { TableUsers } from './TableUsers/TableUsers';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setSearchValue } from '@/store/features/searchSlice/searchSlice';

export const Clients = ({ titleText }: { titleText: string }) => {
    const dispatch = useDispatch<AppDispatch>();

    const setSearchValueMethod = (value: string) => dispatch(setSearchValue(value));

    return (
        <div className={cls['position-box']}>
            <AdminTitle
                titleText={titleText}
                isClientsButton
                isSearch
                setSearchValueMethod={setSearchValueMethod}
            />

            <TableUsers />
        </div>
    )
};
