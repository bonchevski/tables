// PaymentTypeFilter.tsx
import React from 'react';
import { Checkbox } from 'antd';
import { CombinedCheckboxFilterProps } from '../../../../generalTypes/interface';
import { CheckboxValueType } from 'antd/es/checkbox/Group';



const CombinedCheckBoxFilter: React.FC<CombinedCheckboxFilterProps> = ({
  options,
  onChange,
  label,
}) => {
  const handleCheckboxChange = (selectedOptions: CheckboxValueType[]) => {
    onChange(selectedOptions);
  };

  return (
    <div>
      <label>{label}</label>
      <Checkbox.Group
        options={options}
        onChange={handleCheckboxChange}
        defaultValue={[]}
      />
    </div>
  );
};

export default CombinedCheckBoxFilter;