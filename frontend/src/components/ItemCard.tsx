import React, { useState } from 'react';
import axios from 'axios';
import { LocalItem } from '../types/LocalItem';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

/**
 * @interface Review
 * @desc Defines the shape of a single review object fetched from the API.
 */
interface Review {
  id: string;
  rating: number;
  comment: string | null;
  user: { name: string | null };
}

/**
 * @interface ItemCardProps
 * @desc Defines the props for the ItemCard component.
 */
interface ItemCardProps {
  localItem: LocalItem;
  token: string | null;
  onReviewSubmit: (itemId: string, rating: number, comment: string) => void;
}

/**
 * @function ItemCard
 * @desc A component that displays details for a single item. It also handles
 * the UI logic for showing/hiding and submitting the review form, as well
 * as fetching and displaying existing reviews for the item.
 */
const ItemCard: React.FC<ItemCardProps> = ({ localItem, token, onReviewSubmit }) => {
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [areReviewsVisible, setAreReviewsVisible] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  /**
   * @function handleFormSubmit
   * @desc A wrapper for the onReviewSubmit prop that also hides the form upon submission.
   */
  const handleFormSubmit = (itemId: string, rating: number, comment: string) => {
    onReviewSubmit(itemId, rating, comment);
    setReviewFormVisible(false);
  };

  /**
   * @function toggleReviewsVisibility
   * @desc Toggles the visibility of the reviews section. Fetches reviews via an
   * API call the first time it's opened.
   */
  const toggleReviewsVisibility = async () => {
    if (!areReviewsVisible && reviews.length === 0) {
      setIsLoadingReviews(true);
      try {
        const response = await axios.get<Review[]>(`http://localhost:8080/api/items/${localItem.id}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    }
    setAreReviewsVisible(!areReviewsVisible);
  };

  return (
    <div className="item-card">
      <h3>{localItem.name}</h3>
      <p><strong>Type:</strong> {localItem.type}</p>
      <p>
        <strong>Rating:</strong> {localItem.rating && Number(localItem.rating) > 0 ? localItem.rating : '0'} / 5.0
      </p>

      <p>{localItem.description}</p>
      {localItem.location && <p><small>Location: {localItem.location}</small></p>}
      
      <div className="card-actions">
        {token && !isReviewFormVisible && (
          <button onClick={() => setReviewFormVisible(true)} className="btn-review">
            Leave a Review
          </button>
        )}
        <button onClick={toggleReviewsVisibility} className="btn-show-reviews">
          {areReviewsVisible ? 'Hide Reviews' : 'Show Reviews'}
        </button>
      </div>

      {isReviewFormVisible && (
        <ReviewForm
          itemId={localItem.id}
          onSubmit={handleFormSubmit}
          onCancel={() => setReviewFormVisible(false)}
        />
      )}

      {areReviewsVisible && (
        <div className="reviews-section">
          <h4>User Reviews</h4>
          {isLoadingReviews ? <p>Loading reviews...</p> : <ReviewList reviews={reviews} />}
        </div>
      )}
    </div>
  );
};

export default ItemCard;
