import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {
    addNewProductAsyncAction, deleteProductByIdAsyncAction,
    getAllProductsAsyncAction,
} from "../actions/productsAsyncActions.ts";
import {ProductsInitState} from "../../../entities/product/model/types.ts";

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
                        // state.products ??= [];
                        if (action.payload.products)
                            state.products =  [ ...action.payload.products ];
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
                            state.products = [ ...state.products, action.payload ];
                        } else {
                            state.products = [ action.payload ];
                        }
                    }
                )
                .addCase(
                    (deleteProductByIdAsyncAction.pending),
                    (state) => {
                        state.loading = true;
                        state.error = null;
                    }
                )
                .addCase(
                    (deleteProductByIdAsyncAction.rejected),
                    (state, action) => {
                        state.loading = false;
                        state.error = action.error.message as string;
                    }
                )
                .addCase(
                    (deleteProductByIdAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        state.error = null;
                        state.products = state.products?.filter((pr) => pr.id !== action.payload);
                    }
                )
        }
})

export default productsSlice.reducer;