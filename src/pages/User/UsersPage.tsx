import React, { useEffect, useState } from 'react'
import UserList from '~/components/user/UserList'
import { deleteUser, getUsers } from '~/features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { Modal } from 'antd'
import { User } from '~/types/domain'
import { useNavigate } from 'react-router'
const UsersPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.user.data)
    const loading = useSelector((state: RootState) => state.user.loading)
    const loadingDelete = useSelector((state: RootState) => state.user.loadingDelete)

    const [page, setPage] = useState(1)

    const [open, setOpen] = useState(false)
    const [modalText, setModalText] = useState('Content of the modal')
    const [selectedUser, setselectedUser] = useState('')

    useEffect(() => {
        if (users.length === 0) {
            dispatch(getUsers())
        }
    }, [dispatch])

    const handleDelete = (user: User) => {
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
    const handleGoToDetail = (id: string) => {
        navigate('detail/' + id)
    }
    const handleLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        dispatch(getUsers()).then(() => {
            window.dispatchEvent(new Event('resize'))
        })
    }

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '3em' }}>Users</h1>
            <UserList users={users} loading={loading} onLoadMore={handleLoadMore} onDelete={handleDelete} onGoToDetail={handleGoToDetail}></UserList>
            <Modal title="Title" open={open} onOk={handleOk} confirmLoading={loadingDelete} onCancel={() => setOpen(false)}>
                <p>{modalText}</p>
            </Modal>
        </div>
    )
}

export default UsersPage
