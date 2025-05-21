import { Product } from '~/types/domain'
import { _axios } from './customAxios'

export const productApi = {
    fetchProducts: async () => {
        const response = await _axios.get('/api/product')
        return response.data
    },

    addProduct: async (product: Partial<Product>) => {
        const response = await _axios.post('/api/product', product)
        return response.data
    },

    deleteProduct: async (id: string) => {
        const response = await _axios.delete('/api/product/' + id)
        return response.data
    },

    editProduct: async (product: Product) => {
        const response = await _axios.put('/api/product', product)
        return response.data
    }
}
