import React from 'react'
import { Route, Routes } from 'react-router'
import NotFoundPage from '../NotFoundPage'
import ProductOutlet from '../Product/ProductOutlet'
import UserOutlet from '../User/UserOutlet'
import HomePage from './HomePage'

const Outlet: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/products/*" element={<ProductOutlet />} />
      <Route path="/users/*" element={<UserOutlet />} />
    </Routes>
  )
}

export default Outlet
