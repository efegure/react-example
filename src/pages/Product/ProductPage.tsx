import { Input, Modal, Select, Spin } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import ProductList from '~/components/product/ProductList'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite, deleteProduct, getProducts, searchProduct } from '~/features/productSlice'
import { AppDispatch, RootState } from '~/store/store'
import { Product } from '~/types/domain'
import debounce from 'just-debounce-it'
const CATEGORIES = ['Electronics', 'Books', 'Clothing', 'Home', 'Toys']

const ProductPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: RootState) => state.product.data)
    const favorites = useSelector((state: RootState) => state.product.favorites)
    const loading = useSelector((state: RootState) => state.product.loading)
    const loadingFavorite = useSelector((state: RootState) => state.product.loadingFavorite)
    const loadingDelete = useSelector((state: RootState) => state.product.loadingDelete)
    const loadingSearch = useSelector((state: RootState) => state.product.loadingSearch)

    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [modalText, setModalText] = useState('Content of the modal')
    const [selectedProd, setselectedProd] = useState('')

    useEffect(() => {
        if (products?.length === 0) {
            dispatch(getProducts())
        }
    }, [dispatch])

    const handleDelete = (prod: Product) => {
        setOpen(true)
        setselectedProd(prod.id)
        setModalText('Are you sure you want to delete ' + prod.name + ' ?')
    }
    const handleOk = () => {
        setModalText('Deleting...')
        dispatch(deleteProduct(selectedProd)).then(() => {
            setselectedProd('')
            setOpen(false)
        })
    }
    const handleLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        dispatch(getProducts()).then(() => {
            window.dispatchEvent(new Event('resize'))
        })
    }
    const handleFavorite = (id: string) => dispatch(addToFavorite(id))

    const handleCategoryFilter = (category: string) => {
        setSelectedCategory(category)
        dispatch(searchProduct({ query: searchTerm, category: category === 'All' ? undefined : category })).then(() => {
            window.dispatchEvent(new Event('resize'))
        })
    }

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearchTerm(value)
            dispatch(searchProduct({ query: value, category: selectedCategory === 'All' ? undefined : selectedCategory }))
        }, 400),
        []
    )

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '3em' }}>Products</h1>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
                <Input
                    disabled={loadingSearch}
                    addonBefore={<SearchOutlined />}
                    placeholder="Search"
                    onChange={(event) => debouncedSearch(event.target.value)}
                />
                {loadingSearch && <Spin />}
                <Select
                    defaultValue="All"
                    style={{ width: 120 }}
                    onChange={handleCategoryFilter}
                    options={[
                        { value: 'All', label: 'All' },
                        { value: 'Electronics', label: 'Electronics' },
                        { value: 'Books', label: 'Books' },
                        { value: 'Clothing', label: 'Clothing' },
                        { value: 'Home', label: 'Home' },
                        { value: 'Toys', label: 'Toys' }
                    ]}
                />
            </div>
            <ProductList
                products={products}
                loading={loading}
                favorites={favorites}
                loadingFavorite={loadingFavorite}
                loadingDelete={loadingDelete}
                onLoadMore={handleLoadMore}
                onDelete={handleDelete}
                onToggleFavorite={handleFavorite}
            ></ProductList>
            <Modal title="Title" open={open} onOk={handleOk} confirmLoading={loadingDelete} onCancel={() => setOpen(false)}>
                <p>{modalText}</p>
            </Modal>
        </div>
    )
}

export default ProductPage
