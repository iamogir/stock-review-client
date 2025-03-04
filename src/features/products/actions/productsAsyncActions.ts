
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product, ProductDto, ProductsResponse} from "../../../entities/product/model/types.ts";
import {fromServerObject} from "../../../entities/product/lib/mapProduct.ts";

const API = import.meta.env.VITE_API_URL;

export const getAllProductsAsyncAction = createAsyncThunk<ProductsResponse>(
    'stock_entry/get_all_products',
    async(): Promise<ProductsResponse> => {
        try {
            const products: Product[] = [];
            const response = await fetch(API + 'stock_entries/get_all_products');
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
    'stock_entry/add_new_product',
    async(newProduct: Product, thunkAPI): Promise<Product | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            const response = await fetch(API + 'stock_entries/add_new_product', {
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

export const deleteProductByIdAsyncAction = createAsyncThunk<string, string, { rejectValue: string }>(
    'stock_entry/delete_product_by_id',
    async(id: string, thunkAPI): Promise<string | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try{
            if (id === '')
                throw new Error('NO ID !!!')

            console.log('DELETE')

            const response = await fetch(API + 'stock_entries/delete_product_by_id/' + id, {
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
            console.log('delete_product_by_id', error);
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            )
        }
    }
)