import React, { useState } from 'react'
import useCartStore from '../store/useCart'
import LoadingButton from './LoadingButton/LoadingButton';
import axios from 'axios';
import useAuthStore from '../store/useAuth';
import { useNavigate } from 'react-router-dom';
import {Toaster, toast} from 'react-hot-toast';

const OrderComponent = () => {

    const {user} = useAuthStore();
    const { cart , clearCart} = useCartStore();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOrder = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/order`, {
                order_items: cart.map(item => item._id),
                order_total: cart.reduce((acc, item) => acc + item.item_price, 0),
                order_status: 'pending',
                customer_id: user._id
            }, {});
            if (res.status === 201) {
                setLoading(false);
                clearCart();
                navigate("/");
            }
        } catch (error) {
            
        }
    }


    return (
        <div className='bg-pink-800 rounded-xl p-5'>
            <Toaster />
            <span className='flex items-center gap-2'>
                <h2 className='text-xl text-white'>Total Price: </h2>
                <h2 className='text-lg text-white font-bold'> PKR {cart.reduce((acc, item) => acc + item.item_price, 0)}</h2>
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

export default OrderComponent;