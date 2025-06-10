import React from 'react';
import { LocalItem } from '../types/LocalItem';
import ItemCard from './ItemCard';

/**
 * @interface ItemListProps
 * @description Defines the props for the ItemList component.
 * It expects an array of LocalItem objects.
 */
interface ItemListProps {
  localItems: LocalItem[];
}

/**
 * @function ItemList
 * @description A functional React component that displays a list of local items.
 * It iterates over the localItems prop and renders an ItemCard for each.
 */
const ItemList: React.FC<ItemListProps> = ({ localItems }) => {
  return (
    <div className="item-list-container">
      <h2>Local Items List</h2>

      {localItems.length === 0 ? (
        <p>No local items to display. Please ensure the backend is running and serving data.</p>
      ) : (
        <div className="items-grid">
          {localItems.map((item) => (
            <ItemCard key={item.id} localItem={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;