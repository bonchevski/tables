import dayjs from "dayjs";
import { OrdersDataType, TableFilters } from "./generalTypes/interface";
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);
// format date to YYYY-MM-DD with dayjs
export const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD');
};

// format ordersdata to be used in ordersTable
export const formatOrdersData = (data: never[]): OrdersDataType[] => {
    return data.map((order: any) => {
        return {
        key: order.id,
        orderNumber: order.order_number,
        createdDate: formatDate(order.order_created_date),
        deliveryDate: formatDate(order.order_delivered_date),
        clientName: order.client_name,
        paymentMethod: order.payment_method,
        price: order.order_amount,
        characteristics: {
            isPaid: order.is_paid,
            isCash: order.payment_method === 'cash_on_delivery',
            isCreditCard: order.payment_method === 'card',
            hasInvoice: order.payment_method === 'invoice',
            isNewCustomer: order.new_client,
            isCancelled: order.is_cancelled,
        },
        cancelled: order.is_cancelled,
        };
    });
};  

    