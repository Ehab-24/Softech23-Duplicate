import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import axios from "axios"
import useAuthStore from '../store/useAuth';

const Review = ({item, refresh}) => {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const {token} = useAuthStore();

    const handleSubmit = async () => {
        if (rating === 0 || text === '') {
            toast.error('Please fill all fields');
            return;
        }
        const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/review`, {
            rating,
            review_text: text,
            item_id: item._id,
            token
        });
        refresh();
        setRating(0);
        setText('');
    };

    const handleStarClick = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className='mt-8'>
            <Toaster />
            <div>
                <label className='text-2xl text-white'>Rating:</label>
                <div className='flex mt-2'>
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            onClick={() => handleStarClick(i + 1)}
                            color={rating > i ? '#ffc107' : '#e4e5e9'}
                            size={24}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}
                </div>
            </div>
            <div className='mt-4'>
                <label className='text-lg text-white mt-4'>Message:</label>
                <textarea
                className='mt-2 w-full h-32 p-4 rounded-lg bg-pink-900 text-white'
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </div>
            <button className='text-white py-2 px-2  bg-pink-500 rounded' type="submit" onClick={handleSubmit}>
                Submit Review
            </button>
            
        </div>
    );
};

export default Review;
