import React from 'react'
import UserForm from '~/components/user/UserForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { AppDispatch, RootState } from '~/store/store'
import { addUser } from '~/features/userSlice'

const AddUserPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: RootState) => state.user.loadingAdd)

    const handleAdd = ({ firstName, lastName, email }: { firstName: string; lastName: string; email: string }) =>
        dispatch(addUser({ firstName, lastName, email })).then(() => {
            navigate('/users')
        })

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '3em' }}>Add User</h1>
            <UserForm loading={loading} onSubmit={handleAdd}></UserForm>
        </div>
    )
}

export default AddUserPage
