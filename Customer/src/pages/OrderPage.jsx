import React, { useEffect } from 'react'
import useCartStore from '../store/useCart';
import {RiCloseLine} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';
import OrderComponent from '../components/OrderComponent';

const OrderPage = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart} = useCartStore();
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/');
        }
    }, [cart])

    return (
        <div className='pt-10 w-full'>
            <h1 className='text-white text-2xl font-semibold mb-4'>Your Cart Items</h1>
            <div className='flex justify-between'>
            <div>
            <div className='mb-10'>
                <h2 className='text-white text-xl font-semibold'>Total: ${cart.reduce((acc, item) => acc + item.price, 0)}</h2>
                <button className='bg-pink-500 text-white px-4 py-2 rounded-md mt-4' onClick={clearCart}>Remove All</button>
            </div>
            <div className='flex flex-col gap-4'>
                {cart.map((item) => (
                    <div className='w-[450px]'>
                    <div className='flex gap-4 items-start w-72 mb-6'>
                        <img src={item.image} alt={item.title} className='w-20 h-20 aspect-square object-cover' />
                        <div className='flex flex-col'>
                            <h2 className='text-white text-xl font-semibold'>{item.title}</h2>
                            <h2 className='text-white text-md'>${item.price}</h2>
                        </div>
                        <div className='mt-2 ml-auto'>
                        <button onClick={()=>{removeFromCart(item)}}>
                            <RiCloseLine className='text-white text-2xl bg-pink-500 ' />
                        </button>
                        </div>
                    </div>
                    <hr />
                    </div>
                ))}
            </div>
            </div>
            <div className=''>
            <OrderComponent />
            </div>
            </div>
        </div>
    )
}

export default OrderPage;