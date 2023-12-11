import { ReactNode, createContext, useState } from 'react';
import { DateRange, OrdersDataType, TableFilters } from '../generalTypes/interface';
import { ColumnsType } from 'antd/es/table';

// Define the initial state of the tables
const initialTables = [];

// Create the context
export const TableContext = createContext({});


export interface TableContextProps {
    children?: ReactNode | ReactNode[];
    TableContext: {
        columns: ColumnsType<OrdersDataType> | ColumnsType<any>;
        dataSource: OrdersDataType[] | Array<never>;
        activeFilters: {
            createdDate: DateRange | null;
            deliveryDate: DateRange | null;
            orderNumber: string;
            clientName: string | null;
            price: number | null;
            isPaid: boolean;
            isCash: boolean;
            isCard: boolean;
            hasInvoice: boolean;
            isNewCustomer: boolean;
        }
        rowSelection: any;
        getUnfilteredDataSource: () => void;

    }
}

// Create the provider component
export const TableProvider = ({ children }) => {
    const [tableData, setTableData] = useState(initialTables);

    // Function to get items from the tables
    const getItems = () => {
        // Implement your logic to fetch items from the tables
    };

    // Function to update an item in the tables
    const updateItem = (itemId, updatedData) => {
        // Implement your logic to update an item in the tables
    };

    // Function to delete an item from the tables
    const deleteItem = (itemId) => {
        // Implement your logic to delete an item from the tables
    };

    return (
        <TableContext.Provider value={{ tables, getItems, updateItem, deleteItem }}>
            {children}
        </TableContext.Provider>
    );
};