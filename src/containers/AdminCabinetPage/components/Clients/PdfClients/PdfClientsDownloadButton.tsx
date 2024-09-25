import { useGetAllUsersPaginationQuery, useGetAllUsersQuery } from '@/store/features/services/authService';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PdfClients } from './PdfClients';
import { Button, ButtonTheme, SpinnerDots } from '@/components';
import { LogOutIcon } from '@/utils/SVG/LogOutIcon';
import { Loading } from '@/components/Loading';

export const PdfClientsDownloadButton = () => {
    const { data: users, isLoading } = useGetAllUsersQuery('');

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
        <PDFDownloadLink document={<PdfClients users={users?.data} />} fileName='Clients' >
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

export const PdfClientsDownloadFile = () => {
    const { data: users, isLoading } = useGetAllUsersPaginationQuery({
        order: 'DESC',
        page: 1,
        take: 50,
    });
    
    if (isLoading) {
        return (
            <Loading />
        );
    }
    
    return (
        <PDFViewer width={'100%'} height={'100%'}>
            <PdfClients users={users?.data} />
        </PDFViewer>
    )
};
