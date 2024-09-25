import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
});

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fdfdfd',
        fontFamily: 'Roboto',
        textAlign: 'left',
        fontSize: 14
    },
    section: {
        padding: 10,
        flexGrow: 1
    },
    head_container: {
        flexDirection: 'row',
        backgroundColor: '#eaf2e1',
        marginBottom: 24,
    },
    body_container: {        
        flexDirection: 'row',
        borderBottom: 1,
        borderBottomColor: '#808080',
        marginBottom: 32,
    },
    cell_1: {        
        width: '8%',
        paddingBottom: 8,
        paddingRight: 8,
    },
    cell_2: {        
        width: '26%',
        paddingBottom: 8,
        paddingRight: 8,
    },
    cell_3: {        
        width: '26%',
        paddingBottom: 8,
        paddingRight: 8,
    },
    cell_4: {
        width: '40%',
        paddingBottom: 8,
        paddingRight: 8,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

interface IUser {
    id: string;
    name: string;
    surname: string;
    phone?: string;
    email: string;
}
export const PdfClients = ({users}: {users: IUser[]}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>

                <View style={styles.head_container} fixed>
                    <Text style={styles.cell_1}>№</Text>
                    <Text style={styles.cell_2}>Імʼя</Text>
                    <Text style={styles.cell_3}>Телефон</Text>                                         
                    <Text style={styles.cell_4}>Адреса</Text>
                </View>
                
                {
                    users?.map((user: IUser, i: number) => 
                        <View style={styles.body_container} key={user?.id}>
                            <Text style={styles.cell_1}>{`${i + 1}.`}</Text>
                            <Text style={styles.cell_2}>{`${user?.name} ${user?.surname}`}</Text>
                            <Text style={styles.cell_3}>{`${user?.phone ? user?.phone : '-'}`}</Text>                                         
                            <Text style={styles.cell_4}>
                                {`${user?.email}`}
                            </Text>
                        </View>
                    )
                }
            </View>
            

            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
    </Document>
);