import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import ProductForm from '~/components/product/ProductForm'
import { RootState } from '~/store/store'

const EditProductPage: React.FC = () => {
    const { id } = useParams()
    const selectedProd = useSelector((state: RootState) => state.product.data.find((prod) => prod.id === id))
    debugger
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '3em' }}>Edit Product</h1>
            <ProductForm product={selectedProd}></ProductForm>
        </div>
    )
}

export default EditProductPage
