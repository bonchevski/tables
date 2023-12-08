import React, { useState } from 'react';
import { Checkbox } from 'antd'; // Import CheckboxValueType
import { CheckboxValueType } from 'antd/es/checkbox/Group';

interface FiltersProps {
  onFilterChange: (selectedFilters: CheckboxValueType[]) => void; // Update the type
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<CheckboxValueType[]>([]); // Update the type

  const handleFilterChange = (checkedValues: CheckboxValueType[]) => { // Update the type
    setSelectedFilters(checkedValues);
    onFilterChange(checkedValues);
  };

  return (
    <Checkbox.Group onChange={handleFilterChange} value={selectedFilters}>
      <Checkbox value="filter1">Filter 1</Checkbox>
      {/* Add more checkboxes as needed */}
    </Checkbox.Group>
  );
};

export default Filters;