import React from 'react'
import ProductList from '~/components/ProductList'

const ProductPage: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>PRoducts</h1>
            <ProductList></ProductList>
        </div>
    )
}

export default ProductPage
