import React, { useEffect, useState } from 'react'
import LoginPage from './LoginPage'
import { videoGame } from '../consts';
import CategoryItem from '../components/CategoryItem';
import {toast, Toaster} from 'react-hot-toast';

const HomePage = () => {

  useEffect(() => {
    toast.dismiss();
  }, [])
  const [open, setOpen] = useState(false);

  return (
    <div>
        <LoginPage open={open} setOpen={setOpen} />
       <h2 className='mt-14 text-white text-2xl ml-2 mb-6'>Video Games</h2> 
        <div className="flex gap-12 mt-4">
        {videoGame.map((item) => (
            <CategoryItem item={item} />
        ))}
        </div>
        <h2 className='mt-8 text-white text-2xl ml-2 mb-6'>Gaming Gears</h2> 
        <div className="flex gap-12 mt-4">
        {videoGame.map((item) => (
            <CategoryItem item={item} />
        ))}
        </div>
    </div>
  )
}

export default HomePage;