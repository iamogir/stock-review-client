import {createSlice, SliceCaseReducers} from "@reduxjs/toolkit";
import {HomePageState} from "./types.ts";
import {getAllProductsAsyncAction} from "./acyncActions.ts";

const homePageSlice = createSlice<HomePageState, SliceCaseReducers<HomePageState>>(
    {
        name: 'homePage',
        initialState: {
            products: [],
            loading: false,
            error: 'Any error'
        },
        reducers: {},
        extraReducers: (builder) => {
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
                        state.error = action.error.message;
                    }
                )
                .addCase(
                    (getAllProductsAsyncAction.fulfilled),
                    (state, action) => {
                        state.loading = false;
                        state.products = state.products.const(action.payload.products);
                        state.error = '';
                    }
                )
        }
})