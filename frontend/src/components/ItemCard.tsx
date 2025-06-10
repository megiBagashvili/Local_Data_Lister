import React from 'react';
import { LocalItem } from '../types/LocalItem';

/**
 * @interface ItemCardProps
 * @description Defines the props for the ItemCard component.
 * It now expects a single LocalItem object.
 */
interface ItemCardProps {
  localItem: LocalItem;
}

/**
 * @function ItemCard
 * @description A functional React component that displays details of a single local item.
 * It uses the localItem prop to render the item's name, type, and description.
 */
const ItemCard: React.FC<ItemCardProps> = ({ localItem }) => {
  return (
    <div className="item-card">
      <h3>{localItem.name}</h3>
      <p><strong>Type:</strong> {localItem.type}</p>
      <p>{localItem.description}</p>
      {localItem.location && <p><small>Location: {localItem.location}</small></p>}
      {localItem.features && localItem.features.length > 0 && (
        <p><small>Features: {localItem.features.join(', ')}</small></p>
      )}
    </div>
  );
};

export default ItemCard;