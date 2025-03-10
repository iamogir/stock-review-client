import {createAsyncThunk} from "@reduxjs/toolkit";
import { StockEntry, StockEntryDto, StockEntryResponse} from "../../../entities/product/model/types.ts";
import {fromServerStockEntryObject} from "../../../entities/product/lib/mapProduct.ts";
import {RootState} from "../../../app/redux/store.ts";

const API = import.meta.env.VITE_API_URL;

export const getExpiredProductsAsyncAction = createAsyncThunk<StockEntryResponse, { rejectValue: string }>(
    'stock_entry/get_expired_products',
    async(_, thunkAPI): Promise<StockEntryResponse | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            const { products } = thunkAPI.getState() as RootState;
            const productsArr = products.products;
            const stockEntriesArr = products.stockEntries;
            if (!productsArr) {
                return thunkAPI.rejectWithValue('No products are found');
            }
            if (stockEntriesArr && stockEntriesArr.length > 0 || productsArr && productsArr.length > 0) { //TODO: this right!!!
                console.log('Entries are already loaded')
                return thunkAPI.rejectWithValue('Entries are already loaded');
            }

            const expiredProducts: StockEntry[] = [];
            const response = await fetch(API + 'stock_entries/get_expired_products');
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();

                json.map((pr: StockEntryDto) => expiredProducts.push(fromServerStockEntryObject(pr, productsArr)));

                if (expiredProducts.length === 0) {
                    throw new Error('No expired products. Great job!');
                } else {
                    return { stockEntries: expiredProducts };
                }
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log('get_expired_products ' + error);
            throw error;
        }
    }
)

export const getExpiringSoonProductsAsyncAction = createAsyncThunk<StockEntryResponse, number, { rejectValue: string }> (
    'stock_entry/get_expiring_soon',
    async(countDays: number, thunkAPI ): Promise<StockEntryResponse | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            const { products } = thunkAPI.getState() as RootState;
            const productsArr = products.products;
            const stockEntriesArr = products.stockEntries;
            if (!productsArr) {
                return thunkAPI.rejectWithValue('No products are found');
            }
            if (!stockEntriesArr || !productsArr || stockEntriesArr.length === 0 || productsArr.length === 0) {
                return thunkAPI.rejectWithValue('Entries are already loaded');
            }

            const stockEntries: StockEntry[] = [];
            const response = await fetch(API + 'stock_entries/get_expiring_soon/' + countDays);
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();

                json.map((pr: StockEntryDto) => stockEntries.push(fromServerStockEntryObject(pr, productsArr)));

                if (stockEntries.length === 0) {
                    throw new Error('No expired stockEntries for next ' + countDays + ' days. Great job!')
                } else {
                    return { stockEntries };
                }

            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log('get_expired_soon', error);
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            );
        }
    }
)