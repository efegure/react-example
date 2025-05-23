import { Button, Card, Tooltip } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { AppDispatch, RootState } from '~/store/store'
import { StarFilled, StarOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { addToFavorite } from '~/features/productSlice'

const ProductDetailPage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector((state: RootState) => state.product.favorites)
  const loadingFavorite = useSelector(
    (state: RootState) => state.product.loadingFavorite
  )
  const selectedProd = useSelector((state: RootState) =>
    state.product.data.find((prod) => prod.id === id)
  )
  const navigate = useNavigate()

  return (
    <>
      {selectedProd ? (
        <div
          style={{
            marginTop: '20px',
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '50px'
          }}
        >
          <div
            style={{
              marginTop: '20px',
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: '50px'
            }}
          >
            <Button
              onClick={() => navigate('/products')}
              style={{ alignSelf: 'center', position: 'absolute', left: 0 }}
              icon={<ArrowLeftOutlined />}
            ></Button>

            <h1> Product Detail</h1>
          </div>

          <Card
            title={selectedProd?.name}
            extra={
              <Tooltip placement="topLeft" title="Favorite">
                <Button
                  loading={loadingFavorite}
                  icon={
                    favorites.includes(selectedProd.id) ? (
                      <StarFilled />
                    ) : (
                      <StarOutlined />
                    )
                  }
                  onClick={() => dispatch(addToFavorite(selectedProd.id))}
                  key="favorite"
                />
              </Tooltip>
            }
            style={{ width: 300 }}
          >
            <p>
              <b>Category:</b> {selectedProd?.category}
            </p>
            <b>Description:</b>

            <p>{selectedProd?.description}</p>
            <p>
              <b>Price:</b> {selectedProd?.price}
            </p>
          </Card>
        </div>
      ) : (
        <div>Product not Found!</div>
      )}
    </>
  )
}

export default ProductDetailPage
