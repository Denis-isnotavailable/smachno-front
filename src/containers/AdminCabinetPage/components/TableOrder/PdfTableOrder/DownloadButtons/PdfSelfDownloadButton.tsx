import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button, ButtonTheme, SpinnerDots } from '@/components';
import { LogOutIcon } from '@/utils/SVG/LogOutIcon';
import { useGetOrdersSelfAllAdminQuery } from '@/store/features/services/orderService';
import { PdfTableOrder } from '../PdfTableOrder';
import { Loading } from '@/components/Loading';

export const PdfSelfDownloadButton = () => {
    const { data: orders, isLoading } = useGetOrdersSelfAllAdminQuery('');

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
        <PDFDownloadLink document={<PdfTableOrder isSelfPost ordersSelf={orders} />} fileName='Orders_Self_Post' >
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
    );
};

export const PdfSelfDownloadFile = () => {
    const { data: orders, isLoading } = useGetOrdersSelfAllAdminQuery('');

    if (isLoading) {
        return (
            <Loading />
        );
    }
    
    return (
        <PDFViewer width={'100%'} height={'100%'}>
            <PdfTableOrder isSelfPost ordersSelf={orders} />
        </PDFViewer>
    )
};