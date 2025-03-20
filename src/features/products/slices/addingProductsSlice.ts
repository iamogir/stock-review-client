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
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase()
        }
    })