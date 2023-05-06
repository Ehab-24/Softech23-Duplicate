import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { videoGame } from '../consts'
import axios from 'axios'
import PlaceGallery from '../components/PlaceGallery/PlaceGallery';
import useCartStore from '../store/useCart';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuth';
import { AiFillStar } from "react-icons/ai"
import { Toaster, toast } from "react-hot-toast";

const ItemPage = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const { user } = useAuthStore();
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    toast.dismiss();
    const item = videoGame.find((item) => item.id === parseInt(id))
    setItem(item);
  }, [])

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
    else if (!user === null) {
      setOpen(true);
    }
    else {
      addToCart(item);
      navigate('/order');
    }
  }

  return (
    <div>
      <Toaster />
      <LoginPage open={open} setOpen={setOpen} />
      {item &&
        <div className='mt-8 flex pt-6'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-4xl text-white font-semibold'>{item.title}</h2>
            <div className='flex items-center'>
              {[...Array(item.rating)].map((_, i) => (
                <AiFillStar key={i} className='text-white inline-block' />
              ))}
              {[...Array(5 - item.rating)].map((_, i) =>
                <AiFillStar key={i} className='text-gray-600 inline-block' />
              )}
              <h2 className='ml-2 font-bold text-white'>
                {item.rating}
              </h2>
            </div>
            <PlaceGallery photos={[item.image]} />
          </div>
          <div className='flex flex-col mt-20 ml-6'>
            <h4 className='text-lg text-gray-300 font-bold'>{item.description}</h4>
            <h4 className='text-gray-300 font-bold'>Minimum Age: {item.minimum_age}</h4>
            <h4 className='font-bold text-pink-500 mt-3 text-2xl font-bold'>{item.price} PKR</h4>
            <h4 className='text-gray-300 text-sm font-bold mt-2'>Stock: {item.stock}</h4>
            <div className='flex flex-col gap-3 mt-12'>
              <button className='bg-pink-500 font-bold text-white px-20 py-4 rounded-full' onClick={handleAddToCart}>
                Add to cart
              </button>
              <button className='bg-pink-500 font-bold text-white px-20 py-4 rounded-full' onClick={handleBuy}>
                Buy Now
              </button>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default ItemPage