import React from 'react';
import { DatePicker } from 'antd';

interface DatePickerFilterProps {
  onChange: (dates: any, dateStrings: [string, string]) => void;
  label: string;
}

const DateFilter: React.FC<DatePickerFilterProps> = ({ onChange, label }) => {
  return (
    <div>
      <label>{label}</label>
      <DatePicker.RangePicker allowClear={true} onChange={onChange} />
    </div>
  );
};

export default DateFilter;