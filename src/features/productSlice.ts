// src/features/product/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productApi as api } from '~/lib/product-api'
import { Product } from '~/types/domain'

export const getProducts = createAsyncThunk('product/fetch', async () => await api.fetchProducts())
export const addProduct = createAsyncThunk('product/add', async (product: Partial<Product>) => await api.addProduct(product))
export const deleteProduct = createAsyncThunk('product/delete', async (id: string) => await api.deleteProduct(id))
export const editProduct = createAsyncThunk('product/edit', async (product: Product) => await api.editProduct(product))
export const addToFavorite = createAsyncThunk('product/favorite', async (id: string) => await api.addToFavorite(id))
export const searchProduct = createAsyncThunk('product/search', async (payload: { query: string; category?: string }) => {
    return await api.searchProduct(payload)
})

interface ProductState {
    data: Product[]
    favorites: string[]
    loading: boolean
    loadingDelete: boolean
    loadingAdd: boolean
    loadingFavorite: boolean
    loadingSearch: boolean
    error: string | null
}

const initialState: ProductState = {
    data: [],
    favorites: [],
    loadingSearch: false,
    loading: false,
    loadingFavorite: false,
    loadingDelete: false,
    loadingAdd: false,
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Failed to fetch product'
            })
            //? ADD
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loadingAdd = false
                state.data = [...state.data, action.payload]
            })
            .addCase(addProduct.pending, (state) => {
                state.loadingAdd = true
                state.error = null
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loadingAdd = false
                state.error = action.error.message ?? 'Failed to add product'
            })
            //? DELETE
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loadingDelete = false
                state.data = state.data.filter((p) => p.id !== action.payload.id)
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loadingDelete = true
                state.error = null
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loadingDelete = false
                state.error = action.error.message ?? 'Failed to delete product'
            })
            //? EDIT
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loadingAdd = false
                state.data = [...state.data.filter((p) => p.id !== action.payload.id), action.payload]
            })
            .addCase(editProduct.pending, (state) => {
                state.loadingAdd = true
                state.error = null
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loadingAdd = false
                state.error = action.error.message ?? 'Failed to edit product'
            })
            //? FAVORITE
            .addCase(addToFavorite.fulfilled, (state, action) => {
                state.loadingFavorite = false
                state.favorites = action.payload
            })
            .addCase(addToFavorite.pending, (state) => {
                state.loadingFavorite = true
                state.error = null
            })
            .addCase(addToFavorite.rejected, (state, action) => {
                state.loadingFavorite = false
                state.error = action.error.message ?? 'Failed to favorite product'
            })
            //? SEARCH
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.loadingSearch = false
                state.data = action.payload
            })
            .addCase(searchProduct.pending, (state, action) => {
                state.loadingSearch = true
                state.error = null
            })

            .addCase(searchProduct.rejected, (state, action) => {
                state.loadingSearch = false
                state.error = action.error.message ?? 'Failed to search products'
            })
    }
})

export default productSlice.reducer
