import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryItem from "../../components/CategoryItem";

const InventoryList = ({ type }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        setLoading(true);
        const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/item/type`, {inventory_type:type}, {})
        setItems(res.data.item);
        setLoading(false);
    };

    return (
        <div>
            <h2 className='mt-14 text-white text-2xl ml-2 mb-6'>{type}</h2>
            <div className="flex gap-12 mt-4 flex-wrap ">
                {items.map((item) => (
                    <CategoryItem key={item._id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default InventoryList