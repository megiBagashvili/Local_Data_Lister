import React from 'react';

/**
 * @interface SortBarProps
 * @desc Defines the props for the SortBar component.
 * @property {string} sortKey - The current value of the sort selection (e.g., 'rating-desc').
 * @property {(key: string) => void} onSortChange - Callback function to notify the parent of a new sort key selection.
 */
interface SortBarProps {
  sortKey: string;
  onSortChange: (key: string) => void;
}

/**
 * @function SortBar
 * @desc A UI component that renders a dropdown menu to sort a list of items.
 * It is a controlled component, receiving its current state and a change handler via props.
 * @param {SortBarProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered dropdown menu for sorting.
 */
const SortBar: React.FC<SortBarProps> = ({ sortKey, onSortChange }) => {
  /**
   * @function handleSelectChange
   * @desc Handles the change event of the select dropdown and calls the onSortChange prop.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The select change event.
   */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sort-bar-container">
      <label htmlFor="sort-key" className="sort-label">Sort by:</label>
      <select 
        id="sort-key" 
        value={sortKey} 
        onChange={handleSelectChange}
        className="sort-select"
      >
        <option value="default">Default</option>
        <option value="rating-desc">Rating (High to Low)</option>
        <option value="rating-asc">Rating (Low to High)</option>
        <option value="favorites-desc">Favorites (Most to Least)</option>
        <option value="favorites-asc">Favorites (Least to Most)</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
      </select>
    </div>
  );
};

export default SortBar;
