import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {AddingProductsInitState} from "entities/product";

const initialState: AddingProductsInitState = {
    newProducts: [],
    newEntries: [],
    error: 'any error'
}

const addingProductsSlice = createSlice<AddingProductsInitState, SliceCaseReducers<AddingProductsInitState>, 'addingProducts', SliceSelectors<AddingProductsInitState>>(
    {
        name: 'addingProducts',
        initialState,
        reducers: {
            addProduct: (state, action) => {
                if (state.newProducts)
                    state.newProducts = [ ...state.newProducts, action.payload];
            },
            addEntry: (state, action) => {
                if (state.newEntries)
                    state.newEntries = [ ...state.newEntries, action.payload];
            },
        },
        // extraReducers: (builder) => {
        //     builder
        //         .addCase()
        // }
    }
)

export const { addProduct, addEntry } = addingProductsSlice.actions;
export default addingProductsSlice.reducer;