import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {
    addNewProductAsyncAction,
    getAllProductsAsyncAction,
    getExpiredProductsAsyncAction
} from "./productsAsyncActions.ts";
import {ProductsInitState} from "../../entities/product/model/types.ts";

const initialState: ProductsInitState = {
    products: [],
    expiredProducts: [],
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
                        state.error = null;
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
                        state.products ??= [];
                        state.products.push(...action.payload.products || []);
                    }
                )
                .addCase(
                    (addNewProductAsyncAction.pending),
                    (state) => {
                        state.loading = true;
                        state.error = null;
                    }
                )
                .addCase(
                    (addNewProductAsyncAction.rejected),
                    (state, action) => {
                        state.loading = false;
                        state.error = action.error.message as string;
                    }
                )
                .addCase(
                    (addNewProductAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        state.error = null;
                        if (state.products) {
                            state.products.push(action.payload);
                        } else {
                            state.products = [ action.payload ];
                        }
                    }
                )
                .addCase(
                    (getExpiredProductsAsyncAction.pending),
                    (state) => {
                        state.loading = true;
                        state.expiredProducts = undefined;
                        state.error = null;
                    }
                )
                .addCase(
                    (getExpiredProductsAsyncAction.rejected),
                    (state, action) => {
                        state.loading = false;
                        state.error = action.error.message as string;
                    }
                )
                .addCase(
                    (getExpiredProductsAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        state.expiredProducts = undefined;
                        state.expiredProducts ??= [];
                        state.expiredProducts.push(...action.payload.products || [] );
                    }
                )
        }
})

export default productsSlice.reducer;