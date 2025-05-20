import React from 'react'
import ProductForm from '~/components/ProductForm'

const EditProductPage: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Edit PRod </h1>
            <ProductForm></ProductForm>
        </div>
    )
}

export default EditProductPage
