import dayjs from "dayjs";
import { DateRange, OrdersDataType, TableFilters } from "./generalTypes/interface";
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);
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

export const checkIfNull = (valueOne?: string | null, valueTwo?: string | null) => {
    if (valueOne === null || valueTwo === null) {
        return true;
    }
    return false;
}


export const checkBoxFiltration = (data: OrdersDataType[], filters: TableFilters): OrdersDataType[] => {
    if(filters.isPaid == true) {
        data = data.filter((order) => order.characteristics.isPaid === filters.isPaid);
    } else if (filters.isCash == true) {
        data = data.filter((order) => order.characteristics.isCash === filters.isCash);
    } else if (filters.isCard == true) {
        data = data.filter((order) => order.characteristics.isCreditCard === filters.isCard);
    } else if (filters.isInvoice == true) {
        data = data.filter((order) => order.characteristics.hasInvoice === filters.isInvoice);
    } else if (filters.isNewCustomer == true) {
        data = data.filter((order) => order.characteristics.isNewCustomer === filters.isNewCustomer);
    } else if (filters.cancelled == true) {
        data = data.filter((order) => order.cancelled === filters.cancelled);
    }
    else {
        return data;
    }
    return data;
}

const filterByDateRange = (data: OrdersDataType[], dateRange: DateRange) => {
    const { start, end } = dateRange;
    if (checkIfNull(start, end)) {
        return data;
    }
    return data.filter((order) => {
        const orderDate = dayjs(order.createdDate);
        return orderDate.isBetween(start, end);
    });
}

export const filterTableData = (data: OrdersDataType[], filters: TableFilters): OrdersDataType[] => {
    const { isCard, isCash, isInvoice, isPaid, isNewCustomer, createdDate, deliveryDate } = filters;
    let filteredData = data;
    if (createdDate) {
    filteredData = filterByDateRange(data, createdDate);
    }
    if (deliveryDate) {
    filteredData = filterByDateRange(data, deliveryDate);
    }
    if(isPaid || isNewCustomer || isCard || isCash || isInvoice) {
        filteredData = checkBoxFiltration(filteredData, filters);
    }
    return filteredData;
}