import React from 'react'
import { Button, List, Skeleton, Tooltip } from 'antd'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import { Link } from 'react-router'
import { Product } from '~/types/domain'
interface IProductListProps {
    products: Product[]
    loading: boolean
    loadingDelete: boolean
    loadingFavorite: boolean
    favorites: string[]
    onLoadMore: () => void
    onDelete: (product: Product) => void
    onToggleFavorite: (id: string) => void
}

const ProductList: React.FC<IProductListProps> = ({ products, favorites, loading, loadingFavorite, loadingDelete, onLoadMore, onDelete, onToggleFavorite }) => {
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
                            <Tooltip placement="topLeft" title="Favorite">
                                <Button
                                    loading={loadingFavorite}
                                    icon={favorites.includes(item.id) ? <StarFilled /> : <StarOutlined />}
                                    onClick={() => onToggleFavorite(item.id)}
                                    key="favorite"
                                />
                            </Tooltip>,
                            <Button onClick={() => onDelete(item)} key="list-loadmore-more">
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
        </>
    )
}

export default ProductList
