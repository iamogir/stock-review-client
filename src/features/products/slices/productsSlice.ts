import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {
    addNewStockEntryAsyncAction, deleteStockEntryByIdAsyncAction,
    getAllStockEntriesAsyncAction,
} from "../actions/stockEntriesAsyncActions.ts";
import {ProductsInitState} from "../../../entities/product/model/types.ts";
import {getAllProductsAsyncAction} from "../actions/productsAsyncActions.ts";

const initialState: ProductsInitState = {
    products: [],
    stockEntries: [],
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
                        state.error = null
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
                        if (action.payload.products)
                            state.products = [ ...action.payload.products ];
                    }
                )
                .addCase(
                    (getAllStockEntriesAsyncAction.pending),
                    (state) => {
                        state.loading = true;
                        state.stockEntries = undefined;
                        state.error = null;
                    }
                )
                .addCase(
                    (getAllStockEntriesAsyncAction.rejected),
                    (state, action) => {
                        state.loading = false;
                        state.error = action.error.message as string;
                    }
                )
                .addCase(
                    (getAllStockEntriesAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        // state.products ??= [];
                        if (action.payload.stockEntries)
                            state.stockEntries =  [ ...action.payload.stockEntries ];
                    }
                )
                .addCase(
                    (addNewStockEntryAsyncAction.pending),
                    (state) => {
                        state.loading = true;
                        state.error = null;
                    }
                )
                .addCase(
                    (addNewStockEntryAsyncAction.rejected),
                    (state, action) => {
                        state.loading = false;
                        state.error = action.error.message as string;
                    }
                )
                .addCase(
                    (addNewStockEntryAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        state.error = null;
                        if (state.stockEntries) {
                            state.stockEntries = [ ...state.stockEntries, action.payload ];
                        } else {
                            state.stockEntries = [ action.payload ];
                        }
                    }
                )
                .addCase(
                    (deleteStockEntryByIdAsyncAction.pending),
                    (state) => {
                        state.loading = true;
                        state.error = null;
                    }
                )
                .addCase(
                    (deleteStockEntryByIdAsyncAction.rejected),
                    (state, action) => {
                        state.loading = false;
                        state.error = action.error.message as string;
                    }
                )
                .addCase(
                    (deleteStockEntryByIdAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        state.error = null;
                        state.stockEntries = state.stockEntries?.filter((pr) => pr.id !== action.payload);
                    }
                )
        }
})

export default productsSlice.reducer;