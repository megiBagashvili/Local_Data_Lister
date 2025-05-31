import React from 'react';

/**
 * @interface ItemCardProps
 * @description Defines the props for the ItemCard component.
 * Currently, it doesn't take any specific props, but will later.
 */
interface ItemCardProps {
  // We will define props here later
}

/**
 * @function ItemCard
 * @description A functional React component that will display details of a single local item.
 * For now, it just gives placeholder text.
 */
const ItemCard: React.FC<ItemCardProps> = () => {
  return (
    <div className="item-card">
      <h3>Item Name Placeholder</h3>
      <p>Description placeholder.</p>
    </div>
  );
};

export default ItemCard;