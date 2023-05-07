import React, { useEffect, useState } from 'react'
import LoginPage from '../LoginPage';
import {toast, Toaster} from 'react-hot-toast';
import InventoryList from './InventoryList';
import useAuthStore from '../../store/useAuth';
import Bot from "../../components/Bot/Bot"
import { FaRobot } from 'react-icons/fa';

const HomePage = () => {

  useEffect(() => {
    toast.dismiss();
  }, [])

  const [open, setOpen] = useState(false);
  const [openBot, setOpenBot] = useState(false);

  const {getUser, token} = useAuthStore();

  useEffect(()=>{
    if(token){
      getUser();
    }
  }, [token])

  return (
    <div>
        <Toaster />
        <div className='absolute z-40 right-20 bottom-0'>
          {openBot && <Bot />}
          <div style={{ position: 'absolute', bottom:"540px", marginRight:"80px", right: '10px', cursor: 'pointer' }} onClick={() => setOpenBot(!openBot)}>
            <FaRobot size={30} className='text-pink-500' />
          </div>
        </div>
        <LoginPage open={open} setOpen={setOpen} />
        <InventoryList type="Video Games" />
        <InventoryList type="Gaming Gears" />
    </div>
  )
}

export default HomePage;
