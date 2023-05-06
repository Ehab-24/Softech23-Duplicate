import React from 'react'
import {useNavigate}from 'react-router-dom'

const CategoryItem = ({item}) => {
    
    const navigate = useNavigate()
    const handleWishlist = (adId) => {}

  return (
    <div className="cursor-pointer w-56" onClick={() => { navigate(`item/${item.id}`) }} key={item.id}>
    <div className="bg-white mb-2 rounded-2xl flex relative">
      <img
          style={{ minHeight: "285px" }}
          className="rounded-2xl object-cover aspect-square"
          src={`${item.image}`}
          alt=""
        />
      <div className="absolute top-3 right-3" onClick={(e) => { e.stopPropagation(); handleWishlist(item.id) }}>
        <div className="bg-gray-200 rounded-full p-1">
        </div>
      </div>
    </div>
    <h2 className="font-bold text-white">{item.title}</h2>
    <h3 className="text-sm text-gray-300">{item.description}</h3>
    <div className="mt-1">
      <span className="font-bold text-pink-500">PKR {item.price}</span>
    </div>
  </div>
  )
}

export default CategoryItem