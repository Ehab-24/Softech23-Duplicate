import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {RiSearchFill} from "react-icons/ri"
import axios from 'axios';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (input) => {
    setTimeout(async () => {
      const response = await axios.get(`https://localhost:4000/item/title/${input}`);
      setSearch(response.data.results);
    }, 500);
  };
  
  const handleClick = (e) => {
    e.preventDefault();
    if(!input){
      navigate(`/`)
      return
    }
    navigate(`/?q=${input}`)
};

  return (
    <form className="flex w-full max-w-2xl bg-white border border-gray-300 rounded-full items-center">
  <input
    type="text"
    className="w-full px-6 py-2 text-gray-800 border-none rounded-full focus:outline-none"
    placeholder="Fortnite, Minecraft, etc."
    value={input}
    onChange={(e) => {
      setInput(e.target.value);
    }}
  />
  <button
    type="submit"
    className="w-11 h-11 px-2 flex items-center justify-center rounded-full bg-pink-500 text-white rounded-full focus:outline-none"
    onClick={handleClick}
  >
    <RiSearchFill size={28} className='bg-pink-500'/>
  </button>
</form>

  );
};

export default SearchBar;
