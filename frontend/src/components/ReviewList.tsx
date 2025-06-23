import React from 'react';
import ReviewCard from './ReviewCard';

/**
 * @interface Review
 * @desc Defines the shape of a single review object that this component expects.
 */
interface Review {
  id: string;
  rating: number;
  comment: string | null;
  user: {
    name: string | null;
  };
}

/**
 * @interface ReviewListProps
 * @desc Defines the props for the ReviewList component.
 */
interface ReviewListProps {
  reviews: Review[];
}

/**
 * @function ReviewList
 * @desc A component that takes an array of review objects, maps over them,
 * and renders a `ReviewCard` for each one. Displays a fallback message
 * if the reviews array is empty.
 */
const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p className="no-reviews-message">No reviews yet. Be the first!</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;