// src/features/product/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productApi as api } from '~/lib/product-api'
import { Product } from '~/types/domain'

export const getProducts = createAsyncThunk('product/fetch', async () => await api.fetchProducts())
export const addProduct = createAsyncThunk('product/add', async (product: Partial<Product>) => await api.addProduct(product))
export const deleteProduct = createAsyncThunk('product/delete', async (id: string) => await api.deleteProduct(id))
export const editProduct = createAsyncThunk('product/edit', async (product: Product) => await api.editProduct(product))

interface ProductState {
    data: Product[]
    favorites: string[]
    loading: boolean
    loadingDelete: boolean
    loadingAdd: boolean
    error: string | null
}

const initialState: ProductState = { data: [], favorites: [], loading: false, loadingDelete: false, loadingAdd: false, error: null }

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
                state.error = action.error.message ?? 'Failed to fetch product'
            })
            //? DELETE
            .addCase(deleteProduct.fulfilled, (state, action) => {
                debugger
                state.loadingDelete = false
                state.data = state.data.filter((p) => p.id !== action.payload.id)
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loadingDelete = true
                state.error = null
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loadingDelete = false
                state.error = action.error.message ?? 'Failed to fetch product'
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
                state.error = action.error.message ?? 'Failed to fetch product'
            })
    }
})

export default productSlice.reducer
