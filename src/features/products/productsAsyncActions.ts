
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product, ProductDto, ProductsResponse} from "../../entities/product/model/types.ts";
import {fromJSON, fromServerObject} from "../../entities/product/lib/mapProduct.ts";

const API = import.meta.env.VITE_API_URL;

export const getAllProductsAsyncAction = createAsyncThunk<ProductsResponse>(
    'product/get_all_products',
    async(): Promise<ProductsResponse> => {
        try {
            const products: Product[] = [];
            const response = await fetch(API + 'products/get_all_products');
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();

                json.map((el: ProductDto) => products.push(fromServerObject(el)));

                if (products.length === 0) {
                    throw new Error("no data " + response.statusText);
                } else {
                    return { products };
                }

            } else {
                throw new Error(response.statusText);
            }
        } 
        catch (error) {
            console.error('get_all_products ' + error);
            throw error;
        }
    }
)

export const addNewProductAsyncAction = createAsyncThunk<Product, Product, { rejectValue: string }>(
    'product/add_new_product',
    async(newProduct: Product, thunkAPI): Promise<Product | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            const response = await fetch(API + 'products/add_new_product', {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newProduct)});
            console.log(JSON.stringify(newProduct))
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();
                console.log(json);

                const returnedProduct = fromJSON(json);

                if (!returnedProduct) {
                    throw new Error('Unable to add product ' + response.statusText);
                } else {
                    return returnedProduct;
                }
            } else {
                throw new Error(response.statusText);
            }


        } catch (error) {
            console.log('add_new_product', error);
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            );
        }
    }
)

export const getExpiredProductsAsyncAction = createAsyncThunk<ProductsResponse>(
    'product/get_expired_products',
    async(): Promise<ProductsResponse> => {
        console.log('get_expired_products');
        try{
            const expiredProducts: Product[] = [];
            const response = await fetch(API + 'products/get_expired_products');
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
    'products/get_expired_soon',
    async(countDays: number, thunkAPI ): Promise<ProductsResponse | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            const products: Product[] = [];
            const response = await fetch(API + 'products/get_expired_soon/' + countDays);
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