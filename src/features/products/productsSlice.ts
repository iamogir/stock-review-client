import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {getAllProductsAsyncAction} from "./productAcyncActions.ts";
import {ProductInitState} from "../../entities/product/model/types.ts";

const initialState: ProductInitState = {
    products: [],
    loading: false,
    error: 'Any error'
}

const productsSlice = createSlice<ProductInitState, SliceCaseReducers<ProductInitState>, "products", SliceSelectors<ProductInitState>>(
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
                    state.error = 'Loading products...';
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
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        state.products = state.products?.concat(action.payload.products);
                        state.error = '';
                    }
                )
        }
})

export default productsSlice.reducer;