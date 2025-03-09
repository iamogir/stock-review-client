
import {createAsyncThunk} from "@reduxjs/toolkit";
import { StockEntry, StockEntryDto, StockEntryResponse} from "../../../entities/product/model/types.ts";
import {fromServerStockEntryObject} from "../../../entities/product/lib/mapProduct.ts";
import {RootState} from "../../../app/redux/store.ts";

const API = import.meta.env.VITE_API_URL;

export const getAllStockEntriesAsyncAction = createAsyncThunk<StockEntryResponse, { rejectValue: string }>(
    'stock_entry/get_all_stock_entries',
    async(_, thunkAPI): Promise<StockEntryResponse | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            const { products } = thunkAPI.getState() as RootState;
            const productsArr = products.products;
            if (!productsArr || productsArr.length === 0) {
                return thunkAPI.rejectWithValue('Products are already loaded');
            }

            const stockEntries: StockEntry[] = [];
            const response = await fetch(API + 'stock_entries/get_all_stock_entries');
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();

                json.map((el: StockEntryDto) => stockEntries.push(fromServerStockEntryObject(el, productsArr)));

                if (stockEntries.length === 0) {
                    throw new Error("no data " + response.statusText);
                } else {
                    return { stockEntries };
                }

            } else {
                throw new Error(response.statusText);
            }
        } 
        catch (error) {
            console.error('get_all_stock_entries ' + error);
            throw error;
        }
    }
)

export const addNewStockEntryAsyncAction = createAsyncThunk<StockEntry, StockEntry, { rejectValue: string }>(
    'stock_entry/add_new_stock_entry',
    async(newEntry: StockEntry, thunkAPI): Promise<StockEntry | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            const response = await fetch(API + 'stock_entries/add_new_stock_entry', {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newEntry)});

            if (response.status === 201) {
                const json = await response.json();
                console.log(json);
                const returnedEntry = fromServerStockEntryObject(json);

                if (!returnedEntry) {
                    throw new Error('Unable to add entry ' + response.statusText);
                } else {
                    return returnedEntry;
                }
            } else {
                throw new Error(response.statusText);
            }


        } catch (error) {
            console.log('add_new_stock_entry', error);
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            );
        }
    }
)

export const deleteStockEntryByIdAsyncAction = createAsyncThunk<string, string, { rejectValue: string }>(
    'stock_entry/delete_stock_entry_by_id',
    async(id: string, thunkAPI): Promise<string | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try{
            if (id === '')
                throw new Error('NO ID !!!')

            console.log('DELETE')

            const response = await fetch(API + 'stock_entries/delete_stock_entry_by_id/' + id, {
                method: "DELETE",
                headers: { "Content-Type": "text/plain"}
            });
            if (response.status === 200 || response.status === 204) {
                const json = await response.text();
                console.log(json)
                return json;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log('delete_stock_entry_by_id', error);
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            )
        }
    }
)