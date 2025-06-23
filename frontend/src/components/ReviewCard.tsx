import React from 'react';

/**
 * @interface Review
 * @desc Defines the shape of a single review object, including the nested user data.
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
 * @interface ReviewCardProps
 * @desc Defines the props expected by the ReviewCard component.
 */
interface ReviewCardProps {
  review: Review;
}

/**
 * @function ReviewCard
 * @desc A presentational component responsible for displaying a single user review,
 * including the author's name, star rating, and their comment.
 */
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <strong className="review-author">{review.user.name || 'Anonymous'}</strong>
        <div className="review-stars">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={index < review.rating ? 'star-filled' : 'star-empty'}>
              ★
            </span>
          ))}
        </div>
      </div>
      {review.comment && <p className="review-comment">"{review.comment}"</p>}
    </div>
  );
};

export default ReviewCard;