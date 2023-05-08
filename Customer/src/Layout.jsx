import React from 'react'
import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer'
import Updates from './components/Updates'
import DynamicBreadcrumbs from './components/BreadCrumbs/DynamicBreadCrumbs'
import Bot from './components/Bot/Bot'

const Layout = () => {
  return (
    <div>
        <Updates />
      <div className='lg:px-32 pb-20 min-h-screen bg-[#140017]'>
        <Header />
        <DynamicBreadcrumbs />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout