import React from 'react'

const ReviewItem = ({ review }) => {
  const { rating, review_text } = review;

  return (
    <div>
      <h2 className='text-white'>Review by Ano***</h2>
      <p className='text-lg font-bold text-white'>Rating: {rating}</p>
      <p className='text-white'>Message: {review_text}</p>
      <br />
      <hr />
      <br />
    </div>
  );
};

export default ReviewItem;
