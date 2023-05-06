import React from 'react'
import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div className='mx-20'>
        <h2>MY LAYOUT</h2>
        <Outlet />
    </div>
  )
}

export default Layout