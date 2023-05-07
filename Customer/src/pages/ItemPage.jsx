import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PlaceGallery from '../components/PlaceGallery/PlaceGallery';
import useCartStore from '../store/useCart';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuth';
import { AiFillStar } from "react-icons/ai"
import { Toaster, toast } from "react-hot-toast";
import Review from '../components/Review';
import ReviewItem from '../components/ReviewItem';

const ItemPage = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const { user } = useAuthStore();
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    toast.dismiss();
    fetchItem();
    fetchReviews();
  }, [])

  const fetchItem = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/item/${id}`, {}, {})
      setItem(res.data.item);
    } catch (error) {

    }
  }

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/review/item/${id}`, {}, {})
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddToCart = () => {
    if (item.stock === 0) {
      toast.error("Out of stock");
    }
    else if (user === null) {
      setOpen(true);
    }
    else {
      addToCart(item);
    }
  }

  const handleBuy = () => {
    if (item.stock === 0) {
      toast.error("Out of stock");
    }
    else if (user === null) {
      setOpen(true);
    }
    else {
      addToCart(item);
      navigate('/order');
    }
  }

  const deleteReview = async (review_id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URI}/review/${review_id}`, {});
      setReviews(reviews.filter((r) => r._id !== review_id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster />
      <LoginPage open={open} setOpen={setOpen} />
      {item &&
        <div className='mt-8 flex pt-6'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-4xl text-white font-semibold'>{item.item_title}</h2>
            <div className='flex items-center'>
              {[...Array(item.average_rating)].map((_, i) => (
                <AiFillStar key={i} className='text-white inline-block' />
              ))}
              {[...Array(5 - item.average_rating)].map((_, i) =>
                <AiFillStar key={i} className='text-gray-600 inline-block' />
              )}
              <h2 className='ml-2 font-bold text-white'>
                {item.average_rating}
              </h2>
            </div>
            <PlaceGallery photos={[item.item_images[0]]} />
          </div>
          <div className='flex flex-col mt-20 ml-6'>
            <h4 className='text-lg text-gray-300 mb-3'>{item.item_description.length > 50 ? item.item_description.substring(0, 90) + "..." : item.item_description}</h4>
            <h4 className='text-gray-300 font-bold'>Minimum Age: {item.minimum_age}</h4>
            <h4 className='font-bold text-pink-500 mt-3 text-2xl font-bold'>{item.item_price} PKR</h4>
            <h4 className='text-gray-300 text-sm font-bold mt-2'>Stock: {item.item_quantity}</h4>
            <div className='flex flex-col gap-3 mt-12'>
              <button className='bg-pink-500 font-bold text-white px-20 py-4 rounded-full' onClick={handleAddToCart}>
                Add to cart
              </button>
              <button className='bg-pink-500 font-bold text-white px-20 py-4 rounded-full' onClick={handleBuy}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      }
      {
        reviews.length > 0 && (
          <div className='mt-8'>
            <h2 className='text-2xl text-white font-semibold'>Reviews</h2>
            <div className='flex flex-col gap-4 mt-4 w-80'>
              {reviews.map((review) => (
                <div key={review._id} onClick={()=>{deleteReview(review._id)}}>
                  <ReviewItem review={review} deleteReview={deleteReview} />
                </div>
              ))}
            </div>
          </div>
        )
      }
      {item && user && <Review refresh={fetchReviews} item={item} />}
    </div>
  )
}

export default ItemPage;