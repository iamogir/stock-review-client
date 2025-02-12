
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product} from "../../entities/product/model/types.ts";
import {fromJSON} from "../../entities/product/lib/mapProduct.ts";

const API = import.meta.env.VITE_API_URL;

export const getAllProductsAsyncAction = createAsyncThunk<Product[]>(
    'home/get_all_products',
    async(): Promise<Product[]> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const products: Product[] = [];
            const response = await fetch(API + '/products/get_all_products');
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();
                console.log(json);

                json.map((el: string) => products.push(fromJSON(el)));

                if (products.length === 0) {
                    throw new Error("no data");
                } else {
                    return products;
                }

            } else {
                throw new Error(response.statusText);
            }
        } 
        catch (error) {
            throw error;
        }
    }
)