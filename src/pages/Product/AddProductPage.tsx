import React from 'react'
import ProductForm from '~/components/product/ProductForm'

const AddProductPage: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '3em' }}>Add Product</h1>
            <ProductForm></ProductForm>
        </div>
    )
}

export default AddProductPage
