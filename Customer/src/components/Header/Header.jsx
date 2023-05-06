import { Link } from "react-router-dom";
import SearchBar from "../SearchBar.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import { useState } from "react";
import {BsCartFill} from "react-icons/bs"
import {RiPixelfedLine} from "react-icons/ri"
import useCartStore from "../../store/useCart.js";
import useAuthStore from "../../store/useAuth.js";
import AccountDrawer from "../AccountDrawer/AccountDrawer.jsx";

export default function Header() {
  const {cart} = useCartStore();
  const {user} = useAuthStore();
  const [open, setOpen] = useState(false);
  return (

    <div>
      <LoginPage open={open} setOpen={setOpen} />
      <div className="bg-pink-900 py-2 px-4 rounded-full bg-opacity-70">
        <header className="flex sm:pb-0 pb-3 justify-between items-center gap-3">
          <Link to={"/"} className="md:flex hidden items-center gap-1">
            <RiPixelfedLine size={33} className="text-pink-500" />
            <span className="font-semibold text-pink-500 text-xl">Pixel Palace</span>
          </Link>
          <SearchBar />
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to={"/order"}
                className="sm:flex hidden relative flex-col items-center"
              >
                <BsCartFill size={30} className="text-pink-500" />
              </Link>
            ) : (
              <div
                className="flex flex-col items-center cursor-pointer relative"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <h2 className="text-white font-bold absolute bottom-3 right-2">
                  {cart?.length > 0 ? cart.length : ""}
                </h2>
                <BsCartFill size={27} className="text-pink-500 mr-2" />
              </div>
            )}

            {user ? (
              <div className="sm:flex hidden">
                <AccountDrawer />
              </div>
            ) : (
              <div
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 bg-gray-100 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <div className="bg-pink-500 text-white rounded-full border border-pink-500 overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 relative top-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>

  );
}
