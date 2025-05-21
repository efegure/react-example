import React from 'react'
import UserList from '~/components/user/UserList'

const UsersPage: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '3em' }}>Users</h1>
            <UserList></UserList>
        </div>
    )
}

export default UsersPage
