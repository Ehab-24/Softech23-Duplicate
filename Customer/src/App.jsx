import React, { useEffect } from 'react'
import Layout from './Layout'
import {Route, Routes} from "react-router-dom"
import HomePage from './pages/HomePage'
import ItemPage from './pages/ItemPage'
import WishlistPage from './pages/WishlistPage'
import OrderPage from './pages/OrderPage'
import NotFound from './pages/NotFound'

const App = () => {

return (
<Routes>
  <Route path="/" element={<Layout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/item/:id" element={<ItemPage />} />
    <Route path="/order" element={<OrderPage />} />
    <Route path="/wishlist" element={<WishlistPage />} />
    <Route path='*' element={<NotFound /> } />
  </Route>
</Routes>
)
}

export default App