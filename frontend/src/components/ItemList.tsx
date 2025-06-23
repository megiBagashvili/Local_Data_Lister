import React from 'react';
import { LocalItem } from '../types/LocalItem';
import ItemCard from './ItemCard';

/**
 * @interface ItemListProps
 * @description Defines the props for the ItemList component.
 * It now also accepts the auth token and the review submission handler
 * to pass them down to each ItemCard.
 */
interface ItemListProps {
  localItems: LocalItem[];
  token: string | null;
  onReviewSubmit: (itemId: string, rating: number, comment: string) => void;
}

/**
 * @function ItemList
 * @description A functional React component that displays a list of local items.
 * It iterates over the localItems array and renders an ItemCard for each item,
 * passing down the necessary props for review functionality.
 */
const ItemList: React.FC<ItemListProps> = ({ localItems, token, onReviewSubmit }) => {
  return (
    <div className="item-list-container">
      <h2>Local Items List</h2>

      {localItems.length === 0 ? (
        <p>No local items to display. Please ensure the backend is running and serving data.</p>
      ) : (
        <div className="items-grid">
          {localItems.map((item) => (
            <ItemCard
              key={item.id}
              localItem={item}
              token={token}
              onReviewSubmit={onReviewSubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
