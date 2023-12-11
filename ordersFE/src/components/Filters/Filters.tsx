import React from "react";
import CheckboxFilter from "./FilterComponents/CheckBoxFilter/CheckBoxFilter";
import DateFilter from "./FilterComponents/DateFilter/DateFilter";
import { Button } from "antd";


interface FiltersProps {
  onCreatedDateChange: (dates: unknown, dateStrings: [string, string]) => void;
  onDeliveryDateChange: (dates: unknown, dateStrings: [string, string]) => void;
  onPaidChange: (checked: boolean) => void;
  onNewCustomerChange: (checked: boolean) => void;
  onCardChange: (checked: boolean) => void;
  onCashChange: (checked: boolean) => void;
  onInvoiceChange: (checked: boolean) => void;
  onResetFilters: () => void;
  //   onCombinedChange: (checkedValues: any[]) => void;
}

const Filters: React.FC<FiltersProps> = (props: FiltersProps) => {
  const {
    onCreatedDateChange,
    onDeliveryDateChange,
    onPaidChange,
    onNewCustomerChange,
    onCardChange,
    onCashChange,
    onInvoiceChange,
    onResetFilters,
  } = props;

  return (
    <div>
      <DateFilter label="Date Order Created" onChange={onCreatedDateChange} />
      <DateFilter
        label="Date Order Delivered"
        onChange={onDeliveryDateChange}
      />
      <CheckboxFilter label="Paid" onChange={onPaidChange} />
      <CheckboxFilter label="New Client" onChange={onNewCustomerChange} />
      <CheckboxFilter label="Card" onChange={onCardChange} />
      <CheckboxFilter label="Cash" onChange={onCashChange} />
      <CheckboxFilter label="Invoice" onChange={onInvoiceChange} />

      <Button type="default" onClick={onResetFilters}> Reset Filters </Button>
    </div>
  );
};
export default Filters;
