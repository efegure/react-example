import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import UserForm from '~/components/user/UserForm'
import { RootState } from '~/store/store'

const EditUserPage: React.FC = () => {
    const { id } = useParams()
    const selectedUser = useSelector((state: RootState) => state.user.data.find((user) => user.id === id))
    console.log(selectedUser)
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '3em' }}>Edit User Page</h1>
            <UserForm user={selectedUser}></UserForm>
        </div>
    )
}

export default EditUserPage
