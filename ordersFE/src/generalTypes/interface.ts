import { CheckboxValueType } from "antd/es/checkbox/Group";

  export interface CombinedCheckboxFilterProps {
    options: string[];
    onChange: (selectedOptions: CheckboxValueType[]) => void;
    multipleChoice?: boolean;
    label: string;
  }


 export interface OrderCharacteristics {
  isPaid: boolean;
  isCash: boolean;
  isCreditCard: boolean;
  hasInvoice: boolean;
  isNewCustomer: boolean;
  isCancelled: boolean;
  }
  
 export interface OrdersDataType {
  key: React.Key;
  orderNumber: string;
  createdDate: string;
  deliveryDate: string;
  paymentMethod: string;
  clientName: string;
  price: number;
  characteristics: OrderCharacteristics;
  cancelled?: boolean;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface TableFilters {
  createdDate?: DateRange | null;
  deliveryDate?:{
    start: string;
    end: string;
  };
  isCard?: boolean;
  isCash?: boolean;
  isInvoice?: boolean;
  isPaid?: boolean;
  isNewCustomer?: boolean;
  cancelled?: boolean;
}