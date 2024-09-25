import { IOrderGrowth, IOrderSelf, IOrderZsu } from "@/containers/AdminCabinetPage/components/TableOrder/TableOrder";

export enum RangeVar {
    FOR_MYSELF = 'forMyself',
    FOR_ZSU = 'forZSU',
    FOR_GROWTH = 'forGrowth',
};

export interface IGoogleSheetsData {
  row: 
    | [string, string, string, string, string, string, string, string, string] 
    | [string, string, string, string, string, string, string, string, string, string];
}

export const convertSelfOrdersDataToGoogleSheet = (orders: IOrderSelf[]) => {
    const result: IGoogleSheetsData['row'][] = [];
    
    orders?.filter(({ selfOrder }) => selfOrder?.length !== 0)
        ?.sort((a, b) => new Date(a.orderAt).getTime() - new Date(b.orderAt).getTime())
        ?.map((order) => {
            const productArray = order?.selfOrder[0]?.itemsSelfOrder;
            return (
                productArray &&
                [...productArray]
                    ?.sort((a, b) => Number(b.id) - Number(a.id))
                    ?.forEach((productOrder) => {
                        const orderDate = formattedOrderDate(order?.orderAt);
                        const phone = formattedPhone(order?.shippingAddress?.phone);

                        result.push([
                            String(order?.selfOrder[0]?.orderId),
                            orderDate,
                            productOrder?.product?.name,
                            String(productOrder?.order_quantity),
                            order?.payment_reference?.status === 'success' ? 'Успішна' : 'Не успішна',
                            phone,                            
                            `${order?.shippingAddress?.firstName} ${order?.shippingAddress?.surname}`,
                            productOrder?.product?.shipping
                                ? `м. ${order?.shippingAddress?.city}, ${order?.shippingAddress?.novaPostOffice || order?.shippingAddress?.personalAddress || order?.shippingAddress?.novaPostLocker}`
                                : 'Самовивіз',
                            order?.user?.email || 'no email',
                        ]);                            
                    })
            );
        });
    
    return result;
}

export const convertZSUOrdersDataToGoogleSheet = (orders: IOrderZsu[]) => {
    const result: IGoogleSheetsData['row'][] = [];
    
    orders?.filter(({ zsuOrder }) => zsuOrder?.length !== 0)
        ?.sort((a, b) => new Date(a.orderAt).getTime() - new Date(b.orderAt).getTime())
        ?.map((order) => {
            const productArray = order?.zsuOrder[0]?.itemsZsuOrder;
            return (
                productArray &&
                [...productArray]
                    ?.sort((a, b) => Number(b.id) - Number(a.id))
                    ?.forEach((productOrder) => {
                        const orderDate = formattedOrderDate(order?.orderAt);
                        const phone = formattedPhone(order?.shippingAddress?.phone);

                        result.push([
                            String(order?.zsuOrder[0]?.orderId),
                            orderDate,
                            productOrder?.product?.name,
                            String(productOrder?.order_quantity),
                            order?.payment_reference?.status === 'success' ? 'Успішна' : 'Не успішна',
                            phone,                            
                            `${order?.shippingAddress?.firstName} ${order?.shippingAddress?.surname}`,
                            '',
                            order?.user?.email || 'no email',
                        ]);                            
                    })
            );
        });
    
    return result;
}
    
export const convertGrowthOrdersDataToGoogleSheet = (orders: IOrderGrowth[]) => {
    const result: IGoogleSheetsData['row'][] = [];
    
    orders?.filter(({ growthOrder }) => growthOrder?.length !== 0)
        ?.sort((a, b) => new Date(a.orderAt).getTime() - new Date(b.orderAt).getTime())
        ?.map((order) => {
            const productArray = order?.growthOrder[0]?.itemsGrowthOrder;
            return (
                productArray &&
                [...productArray]
                    ?.sort((a, b) => Number(b.id) - Number(a.id))
                    ?.forEach((productOrder) => {
                        const orderDate = formattedOrderDate(order?.orderAt);                        
                        const phone = formattedPhone(order?.shippingAddress?.phone);                        
                        
                        result.push([
                            String(order?.growthOrder[0]?.orderId),
                            orderDate,
                            productOrder?.product?.name,
                            String(productOrder?.order_quantity),
                            order?.payment_reference?.status === 'success' ? 'Успішна' : 'Не успішна',
                            phone,                            
                            `${order?.shippingAddress?.firstName} ${order?.shippingAddress?.surname}`,
                            productOrder?.product?.shipping
                                ? `м. ${order?.shippingAddress?.city}, ${order?.shippingAddress?.novaPostOffice || order?.shippingAddress?.personalAddress || order?.shippingAddress?.novaPostLocker}`
                                : 'Самовивіз',
                            order?.user?.email || 'no email',
                            productOrder?.plate || ''
                        ]);                            
                    })
            );
        });
    
    return result;
}

function formattedOrderDate(orderDate: string): string {
    const date = new Date(orderDate);

    const formattedDate = `${String(date.getUTCDate()).padStart(2, '0')}.${String(date.getUTCMonth() + 1).padStart(2, '0')}.${date.getUTCFullYear()} ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
    
    return formattedDate;
}

function formattedPhone(phone: string): string {    
    if (phone?.startsWith('380') || phone?.startsWith('+380')) {
        const formattedPhoneNumber = phone?.replace(/^(\+?38)/, '').split('');        
        formattedPhoneNumber.splice(3, 0, '-');
        formattedPhoneNumber.splice(7, 0, '-');
        formattedPhoneNumber.splice(10, 0, '-');
 
        return formattedPhoneNumber.join('');
    }
    
    return phone;
}
    
