import { User } from '~/types/domain'
import { _axios } from './customAxios'

export const userApi = {
    fetchUsers: async () => {
        const response = await _axios.get('/api/user')
        return response.data
    },
    addUser: async (user: Partial<User>) => {
        const response = await _axios.post('/api/user', user)
        return response.data
    },

    deleteUser: async (id: string) => {
        const response = await _axios.delete('/api/user/' + id)
        return response.data
    },

    editUser: async (user: User) => {
        const response = await _axios.put('/api/user', user)
        return response.data
    }
}
