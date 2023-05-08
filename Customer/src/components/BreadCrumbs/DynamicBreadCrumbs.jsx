import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

export default function DynamicBreadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;
  const pathList = pathname.split("/").filter((path) => path);
  const breadcrumbs = pathList.map((path, index) => {
    const link = `/${pathList.slice(0, index + 1).join("/")}`;
    const isLast = index === pathList.length - 1;
    const color = isLast ? "pink-red-500" : "";
    return (
      <Link color={color} to={link} key={path}>
        {isLast ? <span className='text-pink-500'>{path}</span> : <span className='text-white'>{path}</span>}
      </Link>
    );
  });

  return (
    <div className={`${pathname.includes("/account/places/") && !pathname.includes("/pick-a-category") ? "px-72" : ""} mt-4 md:flex hidden`}>
      {pathname!="/" && (
        <Breadcrumbs aria-label="breadcrumb">
          <Link className='text-white' to={"/"}>
            Home
          </Link>
          {breadcrumbs}
        </Breadcrumbs>
      )}
    </div>
  );
}