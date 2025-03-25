import {createSlice, SliceCaseReducers, SliceSelectors} from "@reduxjs/toolkit";
import {AddingProductsInitState} from "entities/product";

const initialState: AddingProductsInitState = {
    newProducts: [],
    newEntries: [],
    error: 'any error'
}

const tempProductsStack = createSlice<AddingProductsInitState, SliceCaseReducers<AddingProductsInitState>, 'addingProducts', SliceSelectors<AddingProductsInitState>>(
    {
        name: 'addingProducts',
        initialState,
        reducers: {
            addProduct: (state, action) => {
                if (state.newProducts)
                    state.newProducts = [ ...state.newProducts, action.payload];
            },
            addEntry: (state, action) => {
                console.log(action.payload) //TODO should be StockEntry NOT DTO
                if (state.newEntries)
                    state.newEntries = [ ...state.newEntries, action.payload];
            },
            removeOneEntry: (state, action) => {
                state.newEntries.splice(state.newEntries.indexOf(action.payload), 1);
            },
            removeAllProducts: {
                reducer: (state)=> {
                    state.newProducts = [];
                },
                prepare: () => ({ payload: undefined})
            },
            removeAllEntries: {
                reducer: (state)=> {
                    state.newEntries = [];
                },
                prepare: () => ({ payload: undefined})
            }
        },
        // extraReducers: (builder) => {
        //     builder
        //         .addCase()
        // }
    }
)

export const { addProduct, addEntry, removeOneEntry, removeAllProducts, removeAllEntries } = tempProductsStack.actions;
export default tempProductsStack.reducer;