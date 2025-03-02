import {FilteredProductsInitState} from "../../../entities/product/model/types.ts";
import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {
    getExpiredProductsAsyncAction,
    getExpiringSoonProductsAsyncAction
} from "../actions/filteredProductsAsyncActions.ts";

const initialState: FilteredProductsInitState = {
    expiredProducts: [],
    expiringSoonProducts: [],
    loading: false,
    error: 'Any error',
}

const filteredProductsSlice = createSlice<FilteredProductsInitState, SliceCaseReducers<FilteredProductsInitState>, 'filteredProducts', SliceSelectors<FilteredProductsInitState>>(
    {
        name: 'filteredProducts',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
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
                .addCase(
                    (getExpiringSoonProductsAsyncAction.pending),
                    (state) => {
                        state.loading = true;
                        state.expiringSoonProducts = undefined;
                        state.error = null;
                    }
                )
                .addCase(
                    (getExpiringSoonProductsAsyncAction.rejected),
                    (state, action) => {
                        state.loading = false;
                        state.error = action.error.message as string;
                    }
                )
                .addCase(
                    (getExpiringSoonProductsAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        state.expiringSoonProducts ??= [];
                        state.expiringSoonProducts.push(...action.payload.products || []);
                    }
                )
        }
    }
)

export default filteredProductsSlice.reducer;