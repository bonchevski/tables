// CheckboxFilter.tsx
import React from 'react';
import { Checkbox } from 'antd';

interface CheckboxFilterProps {
  label: string;
  onChange: (checked: boolean) => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({ label, onChange }) => {
  return (
    <div>
      <Checkbox onChange={(e) => onChange(e.target.checked)}>{label}</Checkbox>
    </div>
  );
};

export default CheckboxFilter;