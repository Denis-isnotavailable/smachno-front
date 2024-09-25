import { useGetOrdersGrowthAllAdminQuery } from '@/store/features/services/orderService';
import cls from './OrdersGrowth.module.scss';
import { AdminTitle } from '../AdminTitle/AdminTitle';
import { TableOrder } from '../TableOrder/TableOrder';
import { Loading } from '@/components/Loading';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setSearchValue } from '@/store/features/searchSlice/searchSlice';
import { convertGrowthOrdersDataToGoogleSheet } from '@/utils/googleSheets/convertOrders';
// import { PdfTableOrder } from '../TableOrder/PdfTableOrder/PdfTableOrder';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const ERROR_TEXT = 'Упс, щось пішло не так!';

export const OrdersGrowth = ({ titleText }: { titleText: string }) => {
    const { data: orders, isLoading, error } = useGetOrdersGrowthAllAdminQuery('');
    const dispatch = useDispatch<AppDispatch>();

    const setSearchValueMethod = (value: string) => dispatch(setSearchValue(value));

    const googleSheetOrders = convertGrowthOrdersDataToGoogleSheet(orders);

    // console.log(orders);

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    return (
        <div className={cls['position-box']}>
            <AdminTitle
                titleText={titleText}
                isGrowthButton
                isSearch
                setSearchValueMethod={setSearchValueMethod}
                googleSheetOrders={googleSheetOrders}
            />

            {
                isLoading ? <Loading /> : <TableOrder isGrowth ordersGrowth={orders} />
                // <>
                //     <PDFDownloadLink document={<PdfTableOrder isGrowth ordersGrowth={orders} />} fileName='Orders_Growth' >
                //         {({loading}) => (loading ? <button>Loading...</button> : <button>Download</button>)}
                //     </PDFDownloadLink>

                //     <PDFViewer width={'100%'} height={'100%'}>
                //         <PdfTableOrder isGrowth ordersGrowth={orders} />
                //     </PDFViewer>

                //     <TableOrder isGrowth ordersGrowth={orders} />
                // </>
            }
        </div>
    );
};
