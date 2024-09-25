import { useGetOrdersZsuAllAdminQuery } from '@/store/features/services/orderService';
import { AdminTitle } from '../AdminTitle/AdminTitle';
import cls from './OrdersArmy.module.scss';
import { Loading } from '@/components/Loading';
import { TableOrder } from '../TableOrder/TableOrder';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setSearchValue } from '@/store/features/searchSlice/searchSlice';
import { convertZSUOrdersDataToGoogleSheet } from '@/utils/googleSheets/convertOrders';

const ERROR_TEXT = 'Упс, щось пішло не так!';

export const OrdersArmy = ({ titleText }: { titleText: string }) => {
    const { data: orders, isLoading, error } = useGetOrdersZsuAllAdminQuery('');
    const dispatch = useDispatch<AppDispatch>();
    
    const setSearchValueMethod = (value: string) => dispatch(setSearchValue(value));

    const googleSheetOrders = convertZSUOrdersDataToGoogleSheet(orders);

    // console.log(orders);

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    return (
        <div className={cls['position-box']}>
            <AdminTitle
                titleText={titleText}
                isArmyButton
                isSearch
                setSearchValueMethod={setSearchValueMethod}
                googleSheetOrders={googleSheetOrders}
            />
            
            {
                isLoading ?
                    <Loading /> :
                    <TableOrder isZsu ordersZsu={orders} />
            }
        </div>
    )
};
