import React from 'react';

/**
 * @function ItemCardSkeleton
 * @desc A component that displays a placeholder skeleton UI.
 * It mimics the layout of the ItemCard to provide a smooth loading experience
 * while data is being fetched.
 */
const ItemCardSkeleton: React.FC = () => {
  return (
    <div className="item-card skeleton-card">
      <div className="item-card-image-container skeleton"></div>
      <div className="item-card-content">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text skeleton-text-short"></div>
        <div className="item-details-container">
            <div className="skeleton skeleton-detail"></div>
        </div>
        <div className="card-actions">
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

export default ItemCardSkeleton;
