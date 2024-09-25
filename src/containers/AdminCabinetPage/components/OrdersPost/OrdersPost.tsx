import { AdminTitle } from '../AdminTitle/AdminTitle';
import cls from './OrdersPost.module.scss';
import { Loading } from '@/components/Loading';
import { TableOrder } from '../TableOrder/TableOrder';
import { useGetOrdersSelfAllAdminQuery } from '@/store/features/services/orderService';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setSearchValue } from '@/store/features/searchSlice/searchSlice';
import { convertSelfOrdersDataToGoogleSheet } from '@/utils/googleSheets/convertOrders';

const ERROR_TEXT = 'Упс, щось пішло не так!';

export const OrdersPost = ({ titleText }: { titleText: string }) => {
    const { data: orders, isLoading, error } = useGetOrdersSelfAllAdminQuery('');
    const dispatch = useDispatch<AppDispatch>();
    
    const setSearchValueMethod = (value: string) => dispatch(setSearchValue(value));    

    const googleSheetOrders = convertSelfOrdersDataToGoogleSheet(orders);

    // console.log(orders);

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    return (
        <div className={cls['position-box']}>
            <AdminTitle
                titleText={titleText}
                isSelfPostButton
                isSearch
                setSearchValueMethod={setSearchValueMethod}
                googleSheetOrders={googleSheetOrders}
            />

            {
                isLoading ?
                    <Loading /> :
                    <TableOrder isSelfPost ordersSelf={orders} />
            }
        </div>
    )
};
