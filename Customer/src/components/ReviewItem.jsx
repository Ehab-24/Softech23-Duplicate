import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import useAuthStore from '../store/useAuth';

const ReviewItem = ({ review, deleteReview }) => {
  const {user} = useAuthStore();
  const { rating, review_text, customer_id } = review;

  return (
    <div className='relative'>
      {user?._id === customer_id && 
      <AiFillDelete className='absolute top-0 right-0 text-2xl text-pink-500 cursor-pointer' onClick={()=>{deleteReview(review._id)}} />
      }
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
