import React from 'react'
import UserForm from '~/components/UserForm'

const AddUserPage: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Add User</h1>
            <UserForm></UserForm>
        </div>
    )
}

export default AddUserPage
