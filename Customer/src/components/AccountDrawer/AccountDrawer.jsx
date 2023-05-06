import React from 'react'
import { UserContext } from '../../UserContext'
import { useContext, useState, useEffect } from 'react'
import Icon from './Icon'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {FiUser, FiUpload, FiLogOut, FiHelpCircle} from "react-icons/fi"
import { auth } from '../../utils/init-firebase.js';
import {RiNotification4Line} from "react-icons/ri"
import axios from 'axios'
import { Modal } from '@mui/material'
import Notification from '../Notification/Notification'

const AccountDrawer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, setToken, token, setUser, Notifications, setNotifications } = useContext(UserContext);
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (Notifications) {
      let count = 0;
      Notifications.forEach((notification) => {
        if (!notification.isRead) {
          count++;
        }
      });
    setUnread(count);
    }
  }, [Notifications]);
  
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

  const handleMarkAllRead = async () => {
    if (unread === 0) {
      return;
    }
    await axios.get(`${import.meta.env.VITE_BASE_URI}/notification/markRead`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }})
      .then(() => {
        setUnread(0);
        setNotifications(Notifications.map((notification) => {
          notification.isRead = true;
          return notification;
        }));
      }).catch((error) => {
        console.error(error.message);
      })
  };

  async function logout() {
    auth.signOut().then(() => {
      setToken("");
      navigate("/");
      setUser(null);
      console.log("logged out successfully")
    })
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
  }

  return (
    <div className="h-16 flex items-center bg-white relative">
      {/* Avatar Image */}
      <div className="relative">
        <Icon id={"icon"} text={user.displayName? user.displayName : user.email} click={togglePopup}/>
        {unread > 0 && <div className="absolute top-0 right-0 bg-red-500 rounded-full w-3 h-3" />}
        {showPopup && (
          <div className="absolute px-2 right-0 top-10 bg-white shadow-md rounded-lg  py-2 mt-4 min-w-[12rem] z-50">
            {user.displayName && <div> 
              <h4 className='mx-2 font-bold text-sm'>{user.displayName}</h4>
              <p className='text-gray-800 text-sm mb-2 mx-2 font'>
              {user.email}
              </p> </div>}
            {!user.displayName && user.email && <div>        
              <p className='text-gray-800 text-sm mb-2 mx-2 font-bold'>
              {user.email}
            </p>
            </div>
            }
            <hr className='mb-2' />
            <Link
              to="/account"
              className="block flex items-center gap-2 px-3 text-sm py-2 rounded-lg hover:bg-gray-200"
            >
              <FiUser size={17} style={{color:"#FF585D"}}/>
              Profile
            </Link>
            <button
                onClick={()=>{setShowPopup(false); setOpen(true); handleMarkAllRead()}}
                className="block flex items-center bg-white w-full gap-2 px-3 text-sm py-2 rounded-lg hover:bg-gray-200"
                >
               <RiNotification4Line size={17} style={{color:"#FF585D"}}/>
                Notifications
                {unread > 0 && <div className="mb-3 bg-red-500 rounded-full w-2 h-2" />}
            </button>
            <Link
                to="/account/places"
                className="block flex items-center gap-2 px-3 text-sm py-2 rounded-lg hover:bg-gray-200"
                >
                <FiUpload size={17} style={{color:"#FF585D"}}/>
                Upload
            </Link>
            <a
              href="https://antsq.com/contact/" target="_blank"
              className="block px-3 flex gap-2 py-2 text-gray-800 text-sm rounded-lg hover:bg-gray-200"
            >
                 <FiHelpCircle size={17} style={{color:"#FF585D"}}/> 
              Help Center
            </a>
            <div
              onClick={logout}
              className="block flex items-center gap-2 px-3 py-2 text-gray-800 text-sm cursor-pointer rounded-lg hover:bg-gray-200"
            >
                <FiLogOut size={16} style={{color:"#FF585D"}}/>
              Logout
            </div>
          </div>
        )}
        {(
          <Modal
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          className="flex items-center justify-center"
          style={{ border: "none" }}
          >
            <div className="bg-white h-[480px] w-[380px] rounded-lg shadow-md">
              <Notification setOpenModal={setOpen} />
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default AccountDrawer