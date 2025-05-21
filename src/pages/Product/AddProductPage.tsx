import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ProductForm from '~/components/product/ProductForm'
import { addProduct, editProduct } from '~/features/productSlice'
import { AppDispatch, RootState } from '~/store/store'

const AddProductPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: RootState) => state.product.loadingAdd)

    const handleAdd = ({ category, description, name, price }: { category: string; description: string; name: string; price: number }) =>
        dispatch(addProduct({ category, description, name, price })).then(() => {
            navigate('/products')
        })
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '3em' }}>Add Product</h1>
            <ProductForm loading={loading} onSubmit={handleAdd}></ProductForm>
        </div>
    )
}

export default AddProductPage
