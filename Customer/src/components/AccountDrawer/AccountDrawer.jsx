import React from 'react'
import { useState, useEffect } from 'react'
import Icon from './Icon'
import { Link } from 'react-router-dom'
import {FiLogOut, FiHelpCircle} from "react-icons/fi"
import useAuthStore from '../../store/useAuth'
import {AiOutlineHeart} from "react-icons/ai"

const AccountDrawer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const {user, logoutUser} = useAuthStore();
  
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const closePopup = (e) => {
      if (showPopup && e.target.id !== "icon") {
        setShowPopup(false);
      }
    };
    document.addEventListener("click", closePopup);
    return () => document.removeEventListener("click", closePopup);
  }, [showPopup]);

  const handleLogout = () => {
    logoutUser();
  }

  return (
    <div className="h-16 flex items-center relative">
      {/* Avatar Image */}
      <div className="relative">
        <Icon id={"icon"} text={user.name? user.name : user.email} click={togglePopup}/>
        {showPopup && (
          <div className="absolute px-2 right-0 top-10 bg-white shadow-md rounded-lg  py-2 mt-4 min-w-[12rem] z-50">
            {user.name && <div> 
              <h4 className='mx-2 font-semibold text-black text-sm'>{user.name}</h4>
              <p className='text-gray-800 text-sm mb-2 mx-2 font'>
              {user.email}
              </p> </div>}
            {!user.name && user.email && <div>        
              <p className='text-gray-800 text-sm mb-2 mx-2 font-bold'>
              {user.email}
            </p>
            </div>
            }
            <hr className='mb-2' />
            <Link
                to="/wishlist"
                className="block flex items-center gap-2 px-3 text-sm py-2 rounded-lg hover:bg-gray-200"
                >
                <AiOutlineHeart size={17} className='text-pink-500'/>
                Wishlist
            </Link>
            <a
              href="https://antsq.com/contact/" target="_blank"
              className="block px-3 flex gap-2 py-2 text-gray-800 text-sm rounded-lg hover:bg-gray-200"
            >
                 <FiHelpCircle size={17} className='text-pink-500'/> 
              Help Center
            </a>
            <div
              onClick={handleLogout}
              className="block flex items-center gap-2 px-3 py-2 text-gray-800 text-sm cursor-pointer rounded-lg hover:bg-gray-200"
            >
                <FiLogOut size={16} className='text-pink-500'/>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountDrawer