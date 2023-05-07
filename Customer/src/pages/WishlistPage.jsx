import React from 'react'
import useAuthStore from '../store/useAuth';
import CategoryItem from '../components/CategoryItem';
const WishlistPage = () => {
  const { user } = useAuthStore();
  
return (
  <div>
    <h3 className='text-2xl text-white mt-10 font-semibold ml-2'>Your Wishlist</h3>
    {
      user.wishlist?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {user.wishlist?.map(item => (
              <CategoryItem
                key={item._id}
                item={item}
              />
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