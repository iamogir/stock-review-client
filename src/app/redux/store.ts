import {configureStore} from "@reduxjs/toolkit";
import {addingProductsReducer, productsReducer} from 'features/products'
import { filteredProductsReducer } from 'features/products'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filteredProducts: filteredProductsReducer,
        addingProducts: addingProductsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch