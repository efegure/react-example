// src/features/user/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userApi as api } from '~/lib/user-api'
import { User } from '~/types/domain'

export const getUsers = createAsyncThunk('user/fetch', async () => await api.fetchUsers())
export const addUser = createAsyncThunk('user/add', async (user: Partial<User>) => await api.addUser(user))
export const deleteUser = createAsyncThunk('user/delete', async (id: string) => await api.deleteUser(id))
export const editUser = createAsyncThunk('user/edit', async (user: User) => await api.editUser(user))

interface UserState {
    data: User[]
    loading: boolean
    loadingDelete: boolean
    loadingAdd: boolean
    error: string | null
}

const initialState: UserState = { data: [], loading: false, loadingDelete: false, loadingAdd: false, error: null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                console.log('loading')
                state.loading = true
                state.error = null
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.loading = false
                state.data = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                console.log('pending')
                state.loading = false
                state.error = action.error.message ?? 'Failed to fetch user'
            })
            //? ADD
            .addCase(addUser.fulfilled, (state, action) => {
                state.loadingAdd = false
                state.data = [...state.data, action.payload]
            })
            .addCase(addUser.pending, (state) => {
                state.loadingAdd = true
                state.error = null
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loadingAdd = false
                state.error = action.error.message ?? 'Failed to fetch User'
            })
            //? DELETE
            .addCase(deleteUser.fulfilled, (state, action) => {
                debugger
                state.loadingDelete = false
                state.data = state.data.filter((u) => u.id !== action.payload.id)
            })
            .addCase(deleteUser.pending, (state) => {
                state.loadingDelete = true
                state.error = null
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loadingDelete = false
                state.error = action.error.message ?? 'Failed to fetch User'
            })
            //? EDIT
            .addCase(editUser.fulfilled, (state, action) => {
                state.loadingAdd = false
                state.data = [...state.data.filter((p) => p.id !== action.payload.id), action.payload]
            })
            .addCase(editUser.pending, (state) => {
                state.loadingAdd = true
                state.error = null
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loadingAdd = false
                state.error = action.error.message ?? 'Failed to fetch User'
            })
    }
})

export default userSlice.reducer
