import React from 'react'
import { Route, Routes } from 'react-router'
import { AddProductPage, EditProductPage, ProductDetailPage, ProductPage } from '.'

const ProductOutlet: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/detail/:id" element={<ProductDetailPage />} />
            <Route path="/add" element={<AddProductPage />} />
            <Route path="/edit/:id" element={<EditProductPage />} />
        </Routes>
    )
}

export default ProductOutlet
