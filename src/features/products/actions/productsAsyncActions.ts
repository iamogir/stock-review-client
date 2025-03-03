
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product, ProductDto, ProductsResponse} from "../../../entities/product/model/types.ts";
import {fromServerObject} from "../../../entities/product/lib/mapProduct.ts";

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

            if (response.status === 201) {
                const json = await response.json();
                console.log(json);
                const returnedProduct = fromServerObject(json);

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