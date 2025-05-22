import { Button, Card, Tooltip } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { RootState } from '~/store/store'
import { ArrowLeftOutlined } from '@ant-design/icons'

const UserDetailPage: React.FC = () => {
  const { id } = useParams()
  const selectedUser = useSelector((state: RootState) =>
    state.user.data.find((user) => user.id === id)
  )
  const navigate = useNavigate()

  return (
    <>
      {selectedUser ? (
        <div
          style={{
            marginTop: '20px',
            marginBottom: '40px',
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
              onClick={() => navigate('/users')}
              style={{ alignSelf: 'center', position: 'absolute', left: 0 }}
              icon={<ArrowLeftOutlined />}
            ></Button>

            <h1> Profile</h1>
          </div>

          <Card
            title={selectedUser?.firstName + ' ' + selectedUser?.lastName}
            style={{ width: 300 }}
            cover={<img alt="avatar" src={selectedUser.avatar} />}
          >
            <p>{selectedUser?.email}</p>
          </Card>
        </div>
      ) : (
        <div>User not Found!</div>
      )}
    </>
  )
}

export default UserDetailPage
