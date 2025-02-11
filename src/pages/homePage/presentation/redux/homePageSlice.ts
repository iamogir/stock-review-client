import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {HomePageState} from "./types.ts";
import {getAllProductsAsyncAction} from "./acyncActions.ts";

const homePageSlice = createSlice<HomePageState, SliceCaseReducers<HomePageState>, "homePage", SliceSelectors<HomePageState>>(
    {
        name: 'homePage',
        initialState: {
            products: [],
            loading: false,
            error: 'Any error'
        },
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
                        state.products = state.products.const(action.payload.products);
                        state.error = '';
                    }
                )
        }
})

export default homePageSlice.reducer;