import { CheckboxValueType } from "antd/es/checkbox/Group";

export interface TableFilterProps {
    onFilterChange: (filters: TableFilters) => void;
  }
  
  export interface TableFilters {
    creationDate?: [string, string];
    deliveryDate?: [string, string];
    paymentTypes?: string[];
    paid?: boolean;
    newClient?: boolean;
  }
  export interface CombinedCheckboxFilterProps {
    options: string[];
    onChange: (selectedOptions: CheckboxValueType[]) => void;
    multipleChoice?: boolean;
    label: string;
  }

 export interface OrderCharacteristics {
    isPaid: boolean;
    hasInvoice: boolean;
    isNewCustomer: boolean;
  }
  
 export interface OrdersDataType {
    key: React.Key;
    orderNumber: string;
    clientName: string;
    price: number;
    characteristics: OrderCharacteristics;
  }