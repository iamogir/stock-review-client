import {Product, ProductDto, ProductsResponse} from "entities/product";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {fromServerProductObject} from "entities/product";
import {RootState} from "app/redux";

const API = import.meta.env.VITE_API_URL;

export const getAllProductsAsyncAction = createAsyncThunk<ProductsResponse, void, { rejectValue: string }>(
    'product/get_all_products',
    async(_, thunkAPI): Promise<ProductsResponse | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {

            // const {products} = thunkAPI.getState() as RootState;
            // const temp = products.products;
            // if (temp && temp.length > 0) {
            //     throw new Error('Products already loaded')
            // }

            console.log('Get All Products Loading')

            const productsArr: Product[] = [];
            const response = await fetch(API + 'products/get_all_products');
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();

                json.map((pr: ProductDto) => productsArr.push(fromServerProductObject(pr)));

                if (productsArr.length === 0) {
                    throw new Error("no data " + response.statusText)
                } else {
                    return { products: productsArr }
                }
            } else {
                throw new Error(response.statusText);
            }

        } catch (error) {
            console.error('get_all_products ' + error);
            throw error;
        }
    }
)