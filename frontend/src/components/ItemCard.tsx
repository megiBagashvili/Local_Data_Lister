import React, { useState } from 'react';
import { LocalItem } from '../types/LocalItem';
import ReviewForm from './ReviewForm';

interface ItemCardProps {
  localItem: LocalItem;
  token: string | null;
  onReviewSubmit: (itemId: string, rating: number, comment: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ localItem, token, onReviewSubmit }) => {
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);

  const handleFormSubmit = (itemId: string, rating: number, comment: string) => {
    onReviewSubmit(itemId, rating, comment);
    setReviewFormVisible(false);
  };

  return (
    <div className="item-card">
      <h3>{localItem.name}</h3>
      <p><strong>Type:</strong> {localItem.type}</p>
      {localItem.rating && <p><strong>Rating:</strong> {localItem.rating} / 5.0</p>}
      <p>{localItem.description}</p>
      {localItem.location && <p><small>Location: {localItem.location}</small></p>}
      
      {token && !isReviewFormVisible && (
        <button onClick={() => setReviewFormVisible(true)} className="btn-review">
          Leave a Review
        </button>
      )}

      {isReviewFormVisible && (
        <ReviewForm
          itemId={localItem.id}
          onSubmit={handleFormSubmit}
          onCancel={() => setReviewFormVisible(false)}
        />
      )}
    </div>
  );
};

export default ItemCard;
