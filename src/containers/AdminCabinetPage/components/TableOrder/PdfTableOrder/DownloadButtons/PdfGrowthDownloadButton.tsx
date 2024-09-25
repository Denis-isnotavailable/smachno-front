import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button, ButtonTheme, SpinnerDots } from '@/components';
import { LogOutIcon } from '@/utils/SVG/LogOutIcon';
import { useGetOrdersGrowthAllAdminQuery } from '@/store/features/services/orderService';
import { PdfTableOrder } from '../PdfTableOrder';
import { Loading } from '@/components/Loading';

export const PdfGrowthDownloadButton = ({ onClick }: { onClick: () => void }) => {
    const { data: orders, isLoading } = useGetOrdersGrowthAllAdminQuery('');

    if (isLoading) {
        return (
            <Button type='button' theme={ButtonTheme.CLEAR} aria-label='Donwload PDF'>
                <SpinnerDots />
            </Button>
        );
    }

    return (
        <PDFDownloadLink
            document={<PdfTableOrder isGrowth ordersGrowth={orders} />}
            fileName='Orders_Growth'
        >
            {({ loading }) => (
                <Button
                    type='button'
                    theme={ButtonTheme.CLEAR}
                    aria-label='Donwload PDF'
                    onClick={onClick}
                >
                    <LogOutIcon />
                    {loading ? <SpinnerDots /> : 'Файл PDF'}
                </Button>
            )}
        </PDFDownloadLink>
    );
};

export const PdfGrowthDownloadFile = () => {
    const { data: orders, isLoading } = useGetOrdersGrowthAllAdminQuery('');

    if (isLoading) {
        return <Loading />;
    }

    return (
        <PDFViewer width={'100%'} height={'100%'}>
            <PdfTableOrder isGrowth ordersGrowth={orders} />
        </PDFViewer>
    );
};
