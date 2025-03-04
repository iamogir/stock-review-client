import {createAsyncThunk} from "@reduxjs/toolkit";
import { StockEntry, StockEntryDto, StockEntryResponse} from "../../../entities/product/model/types.ts";
import {fromServerStockEntryObject} from "../../../entities/product/lib/mapProduct.ts";

const API = import.meta.env.VITE_API_URL;

export const getExpiredProductsAsyncAction = createAsyncThunk<StockEntryResponse>(
    'stock_entry/get_expired_products',
    async(): Promise<StockEntryResponse> => {
        try{
            const expiredProducts: StockEntry[] = [];
            const response = await fetch(API + 'stock_entries/get_expired_products');
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();

                json.map((pr: StockEntryDto) => expiredProducts.push(fromServerStockEntryObject(pr)));

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
            const products: StockEntry[] = [];
            const response = await fetch(API + 'stock_entries/get_expiring_soon/' + countDays);
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();

                json.map((pr: StockEntryDto) => products.push(fromServerStockEntryObject(pr)));

                if (products.length === 0) {
                    throw new Error('No expired products for next ' + countDays + ' days. Great job!')
                } else {
                    return { stockEntries: products };
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