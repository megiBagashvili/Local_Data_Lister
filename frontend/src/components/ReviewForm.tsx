import React, { useState } from 'react';

interface ReviewFormProps {
  itemId: string;
  onSubmit: (itemId: string, rating: number, comment: string) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ itemId, onSubmit, onCancel }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating.');
      return;
    }
    onSubmit(itemId, rating, comment);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h4>Write a Review</h4>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= (hoverRating || rating) ? 'star-filled' : 'star-empty'}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows={4}
      />
      <div className="review-form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
        <button type="submit" className="btn-submit">Submit Review</button>
      </div>
    </form>
  );
};

export default ReviewForm;
