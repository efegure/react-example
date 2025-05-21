import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, Modal, Skeleton } from 'antd'
import { deleteUser, getUsers } from '~/features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { Link } from 'react-router'
import { User } from '~/types/domain'

const UserList: React.FC = () => {
    const [page, setPage] = useState(1)

    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.user.data)
    const loading = useSelector((state: RootState) => state.user.loading)

    useEffect(() => {
        if (users.length === 0) {
            dispatch(getUsers())
        }
    }, [dispatch])

    const onLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        dispatch(getUsers()).then(() => {
            window.dispatchEvent(new Event('resize'))
        })
    }

    //modal
    const [open, setOpen] = useState(false)
    const [modalText, setModalText] = useState('Content of the modal')
    const [selectedUser, setselectedUser] = useState('')
    const loadingDelete = useSelector((state: RootState) => state.user.loadingDelete)

    const openDeleteDialog = (user: User) => {
        setOpen(true)
        setselectedUser(user.id)
        setModalText('Are you sure you want to delete ' + user.firstName + ' ' + user.lastName + ' ?')
    }
    const handleOk = () => {
        setModalText('Deleting...')
        dispatch(deleteUser(selectedUser)).then(() => {
            setselectedUser('')
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
                dataSource={users}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Link to={'/users/edit/' + item.id} key="list-loadmore-edit">
                                edit
                            </Link>,
                            <Button onClick={() => openDeleteDialog(item)} key="list-loadmore-more">
                                delete
                            </Button>
                        ]}
                    >
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={
                                    <span>
                                        {item.firstName} {item.lastName}
                                    </span>
                                }
                                description={item.email}
                            />
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

export default UserList
