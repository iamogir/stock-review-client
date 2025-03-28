import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {
    addNewStockEntryAsyncAction,
    deleteStockEntryByIdAsyncAction,
    getAllStockEntriesAsyncAction,
    getAllProductsAsyncAction,
    addNewProductAsyncAction,
    addNewEntriesStackAsyncAction,
    addNewProductsStackAsyncAction
} from "features/products";
import {ProductsInitState} from "entities/product";
import {deleteProductByIdAsyncAction} from "features/products/actions/productsAsyncActions.ts";

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
                            state.products = [ action.payload]
                        }

                    }
                )
                .addCase(
                    (addNewProductsStackAsyncAction.pending),
                    (state) => {
                        state.loading = true;
                        state.error = null;
                    }
                )
                .addCase(
                    (addNewProductsStackAsyncAction.rejected),
                    (state, action) => {
                        state.loading = false;
                        state.error = action.error.message as string;
                    }
                )
                .addCase(
                    (addNewProductsStackAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        state.error = null;
                        if (state.products)
                            state.products = [ ...state.products, ...action.payload ];
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
                    (addNewEntriesStackAsyncAction.pending),
                    (state) => {
                        state.loading = true;
                        state.error = null;
                    }
                )
                .addCase(
                    (addNewEntriesStackAsyncAction.rejected),
                    (state, action) => {
                        state.loading = false;
                        state.error = action.error.message as string;
                    }
                )
                .addCase(
                    (addNewEntriesStackAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        state.error = null;
                        if (state.stockEntries)
                            state.stockEntries = [ ...state.stockEntries, ...action.payload];
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
                        state.products = state.products?.filter((pr) => pr.id !== action.payload.id);
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
                        console.log('DELETE')
                        state.loading = false;
                        state.error = null;
                        state.stockEntries = state.stockEntries?.filter((pr) => pr.id !== action.payload);
                    }
                )
        }
})

export default productsSlice.reducer;