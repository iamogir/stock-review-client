import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {getAllProductsAsyncAction} from "./productsAsyncActions.ts";
import {ProductsInitState} from "../../entities/product/model/types.ts";

const initialState: ProductsInitState = {
    products: [],
    loading: false,
    error: 'Any error'
}

const productsSlice = createSlice<ProductsInitState, SliceCaseReducers<ProductsInitState>, "products", SliceSelectors<ProductsInitState>>(
    {
        name: 'products',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
            .addCase(
                (getAllProductsAsyncAction.pending),
                (state) => {
                    state.loading = true;
                    state.products = undefined;
                }
            )
                .addCase(
                    (getAllProductsAsyncAction.rejected),
                    (state, action) => {
                        state.loading = false;
                        state.error = action.error.message as string;
                    }
                )
                .addCase(
                    (getAllProductsAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        console.log(action.payload.products)
                        state.products ??= [];
                        state.products.push(...action.payload.products || []);
                    }
                )
        }
})

export default productsSlice.reducer;