import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product, ProductDto, ProductsResponse} from "../../../entities/product/model/types.ts";
import {fromServerObject} from "../../../entities/product/lib/mapProduct.ts";

const API = import.meta.env.VITE_API_URL;

export const getExpiredProductsAsyncAction = createAsyncThunk<ProductsResponse>(
    'stock_entry/get_expired_products',
    async(): Promise<ProductsResponse> => {
        try{
            const expiredProducts: Product[] = [];
            const response = await fetch(API + 'stock_entries/get_expired_products');
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();

                json.map((pr: ProductDto) => expiredProducts.push(fromServerObject(pr)));

                if (expiredProducts.length === 0) {
                    throw new Error('No expired products. Great job!');
                } else {
                    return { products: expiredProducts };
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

export const getExpiringSoonProductsAsyncAction = createAsyncThunk<ProductsResponse, number, { rejectValue: string }> (
    'stock_entry/get_expiring_soon',
    async(countDays: number, thunkAPI ): Promise<ProductsResponse | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            const products: Product[] = [];
            const response = await fetch(API + 'stock_entries/get_expiring_soon/' + countDays);
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();

                json.map((pr: ProductDto) => products.push(fromServerObject(pr)));

                if (products.length === 0) {
                    throw new Error('No expired products for next ' + countDays + ' days. Great job!')
                } else {
                    return { products };
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