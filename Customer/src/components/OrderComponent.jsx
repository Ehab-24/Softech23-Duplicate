import React, { useState } from 'react'
import useCartStore from '../store/useCart'
import LoadingButton from './LoadingButton/LoadingButton';

const OrderComponent = () => {
    const { cart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const handleOrder = () => {}

return (
    <div className='bg-pink-800 rounded-xl p-5'>
        <span className='flex items-center gap-2'>
        <h2 className='text-xl text-white'>Total Price: </h2>
        <h2 className='text-lg text-white font-bold'>{cart.reduce((acc, item) => acc + item.price, 0)} PKR</h2>
        </span>
        <span className='flex items-center gap-2 mb-8'>
        <h2 className='text-xl text-white'>Total Items:</h2>
        <h2 className='text-lg text-white font-bold'>{cart.length}</h2>
        </span>
       <div className='w-60'>
        <LoadingButton click={handleOrder} isLoading={loading} setIsLoading={setLoading} text='Order Now' />
        </div>
     </div>
  )
}

export default OrderComponent