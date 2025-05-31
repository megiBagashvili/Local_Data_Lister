import React from 'react';

/**
 * @interface SearchBarProps
 * @description Defines the props for the SearchBar component.
 * Currently, it doesn't take any specific props, but will later.
 */
interface SearchBarProps {
  // We will define props here later
}

/**
 * @function SearchBar
 * @description A functional React component that will provide a search input field.
 * For now, it just gives  placeholder input.
 */
const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search local items..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;