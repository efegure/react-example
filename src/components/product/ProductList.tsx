import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, Modal, Skeleton } from 'antd'
import { deleteProduct, getProducts } from '~/features/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { Link } from 'react-router'
import { Product } from '~/types/domain'

const ProductList: React.FC = () => {
    const [page, setPage] = useState(1)

    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: RootState) => state.product.data)
    const loading = useSelector((state: RootState) => state.product.loading)

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProducts())
        }
    }, [dispatch])

    const onLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        dispatch(getProducts()).then(() => {
            window.dispatchEvent(new Event('resize'))
        })
    }

    //modal
    const [open, setOpen] = useState(false)
    const [modalText, setModalText] = useState('Content of the modal')
    const [selectedProd, setselectedProd] = useState('')
    const loadingDelete = useSelector((state: RootState) => state.product.loadingDelete)

    const openDeleteDialog = (prod: Product) => {
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
    const handleCancel = () => {
        console.log('Clicked cancel button')
        setOpen(false)
    }
    //modal

    const loadMore = !loading ? (
        <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
            <Button onClick={onLoadMore}>loading more</Button>
        </div>
    ) : null

    return (
        <>
            <List
                style={{ width: '100%' }}
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={products}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Link to={'/products/edit/' + item.id} key="list-loadmore-edit">
                                edit
                            </Link>,
                            <Button onClick={() => openDeleteDialog(item)} key="list-loadmore-more">
                                delete
                            </Button>
                        ]}
                    >
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta title={<span>{item.name}</span>} description={item.description} />
                            <div>{item.category}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Modal title="Title" open={open} onOk={handleOk} confirmLoading={loadingDelete} onCancel={handleCancel}>
                <p>{modalText}</p>
            </Modal>
        </>
    )
}

export default ProductList
