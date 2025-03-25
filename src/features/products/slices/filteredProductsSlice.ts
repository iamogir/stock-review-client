import {FilteredProductsInitState} from "entities/stockEntry";
import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {
    getExpiredProductsAsyncAction,
    getExpiringSoonProductsAsyncAction
} from "features/products";

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
                        if (action.payload.stockEntries)
                            state.expiredProducts = [ ...state.expiredProducts, ...action.payload.stockEntries ];
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
                        if (action.payload.stockEntries)
                            state.expiringSoonProducts = [ ...state.expiringSoonProducts, ...action.payload.stockEntries ];
                    }
                )
        }
    }
)

export default filteredProductsSlice.reducer;