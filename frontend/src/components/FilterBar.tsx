import React from 'react';


interface FilterBarProps {
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ types, selectedType, onTypeChange }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(e.target.value);
  };

  return (
    <div className="filter-bar-container">
      <label htmlFor="type-filter" className="filter-label">Filter by Type:</label>
      <select 
        id="type-filter" 
        value={selectedType} 
        onChange={handleSelectChange}
        className="filter-select"
      >
        <option value="all">All Types</option>
        
        {types.map(type => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
