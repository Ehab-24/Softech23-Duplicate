import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./Menu.module.css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState();
  const [Menu, setMenu] = useState(null);

  useEffect(() => {
    //Getting all categories from the server
    fetchCategories();
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/category`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Unable to fetch categories');
      }
      const data = response.data;
      setTimeout(() => {
        setMenu(data);
        }, 300);
    } catch (error) {
      setError(error.message);
    }
  };  

  const handleClick = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="h-10 py-6 sm:flex hidden items-center font-medium my-2 relative border-t-2 bg-white ">
      {!Menu && <div className="h-10 py-6 pl-3 flex items-center font-medium gap-6 relative bg-white overflow-hidden">
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
        <Skeleton width={80} height={20}/>
     
        </div>}
        <div className="overflow-hidden flex">
        {Menu?.map((cat) => {
        return (
          <div
            key={cat._id}
            className="cursor-pointer"
            onMouseEnter={() => setSelectedCategory(cat)}
            onMouseLeave={() => setSelectedCategory(null)}
            onClick={handleClick}
          >
            <Link
              to={"/listings/" + cat.link}
              className={Styles.menuItem}
              style={{
                borderBottom:
                  selectedCategory === cat ? "4px solid black" : "none",
              }}
            >
              <h2 style={{ fontSize: "13px", whiteSpace:"nowrap" }}>{cat.name}</h2>
            </Link>
            {selectedCategory && selectedCategory._id === cat._id && (
              <div className={Styles.submenu}>
                {cat.children.map((child) => (
                  <div key={child._id} className={Styles.submenuItem}>
                    <Link to={"/listings/" + cat.link + child.link}>
                      {child.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

        </div>
    </div>
  );
}

export default Menu;
