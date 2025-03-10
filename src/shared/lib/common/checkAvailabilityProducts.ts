import {RootState} from "app/redux";
import {GetThunkAPI} from "@reduxjs/toolkit";

export function checkAvailabilityProducts(thunkAPI:  GetThunkAPI<RootState>) {
    const { products } = thunkAPI.getState() as RootState;
    const productsArr = products.products;
    const stockEntriesArr = products.stockEntries;
    if (!productsArr) {
        return thunkAPI.rejectWithValue('No products are found');
    }
    if (stockEntriesArr && stockEntriesArr.length > 0 || productsArr && productsArr.length > 0) {
        return thunkAPI.rejectWithValue('Entries are already loaded');
    }
    return productsArr;
}