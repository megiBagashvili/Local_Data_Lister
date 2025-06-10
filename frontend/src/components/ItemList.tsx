import React from 'react';
import { LocalItem } from '../types/LocalItem';

/**
 * @interface ItemListProps
 * @description Defines the props for the ItemList component.
 * It now expects an array of LocalItem objects.
 */
interface ItemListProps {
  localItems: LocalItem[];
}

/**
 * @function ItemList
 * @description A functional React component that will display a list of local items.
 * Itrenders a placeholder text.
 */
const ItemList: React.FC<ItemListProps> = ({ localItems }) => {
  return (
    <div className="item-list-container">
      <h2>Local Items List</h2>
      {localItems.length === 0 ? (
        <p>No local items to display.</p>
      ) : (
        <p>Displaying {localItems.length} items.</p>
      )}
    </div>
  );
};

export default ItemList;