import React from 'react'
import { Route, Routes } from 'react-router'
import { AddUserPage, EditUserPage, UsersPage } from '.'
import UserDetailPage from './UserDetailPage'

const UserOutlet: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/add" element={<AddUserPage />} />
            <Route path="/edit/:id" element={<EditUserPage />} />
            <Route path="/detail/:id" element={<UserDetailPage />} />
        </Routes>
    )
}

export default UserOutlet
