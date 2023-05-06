import React from 'react'
import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer'
import Updates from './components/Updates'

const Layout = () => {
  return (
    <div>
        <Updates />
      <div className='lg:px-32 pb-20 min-h-screen bg-[#140017]'>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout