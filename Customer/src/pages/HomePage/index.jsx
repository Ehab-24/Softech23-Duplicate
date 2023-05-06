import React, { useEffect, useState } from 'react'
import LoginPage from '../LoginPage';
import {toast, Toaster} from 'react-hot-toast';
import InventoryList from './InventoryList';
import useAuthStore from '../../store/useAuth';

const HomePage = () => {

  useEffect(() => {
    toast.dismiss();
  }, [])

  const [open, setOpen] = useState(false);

  const {getUser, token} = useAuthStore();

  useEffect(()=>{
    if(token){
      getUser();
    }
  }, [token])

  return (
    <div>
        <Toaster />
        <LoginPage open={open} setOpen={setOpen} />
        <InventoryList type="Video Games" />
        <InventoryList type="Gaming Gears" />
    </div>
  )
}

export default HomePage;