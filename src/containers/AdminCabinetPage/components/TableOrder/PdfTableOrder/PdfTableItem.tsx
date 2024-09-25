import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ITableItemProps, typePayment } from '../TableItem/TableItem';
import { PACKAGING_CASES } from '@/db/packagingCases';

// Create styles
const styles = StyleSheet.create({
    body_container: {
        flexDirection: 'column',
        borderBottom: 1,
        borderBottomColor: '#808080',
        marginBottom: 32,
        paddingBottom: 8,
    },
    body_container_info: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    body_container_info_a: {
        flexDirection: 'row',
    },
    body_container_address: {
        flexDirection: 'row',
        overflow: 'hidden',
        overflowWrap: 'break-word',
    },
    cell_1: {
        width: '8%',
        paddingRight: 8,
    },
    cell_2: {
        flexDirection: 'column',
        width: '26%',
        paddingRight: 8,
        overflow: 'hidden',
        overflowWrap: 'break-word',
    },
    cell_2_g: {
        flexDirection: 'column',
        width: '20%',
        paddingRight: 8,
        overflow: 'hidden',
        overflowWrap: 'break-word',
    },
    cell_4: {
        width: '16%',
        paddingRight: 8,
        overflow: 'hidden',
        overflowWrap: 'break-word',
    },
    cell_4_g: {
        width: '12%',
        paddingRight: 8,
        overflow: 'hidden',
        overflowWrap: 'break-word',
    },
    cell_5: {
        width: '12%',
        paddingRight: 8,
        overflow: 'hidden',
        overflowWrap: 'break-word',
    },
    cell_5_g: {
        width: '9%',
        paddingRight: 8,
        overflow: 'hidden',
        overflowWrap: 'break-word',
    },
    cell_6_g: {
        width: '21%',
        paddingRight: 8,
        textAlign: 'right',
        overflow: 'hidden',
        overflowWrap: 'break-word',
    },
    cell_7: {
        width: '12%',
        paddingRight: 8,
        textAlign: 'right',
        overflow: 'hidden',
        overflowWrap: 'break-word',
    },
    cell_7_g: {
        width: '10%',
        paddingRight: 8,
        textAlign: 'right',
        overflow: 'hidden',
        overflowWrap: 'break-word',
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

export const PdfTableItem = ({
    order,
    shippingAddress,
    indexNumber,
    orderAt,
    orderId,
    isGrowth,
    isZsu,
    payment,
}: ITableItemProps) => {
    const orderDate = new Date(orderAt).toLocaleDateString('uk-UK', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
    const address = order.product.shipping
        ? `м. ${shippingAddress?.city}, ${shippingAddress?.novaPostOffice || shippingAddress?.personalAddress || shippingAddress?.novaPostLocker}`
        : 'Самовивіз';

    return (
        <View style={styles.body_container}>
            <View style={isZsu ? styles.body_container_info_a : styles.body_container_info}>
                <Text style={styles.cell_1}>{indexNumber}</Text>
                <View style={isGrowth ? styles.cell_2_g : styles.cell_2}>
                    <Text>{`${shippingAddress?.firstName} ${shippingAddress?.surname}`}</Text>
                    <Text>{shippingAddress?.phone}</Text>
                </View>
                <View style={isGrowth ? styles.cell_2_g : styles.cell_2}>
                    <Text>{`№ ${orderId}`}</Text>
                    <Text>{orderDate}</Text>
                </View>
                <Text style={isGrowth ? styles.cell_4_g : styles.cell_4}>
                    {order?.product?.name}
                </Text>
                <Text style={isGrowth ? styles.cell_5_g : styles.cell_5}>
                    {`${order?.order_quantity} ${PACKAGING_CASES.get(order?.product?.packaging)}`}
                </Text>
                {isGrowth && <Text style={styles.cell_6_g}>{order?.plate}</Text>}
                <Text style={isGrowth ? styles.cell_7_g : styles.cell_7}>
                    {`${order?.status ? 'Так' : 'Ні'}`}
                </Text>
            </View>

            {
                <View style={styles.body_container_address}>
                    <Text>{`Оплата: ${payment && typePayment[payment] ? typePayment[payment] : 'Дані відсутні'}`}</Text>
                </View>
            }

            {!isZsu && (
                <View style={styles.body_container_address}>
                    <Text>{`Доставка: ${address}`}</Text>
                </View>
            )}
        </View>
    );
};
