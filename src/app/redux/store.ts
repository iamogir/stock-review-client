import {configureStore} from "@reduxjs/toolkit";
import productsReducer from '../../features/products/slices/productsSlice.ts'
import filteredProductsReducer from '../../features/products/slices/filteredProductsSlice.ts'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filteredProducts: filteredProductsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch