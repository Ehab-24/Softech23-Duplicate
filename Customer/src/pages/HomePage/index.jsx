import React, { useEffect, useState } from 'react'
import LoginPage from '../LoginPage';
import { toast, Toaster } from 'react-hot-toast';
import InventoryList from './InventoryList';
import useAuthStore from '../../store/useAuth';
import Bot from "../../components/Bot/Bot"
import { useLocation } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import CategoryItem from '../../components/CategoryItem';
import axios from 'axios';

const HomePage = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  useEffect(() => {
    toast.dismiss();
    if (q) {
      fetchItems();
    } else {
      setItems([]);
    }
  }, [q])

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openBot, setOpenBot] = useState(false);

  const { getUser, token } = useAuthStore();

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/item/title?search=${q}`);
      console.log(response.data.items);
      setItems(response.data.items);
    } catch (error) {
      console.log(error);
      setItems([]);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token])

  return (
    <div>
      <Toaster />
      <div className='absolute md:flex hidden z-40 right-20 bottom-0'>
        {openBot && <Bot />}
        <div style={{ position: 'absolute', bottom: "540px", marginRight: "80px", right: '10px', cursor: 'pointer' }} onClick={() => setOpenBot(!openBot)}>
          <FaRobot size={30} className='text-pink-500' />
        </div>
      </div>

      <LoginPage open={open} setOpen={setOpen} />
      {
        items.length > 0 && (
          <div className="flex flex-col justify-center">
            <h1 className="text-xl mb-4 text-white font-bold text-center">Search Results for {q}</h1>
            <div className="flex flex-wrap gap-8">
              {items.map((item) => (
                <CategoryItem key={item._id} item={item} />
              ))}
            </div>
          </div>
        )
      }
      {items.length === 0 && (
      <div className='w-full md:px-0 px-12'>
        <InventoryList type="Video Games" />
        <InventoryList type="Gaming Gears" />
      </div>)}
    </div>
  )
}

export default HomePage;
