import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ITableOrderProps } from '../TableOrder';
import { PdfTableItem } from './PdfTableItem';

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
        fontSize: 14,
    },
    section: {
        padding: 10,
        flexGrow: 1,
    },
    head_container: {
        flexDirection: 'row',
        backgroundColor: '#eaf2e1',
        marginBottom: 24,
    },
    cell_1: {
        width: '8%',
        paddingRight: 8,
    },
    cell_2: {
        flexDirection: 'column',
        width: '26%',
        paddingRight: 8,
    },
    cell_2_g: {
        flexDirection: 'column',
        width: '20%',
        paddingRight: 8,
    },
    cell_4: {
        width: '16%',
        paddingRight: 8,
    },
    cell_4_g: {
        width: '12%',
        paddingRight: 8,
    },
    cell_5: {
        width: '12%',
        paddingRight: 8,
    },
    cell_5_g: {
        width: '9%',
        paddingRight: 8,
    },
    cell_6_g: {
        width: '21%',
        paddingRight: 8,
        textAlign: 'right',
    },
    cell_7: {
        width: '12%',
        paddingRight: 8,
        textAlign: 'right',
    },
    cell_7_g: {
        width: '10%',
        paddingRight: 8,
        textAlign: 'right',
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

export const PdfTableOrder = ({
    ordersSelf,
    ordersZsu,
    ordersGrowth,
    isGrowth,
    isSelfPost,
    isZsu,
}: ITableOrderProps) => {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.head_container} fixed>
                        <Text style={styles.cell_1}>№</Text>
                        <View style={isGrowth ? styles.cell_2_g : styles.cell_2}>
                            <Text>Імʼя</Text>
                            <Text>Телефон</Text>
                        </View>
                        <View style={isGrowth ? styles.cell_2_g : styles.cell_2}>
                            <Text>№ Замовлення</Text>
                            <Text>Дата</Text>
                        </View>
                        <Text style={isGrowth ? styles.cell_4_g : styles.cell_4}>Продукт</Text>
                        <Text style={isGrowth ? styles.cell_5_g : styles.cell_5}>Кільк.</Text>
                        {isGrowth && <Text style={styles.cell_6_g}>Коментар</Text>}
                        <Text style={isGrowth ? styles.cell_7_g : styles.cell_7}>Вислав</Text>
                    </View>

                    {isGrowth &&
                        ordersGrowth
                            ?.filter(({ growthOrder }) => growthOrder?.length !== 0)
                            ?.sort(
                                (a, b) =>
                                    new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime()
                            )
                            ?.map((order, i) => {
                                return order?.growthOrder[0]?.itemsGrowthOrder?.map(
                                    (productOrder, index) => (
                                        <PdfTableItem
                                            key={productOrder?.id}
                                            order={productOrder}
                                            shippingAddress={order?.shippingAddress}
                                            indexNumber={`${order?.growthOrder[0]?.itemsGrowthOrder?.length === 1 ? '' + (i + 1) : '' + (i + 1) + '.' + (index + 1)}.`}
                                            orderAt={order?.orderAt}
                                            orderId={order?.growthOrder[0].orderId}
                                            isGrowth={isGrowth}
                                            payment={order?.payment_reference?.status}
                                        />
                                    )
                                );
                            })}

                    {isZsu &&
                        ordersZsu
                            ?.filter(({ zsuOrder }) => zsuOrder?.length !== 0)
                            ?.sort(
                                (a, b) =>
                                    new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime()
                            )
                            ?.map((order, i) => {
                                return order?.zsuOrder[0]?.itemsZsuOrder?.map(
                                    (productOrder, index) => (
                                        <PdfTableItem
                                            key={productOrder?.id}
                                            order={productOrder}
                                            shippingAddress={order?.shippingAddress}
                                            indexNumber={`${order?.zsuOrder[0]?.itemsZsuOrder?.length === 1 ? '' + (i + 1) : '' + (i + 1) + '.' + (index + 1)}.`}
                                            orderAt={order?.orderAt}
                                            orderId={order?.zsuOrder[0].orderId}
                                            isZsu={isZsu}
                                            payment={order?.payment_reference?.status}
                                        />
                                    )
                                );
                            })}

                    {isSelfPost &&
                        ordersSelf
                            ?.filter(({ selfOrder }) => selfOrder?.length !== 0)
                            ?.sort(
                                (a, b) =>
                                    new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime()
                            )
                            ?.map((order, i) => {
                                return order?.selfOrder[0].itemsSelfOrder?.map(
                                    (productOrder, index) => {
                                        return (
                                            <PdfTableItem
                                                key={productOrder?.id}
                                                order={productOrder}
                                                shippingAddress={order?.shippingAddress}
                                                indexNumber={`${order?.selfOrder[0]?.itemsSelfOrder?.length === 1 ? '' + (i + 1) : '' + (i + 1) + '.' + (index + 1)}.`}
                                                orderAt={order?.orderAt}
                                                orderId={order?.selfOrder[0].orderId}
                                                isSelfPost={isSelfPost}
                                                payment={order?.payment_reference?.status}
                                            />
                                        );
                                    }
                                );
                            })}
                </View>

                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
};
