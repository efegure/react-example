import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import ProductForm from '~/components/product/ProductForm'
import { editProduct } from '~/features/productSlice'
import { AppDispatch, RootState } from '~/store/store'

const EditProductPage: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: RootState) => state.product.loadingAdd)

    const handleEdit = ({ category, description, name, price }: { category: string; description: string; name: string; price: number }) => {
        if (id) {
            dispatch(editProduct({ id, category, description, name, price })).then(() => {
                navigate('/products')
            })
        }
    }

    const selectedProd = useSelector((state: RootState) => state.product.data.find((prod) => prod.id === id))
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '3em' }}>Edit Product</h1>
            <ProductForm loading={loading} product={selectedProd} onSubmit={handleEdit}></ProductForm>
        </div>
    )
}

export default EditProductPage
