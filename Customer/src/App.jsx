import React from 'react'
import Test from './pages/Test'
import {useRoutes} from 'react-router-dom'
import Layout from './Layout'
import Ai from './pages/Ai'

const App = () => {

  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Test /> },
        { path: '/ai', element: <Ai /> }
      ]
    }
  ])

  return routes;
}

export default App