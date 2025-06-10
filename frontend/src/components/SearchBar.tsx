import React from 'react';

/**
 * @interface SearchBarProps
 * @description Defines the props for the SearchBar component.
 * Eexpects the current search query and a function to update it.
 */
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/**
 * @function SearchBar
 * @description A functional React component that provides a controlled search input field.
 * Its value is controlled by the searchQuery prop, and changes update the state via setSearchQuery.
 */
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search local items..."
        className="search-input"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;