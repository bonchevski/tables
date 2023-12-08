// TableFilter.tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import CheckboxFilter from '../FilterComponents/CheckBoxFilter/CheckBoxFilter';
import DateFilter from '../FilterComponents/DateFilter/DateFilter';
import CombinedCheckBoxFilter from '../FilterComponents/CombinedCheckBoxFilter/CombinedCheckBoxFilter';
import { TableFilterProps, TableFilters } from '../../../generalTypes/interface';
import { CheckboxValueType } from 'antd/es/checkbox/Group';


const paymentOptions = ['card', 'cash', 'invoice'];

const TableFilter: React.FC<TableFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<TableFilters>({});

  const handleFilterChange = () => {
    onFilterChange(filters);
  };

  const handleDateCreatedPickerChange = (dates: any, dateStrings: [string, string]) => {
    setFilters({ ...filters, creationDate: dateStrings });
    handleFilterChange();
  };
  const handleDateDeliveredPickerChange = (dates: any, dateStrings: [string, string]) => {
    setFilters({ ...filters, creationDate: dateStrings });
  };

  const handleCheckboxChange = (filterKey: keyof TableFilters) => (value: boolean) => {
    setFilters({ ...filters, [filterKey]: value });
  };


  const handlePaymentTypeChange = (selectedOptions: CheckboxValueType[]) => {
    const updatedPaymentTypes = selectedOptions.map((option) => option.toString());
    setFilters({ ...filters, paymentTypes: updatedPaymentTypes });
  };

  return (
    <div>
      <DateFilter label="Date Created" onChange={handleDateCreatedPickerChange} />
      <DateFilter label="Date Delievred" onChange={handleDateDeliveredPickerChange} />
      <CheckboxFilter label="Paid" onChange={handleCheckboxChange('paid')} />
      <CheckboxFilter label="New Client" onChange={handleCheckboxChange('newClient')} />
      <CombinedCheckBoxFilter label='payment types' options={paymentOptions} onChange={handlePaymentTypeChange} />
      <div>
        <Button type="default" onClick={handleFilterChange}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default TableFilter;