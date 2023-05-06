import React from 'react'
import {useNavigate}from 'react-router-dom'

const CategoryItem = ({item}) => {
  
    const navigate = useNavigate()
    const handleWishlist = (adId) => {}
    const description = item.item_description.length > 50 ? item.item_description.substring(0, 30) + "..." : item.item_description;
  return (
    <div className="cursor-pointer w-52" onClick={() => { navigate(`item/${item._id}`) }} key={item._id}>
    <div className="bg-white mb-2 rounded-2xl flex relative">
      <img
          style={{ minHeight: "285px" }}
          className="rounded-2xl object-cover aspect-square"
          src={`${item.item_images[0]}`}
          alt=""
        />
      <div className="absolute top-3 right-3" onClick={(e) => { e.stopPropagation(); handleWishlist(item.id) }}>
        <div className="bg-gray-200 rounded-full p-1">
        </div>
      </div>
    </div>
    <h2 className="font-bold text-white">{item.item_title}</h2>
    <h3 className="text-sm text-gray-300">{description}</h3>
    <div className="mt-1">
      <span className="font-bold text-pink-500">PKR {item.item_price}</span>
    </div>
  </div>
  )
}

export default CategoryItem