import React, { useState, useEffect } from 'react';
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
 * @desc A component that displays details for a single item, including review
 * functionality and the new real-time "favorite" feature.
 */
const ItemCard: React.FC<ItemCardProps> = ({ localItem, token, onReviewSubmit }) => {
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [areReviewsVisible, setAreReviewsVisible] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [isFavorited, setIsFavorited] = useState(localItem.isFavoritedByUser || false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    setIsFavorited(localItem.isFavoritedByUser || false);
  }, [localItem.isFavoritedByUser]);

  /**
   * @function handleFavoriteClick
   * @desc Handles adding/removing a favorite with an "optimistic update".
   */
  const handleFavoriteClick = async () => {
    if (!token) {
      setApiError("You must be logged in to favorite items.");
      return;
    }
    setApiError(null);

    const originalFavoritedState = isFavorited;
    setIsFavorited(!originalFavoritedState);

    try {
      const method = !originalFavoritedState ? 'POST' : 'DELETE';
      await axios({
        method: method,
        url: `http://localhost:8080/api/items/${localItem.id}/favorite`,
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      setIsFavorited(originalFavoritedState);
      setApiError("Could not update favorite status. Please try again.");
    }
  };

  const handleFormSubmit = (itemId: string, rating: number, comment: string) => {
    onReviewSubmit(itemId, rating, comment);
    setReviewFormVisible(false);
  };

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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <div className="item-card">
      {localItem.photos && localItem.photos.length > 0 && (
        <div className="item-card-image-container">
          <img
            src={localItem.photos[0]}
            alt={localItem.name}
            className="item-card-image"
            onError={handleImageError}
          />
        </div>
      )}

      <div className="item-card-content">
        <div className="card-header">
          <h3>{localItem.name}</h3>
          <div className="favorite-container">
            { }
            <button
              onClick={handleFavoriteClick}
              disabled={!token}
              className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
              title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            ></button>
            <span className="favorite-count">
              {localItem.favoriteCount ?? 0}
            </span>
          </div>
        </div>

        <p className="item-type-badge">{localItem.type}</p>

        <p className="item-description">{localItem.description}</p>

        <div className="item-details-container">
          {localItem.rating && Number(localItem.rating) > 0 && (
            <div className="item-detail">
              <span className="detail-icon">★</span>
              <strong>{Number(localItem.rating).toFixed(1)}</strong>
            </div>
          )}
          {localItem.location && (
            <div className="item-detail">
              <span className="detail-icon">📍</span>
              <span>{localItem.location}</span>
            </div>
          )}
        </div>

        {apiError && <p className="error-message-small"><small>{apiError}</small></p>}

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
      </div>

      {isReviewFormVisible && (
        <div className="item-card-collapsible-section">
          <ReviewForm
            itemId={localItem.id}
            onSubmit={handleFormSubmit}
            onCancel={() => setReviewFormVisible(false)}
          />
        </div>
      )}

      {areReviewsVisible && (
        <div className="item-card-collapsible-section">
          <div className="reviews-section">
            <h4>User Reviews</h4>
            {isLoadingReviews ? <p>Loading reviews...</p> : <ReviewList reviews={reviews} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
