import {SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";

const initialState: AddingProductsInitState = {
    newProducts: [],
    newEntries: [],
    error: null
}

const AddingProductsSlice = createSlice<AddingProductsInitState, SliceCaseReducers<AddingProductsInitState, 'addProducts', SliceSelectors<AddingProductsInitState>>>(
    {
        name: 'addingProducts',
        initialState: {initialState},
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase()
        }
    })