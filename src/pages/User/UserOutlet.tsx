import React from 'react'
import { Route, Routes } from 'react-router'
import { AddUserPage, EditUserPage, UsersPage } from '.'

const UserOutlet: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/add" element={<AddUserPage />} />
            <Route path="/edit/:id" element={<EditUserPage />} />
        </Routes>
    )
}

export default UserOutlet
