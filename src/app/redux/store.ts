import {configureStore} from "@reduxjs/toolkit";
import { productsReducer } from 'features/products'
import { filteredProductsReducer } from 'features/products'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filteredProducts: filteredProductsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch