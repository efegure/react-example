import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { RootState } from '~/store/store'

const ProductDetailPage: React.FC = () => {
    const { id } = useParams()
    const selectedProd = useSelector((state: RootState) => state.product.data.find((prod) => prod.id === id))
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '3em' }}>ProductDetailPage </h1>
        </div>
    )
}

export default ProductDetailPage
