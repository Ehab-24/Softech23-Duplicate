import React from 'react'
import CategoryItem from '../components/CategoryItem';
import useAuthStore from '../store/useAuth';
import { useEffect, useState } from 'react';

const WishlistPage = () => {
  const { user, getAllWishlistItems } = useAuthStore();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user])

  const fetchItems = async () => {
    const items = await getAllWishlistItems();
    setItems(items);
  }

  if (user === null) {
    return null
  }


  return (
    <div>
      <h3 className='text-2xl text-white mt-10 font-semibold ml-2'>Your Wishlist</h3>
      {
        user.wishlist?.length > 0 ? (
          <div className="flex flex-wrap gap-4 mt-8">
           {items.map((item) => (
              <CategoryItem item={item} key={item._id}/>
           ))}
          </div>
        ) : (
          <p className="text-white text-center mt-8">Your wishlist is empty.</p>
        )
      }
</div>
  )
}

export default WishlistPage;