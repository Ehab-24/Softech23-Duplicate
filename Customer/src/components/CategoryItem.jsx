import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneHeart } from 'react-icons/ai';
import useAuthStore from '../store/useAuth';

const CategoryItem = ({ item }) => {

  const {token, user, addToWishlist, removeFromWishlist } = useAuthStore();
  const wishlist = user?.wishlist;
  const isInWishlist = wishlist?.some((wishlistItem) => wishlistItem === item._id);

  const toggleWishlist = async (item) => {
    if (isInWishlist) {
      removeFromWishlist(item, token);
    } else {
      addToWishlist(item, token);
    }
  };

  const navigate = useNavigate();

  const description =
    item.item_description.length > 50 ? item.item_description.substring(0, 30) + '...' : item.item_description;

  return (
    <div className="cursor-pointer relative w-52" onClick={() => navigate(`item/${item._id}`)} key={item._id}>
      <div className="bg-white mb-2 rounded-2xl flex relative">
        <AiTwotoneHeart
          className={`text-2xl absolute right-2 top-2 ${
            isInWishlist ? 'text-pink-500' : 'text-white'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(item);
          }}
        />
        <img
          style={{ minHeight: '285px' }}
          className="rounded-2xl object-cover aspect-square"
          src={`${item.item_images[0]}`}
          alt=""
        />
      </div>
      <h2 className="font-bold text-white">{item.item_title}</h2>
      <h3 className="text-sm text-gray-300">{description}</h3>
      <div className="mt-1">
        <span className="font-bold text-pink-500">PKR {item.item_price}</span>
      </div>
    </div>
  );
};

export default CategoryItem;