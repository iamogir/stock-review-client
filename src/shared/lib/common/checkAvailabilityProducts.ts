import {RootState} from "../../../app/redux/store.ts";
import {GetThunkAPI, ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";

export function checkAvailabilityProducts(thunkAPI
                                          // :
                                          // GetThunkAPI<{ rejectValue: string, state?: unknown, dispatch?: ThunkDispatch<unknown, unknown, UnknownAction> | undefined, extra?: unknown, serializedErrorType?: unknown, pendingMeta?: unknown, fulfilledMeta?: unknown, rejectedMeta?: unknown }>
) {
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