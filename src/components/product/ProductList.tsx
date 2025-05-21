import React from 'react'
import { Button, List, Skeleton, Tooltip } from 'antd'
import { Link } from 'react-router'
import { Product } from '~/types/domain'
import { StarFilled, StarOutlined } from '@ant-design/icons'

interface IProductListProps {
    products: Product[]
    loading: boolean
    favorites: string[]
    onGoToDetail: (id: string) => void
    onLoadMore: () => void
    onDelete: (product: Product) => void
}

const ProductList: React.FC<IProductListProps> = ({ products, loading, favorites, onGoToDetail, onLoadMore, onDelete }) => {
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
                            favorites.includes(item.id) ? <StarFilled /> : <StarOutlined />,
                            <Button onClick={() => onDelete(item)} key="list-loadmore-more">
                                delete
                            </Button>
                        ]}
                    >
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                title={
                                    <span style={{ cursor: 'pointer' }} onClick={() => onGoToDetail(item.id)}>
                                        {item.name}
                                    </span>
                                }
                                description={
                                    <span style={{ cursor: 'pointer' }} onClick={() => onGoToDetail(item.id)}>
                                        item.description
                                    </span>
                                }
                            />
                            <div onClick={() => onGoToDetail(item.id)}>{item.category}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    )
}

export default ProductList
