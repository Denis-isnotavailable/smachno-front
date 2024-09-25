import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button, ButtonTheme, SpinnerDots } from '@/components';
import { LogOutIcon } from '@/utils/SVG/LogOutIcon';
import { useGetOrdersZsuAllAdminQuery } from '@/store/features/services/orderService';
import { PdfTableOrder } from '../PdfTableOrder';
import { Loading } from '@/components/Loading';

export const PdfArmyDownloadButton = () => {
    const { data: orders, isLoading } = useGetOrdersZsuAllAdminQuery('');

    if (isLoading) {
        return (
            <Button
                type='button'
                theme={ButtonTheme.CLEAR}
                aria-label='Donwload PDF'
            >
                <SpinnerDots />
            </Button>
        );
    }
    
    return (
        <PDFDownloadLink document={<PdfTableOrder isZsu ordersZsu={orders} />} fileName='Orders_Army' >
            {({ loading }) => (
                <Button
                    type='button'
                    theme={ButtonTheme.CLEAR}
                    aria-label='Donwload PDF'
                >
                    <LogOutIcon />
                    {loading ? <SpinnerDots /> : 'Файл PDF'}
                </Button>                
            )}
        </PDFDownloadLink>
    )
};

export const PdfArmyDownloadFile = () => {
    const { data: orders, isLoading } = useGetOrdersZsuAllAdminQuery('');

    if (isLoading) {
        return (
            <Loading />
        );
    }
    
    return (
        <PDFViewer width={'100%'} height={'100%'}>
            <PdfTableOrder isZsu ordersZsu={orders} />
        </PDFViewer>
    )
};